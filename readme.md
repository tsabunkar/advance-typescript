# :tada: Advance TypeScript :tada:

- TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. Any browser. Any host. Any OS. Open source.
- JS by nature
  - is dynamically typed language => (Object structure can evolve over the time i.e- Consider below Employee object/dto)
    ```js
        class Employee {
          public int id;
        }
        Employee emp = new Employee();
        emp.city = 'Bangalore'; // adding property at runtime (Dynamically/on-fly) <- which was not possible in java/C#
    ```
  - is loosely typed language
    ```js
    var name;
    ```
- Whereas TypeScript by nature
  - is Strongly typed language
  - think typescript as an addon to js language i.e- Initially Typescript only sole purpose was to add type information to js. Thus you can say TypeScript extends JavaScript by adding types
- Typescript uses tsc (typescript compiler) to compile down ts code -> js code
  - ts code --> tsc --> js code --> browser/v8/node
  - $ npm install typescript --save-dev
- TypeScript-compatible transpilers:
  - tools which convert TypeScript files to JavaScript files
  - example : Babel, swc, and Sucrase
- What is the importance of Typing in typescript?
  - Types provide a way to describe the shape of an object.
  - better documentation
  - allow tsc to validate your ts code
- TypeScript had now evolved more than Typing (which was its intital intention), various other features were added in typescript proj
  - Enum, Interface, Classes, Lambda, Generics (this features are slowing getting adapted in js lang itself as-per es6, es7, .. esNext)
- Beginners Note: If typescript is your first choice of language it is better to learn js first - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide
- The main benefit of TypeScript is that it can highlight unexpected behavior in your code, lowering the chance of bugs

## Basic Types in TypeScript

- But before jumping to typescript, we should know already know that js language has 7 primitive data types: string, number, bigint, boolean, undefined, symbol, and null. (All primitives are immutable, i.e., they cannot be altered)
  - Also all primitive values(except - null and undefined) have object equivalents that wrap around the primitive values i.e- String, Number, BigInt, Boolean, Symbol. We can use valueOf() method to returns the primitive value.
- Now TypeScript extends this above list with a few more types i.e-
  - any (allow anything)
  - unknown (ensure someone using this type declares what type it is)
  - never (it’s not possible that this type could happen/exist)
  - void (a function which returns undefined or has no return value)
  - For building your custom types we have 2 syntaxes: Interfaces and Types (recommended interface)
- Difference between any v/s unknown
  - any : can be assigned to any type of data and can recieve any type of data
  - unknown : it cannot be assigned to any type of data
  ```ts
  let vAny: any = 10; // We can assign anything to any
  let vUnknown: unknown = 10; // We can assign anything to unknown just like any
  // ------------------
  let s1: string = vAny; // ✅ Any is assignable to anything
  let s2: string = vUnknown; //❌ Invalid we can't assign vUnknown to any other type (without an explicit assertion)
  ```
  - If you are from C# background, any is like dynamic and unknown is like object. I like unknown as it is just more type safe.
- Boolean

```ts
let isDone: boolean = false;
```

- Number

```ts
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
```

- String

```ts
let color: string = 'blue';
color = 'red';
```

```ts
let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence: string = `Hello, my name is ${fullName}. I'll be ${
  age + 1
} years old next month.`;
```

> This is equivalent to declaring `sentence` like so:

```ts
let sentence: string =
  'Hello, my name is ' +
  fullName +
  '.\n\n' +
  "I'll be " +
  (age + 1) +
  ' years old next month.';
```

- Array

```ts
let list: number[] = [1, 2, 3];
```

> The second way uses a generic array type, `Array<elemType>`:

```ts
let list: Array<number> = [1, 2, 3];
```

- Tuple

```ts
let x: [string, number];

x = ['hello', 10]; //✅

x = [10, 'hello']; //❌
```

> Accessing an element outside the set of known indices fails with an error:

```ts
x[3] = 'world'; //❌

console.log(x[5].toString()); //❌
```

- Enum

