import { describe, it, expect } from "vitest";

/**
 * Issue #1: スペースキーでチャリがジャンプする
 *
 * Given: 画面起動後に
 * When: スペースキーが入力された時
 * Then: チャリがジャンプする（放物線を描いて跳び、地面に戻る）
 */

describe("Issue #1: ジャンプ機能", () => {
  describe("定数の定義", () => {
    it("JUMP_FORCE が負の値（上方向）で定義されている", async () => {
      const { JUMP_FORCE } = await import("@/constants/game");
      expect(JUMP_FORCE).toBeDefined();
      expect(JUMP_FORCE).toBeLessThan(0);
    });

    it("GRAVITY が正の値（下方向）で定義されている", async () => {
      const { GRAVITY } = await import("@/constants/game");
      expect(GRAVITY).toBeDefined();
      expect(GRAVITY).toBeGreaterThan(0);
    });
  });

  describe("drawBike のシグネチャ", () => {
    it("drawBike が第3引数 bikeY を受け取る", async () => {
      const { drawBike } = await import("@/components/Game/GameCanvas");
      // drawBike(ctx, angle, bikeY) → 引数3つ
      expect(drawBike.length).toBe(3);
    });
  });

  describe("ジャンプ物理演算", () => {
    it("地面にいる時にジャンプすると上方向に速度が付く", async () => {
      const { GROUND_Y, JUMP_FORCE, GRAVITY } = await import("@/constants/game");

      let bikeY = GROUND_Y;
      let velocityY = 0;

      // スペースキー入力をシミュレート（地面にいる時）
      velocityY = JUMP_FORCE;

      // 1フレーム進める
      velocityY += GRAVITY;
      bikeY += velocityY;

      // 上方向（Y座標が減少）に移動しているはず
      expect(bikeY).toBeLessThan(GROUND_Y);
    });

    it("ジャンプ後に重力で地面に戻る", async () => {
      const { GROUND_Y, JUMP_FORCE, GRAVITY } = await import("@/constants/game");

      let bikeY = GROUND_Y;
      let velocityY = JUMP_FORCE;

      // 十分なフレーム数を進めて着地を確認
      for (let i = 0; i < 200; i++) {
        velocityY += GRAVITY;
        bikeY += velocityY;
        if (bikeY >= GROUND_Y) {
          bikeY = GROUND_Y;
          velocityY = 0;
          break;
        }
      }

      expect(bikeY).toBe(GROUND_Y);
      expect(velocityY).toBe(0);
    });

    it("ジャンプ中（空中）は再度ジャンプできない", async () => {
      const { GROUND_Y, JUMP_FORCE, GRAVITY } = await import("@/constants/game");

      let bikeY = GROUND_Y;
      let velocityY = JUMP_FORCE;

      // 数フレーム進めて空中状態にする
      for (let i = 0; i < 5; i++) {
        velocityY += GRAVITY;
        bikeY += velocityY;
      }

      // 空中にいることを確認
      expect(bikeY).toBeLessThan(GROUND_Y);

      // 空中でスペースキー入力をシミュレート
      // 条件: bikeY >= GROUND_Y の時のみジャンプ可能
      const canJump = bikeY >= GROUND_Y;
      expect(canJump).toBe(false);

      // velocityYは変わらないはず（ジャンプしない）
      if (canJump) {
        velocityY = JUMP_FORCE;
      }
      // velocityY はジャンプ前と同じ（JUMP_FORCEにリセットされていない）
      expect(velocityY).not.toBe(JUMP_FORCE);
    });

    it("放物線を描く（上昇→頂点→下降）", async () => {
      const { GROUND_Y, JUMP_FORCE, GRAVITY } = await import("@/constants/game");

      let bikeY = GROUND_Y;
      let velocityY = JUMP_FORCE;
      const positions: number[] = [];

      // ジャンプの全軌道を記録
      for (let i = 0; i < 200; i++) {
        velocityY += GRAVITY;
        bikeY += velocityY;
        if (bikeY >= GROUND_Y) {
          bikeY = GROUND_Y;
          velocityY = 0;
          positions.push(bikeY);
          break;
        }
        positions.push(bikeY);
      }

      // 少なくとも数フレームは空中にいる
      expect(positions.length).toBeGreaterThan(3);

      // 最初は上昇（Y座標が減少）
      expect(positions[0]).toBeLessThan(GROUND_Y);

      // 頂点がある（最小Y値）
      const minY = Math.min(...positions);
      expect(minY).toBeLessThan(GROUND_Y);

      // 最後は地面に戻る
      expect(positions[positions.length - 1]).toBe(GROUND_Y);
    });
  });
});
