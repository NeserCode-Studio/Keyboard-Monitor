import { WsReadyState } from "./types.d.js"

export class Ws {
	private _ws: WebSocket

	constructor(path: string) {
		this._ws = new WebSocket(path)
	}

	get state() {
		return WsReadyState[this._ws.readyState]
	}

	set onMessage(cb: (data: string) => void) {
		this._ws.onmessage = (ev: MessageEvent) => {
			cb(ev.data)
		}
	}

	set onConnect(cb: () => void) {
		this._ws.onopen = () => {
			cb
		}
	}

	set onClose(cb: () => void) {
		this._ws.onclose = () => {
			cb
		}
	}

	send(data: string) {
		this._ws.send(data)
	}
}
