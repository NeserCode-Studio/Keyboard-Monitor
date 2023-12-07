import { appDataDir } from "@tauri-apps/api/path"
import { open } from "@tauri-apps/api/shell"
import { listen } from "@tauri-apps/api/event"
import {
	exists,
	createDir,
	writeTextFile,
	readTextFile,
	readDir,
	removeFile,
} from "@tauri-apps/api/fs"
import { stringify as iniStringify, parse as iniParse } from "ini"

import type { Config, LogState, LoggerConfig, logLevel } from "./types"

const defaultConfig: Config = {
	websocket: {
		protocol: "ws",
		scope: "127.0.0.1",
		port: "3012",
	},
	logger: {
		maxLogs: 10240,
		maxLogDays: 7,
	},
}

const fixZero = (n: number) => {
	return n < 10 ? `0${n}` : `${n}`
}

const unlistenLogfile = async (path: string) => {
	return await listen<string>("show-log", async (_event) => {
		await open(path)
	})
}

export class Fs {
	private $appDataPath: string = ""
	public $logState: LogState = "INIT"
	private $logFullPath: string = ""
	private $configFullPath: string = ""
	private $logConfig: LoggerConfig = defaultConfig.logger
	constructor() {
		appDataDir().then((path) => {
			this.$appDataPath = path
			this.initLog()
				.then(() => {
					this.$logState = "OK"
					this.getConfig().then((config) => {
						this.$logConfig = config.logger
					})
					unlistenLogfile(this.$logFullPath)
				})
				.catch((_err) => {
					this.$logState = "ERROR"
				})
		})
	}

	async initDir(dir: string) {
		if (this.$appDataPath === "") return

		const isDirExists = await exists(dir)
		if (!isDirExists) await createDir(dir)
		else return
	}

	async checkLog() {
		if (this.$logState !== "OK") return

		const logPath = `${this.$appDataPath}\logs`

		// Days Limit
		const logEntries = await readDir(logPath)
		const logDays = logEntries.length

		while (logDays >= this.$logConfig.maxLogDays) {
			const shifted = Array.from(logEntries).shift()
			if (!shifted?.path) return
			await removeFile(shifted.path)
		}

		// Size Limit
		let logContent = await readTextFile(this.$logFullPath)
		let logSize = logContent.length

		if (logSize >= this.$logConfig.maxLogs)
			await writeTextFile(this.$logFullPath, "")
		else return
	}

	async initLog() {
		if (this.$appDataPath === "") return
		await this.initDir(this.$appDataPath)

		const now = new Date()
		const logTitle = `L-${now.getFullYear()}${fixZero(
			now.getMonth() + 1
		)}${fixZero(now.getDate())}.log`

		const logPath = `${this.$appDataPath}\logs`
		await this.initDir(logPath)
		this.$logFullPath = `${logPath}\\${logTitle}`

		if (await exists(this.$logFullPath)) return
		await writeTextFile(this.$logFullPath, "")
	}

	async appendLog(message: string) {
		if (this.$logState !== "OK") return
		let logContent = await readTextFile(this.$logFullPath)

		await this.checkLog()

		logContent += `${message}\n`
		await writeTextFile(this.$logFullPath, logContent)
	}

	async log(message: string, level?: logLevel) {
		if (this.$logState !== "OK") return
		const now = new Date().toLocaleTimeString()

		const log = `[${now} ${level ?? "DEBUG"}]: ${message}`
		console.log(log)

		await this.appendLog(log)
	}

	async initConfig() {
		if (this.$logState !== "OK") return

		const configTitle = "config.ini"

		this.$configFullPath = `${this.$appDataPath}\\${configTitle}`
		const isConfigExists = await exists(this.$configFullPath)
		if (isConfigExists) return true

		await writeTextFile(this.$configFullPath, iniStringify(defaultConfig))
	}

	async getConfig() {
		await this.initConfig()

		return iniParse(await readTextFile(this.$configFullPath)) as Config
	}
}