> An enum is a way of giving more friendly names to sets of numeric values.

```c#
enum Color {
  Red,
  Green,
  Blue,
}
let c: Color = Color.Green;
```

- Any

> If we want to opt-out of type checking and let the values pass through compile-time checks. To do so, we label these with the any type.

```ts
let notSure: any = 4;
notSure = 'maybe a string instead';

notSure = false; //✅
```

```ts
let list: any[] = [1, true, 'free'];

list[1] = 100; //✅
```

- Void

> `void` is a little like the opposite of `any:` the absence of having any type at all.

```ts
function warnUser(): void {
  console.log('This is my warning message');
}
```

```ts
let unusable: void = undefined;
unusable = null; //✅ if `--strictNullChecks` is not given
```

- Null and Undefined

> In TypeScript, both `undefined` and `null` actually have their own types named `undefined` and `null` respectively. Much like `void`, they’re not extremely useful on their own:

```ts
// Not much else we can assign to these variables!
let u: undefined = undefined;
let n: null = null;

n = null; //✅

n = 'abc'; //❌
```

- Never & Object

## Interfaces

This is sometimes called “duck typing” or “structural subtyping”. In TypeScript, interfaces fill the role of naming these types, and are a powerful way of defining contracts within your code as well as contracts with code outside of your project.

```ts
function printLabel(labeledObj: { label: string }) {
  console.log(labeledObj.label);
}

let myObj = { size: 10, label: 'Size 10 Object' };
printLabel(myObj);
```

> Use of `interface` keyword

```ts
interface LabeledValue {
  label: string;
}

function printLabel(labeledObj: LabeledValue) {
  console.log(labeledObj.label);
}

let myObj = { size: 10, label: 'Size 10 Object' };
printLabel(myObj);
```

> Optional Properties

```ts
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  let newSquare = { color: 'white', area: 100 };
  if (config.clor) {
    //❌
    newSquare.color = config.clor; //❌
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare = createSquare({ color: 'black' });
```

> ReadOnly Properties

```ts
interface Point {
  readonly x: number;
  readonly y: number;
}
```

```ts
let p1: Point = { x: 10, y: 20 };

p1.x = 5; //❌
```

> TypeScript comes with a `ReadonlyArray<T>` type that is the same as `Array<T>` with all mutating methods removed.

```ts
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;

ro[0] = 12; //❌

ro.push(5); //❌

ro.length = 100; //❌

a = ro; //❌
```

> On the last line of the snippet you can see that even assigning the entire `ReadonlyArray` back to a normal array is illegal. You can still override it with a `type assertion`.

```ts
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;

a = ro as number[];
```

> The easiest way to remember whether to use `readonly` or `const` is to ask whether you’re using it on a variable or a property. Variables use `const` whereas properties use `readonly`.

```ts
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  return { color: config.color || 'red', area: config.width || 20 };
}

let mySquare = createSquare({ colour: 'red', width: 100 }); //❌
```

> Notice the given argument to createSquare is spelled colour instead of color. In plain JavaScript, this sort of thing fails silently.

type assertion

```ts
let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);
```

> Now, the compiler won’t give you an error.

```ts
interface SquareConfig {
  color?: string;
  width?: number;
  [propName: string]: any;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  return { color: config.color || 'red', area: config.width || 20 };
}

let mySquare = createSquare({ colour: 'red', width: 100 });
```

## Function Types

Interfaces are capable of describing the wide range of shapes that JavaScript objects can take. In addition to describing an object with properties, interfaces are also capable of describing function types.

```ts
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;

mySearch = function (src: string, sub: string): boolean {
  let result = src.search(sub);
  return result > -1;
};
```

> or

```ts
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;

mySearch = function (src, sub) {
  let result = src.search(sub);
  return result > -1;
};
```

> But not

```ts
let mySearch: SearchFunc;

mySearch = function (src, sub) {
  let result = src.search(sub);

  return 'string'; //❌
};
```

## Indexable Types

