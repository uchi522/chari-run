import { useEffect, type RefObject } from "react";
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  SCROLL_SPEED,
  WHEEL_RADIUS,
  GROUND_Y,
  JUMP_FORCE,
  GRAVITY,
  OBSTACLE_INTERVAL,
  OBSTACLE_WIDTH,
  OBSTACLE_HEIGHT,
  type Obstacle,
} from "@/constants/game";
import { drawSky, drawClouds, drawGround, drawBike, drawObstacle } from "@/components/Game/GameCanvas";

export function useGameLoop(canvasRef: RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let groundOffset = 0;
    let wheelAngle = 0;
    let bikeY = GROUND_Y;
    let velocityY = 0;
    let obstacles: Obstacle[] = [];
    let nextObstacleSpawn = OBSTACLE_INTERVAL;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.code === "Space" && bikeY >= GROUND_Y) {
        velocityY = JUMP_FORCE;
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    function gameLoop() {
      if (!ctx) return;
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      groundOffset += SCROLL_SPEED;
      wheelAngle += SCROLL_SPEED / WHEEL_RADIUS;

      // 障害物生成
      if (groundOffset >= nextObstacleSpawn) {
        obstacles.push({
          x: CANVAS_WIDTH,
          y: GROUND_Y - OBSTACLE_HEIGHT,
          width: OBSTACLE_WIDTH,
          height: OBSTACLE_HEIGHT,
        });
        nextObstacleSpawn = groundOffset + OBSTACLE_INTERVAL;
      }

      // 障害物移動
      obstacles.forEach(obs => {
        obs.x -= SCROLL_SPEED;
      });

      // 画面外の障害物削除
      obstacles = obstacles.filter(obs => obs.x + obs.width > 0);

      velocityY += GRAVITY;
      bikeY += velocityY;
      if (bikeY >= GROUND_Y) {
        bikeY = GROUND_Y;
        velocityY = 0;
      }

      drawSky(ctx);
      drawClouds(ctx, groundOffset);
      drawGround(ctx, groundOffset);

      // 障害物描画
      obstacles.forEach(obs => {
        drawObstacle(ctx, obs);
      });

      drawBike(ctx, wheelAngle, bikeY);

      animationId = requestAnimationFrame(gameLoop);
    }

    animationId = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [canvasRef]);
}
