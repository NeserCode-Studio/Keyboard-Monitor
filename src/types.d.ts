export interface Payload {
	action: string
	key: string
}

export enum WsReadyState {
	CONNECTING = 0,
	OPEN = 1,
	CLOSING = 2,
	CLOSED = 3,
}
