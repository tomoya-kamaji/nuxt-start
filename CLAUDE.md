# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 開発コマンド

- `pnpm dev` - 開発サーバーを http://localhost:3000 で起動
- `pnpm build` - 本番用にビルド
- `pnpm generate` - 静的サイトを生成
- `pnpm preview` - 本番ビルドをローカルでプレビュー

## アーキテクチャ概要

TypeScriptを使用したNuxt 3アプリケーションで、機能ベースのディレクトリ構造を採用しています。従来の技術レイヤーではなく、明確な機能を中心に組織化されています。

### 主要技術
- **Nuxt 3** with TypeScript（strictモード有効）
- **Pinia** - 状態管理
- **VeeValidate + Zod** - フォームバリデーション
- **Tailwind CSS** - スタイリング
- **Vue 3 Composition API** - 自動インポート機能付き

### 機能構造
機能は `/features` ディレクトリに整理され、それぞれが以下を含みます：
- `components/` - 機能固有のVueコンポーネント
- `composables/` - 機能固有のコンポーザブル
- `store/` - 状態管理用のPiniaストア
- `types/` - TypeScript型定義
- `util/` - 機能ユーティリティ

現在の機能：
- `contact/` - コンタクトフォーム機能
- `todo/` - Todoリスト管理
- `user/` - ステップナビゲーション付きマルチステップユーザー登録

### マルチステップフォームパターン
ユーザー登録機能では以下を使用したマルチステップフォームパターンを実装：
- ステップ間の状態永続化用Piniaストア（`useRegistrationStore`）
- ルートベースの進行によるステップナビゲーション
- VeeValidate + Zodを使用したフォームバリデーション
- 進捗表示用のStepIndicatorコンポーネント

### ページとルーティング
`/pages` のページはNuxtのファイルベースルーティングに従います。複雑なページは関連コンポーネントをサブディレクトリに配置する場合があります（例：`pages/room/components/`）。

### グローバルコンポーネント
再利用可能なフォームコンポーネントは `/components/form/` に配置：
- `TextInput.vue` - バリデーション付き標準テキスト入力
- `TextArea.vue` - バリデーション付きテキストエリアコンポーネント