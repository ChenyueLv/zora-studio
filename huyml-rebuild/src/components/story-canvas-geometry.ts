export type CanvasPoint = { x: number; y: number };
export type CanvasNode = CanvasPoint & { width: number; height: number };

export function boundedPosition(
  point: CanvasPoint,
  height: number,
): CanvasPoint {
  return {
    x: Math.max(10, Math.min(750, point.x)),
    y: Math.max(10, Math.min(590 - height, point.y)),
  };
}

export function connectionPath(from: CanvasNode, to: CanvasNode, input = 0.5) {
  const direction = to.x >= from.x ? 1 : -1;
  const startX = from.x + (direction === 1 ? from.width : 0);
  const endX = to.x + (direction === 1 ? 0 : to.width);
  const startY = from.y + from.height / 2;
  const endY = to.y + to.height * input;
  const bend = Math.max(40, Math.abs(endX - startX) / 2);
  return `M${startX} ${startY} C${startX + direction * bend} ${startY} ${endX - direction * bend} ${endY} ${endX} ${endY}`;
}

export function canvasPoint(
  svg: SVGSVGElement | null,
  x: number,
  y: number,
): CanvasPoint | null {
  const matrix = svg?.getScreenCTM();
  if (!matrix) return null;
  const inverse = matrix.inverse();
  return {
    x: inverse.a * x + inverse.c * y + inverse.e,
    y: inverse.b * x + inverse.d * y + inverse.f,
  };
}
