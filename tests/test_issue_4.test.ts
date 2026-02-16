import { describe, it, expect } from "vitest";
import {
  OBSTACLE_INTERVAL,
  CANVAS_WIDTH,
  GROUND_Y,
  OBSTACLE_HEIGHT,
  SCROLL_SPEED,
  OBSTACLE_WIDTH,
} from "@/constants/game";

describe("Issue #4: 障害物の出現", () => {
  it("OBSTACLE_INTERVALが定義されている", () => {
    expect(OBSTACLE_INTERVAL).toBeDefined();
    expect(OBSTACLE_INTERVAL).toBeGreaterThan(0);
  });

  it("groundOffsetが閾値を超えると障害物が生成される", () => {
    const obstacles: { x: number; y: number }[] = [];
    let nextObstacleSpawn = 0;
    let groundOffset = 0;

    // 初回生成
    groundOffset = 300;
    if (groundOffset >= nextObstacleSpawn) {
      obstacles.push({ x: CANVAS_WIDTH, y: GROUND_Y - OBSTACLE_HEIGHT });
      nextObstacleSpawn = groundOffset + OBSTACLE_INTERVAL;
    }

    expect(obstacles.length).toBe(1);
    expect(nextObstacleSpawn).toBe(600);
  });

  it("障害物が左に移動する", () => {
    const obstacles = [{ x: 800, y: GROUND_Y - OBSTACLE_HEIGHT, width: OBSTACLE_WIDTH, height: OBSTACLE_HEIGHT }];

    obstacles.forEach(obs => {
      obs.x -= SCROLL_SPEED;
    });

    expect(obstacles[0].x).toBe(797);
  });

  it("画面外の障害物が削除される", () => {
    let obstacles = [
      { x: -50, y: GROUND_Y - OBSTACLE_HEIGHT, width: OBSTACLE_WIDTH, height: OBSTACLE_HEIGHT },
      { x: 400, y: GROUND_Y - OBSTACLE_HEIGHT, width: OBSTACLE_WIDTH, height: OBSTACLE_HEIGHT }
    ];

    obstacles = obstacles.filter(obs => obs.x + obs.width > 0);

    expect(obstacles.length).toBe(1);
    expect(obstacles[0].x).toBe(400);
  });
});
