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

### Generic Types

- let us create generic interfaces

```ts
function identity<T>(arg: T): T {
  return arg;
}

let myIdentity: <T>(arg: T) => T = identity;
```

---

### Let us apply typesafe implementation of Array prototype functions

- Array.prototype.map() : The map() method creates a new array populated with the results of calling a provided function on every element in the calling array.
- Let us see how do we implement our own implementation of map() function

```js
const array1 = [1, 4, 9, 16];

// pass a function to map
const map1 = array1.map((x) => x * 2);

console.log(map1);
// expected output: Array [2, 8, 18, 32]
```

> What If we want to create our own/custom implementation of map function as mymap

```js
Array.prototype.mymap = function (callback) {
  const resultArray = [];
  // this refers to the array on whichmymap is done
  for (let index = 0; index < this.length; index++) {
    resultArray.push(callback(this[index], index, this)); // The function in the argument should be called for each value in the array with 3 arguments - current element, Current element's index, Entire Array
  }
  return resultArray;
};

[1, 2, 3].mymap((ele) => ele * 2); // [2, 4, 6]

[1, 2, 3].mymap((ele, i, arr) => {
  console.log('Element: ', ele, ' Index value: ', i, ' Source Array: ', arr);
  return ele;
});
```

> If above code is confusing let me simplify for you, just by taking source list as argument itself

```ts
function mymap(list, callback) {
  const resultArray = [];
  for (let index = 0; index < list.length; index++) {
    resultArray.push(callback(list[index], index, list));
  }
  return resultArray;
}

console.log(mymap([1, 2, 3], (ele) => ele * 2)); // [2, 4, 6]
```

> Let us write its typesafe implementation for mymap function

```ts
// Here In angle-bracket<> we are telling compiler that- all the types the mymap() functions can take
function mymap<T, TResult>(
  list: T[],
  callback: (arg0: T, arg1: number, arg3: T[]) => TResult
): TResult[] {
  const resultArray: TResult[] = [];
  for (let index = 0; index < list.length; index++) {
    resultArray.push(callback(list[index], index, list));
  }
  return resultArray;
}

console.log(mymap([1, 2, 3], (ele) => ele * 2));
```

- Let us play with another Array prototype function - reduce()
- Array.prototype.reduce() : reduce() method executes a reducer function (that you provide) on each element of the array, resulting in single output value

```js
const array1 = [1, 2, 3, 4];
const reducerFn = (accumulator, currentValue) => accumulator + currentValue;
// similar to
const reducerFn2 = (accumulator, currentValue) => {
  return (accumulator = accumulator + currentValue);
};

console.log(array1.reducerFn(reducer)); //  1 + 2 + 3 + 4 => 10
```

> custom implementation of reduce function as myreduce

```ts
function myreduce(list, reducerFn, initialVal) {
  let resultArray = initialVal;
  for (let currentItem of list)
    resultArray = reducerFn(resultArray, currentItem);
  return resultArray;
}

const reducer = (accumulator, currentValue) => accumulator + currentValue;
myreduce([1, 2, 3, 4], reducer, 0);
```

> Let us write its typesafe implementation for myreduce function

```ts
function myreduce<T, TResult>(
  list: T[],
  reducerFn: (acc: TResult, curr: T) => TResult,
  initialVal: TResult
): TResult {
  let resultArray: TResult = initialVal;
  for (let currentItem of list)
    resultArray = reducerFn(resultArray, currentItem);
  return resultArray;
}

const reducer = (accumulator: number, currentValue: number) =>
  accumulator + currentValue;
console.log(myreduce([1, 2, 3, 4], reducer, 0));
```

- Have you heard about Array Utility function provided by loadash - zip()

```ts
const letters = ['a', 'b', 'c', 'd'];
const nums = [3,1,5,2];
zip(letters, nums)
    => [
        ['a', 3],
        ['b', 1],
        ['c', 5],
        ....
    ]

```

> zip impelementation

