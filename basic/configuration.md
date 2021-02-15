### tsconfig.json

> tsconfig.json gets created in your project

```bash
tsc --init
```

### Let's Explore some Compiler Options:

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

### Enable TS in VSCode

- [NPM Global Install](https://www.npmts.com/package/typescript)
- VS Code TSServer -> Settings -> typescript.validate.enable -> Add to settings JSON / Enable-Disable
