- TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. Any browser. Any host. Any OS. Open source.
- JS by nature
  - is dynamically typed language => (Object structure can evolve over the time i.e- Consider below Employee object/dto)
    ```js
        class Employee {
          public int id;
        }
        Employee emp = new Employee();
        emp.city = 'Bangalore'; // adding property at runtime (Dynamically/on-fly) <- which was not possible in java/C#
    ```
  - is loosely typed language
    ```js
    var name;
    ```
- Whereas TypeScript by nature
  - is Strongly typed language
  - think typescript as an addon to js language i.e- Initially Typescript only sole purpose was to add type information to js. Thus you can say TypeScript extends JavaScript by adding types
- Typescript uses tsc (typescript compiler) to compile down ts code -> js code
  - ts code --> tsc --> js code --> browser/v8/node
    - Let us start using typescript compiler explicitly:
      - $ npm install typescript --save-dev
      - Add start script - "start": "tsc ./index.ts"
      - $ tsc <typescript-file-name.ts> (if you have installed typescript globally)
      - $ npx -p typescript tsc ./index.ts
      - $ npx -p typescript tsc ./index.ts && node index.js (and also run the js files)
- TypeScript-compatible transpilers:
  - tools which convert TypeScript files to JavaScript files
  - example : Babel, swc, and Sucrase
- What is the importance of Typing in typescript?
  - Types provide a way to describe the shape of an object.
  - better documentation
  - allow tsc to validate your ts code
- TypeScript had now evolved more than Typing (which was its intital intention), various other features were added in typescript proj
  - Enum, Interface, Classes, Lambda, Generics (this features are slowing getting adapted in js lang itself as-per es6, es7, .. esNext)
- Beginners Note: If typescript is your first choice of language it is better to learn js first - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide
- The main benefit of TypeScript is that it can highlight unexpected behavior in your code, lowering the chance of bugs
