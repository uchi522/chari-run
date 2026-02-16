/**
 * フレーム数からスコアを計算する
 * @param frameCount - 経過フレーム数（0以上）
 * @param scorePerSecond - 1秒あたりのスコア（0以上）
 * @param fps - フレームレート（1以上、デフォルト: 60）
 * @returns 計算されたスコア
 * @throws {Error} パラメータが不正な場合
 */
export function calculateScore(frameCount: number, scorePerSecond: number, fps: number = 60): number {
  if (frameCount < 0 || scorePerSecond < 0 || fps <= 0) {
    throw new Error("Invalid input parameters");
  }
  return Math.floor(frameCount / (fps / scorePerSecond));
}
