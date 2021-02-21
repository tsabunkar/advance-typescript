export function log(message: string) {
  return function (
    target: Object /* prototype of the class */,
    propertyKey: string /* name of the method */,
    descriptor: TypedPropertyDescriptor<any>
  ) {
    console.log(target, propertyKey, descriptor);
    const originalFn = descriptor.value;
    descriptor.value = function (...args) {
      console.log(`${propertyKey} ${message}`);
      return originalFn(...args);
    };
  };
}
