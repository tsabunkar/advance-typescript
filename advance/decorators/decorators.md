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

- Property Descriptor:

  - 'property descriptor' is an object which describes following attributes:
    - value: The value of the property.
    - writable: Can property be changed? (true/false).
    - configurable: Can property be changed and deleted? (true/false).
    - enumerable: Can property be looped over? (true/false).
    - get: The corresponding getter method of the property. If there's no getter then it is undefined.
    - set: The corresponding setter method of the property. If there's no setter then it is undefined.
  - Example of `Object.getOwnPropertyDescriptor(object, property)` which returns a 'property descriptor'

  ```js
  const person = { name: 'Tejas' };
  let propertyDescriptor = Object.getOwnPropertyDescriptor(person, 'name');
  console.log(propertyDescriptor);
  /* {
    configurable: true // default values
    enumerable: true
    value: "Tejas"
    writable: true
    }
  */
  ```

  - Ex of getOwnPropertyDescriptor using Employee Class

  ```js
  class Employee {
    constructor(name, dept) {
      this.name = name;
      this.dept = dept;
    }
  }
  let pd = Object.getOwnPropertyDescriptor(new Employee('Tejas', 'IT'), 'name');
  console.log(pd);
  /*  {
      "value": "Tejas",
      "writable": true,
      "enumerable": true,
      "configurable": true
    } */
  ```

  - Decorators can be appiled to:
    - Property/Method Level Decorator (src/decorators/method-level)
    - Class Level Decorator (src/decorators/class-level)
