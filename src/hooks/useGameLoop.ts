import { useEffect, type RefObject } from "react";
import { CANVAS_WIDTH, CANVAS_HEIGHT, SCROLL_SPEED, WHEEL_RADIUS, GROUND_Y, JUMP_FORCE, GRAVITY } from "@/constants/game";
import { drawSky, drawClouds, drawGround, drawBike } from "@/components/Game/GameCanvas";

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

      velocityY += GRAVITY;
      bikeY += velocityY;
      if (bikeY >= GROUND_Y) {
        bikeY = GROUND_Y;
        velocityY = 0;
      }

      drawSky(ctx);
      drawClouds(ctx, groundOffset);
      drawGround(ctx, groundOffset);
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
