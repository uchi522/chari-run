import { describe, it, expect } from "vitest";
import { calculateScore } from "@/utils/score";
import { SCORE_PER_SECOND } from "@/constants/game";

describe("Issue #3: スコア加算と表示", () => {
  it("0フレーム時点でスコアは0である", () => {
    expect(calculateScore(0, SCORE_PER_SECOND)).toBe(0);
  });

  it("60フレーム（1秒）後にスコアが10点になる", () => {
    expect(calculateScore(60, SCORE_PER_SECOND)).toBe(10);
  });

  it("6フレームごとに1点加算される", () => {
    expect(calculateScore(6, SCORE_PER_SECOND)).toBe(1);
    expect(calculateScore(12, SCORE_PER_SECOND)).toBe(2);
    expect(calculateScore(18, SCORE_PER_SECOND)).toBe(3);
  });

  it("120フレーム（2秒）後にスコアが20点になる", () => {
    expect(calculateScore(120, SCORE_PER_SECOND)).toBe(20);
  });

  it("負のフレーム数でエラーをスローする", () => {
    expect(() => calculateScore(-1, SCORE_PER_SECOND)).toThrow("Invalid input parameters");
  });

  it("負のscorePerSecondでエラーをスローする", () => {
    expect(() => calculateScore(60, -1)).toThrow("Invalid input parameters");
  });

  it("fpsが0以下でエラーをスローする", () => {
    expect(() => calculateScore(60, SCORE_PER_SECOND, 0)).toThrow("Invalid input parameters");
    expect(() => calculateScore(60, SCORE_PER_SECOND, -1)).toThrow("Invalid input parameters");
  });
});
