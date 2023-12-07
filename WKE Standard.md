# Websocket Keyboard Event Standard

## Overview

This document defines a standard for the communication of keyboard events over a WebSocket connection.

## Terminology and Definitions

- **WebSocket** - A protocol for bidirectional communication between a client and a server.
- **Keyboard Event** - An event that is dispatched by connected keyboards.
- **Keyboard Event Payload** - The data sent by tarui backend.

### Key Definitions

TypeScript definitions of the key type.

```ts
export enum Key {
	"Alt" = 0,
	"AltGr" = 1,
	"Backspace" = 2,
	"CapsLock" = 3,
	"ControlLeft" = 4,
	"ControlRight" = 5,
	"Delete" = 6,
	"DownArrow" = 7,
	"End" = 8,
	"Escape" = 9,
	"F1" = 10,
	"F10" = 11,
	"F11" = 12,
	"F12" = 13,
	"F2" = 14,
	"F3" = 15,
	"F4" = 16,
	"F5" = 17,
	"F6" = 18,
	"F7" = 19,
	"F8" = 20,
	"F9" = 21,
	"Home" = 22,
	"LeftArrow" = 23,
	// also known as windows = , super = , and command
	"MetaLeft" = 24,
	// also known as windows = , super = , and command
	"MetaRight" = 25,
	"PageDown" = 26,
	"PageUp" = 27,
	"Return" = 28,
	"RightArrow" = 29,
	"ShiftLeft" = 30,
	"ShiftRight" = 31,
	"Space" = 32,
	"Tab" = 33,
	"UpArrow" = 34,
	"PrintScreen" = 35,
	"ScrollLock" = 36,
	"Pause" = 37,
	"NumLock" = 38,
	"BackQuote" = 39,
	"Num1" = 40,
	"Num2" = 41,
	"Num3" = 42,
	"Num4" = 43,
	"Num5" = 44,
	"Num6" = 45,
	"Num7" = 46,
	"Num8" = 47,
	"Num9" = 48,
	"Num0" = 49,
	"Minus" = 50,
	"Equal" = 51,
	"KeyQ" = 52,
	"KeyW" = 53,
	"KeyE" = 54,
	"KeyR" = 55,
	"KeyT" = 56,
	"KeyY" = 57,
	"KeyU" = 58,
	"KeyI" = 59,
	"KeyO" = 60,
	"KeyP" = 61,
	"LeftBracket" = 62,
	"RightBracket" = 63,
	"KeyA" = 64,
	"KeyS" = 65,
	"KeyD" = 66,
	"KeyF" = 67,
	"KeyG" = 68,
	"KeyH" = 69,
	"KeyJ" = 70,
	"KeyK" = 71,
	"KeyL" = 72,
	"SemiColon" = 73,
	"Quote" = 74,
	"BackSlash" = 75,
	"IntlBackslash" = 76,
	"KeyZ" = 77,
	"KeyX" = 78,
	"KeyC" = 79,
	"KeyV" = 80,
	"KeyB" = 81,
	"KeyN" = 82,
	"KeyM" = 83,
	"Comma" = 84,
	"Dot" = 85,
	"Slash" = 86,
	"Insert" = 87,
	"KpReturn" = 88,
	"KpMinus" = 89,
	"KpPlus" = 90,
	"KpMultiply" = 91,
	"KpDivide" = 92,
	"Kp0" = 93,
	"Kp1" = 94,
	"Kp2" = 95,
	"Kp3" = 96,
	"Kp4" = 97,
	"Kp5" = 98,
	"Kp6" = 99,
	"Kp7" = 100,
	"Kp8" = 101,
	"Kp9" = 102,
	"KpDelete" = 103,
	"Function" = 104,
	"Unknown" = 105,
}
```

### Payload and Package Definitions

TypeScript definitions of the event payload and websocket package.

```ts
export interface Payload {
	action: string
	key: Key
}

export interface KeyboardEventPackage extends Payload {
	t: number
}
```

## Disclaimer

This standard don't be modified for other software, and just for the purpose of the project.
