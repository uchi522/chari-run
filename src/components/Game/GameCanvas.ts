import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  GROUND_Y,
  BIKE_X,
  WHEEL_RADIUS,
  WHEEL_GAP,
} from "@/constants/game";

export function drawSky(ctx: CanvasRenderingContext2D) {
  const gradient = ctx.createLinearGradient(0, 0, 0, GROUND_Y);
  gradient.addColorStop(0, "#87CEEB");
  gradient.addColorStop(1, "#C8E6FF");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, CANVAS_WIDTH, GROUND_Y);
}

export function drawGround(ctx: CanvasRenderingContext2D, offset: number) {
  ctx.fillStyle = "#8B6914";
  ctx.fillRect(0, GROUND_Y, CANVAS_WIDTH, CANVAS_HEIGHT - GROUND_Y);

  ctx.strokeStyle = "#6B4F12";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, GROUND_Y);
  ctx.lineTo(CANVAS_WIDTH, GROUND_Y);
  ctx.stroke();

  ctx.strokeStyle = "#A0791A";
  ctx.lineWidth = 1;
  const dashSpacing = 40;
  const dashWidth = 20;
  const dashY = GROUND_Y + 15;

  for (let x = -dashSpacing; x < CANVAS_WIDTH + dashSpacing; x += dashSpacing) {
    const dx = ((x - offset) % dashSpacing + dashSpacing) % dashSpacing;
    ctx.beginPath();
    ctx.moveTo(dx, dashY);
    ctx.lineTo(dx + dashWidth, dashY);
    ctx.stroke();
  }
}

export function drawClouds(ctx: CanvasRenderingContext2D, offset: number) {
  ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
  const clouds = [
    { x: 100, y: 60, r: 30 },
    { x: 350, y: 90, r: 25 },
    { x: 600, y: 50, r: 35 },
  ];
  for (const cloud of clouds) {
    const cx =
      ((cloud.x - offset * 0.3) % (CANVAS_WIDTH + 100) + CANVAS_WIDTH + 100) %
        (CANVAS_WIDTH + 100) -
      50;
    ctx.beginPath();
    ctx.arc(cx, cloud.y, cloud.r, 0, Math.PI * 2);
    ctx.arc(cx + cloud.r, cloud.y - 10, cloud.r * 0.7, 0, Math.PI * 2);
    ctx.arc(cx - cloud.r * 0.8, cloud.y - 5, cloud.r * 0.6, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawWheel(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  angle: number
) {
  ctx.strokeStyle = "#333";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(cx, cy, WHEEL_RADIUS, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = "#666";
  ctx.beginPath();
  ctx.arc(cx, cy, 3, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#999";
  ctx.lineWidth = 1;
  for (let i = 0; i < 6; i++) {
    const a = angle + (Math.PI * 2 * i) / 6;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(
      cx + Math.cos(a) * (WHEEL_RADIUS - 2),
      cy + Math.sin(a) * (WHEEL_RADIUS - 2)
    );
    ctx.stroke();
  }
}

export function drawBike(ctx: CanvasRenderingContext2D, angle: number, bikeY: number) {
  const rearWheelX = BIKE_X;
  const frontWheelX = BIKE_X + WHEEL_GAP;
  const wheelY = bikeY - WHEEL_RADIUS;

  drawWheel(ctx, rearWheelX, wheelY, angle);
  drawWheel(ctx, frontWheelX, wheelY, angle);

  const seatX = rearWheelX + 10;
  const seatY = wheelY - 30;
  const handleX = frontWheelX - 5;
  const handleY = wheelY - 28;
  const bottomBracketX = rearWheelX + 22;
  const bottomBracketY = wheelY - 3;

  ctx.strokeStyle = "#E63946";
  ctx.lineWidth = 3;

  ctx.beginPath();
  ctx.moveTo(seatX, seatY);
  ctx.lineTo(bottomBracketX, bottomBracketY);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(seatX, seatY);
  ctx.lineTo(handleX, handleY);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(handleX, handleY);
  ctx.lineTo(bottomBracketX, bottomBracketY);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(bottomBracketX, bottomBracketY);
  ctx.lineTo(rearWheelX, wheelY);
  ctx.stroke();

  ctx.strokeStyle = "#C1303A";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(seatX, seatY);
  ctx.lineTo(rearWheelX, wheelY);
  ctx.stroke();

  ctx.strokeStyle = "#E63946";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(handleX, handleY);
  ctx.lineTo(frontWheelX, wheelY);
  ctx.stroke();

  ctx.fillStyle = "#333";
  ctx.beginPath();
  ctx.ellipse(seatX, seatY - 3, 10, 4, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#333";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(handleX - 5, handleY - 8);
  ctx.lineTo(handleX + 5, handleY - 3);
  ctx.stroke();

  // Rider
  const riderHipX = seatX;
  const riderHipY = seatY - 5;
  const riderShoulderX = riderHipX + 12;
  const riderShoulderY = riderHipY - 22;
  const riderHeadY = riderShoulderY - 12;

  ctx.strokeStyle = "#2B2D42";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(riderHipX, riderHipY);
  ctx.lineTo(riderShoulderX, riderShoulderY);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(riderShoulderX, riderShoulderY);
  ctx.lineTo(handleX, handleY - 5);
  ctx.stroke();

  const pedalAngle = angle;
  const pedalX = bottomBracketX + Math.cos(pedalAngle) * 10;
  const pedalY = bottomBracketY + Math.sin(pedalAngle) * 10;
  const kneeX = (riderHipX + pedalX) / 2 - 5;
  const kneeY = (riderHipY + pedalY) / 2 - 8;

  ctx.beginPath();
  ctx.moveTo(riderHipX, riderHipY);
  ctx.lineTo(kneeX, kneeY);
  ctx.lineTo(pedalX, pedalY);
  ctx.stroke();

  ctx.fillStyle = "#F4C2A1";
  ctx.beginPath();
  ctx.arc(riderShoulderX + 2, riderHeadY, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#2B2D42";
  ctx.lineWidth = 1;
  ctx.stroke();
}

export function drawObstacle(ctx: CanvasRenderingContext2D, obstacle: { x: number; y: number; width: number; height: number }) {
  ctx.save();
  ctx.fillStyle = "#666";
  ctx.strokeStyle = "#333";
  ctx.lineWidth = 2;

  // 楕円形の石を描画
  ctx.beginPath();
  ctx.ellipse(
    obstacle.x + obstacle.width / 2,
    obstacle.y + obstacle.height / 2,
    obstacle.width / 2,
    obstacle.height / 2,
    0,
    0,
    Math.PI * 2
  );
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}
