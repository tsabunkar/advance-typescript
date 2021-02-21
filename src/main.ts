import 'reflect-metadata'; // To Avoid: Cannot find type definition file for 'reflect-metadata'.
import Math from './decorators/method-level/math';

const math = new Math(100);
console.log(math.add(100, 200));
console.log(math.subtract(100, 200));