```js
function zip(list1, list2) {
  const minLength = Math.min(list1.length, list2.length);
  const result = [];
  for (let index = 0; index < minLength; index++) {
    result.push([list1[index], list2[index]]);
  }
  return result;
}

const letters = ['a', 'b', 'c', 'd'];
const nums = [3, 1, 5, 2];

console.log(zip(letters, nums));
```

> Let us write its typesafe implementation for zip function

```ts
function zip<T1, T2>(list1: T1[], list2: T2[]): [T1, T2][] {
  const length = Math.min(list1.length, list2.length);
  const result: [T1, T2][] = [];
  for (let index = 0; index < length; index++) {
    result.push([list1[index], list2[index]]);
  }
  return result;
}
```

- Wanna Practice More : Write Type Definition for all the utility functions provided by
  - Array Prototype in JS
  - Additional Utility functions provided by Lodash or Underscore.js

### Generic Classes

- generic class has a similar shape to a generic interface

```ts
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0; // ✅ zeroValue property acting as number type here
myGenericNumber.add = function (x, y) {
  return x + y;
};
```

```ts
let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = ''; // ✅ zeroValue property acting as string type here (no restricting, bcoz of Generic 🙏)
stringNumeric.add = function (x, y) {
  return x + y;
};
```

### Type Constraints/ Generic Constraints

- extends
  - class inheritance
  - Here in Typescript context this keyword is used for Generic Type

```ts
interface FormField<T extends number | string | boolean> {
  // extends keyword to denote constraint -> on Generic type variable T
  // Thus bcoz of this constraint FormField no longer work over any and all types but rather restricted to - number | string | boolean
  value?: T;
  defaultValue: T;
  isValid: boolean;
}

function getFieldValue<T extends number | string | boolean>(
  field: FormField<T>
): T {
  return field.value ?? field.defaultValue;
}
```

### Using Type Parameters in Generic Constraints

- Index Query Operator

```ts
export interface Bug {
  id: number;
  name: string;
  isClosed: boolean;
  createdAt: Date;
  12: boolean;
}

const bug: Bug = {
  id: 100,
  name: 'Server communication failure',
  isClosed: false,
  createdAt: new Date(),
  12: true,
};

type BugKeys = keyof Bug; // BugKeys <-- "attributes of the Bug type"
// BugKeys = "id" | "name" | "isClosed" | "createdAt" | 12
```

> "attributes of the Bug type" means - BugKeys Can contain data-type that are attribute/property of Bug

```ts
const key1: BugKeys = 'id';
const key2: BugKeys = 'createdAt';
const key3: BugKeys = 12;
```

Let us see another example

```ts
function getAttribute(bug: Bug, attrName: string): any {
  return bug[attrName];
}
```

Let us make getAttribute() Generic Function not tight to only Bug Object

```ts
function getAttribute<T, TKey extends keyof T>( // TKey is constraint to only specific data-types --those are--> Attr/Prop of T Obj
  bug: T,
  attrName: TKey
): T[TKey] {
  return bug[attrName];
}
```

~ ~ ~

> 📝 **_DID U NOTICE:_**: Tkeys are Values which are Acting as Data-types

~ ~ ~

Let me explain : _*"Tkeys are Values which are Acting as Data-types"*_

- wkt An Object prop/attr/keys --can be--> String / Number data types
- If T is Object, then TKeys which containts (keyof T) which will contain all the keys/attr/prop of T as data-types (In UNION FASHION)
- For example:
  ```ts
  type BugKeys = keyof Bug;
  // BugKeys <-- Is not String or Number data-type, But specifc property name like - "id" | "name" | "isClosed" | "createdAt" | 12
  // which are propertyNames/Keys of Bug Interface
  ```
- Now can I say --> Tkeys are Specifc property String/Number Values of Object 'T' which are Acting as Data-types

Another Example

```ts
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, 'a'); //  ✅
getProperty(x, 'm'); // ❌ Argument of type '"m"' is not assignable to parameter of type '"a" | "b" | "c" | "d"'.
```

Thus this feature helps us -> we’re not accidentally grabbing a property that does not exist on the obj
