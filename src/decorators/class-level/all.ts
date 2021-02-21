import { registerEndPoint } from './register-end-point';

@registerEndPoint('pen')
class Foo {}

@registerEndPoint('calculator')
class Bar {}

export { Foo, Bar };
