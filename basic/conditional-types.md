### Conditional Types

- Type creation based on a condition
- Conditional types are form --syntax--> SomeType extends OtherType ? TrueType : FalseType;

```ts
type IsString<T> = T extends string ? true : false;

type A = IsString<string>;
type B = IsString<number>;

let isOkay: A = true; // ✅
let isAOkay: A = false; // ❌ Type 'false' is not assignable to type 'true'
```

**Question** : Shall we implement `IsNot<T>` ?

```ts
type IsNot<T> = T extends false ? true : false;

const foo: IsNot<true> = false;
const bar: IsNot<false> = true;
```

**Question** : I know, Next we are interested to implement `Or<T>` ?

```ts
type Or<T> = T extends [true, true]
  ? true
  : T extends [true, false]
  ? true
  : T extends [false, true]
  ? true
  : T extends [false, false]
  ? false
  : never;

const bar1: Or<[true, false]> = true;
const bar2: Or<[true, true]> = true;
const bar3: Or<[false, true]> = true;
const bar4: Or<[false, false]> = false;
```

> (or)

```ts
type Or<T> = T extends [false, false] ? false : true;
```

### Builtin conditional types

- Exclude

```ts
type X = Exclude<'A' | 'B' | 1 | 2, 1 | 2>;

let xVal: X = 'A'; // ✅
let xVal2: X = 1; // ❌ Type '1' is not assignable to type '"A" | "B"'
```

But as developer, we would love to write our own custom implementation of `Exclude<T>`

```ts
type MyExclude<T, U> = T extends U ? never : T;

type Y = MyExclude<'A' | 'B' | 1 | 2, 1 | 2>;
let xVal: Y = 'A'; // ✅
let xVal2: Y = 1; // ❌
```

- Extract

```ts
type MyExtract<T, U> = T extends U ? T : never;

type Z = MyExtract<'A' | 'B' | 1 | 2, 1 | 2>;
let xVal: Z = 'A'; // ❌ Type '"A"' is not assignable to type '1 | 2'.
let xVal2: Z = 1; // ✅
```

- Omit

```ts
interface Person {
  id: number;
  name: string;
  age: number;
}

type OmitPerson = Omit<Person, 'id'>;

let person: Person = {
  id: 1,
  name: 'Tejas',
  age: 26,
};

let person2: OmitPerson = {
  id: 1, // ❌ Type '{ id: number; name: string; age: number; }' is not assignable to type 'Pick<Person, "name" | "age">'.
  name: 'Tejas',
  age: 26,
};
```

- Pick

```ts
interface Person {
  id: number;
  name: string;
  age: number;
}

type PickPerson = Pick<Person, 'name' | 'age'>;

let person2: PickPerson = {
  id: 1, // ❌ Type '{ id: number; name: string; age: number; }' is not assignable to type 'Pick<Person, "name" | "age">'.
  name: 'Tejas',
  age: 26,
};
```

### Play with Object, Functions and understand Exclude and Extract types better

```ts
interface Product {
  id: number;
  name: string;
  cost: number;
}

function safeSet(obj, attrName, value) {
  if (attrName === 'id') return;
  obj[attrName] = value;
}

let p = { id: 100, name: 'Pen', cost: 10 };

safeSet(p, 'id', 200); // ✅
safeSet(p, 'name', 200); // ⚠️ But we want static-typing to tell -> Hey you cannot pass 3rd arg as number
```

Solution: Now its acutal type-safe function 😉

```ts
function safeSet2<T, TKey extends keyof T>(obj: T, key: TKey, value: T[TKey]) {
  obj[key] = value;
}

safeSet2(p, 'name', 200); // ❌ Argument of type 'number' is not assignable to parameter of type 'string'.
```

Let us say we want to restrict 'id' property to be passed as arg in 2nd params, How would you tweak your above function to do so ?

```ts
type MyExclude<T, U> = T extends U ? never : T; // remember our friend -> MyExclude type which we implemented
// or you can use inbuilt type -> Exclude

function safeSet3<T, TKey extends MyExclude<keyof T, 'id'>>(
  obj: T,
  key: TKey,
  value: T[TKey]
) {
  obj[key] = value;
}

safeSet3(p, 'id', 200); // ❌ Argument of type '"id"' is not assignable to parameter of type '"name" | "cost"'.
```

- To thrive your thirst let us see an example on **Extract** type:

```ts
interface MyObj {
  foo: string;
  bar: number;
  1: number;
  42: number;
}

var myObj: MyObj = {
  foo: 'foo',
  bar: 123,
  1: 100,
  42: 42,
};

function setStringAttr(obj, key, value) {
  obj[key] = value;
}

setStringAttr(myObj, 'foo', 'something'); // ✅
setStringAttr(myObj, 1, 100); // ⚠️ But we desire to have static-typing to tell -> Hey you cannot pass 2nd arg as number
```

To-reiterate we need to implement fun setStringAttr() which will restrict number property for an object, How would you do that ?

```ts
type MyExtract<T, U> = T extends U ? T : never; // remember our friend -> MyExtract type which we implemented
// or you can use inbuilt type -> Extract

function setStringAttr2<T, TKey extends MyExtract<keyof T, string>>(
  obj: T,
  key: TKey,
  value: T[TKey]
) {
  obj[key] = value;
}

setStringAttr2(myObj, 'foo', 'something'); // ✅
setStringAttr2(myObj, 1, 100); // ❌ Argument of type '1' is not assignable to parameter of type '"foo" | "bar"'.
```

### infer

Use the type as a variable in the type definitions

```ts
type MyParameters<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;

const sayHelloNew = (name: string, age: number) =>
  `Hello ${name}, your age is ${age}`;

type SayHelloNewParams = MyParameters<typeof sayHelloNew>;

let x: SayHelloNewParams = ['Tejas', 26]; // let x: [name: string, age: number]
```

Another Example

```ts
type MyReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : never;

const add = (x: number, y: number): number => x + y;

type AddResult = MyReturnType<typeof add>;
```
