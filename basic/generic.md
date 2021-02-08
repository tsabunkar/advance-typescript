## Generics

- For any major language (java, c#) this is one of the main tools in the toolbox for creating reusable components is generics.
- Gives ability to create a component that can work over a variety of types rather than a single one.
- It basically promotes - Reusability (i.e- Components that are capable of working on the data of today as well as the data of tomorrow )

> Consider without generics concept, we only have specific data-type for below identity() function

```ts
function identity(arg: number): number {
  return arg;
}
```

> But if we want to make it reusable to allow any data-type, we cannot just use any type from ts (as this will remove the sole purpose of using ts lang i.e- type-checking)

```ts
function identity(arg: any): any {
  return arg;
}
```

> Let's uses generics concept then 😉

```ts
function identity<T>(arg: T): T {
  return arg;
}
```

- (<>) is called angle brackets
- Here, we will use a type variable (T), which is a special kind of variable that works on types rather than values (Note : T is just variable it can be different variable as-well like - T1, U, Tkeys, etc)
- This (T) allows us to capture the type the user provides (e.g. number, string), so that we can use that information later. Here, we use T again as the return type. On inspection, we can now see the same type is used for the argument and the return type.
- Thus very useful if we are creating any reusability component i.e- utility functions, libraries, etc

```ts
let output = identity<string>('myString'); // ✅  T type variable holds string data-type
let output = identity<number>(1947); // ✅ T type variable holds number data-type
let output2 = identity('myString'); // ✅ T type variable holds undefined data-type (this is also valid 😉)
```

### Let us deep dive into our favourite Generics

```ts
function identity<T>(arg: T): T {
  return arg;
}
```

- Use-Case Scenario for above identity() function - log the length of the argument arg to the console, you will defintely implement like this-

```ts
function loggingIdentity<T>(arg: T): T {
  console.log(arg.length); // ❌ Property 'length' does not exist on type 'T'.
  return arg;
}
```

- Compiler will give us an error that we’re using the .length member of arg, this is bcoz- If someone using this function could have passed in a T as number instead, then number type does not have .length member
- If we want above function to work on arrays of T rather than T directly, then arrays has .length memeber

```ts
function loggingIdentity<T>(arg: T[]): T[] {
  console.log(arg.length); // ✅ Arrays has .length memeber
  return arg;
}
```

> or

```ts
function loggingIdentity<T>(arg: Array<T>): Array<T> {
  console.log(arg.length); // Array has a .length, so no more error
  return arg;
}
```

- How to read above loggingIdentity function i.e- loggingIdentity takes a type parameter T, and an argument arg which is an array of Ts, and returns an array of Ts.”
