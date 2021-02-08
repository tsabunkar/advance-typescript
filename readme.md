# :tada: Advance TypeScript :tada:

- [Introduction to Typescript](intro.md)

## Basic Types in TypeScript

- [Basic-Types](basic/basic-types.md)

## Interfaces

- [Interface](basic/interfaces.md)
  - Basics of Interface as Types
  - [Function-Types](basic/function-types.md)
  - [Indexable-Types](basic/indexable-types.md)

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
