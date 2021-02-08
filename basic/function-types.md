- Interfaces are also capable of describing function types.

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
