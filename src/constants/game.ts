export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 400;
export const GROUND_Y = 320;
export const SCROLL_SPEED = 3;

// Bike config
export const BIKE_X = 150;
export const WHEEL_RADIUS = 18;
export const WHEEL_GAP = 50;

// Jump physics
export const JUMP_FORCE = -12;
export const GRAVITY = 0.6;

// Obstacle config
export const OBSTACLE_INTERVAL = 300; // 300ピクセルごとに生成
export const OBSTACLE_WIDTH = 30;
export const OBSTACLE_HEIGHT = 30;

// Obstacle type
export type Obstacle = {
  x: number;
  y: number;
  width: number;
  height: number;
};
