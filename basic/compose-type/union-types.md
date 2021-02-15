### Union Types

- A union type describes a value that can be one of several types
- vertical bar (|) to separate each type
- Like OR Operator but for data-types

```ts
function padLeft(value: string, padding: string | number) {
  // padding <-- either string or number
}
```

We can also have union custom types/interface

```ts
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
pet.layEggs();

pet.swim(); // ❌ bcoz Property 'swim' does not exist on type 'Bird'.
// Thus Common property of both Bird and Fish Interface (just like- Intersection)
```

Another Example for fun 😉

```ts
interface Foo {
  foo: string;
  xyz: string;
}

interface Bar {
  bar: string;
  xyz: string;
}

//Union
const sayHello = (obj: Foo | Bar): any => {
  /*
   */
};

sayHello({ foo: 'foo', xyz: 'something' });
sayHello({ bar: 'bar', xyz: 'something' });
```
