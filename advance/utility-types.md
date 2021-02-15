Typescript provided different utilities for type transformations i.e-

### Partial<Type>

Set All properties optional

```ts
interface Bug {
  id: number;
  name: string;
  isClosed: boolean;
  createdAt: Date;
}
```

Now we want to make the all properties optional, what we general do

```ts
interface PartialBug {
  id?: number;
  name?: string;
  isClosed?: boolean;
  createdAt?: Date;
}
```

(or) If we are smart enough

```ts
type PartialBug = {
  [Key in keyof Bug]?: Bug[Key];
};
```

(or) we can make it above interface more generic

```ts
type MyPartial<T> = {
  [Key in keyof T]?: T[Key];
};
```

But Above Type is already provided by Typescript as utility

```ts
// usage: Partial<T>
function updateBug(bug: Bug, fieldsToUpdate: Partial<Bug>) {
  return { ...bug, ...fieldsToUpdate };
}
```

### Required<Type>

Used to Construct all properties of Type set to be required (opposite of Partial)

```ts
type MyRequired<T> = {
  [Key in keyof T]: T[Key];
};
```

Again No need of your implementation, as typescript already provides as - Required<T>

### Readonly<Type>

Used to Constructs all properties of Type set to readonly

```ts
type MyReadOnly<T> = {
  readonly [Key in keyof T]: T[Key];
};
```

Usage of builtin Readonly<T>

```ts
interface Todo {
  title: string;
}

const todo: Readonly<Todo> = {
  title: 'Delete inactive users',
};

todo.title = 'Hello'; // ❌ Cannot assign to 'title' because it is a read-only property.
```
