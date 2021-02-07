- But before jumping to typescript, we should know already know that js language has 7 primitive data types: string, number, bigint, boolean, undefined, symbol, and null. (All primitives are immutable, i.e., they cannot be altered)
  - Also all primitive values(except - null and undefined) have object equivalents that wrap around the primitive values i.e- String, Number, BigInt, Boolean, Symbol. We can use valueOf() method to returns the primitive value.
  ```ts
  let s: String = 'Hello'; // ⚠️ Number, String, Boolean, Symbol and Object
  //-> types do not refer to the language primitives, So should almost never should be used as a type
  let s: string = 'Hello'; // ✅
  ```
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

---

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

- Unknown

> describe the type of variables that we do not know now while writing the application/development phase. These values may come from dynamic content (user inputs, from APIs, etc)

```ts
let notSure: unknown = 4;
notSure = 'maybe a string instead';

// OK, definitely a boolean
notSure = false;
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

~ ~ ~

> 📝 **_NOTE:_** remember that all the convenience of any comes at the cost of losing type safety. Type safety is one of the main motivations for using TypeScript and you should try to avoid using any when not necessary.

~ ~ ~

- Void

> `void` is a little like the opposite of `any:` the absence of having any type at all.

```ts
function warnUser(): void {
  console.log('This is my warning message');
}
```

> Declaring variables of type void is not useful because you can only assign null or undefined

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

- Never

> never type represents the type of values that never occur

```ts
const reportError = function () {
  throw Error('my error');
};

const loop = function () {
  while (true) {}
};
// Here, both reportError and loop type is () => never
```

- Object

> object is a type that represents the non-primitive type (i.e- not number, string, boolean, bigint, symbol, null, or undefined.)

---

### Type assertions

- It is a way you to tell the compiler “trust me, I know what I’m doing.” (i.e- As a developer/implementer I know the data-type of some entity)
- It is like - Type Cast in other languages (java)

```ts
let someValue: unknown = 'this is a string';
let strLength: number = (someValue as string).length;

// “angle-bracket” syntax:
let strLength2: number = (<string>someValue).length;
```
