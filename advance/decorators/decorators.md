## Decorators

- In other languages like - Java its called Annotation
- In JS you can say decorators are just like --> Function Composition (i.e- Composing one function in another function)
- To simplify our life let us say decorators are basically functions
- If you want to implement custom decorators, then your decorator function should take arguments as :

  - target: object
  - propertyKey: string
  - descriptor: PropertyDescriptor

  ```js
  function aDecorator(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {}
  ```

  But If you are interested in PropertyDescriptor, It is defined as :

  ```ts
  interface PropertyDescriptor {
    configurable?: boolean;
    enumerable?: boolean;
    value?: any;
    writable?: boolean;
    get?(): any;
    set?(v: any): void;
  }
  ```