We can also describe types that we can “index into” like `a[10]`, or `ageMap["daniel"]`. TypeScript only allows two types for indexes (the keys): `string` and `number`.

```ts
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ['Bob', 'Fred'];
```

> Above, we have a `StringArray` interface that has an index signature. This index signature states that when a `StringArray` is indexed with a number, it will return a `string`.

```ts
interface States {
  [state: string]: boolean;
}

let s: States = { enabled: true, maximized: false };
```

```ts
interface NumberOrStringDictionary {
  [index: string]: number | string;

  length: number; // ✅, length is a number

  name: string; // ✅, name is a string
}
```

> However, properties of different types are acceptable if the index signature is a union of the property types.

```ts
interface ReadonlyStringArray {
  readonly [index: number]: string;
}

let myArray: ReadonlyStringArray = ['Alice', 'Bob'];
myArray[2] = 'Mallory'; //❌ It is readonly
```

## Extending Interfaces

Like classes, interfaces can extend each other. This allows you to copy the members of one interface into another, which gives you more flexibility in how you separate your interfaces into reusable components.

```ts
interface Shape {
  color: string;
}

interface Square extends Shape {
  sideLength: number;
}

let square = {} as Square;
square.color = 'blue';
square.sideLength = 10;

square.borderWidth = 5; //❌
```

> An `interface` can extend multiple interfaces, creating a combination of all of the interfaces.

```ts
interface Shape {
  color: string;
}

interface PenStroke {
  penWidth: number;
}

interface Square extends Shape, PenStroke {
  sideLength: number;
}
```

## Hybrid Types

As we mentioned earlier, interfaces can describe the rich types present in real world JavaScript. Because of JavaScript’s dynamic and flexible nature, you may occasionally encounter an object that works as a combination of some of the types described above.

One such example is an object that acts as both a function and an object.

```ts
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function getCounter(): Counter {
  let counter = function (start: number) {} as Counter;
  counter.interval = 123;
  counter.reset = function () {};
  return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
```

## Unions Types

> Occasionally, you’ll run into a library that expects a parameter to be either a `number` or a `string`.

```ts
/**
 * Takes a string and adds "padding" to the left.
 * If 'padding' is a string, then 'padding' is appended to the left side.
 * If 'padding' is a number, then that number of spaces is added to the left side.
 */
function padLeft(value: string, padding: string | number) {
  if (typeof padding === 'number') {
    return Array(padding + 1).join(' ') + value;
  }
  if (typeof padding === 'string') {
    return padding + value;
  }
  //throw new Error(`Expected string or number, got '${padding}'.`);
  //No more needed
}
```

## Union with common types

```js
interface Bird {
  fly(): void;
  layEggs(): void;
}

interface Fish {
  swim(): void;
  layEggs(): void;
}

declare function getSmallPet(): Fish | Bird;

let pet = getSmallPet();

pet.layEggs(); //✅

pet.swim(); //❌
```

## Discriminating Unions

```ts
type NetworkLoadingState = {
  state: 'loading';
};

type NetworkFailedState = {
  state: 'failed';
  code: number;
};

type NetworkSuccessState = {
  state: 'success';
  response: {
    title: string;
    duration: number;
    summary: string;
  };
};

// Create a type which represents only one of the above types
// but you aren't sure which it is yet.
type NetworkState =
  | NetworkLoadingState
  | NetworkFailedState
  | NetworkSuccessState;
```

> You can achieve this

```ts
function networkStatus(state: NetworkState): string {
  state.code; //❌ unsafe to use at this point

  switch (state.state) {
    case 'loading':
      return 'Downloading...';
    case 'failed':
      return `Error ${state.code} downloading`; //✅
    case 'success':
      return `Downloaded ${state.response.title} - ${state.response.summary}`;
  }
}
```

## Intersection Types

