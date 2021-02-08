- This is sometimes called “duck typing” or “structural typing”.
- In TypeScript, interfaces fill the role of naming these types, and are a powerful way of defining contracts within your code as well as contracts with code outside of your project.

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

> ReadOnly Properties : properties should only be modifiable when an object is first created

```ts
interface Point {
  readonly x: number;
  readonly y: number;
}
```

```ts
let p1: Point = { x: 10, y: 20 };

p1.x = 5; //❌ Cannot assign to 'x' because it is a read-only property.
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

~ ~ ~

> 📝 **_NOTE:_** The easiest way to remember whether to use `readonly` or `const` is to ask whether you’re using it on a variable or a property. Variables use `const` whereas properties use `readonly`.

~ ~ ~

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

### Function Types

- [Function-Types](./function-types.md)

### Indexable Types

- [Indexable-Types](./indexable-types.md)

### More About interfaces

- [Extending Interfaces, Hybrid Types](./more-interface.md)
