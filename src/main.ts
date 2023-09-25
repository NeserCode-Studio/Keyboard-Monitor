import { listen } from "@tauri-apps/api/event"
// import { invoke } from "@tauri-apps/api/tauri"

import { Ws } from "./ws"
import type { Payload } from "./types"
// invoke("use_devtools")
const ws = new Ws("ws://127.0.0.1:3012")

ws.onMessage = (...args) => {
	console.log(`Message ${[...args]}`)
}

const unlisten = async () => {
	return await listen<Payload>("key", (event) => {
		ws.send(JSON.stringify(event.payload))
	})
}

unlisten()
