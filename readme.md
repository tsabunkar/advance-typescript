# :tada: Advance TypeScript :tada:

- [Introduction to Typescript](intro.md)

## Basic Types in TypeScript

- [Basic-Types](basic/basic-types.md)

## Interfaces

- [Interface](basic/interface/interfaces.md)
  - Basics of Interface as Types
  - [Function-Types](basic/interface/function-types.md)
  - [Indexable-Types](basic/interface/indexable-types.md)
  - [Extending Interfaces, Hybrid Types](basic/interface/more-interface.md)

## Compose Type

- Compose Type are further divided into
  - [Union-Types](basic/compose-type/union-types.md)
  - [Intersection-Types](basic/compose-type/intersection-types.md)

## Generics

- [Generic](basic/generic.md)

## Utility Types

- [Utility](advance/utility-types.md)

## Miscellaneous Topics

- [Miscellaneous](basic/other.md)

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
  // ❌
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
