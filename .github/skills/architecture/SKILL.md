---
name: architecture
description: 本プロジェクトのアーキテクチャガイドライン。アーキテクチャ、ディレクトリ構成について説明。アーキテクチャやディレクトリ構成に関するタスクを実行する際に参照
---

# アーキテクチャ・ディレクトリ構成

## mcpの使用

- AIによるコードの生成のために、以下のツールに対するのMCP（Model Code Prompt）を使用する。必要に応じて利用する。
  - デザイン：Figma
  - フレームワーク：Nuxt.js
  - UIライブラリ：Vuetify
  - テスト：Playwright
  - デプロイ：Vercel

## アーキテクチャ

システムは大きく「フロントエンド」「プロキシサーバー」「外部ストリーム」の3層で構成する。

### フロントエンド（Client）:

UIでのエフェクト操作（フェーダー、つまみ）。
音声信号のデコードとエフェクト処理（Audio Graphの構築）。

### プロキシサーバー（Server / Nitro）:

ブラウザのCORS制限を回避するため、外部ラジオ局のストリームを中継。
ラジオ局のメタデータ（曲名、アーティスト名）を取得しフロントへ提供。

### 外部ソース（External）:

ネットラジオ配信サーバー（Icecast / SHOUTcast等）。

## CORSの対策

外部のラジオ局のURLをそのまま Web Audio API で処理しようとすると、ブラウザのセキュリティ制限（CORS）でブロックされる可能性がある。
この問題を回避するために、プロキシサーバー（Nitro）を介してストリームを取得するアーキテクチャを採用する。
プロキシサーバーは、外部のラジオ局からストリームを取得し、必要に応じてCORSヘッダーを付与してフロントエンドに提供する役割を担う。
これにより、フロントエンドはプロキシサーバーを通じてストリームを取得し、CORSの問題を回避しながらAudio Graphの構築やエフェクト処理を行うことができる。

## 表示させるラジオ局

以下のラジオ局を表示させる。開発後に、適宜追加できるようにする。

| ラジオ局名                 | URL                                                    | 備考          |
| -------------------------- | ------------------------------------------------------ | ------------- |
| Radio FIP Reggae           | https://stream.radiofrance.fr/fipreggae/fipreggae.m3u8 | 高音質HLS形式 |
| SomaFM: Heavyweight Reggae | https://ice1.somafm.com/reggae-128-mp3                 |               |
| Radio Art: Roots Reggae    | https://live.radioart.com/fRoots_reggae.mp3            |               |
| NPO FunX Reggae            | https://icecast.omroep.nl/funx-reggae-bb-mp3           |               |