```ts
interface ErrorHandling {
  success: boolean;
  error?: { message: string };
}

interface ArtworksData {
  artworks: { title: string }[];
}

interface ArtistsData {
  artists: { name: string }[];
}

// These interfaces are composed to have
// consistent error handling, and their own data.

type ArtworksResponse = ArtworksData & ErrorHandling;
type ArtistsResponse = ArtistsData & ErrorHandling;

const handleArtistsResponse = (response: ArtistsResponse) => {
  if (response.error) {
    console.error(response.error.message);
    return;
  }

  console.log(response.artists);
};
```

## Literal Types

A literal is a more concrete sub-type of a collective type.

## String Literal Types

> In practice string literal types combine nicely with union types, type guards, and type aliases. You can use these features together to get enum-like behavior with strings.

```ts
type Easing = 'ease-in' | 'ease-out' | 'ease-in-out';

class UIElement {
  animate(dx: number, dy: number, easing: Easing) {
    if (easing === 'ease-in') {
      // ...
    } else if (easing === 'ease-out') {
    } else if (easing === 'ease-in-out') {
    } else {
      // It's possible that someone could reach this
      // by ignoring your types though.
    }
  }
}

let button = new UIElement();
button.animate(0, 0, 'ease-in');
button.animate(0, 0, 'uneasy'); //❌
```

> creating function overloads

```ts
function createElement(tagName: 'img'): HTMLImageElement;
function createElement(tagName: 'input'): HTMLInputElement;
// ... more overloads ...
function createElement(tagName: string): Element {
  // ... code goes here ...
}
```

## Numeric Literal Types

```js
interface MapConfig {
  lng: number;
  lat: number;
  tileSize: 8 | 16 | 32;
}

setupMap({ lng: -73.935242, lat: 40.73061, tileSize: 16 });
```

## Functions

```ts
function add(x: number, y: number): number {
  return x + y;
}

let myAdd = function (x: number, y: number): number {
  return x + y;
};
```

> then why this

```ts
let myAdd: (baseValue: number, increment: number) => number = function (
  x: number,
  y: number
): number {
  return x + y;
};
```

> And this is valid too

```ts
function buildName(firstName: string, lastName?: string) {
  if (lastName) return firstName + ' ' + lastName;
  else return firstName;
}
```

> Default Parameters

```ts
function buildName(firstName: string, lastName = 'Smith') {
  // ...
}
```

> Types with Arrow Functions

```js
let printName = (firstName: string, lastName?: string): string => {
  if (lastName) return firstName + ' ' + lastName;
  else return firstName;
};

console.log(printName('Ekaspeet', 'Singh'));
```

> Similarly

```ts
let printName: (x: string, y: string) => string = (firstName, lastName) => {
  if (lastName) return firstName + ' ' + lastName;
  else return firstName;
};

console.log(printName('Ekaspeet', 'Singh'));
```

## Rest Parameters

```ts
function buildName(firstName: string, ...restOfName: string[]) {
  return firstName + ' ' + restOfName.join(' ');
}

// employeeName will be "Joseph Samuel Lucas MacKinzie"
let employeeName = buildName('Joseph', 'Samuel', 'Lucas', 'MacKinzie');
```

## Classes

Traditional JavaScript uses functions and prototype-based inheritance to build up reusable components.

```ts
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return 'Hello, ' + this.greeting;
  }
}

let greeter = new Greeter('world');
```

## Inheritance

```ts
class Animal {
  move(distanceInMeters: number = 0) {
    console.log(`Animal moved ${distanceInMeters}m.`);
  }
}

class Dog extends Animal {
  bark() {
    console.log('Woof! Woof!');
  }
}

const dog = new Dog();
dog.bark();
dog.move(10);
dog.bark();
```

> Complex Problem:

```ts
class Animal {
  name: string;
  constructor(theName: string) {
    this.name = theName;
  }
  move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

class Snake extends Animal {
  constructor(name: string) {
    super(name);
  }
  move(distanceInMeters = 5) {
    console.log('Slithering...');
    super.move(distanceInMeters);
  }
}

class Horse extends Animal {
  constructor(name: string) {
    super(name);
  }
  move(distanceInMeters = 45) {
    console.log('Galloping...');
    super.move(distanceInMeters);
  }
}

let sam = new Snake('Sammy the Python');
let tom: Animal = new Horse('Tommy the Palomino');

sam.move();
tom.move(34);
```

