import { listen } from "@tauri-apps/api/event"
import { appWindow } from "@tauri-apps/api/window"

import { Fs } from "./fs.js"
import { Ws } from "./ws.js"
import type { Payload, KeyboardEventPackage, Config } from "./types.d.js"

const fs = new Fs()
let isAlwaysOnTop = false

async function setAlwaysOnTop() {
	await appWindow.setAlwaysOnTop(!isAlwaysOnTop)
	isAlwaysOnTop = !isAlwaysOnTop
}

window.onload = async () => {
	setTimeout(async () => {
		const cfg: Config = await fs.getConfig()
		const { websocket: wsConfig } = cfg
		const WS_URL = `${wsConfig.protocol}://${wsConfig.scope}:${wsConfig.port}`
		const ws = new Ws(WS_URL)

		ws.onMessage = async (...args) => {
			await fs.log(`Ws Message ${[...args]}`, "INFO")
		}
		ws.onConnect = async () => {
			await fs.log(`Ws Connected`, "DEBUG")
		}
		ws.onClose = async () => {
			await fs.log(`Ws Closed`, "DEBUG")
		}

		const unlisten = async () => {
			return await listen<Payload>("key", (event) => {
				const payload: Payload = event.payload
				const keyboardPackage: KeyboardEventPackage = {
					...payload,
					t: Date.now(),
				}

				ws.send(JSON.stringify(keyboardPackage))
			})
		}

		setTimeout(async () => {
			await fs.log("KM Listening...", "INFO")

			window.onerror = async (e) => {
				await fs.log(`${JSON.stringify(e)}`, "ERROR")
			}
		}, 1000)
		unlisten()
	}, 500)

	;(document.querySelector(".app") as HTMLDivElement).addEventListener(
		"dblclick",
		() => {
			setAlwaysOnTop()
		}
	)
}
