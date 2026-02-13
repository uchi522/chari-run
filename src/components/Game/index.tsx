"use client";

import { useRef } from "react";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "@/constants/game";
import { useGameLoop } from "@/hooks/useGameLoop";

export default function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useGameLoop(canvasRef);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="border border-gray-700 rounded"
      />
    </div>
  );
}