> Takeaway: One difference from the prior example is that each derived class that contains a `constructor` function must call `super()` which will execute the `constructor` of the base class. What’s more, before we ever access a property on this in a `constructor` body, we have to call `super()`. This is an important rule that TypeScript will enforce.

## Public(default), private, and protected modifiers

```ts
class Animal {
  public name: string;
  public constructor(theName: string) {
    this.name = theName;
  }
  public move(distanceInMeters: number) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}
```

## ECMAScript Private Fields

> With TypeScript 3.8, TypeScript supports the new JavaScript syntax for private fields:

```ts
class Animal {
  #name: string;
  constructor(theName: string) {
    this.#name = theName;
  }
}

new Animal('Cat').#name; //❌
```

## Private & Protected Modifiers

## Readonly Modifier

```ts
class Octopus {
  readonly name: string;
  readonly numberOfLegs: number = 8;
  constructor(theName: string) {
    this.name = theName;
  }
}
let dad = new Octopus('Man with the 8 strong legs');
dad.name = 'Man with the 3-piece suit'; //❌
```

## Using a class as an interface

> A class declaration creates two things: a type representing instances of the class and a constructor function. Because classes create types, you can use them in the same places you would be able to use interfaces.

```ts
class Point {
  x: number;
  y: number;
}

interface Point3d extends Point {
  z: number;
}

let point3d: Point3d = { x: 1, y: 2, z: 3 };
```

## Generics

For any major language, one of the main tools in the toolbox for creating reusable components is generics.

```js
function identity(arg: number): number {
  return arg;
}
```

> But not sure of the types given to identity function. You can any. But that is just not a solution. It actually avoids type-checking.

```ts
function identity(arg: any): any {
  return arg;
}
```

> Let's check this out

```ts
function identity<T>(arg: T): T {
  return arg;
}
```

```ts
let output = identity<string>('myString'); //✅
```

> And this valid too

```ts
let output = identity('myString');
```

## Export

```ts
export interface StringValidator {
  x: number;
  y: number;
}
```

```ts
export interface StringValidator {
  isAcceptable(s: string): boolean;
}
```

## tsconfig.json

```bash
tsc --init
```

> tsconfig.json gets created in your project

## Let's Explore some Compiler Options:

> In some cases where no type annotations are present, TypeScript will fall back to a type of any for a variable when it cannot infer the type. Turning on `noImplicitAny` however TypeScript will issue an error whenever it would have inferred `any`:

```ts
noImplicitAny;
```

```ts
function fn(s) {
  //❌
  // No error?
  console.log(s.subtr(3));
}
fn(42);
```

> When `strictPropertyInitialization` set to true, TypeScript will raise an error when a `class` property was declared but not set in the `constructor`.

```ts
strictPropertyInitialization;
```

```ts
class UserAccount {
  name: string;
  accountType = 'user';

  email: string; //❌
  address: string | undefined;

  constructor(name: string) {
    this.name = name;
    // Note that this.email is not set
  }
}
```

## Install

- [NPM Global Install](https://www.npmts.com/package/typescript)
- VS Code TSServer -> Settings -> typescript.validate.enable -> Add to settings JSON / Enable-Disable

## Resources

- [VS Code typeScript Tutorial](https://code.visualstudio.com/docs/typescript/typescript-tutorial)
- [VS Code TypeScript Language features](https://code.visualstudio.com/docs/languages/typescript)
- [TSConf 2019 Keynote](https://www.youtube.com/watch?v=jmPZztKIFf4)
- [tsconfig detailed](https://www.typescriptlang.org/tsconfig)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [Cheatsheet](https://devhints.io/typescript)
- [Code Copy Chrome Extension](https://chrome.google.com/webstore/detail/codecopy/fkbfebkcoelajmhanocgppanfoojcdmg/related)
