# Keyboard Monitor

>   [English](./README.en.md)

## 是什么？

Keyboard Monitor（以下简称KM）是一款帮助建立映射键盘事件服务的简洁软件。使用 Tauri 封装，提供 WebSocket 服务。

KM 使用了 rustLang 的系统级键盘事件支持（rdev）来监听用户的键盘操作，并在 Tauri 提供的多线程中启用 WebSocket 服务以提供通信频道。在键盘事件响应时，将同时向 KM 固定的 WebSocket 服务器广播该键盘事件。

## 为什么？

为其他程序提供键盘事件的响应基础。

## 怎么样？

KM 本体安装包仅 2 ~ 3M，经测试在不使用图形界面（默认）时的内存（Memory）用量基本在 5 ~ 7M。其中 Memory 方面的数据测算不包含系统运行 WebView2 的必要程序。

总体来说，KM 勉强可以排在轻量程序中，无论是在安装包大小还是在运行内存上。

## 许可

本项目使用 [GNUv3](./LICENSE) 许可。
