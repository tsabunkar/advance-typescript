import { log } from './log';

class Math {
  constructor(private id: number) {}

  @log(' - done') // method level decorators
  add(x: number, y: number): number {
    return x + y;
  }

  @log(' - done')
  subtract(x: number, y: number): number {
    return x - y;
  }
}

Math.prototype['id'] = 100;

export default Math;
