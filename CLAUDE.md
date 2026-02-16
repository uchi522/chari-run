# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Communication Rule

- Always communicate with the user in Japanese.
- Use standard Japanese technical terminology, but keep specific code-related terms in English.

## Critical Rules

- Strictly follow TDD as defined in `.claude/skills/tdd.md`.
- Use the `/tdd` command for all implementation tasks.

## Workflow Delegation

- **Review Phase**: Before completing the REFACTOR phase, you MUST delegate the review task to the sub-agent at `.claude/agents/code-reviewer.md`.
- **Approval Requirement**: Do not proceed to the final commit unless the sub-agent's output contains `#APPROVED`. If `#REQUEST_CHANGES` is returned, address all indicated issues and re-request review.
- **PR Creation**: After the sub-agent approves the changes (`#APPROVED`) and you have made the final commit, you MUST create a Pull Request using `gh pr create --fill`.

## Project Overview

チャリ走 (Chari-run) — a browser-based bicycle running game built with Next.js, TypeScript, and HTML5 Canvas.

## Commands

- `npm run dev` — Start development server
- `npm run build` — Production build
- `npm run lint` — Run ESLint
- `npm test` — Run all Vitest tests (test files in `tests/`)

## Architecture

The game separates concerns into three layers:

1. **Game Component** (`src/components/Game/index.tsx`) — Client component that creates a canvas element (800x400) and wires up the game loop hook.
2. **Game Loop** (`src/hooks/useGameLoop.ts`) — Custom hook that owns all game state (position, velocity, scroll offset, wheel angle), handles keyboard input (Space to jump), runs physics each frame via `requestAnimationFrame`, and calls rendering functions.
3. **Canvas Rendering** (`src/components/Game/GameCanvas.ts`) — Stateless drawing functions (`drawSky`, `drawGround`, `drawClouds`, `drawBike`, `drawWheel`) that take canvas context and current state as arguments.

Game constants (canvas size, scroll speed, physics values) live in `src/constants/game.ts`. The path alias `@/*` maps to `./src/*`.

**Testing strategy:** Canvas rendering functions (`GameCanvas.ts`) require `HTMLCanvasElement` mocks in Vitest (e.g., `vitest-canvas-mock`). Prefer testing game logic (physics, state transitions) independently from rendering by keeping logic in pure functions that don't depend on the Canvas API.

## Conventions

- **Language:** All code and commits are in Japanese context; README and issue discussions are in Japanese.
- **Commits:** Conventional Commits style — prefix + colon + half-width space + Japanese description.
  - `feat: ジャンプ物理演算の実装`
  - `fix: 着地判定のオフバイワンエラーを修正`
  - `refactor: 描画関数のパラメータを整理`
  - `docs: READMEにゲーム操作方法を追記`
- **Branch naming:** `feature/[FeatureName]-[実装した機能名]` (Conventional Branch format).
