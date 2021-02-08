### Extending Interfaces

- Like classes, interfaces can extend each other. This allows you to copy the members of one interface into another
- which gives you more flexibility in how you separate your interfaces into reusable components.

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

---

### Hybrid Types

- Object that works as a combination of some of the types.
- Use-case: interacting with 3rd-party JavaScript, you may need to use patterns like the below to fully describe the shape of the type.

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
