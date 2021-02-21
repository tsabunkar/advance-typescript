import 'reflect-metadata'; // To Avoid: Cannot find type definition file for 'reflect-metadata'.
import Math from './decorators/method-level/math';
import endPoints from './decorators/class-level/register-end-point';
import { Foo, Bar } from './decorators/class-level/all';

console.log('-----------Method Level Decorator-----------');
const math = new Math(100);
console.log(math.add(100, 200));
console.log(math.subtract(100, 200));

console.log('-----------Class Level Decorator-----------');
const foo = new Foo();
console.log(endPoints);
