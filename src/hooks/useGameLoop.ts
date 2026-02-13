import { useEffect, type RefObject } from "react";
import { CANVAS_WIDTH, CANVAS_HEIGHT, SCROLL_SPEED, WHEEL_RADIUS } from "@/constants/game";
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

    function gameLoop() {
      if (!ctx) return;
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      groundOffset += SCROLL_SPEED;
      wheelAngle += SCROLL_SPEED / WHEEL_RADIUS;

      drawSky(ctx);
      drawClouds(ctx, groundOffset);
      drawGround(ctx, groundOffset);
      drawBike(ctx, wheelAngle);

      animationId = requestAnimationFrame(gameLoop);
    }

    animationId = requestAnimationFrame(gameLoop);

    return () => cancelAnimationFrame(animationId);
  }, [canvasRef]);
}
