import { listen } from "@tauri-apps/api/event"
import { getVersion } from "@tauri-apps/api/app"

import { Ws } from "./ws.js"
import type { Payload } from "./types.d.js"

const WS_URL = "ws://127.0.0.1:3012"
let keyQueue: string[] = []

const app = document.getElementById("app")!
const state = document.querySelector("span.state")!
const version = document.querySelector("span.version")!
const tip = document.querySelector("span.listen")!
const display = document.querySelector("span.display")!
const prefixDisplay = document.querySelector("span.prefix.d")!

function updateState() {
	app && (state.innerHTML = `${ws.state}`)
	if (!keyQueue.length) {
		display.innerHTML = `No key being pressed.`
		prefixDisplay.innerHTML = `[Display]`
	} else {
		display.innerHTML = keyQueue.join("·")
		prefixDisplay.innerHTML = `[Display ${keyQueue.length}]`
	}
}

const ws = new Ws(WS_URL)
tip.innerHTML = `${WS_URL}`
ws.onMessage = (...args) => {
	console.log(`Message ${[...args]}`)
}

const unlisten = async () => {
	return await listen<Payload>("key", (event) => {
		ws.send(JSON.stringify(event.payload))

		if (!keyQueue.includes(event.payload.key)) {
			keyQueue.push(event.payload.key)
		}

		if (event.payload.action === "release") {
			keyQueue = keyQueue.filter((k) => k !== event.payload.key)
		}

		updateState()
	})
}

document.oncontextmenu = (e: Event) => {
	e.preventDefault()
}
getVersion().then((v) => (version.innerHTML = `${v}`))

updateState()
unlisten()
