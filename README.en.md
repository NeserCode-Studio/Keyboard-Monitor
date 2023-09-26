# Keyboard Monitor

>   [中文](./README.md)

## What is this?

Keyboard Monitor (KM) is a simple software that helps you set up a service for mapping keyboard events. Use Tauri encapsulation to provide WebSocket services.

KM uses rustLang's system-level keyboard event support (rdev) to listen for user keyboard actions, and enables the WebSocket service in the multithreading provided by Tauri to provide communication channels. Upon a keyboard event response, the keyboard event is simultaneously broadcast to the WebSocket server with a fixed KM.

## Why?

Provides a basis for other programs to respond to keyboard events.

## How's it going?

The KM body installation package is only 2 to 3M, and the Memory usage is basically 5 to 7M when the GUI is not used (default). The calculation of Memory data does not include the necessary procedures for the system to run WebView2.

Overall, KM barely ranks among lightweight programs, both in terms of installation package size and running memory.

## License

This project is licensed under the [GNUv3](./LICENSE) license.
