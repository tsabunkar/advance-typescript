- Interface can also describe types that we can “index into” like `a[10]`, or `ageMap["daniel"]`.
- TypeScript only allows two types for indexes (the keys): `string` and `number`.
- Indexable types have an index signature

```ts
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ['Bob', 'Fred'];

let myStr: string = myArray[0]; // ✅ "Bob"
let myStr2: string = myArray['1']; // ❌
```

> Above, we have a `StringArray` interface that has an index signature. This index signature states that when a `StringArray` is indexed with a number, it will return a `string`.

```ts
interface States {
  [state: string]: boolean;
}

let s: States = { enabled: true, maximized: false };
let val = s['enabled']; // ✅ true
```

> Properties of different types are acceptable if the index signature is a union of the property types.

```ts
interface NumberOrStringDictionary {
  [index: string]: number | string;

  length: number; // ✅, bcoz NumberOrStringDictionary can return number or string

  name: string; // ✅, bcoz NumberOrStringDictionary can return number or string
}

interface NumberDictionary {
  [index: string]: number;
  length: number; // ✅ length is a number
  name: string; // ❌ Property 'name' of type 'string' is not assignable to string index type 'number'.
}
```

> Readonly on properties of interface, in order to prevent assignment to their indices

```ts
interface ReadonlyStringArray {
  readonly [index: number]: string;
}

let myArray: ReadonlyStringArray = ['Alice', 'Bob'];
myArray[2] = 'Mallory'; // ❌ It is readonly
```
