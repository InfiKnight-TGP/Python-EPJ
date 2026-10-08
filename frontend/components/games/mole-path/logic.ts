export function makePath(gridSize: number, length: number): number[] {
  const holes = Array.from({ length: gridSize * gridSize }, (_, index) => index);
  for (let index = holes.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [holes[index], holes[swap]] = [holes[swap], holes[index]];
  }
  return holes.slice(0, length);
}
