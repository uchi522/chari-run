# チャリ走

ブラウザで遊べる自転車ランゲーム。Next.js + HTML Canvas で実装。

## 起動方法

```bash
npm install
npm run dev
```

http://localhost:3000 を開く。

## 技術スタック

- Next.js (App Router) + TypeScript
- HTML Canvas API
- Tailwind CSS

## ディレクトリ構成

```
src/
├── app/                  # Next.js App Router
├── components/Game/      # UI コンポーネント + Canvas 描画
├── hooks/                # ゲームループロジック
└── constants/            # 定数
```
