import _ from 'lodash';

const ARROW_FUNCTION_PARAMS = {
    invalid: [
        {
            code: '(foo: string) => {}',
            errors: [{message: 'There must be no space after "foo" parameter type annotation colon.'}],
            options: ['never'],
            output: '(foo:string) => {}'
        },
        {
            code: '(foo:  string) => {}',
            errors: [{message: 'There must be 1 space after "foo" parameter type annotation colon.'}],
            options: ['always'],
            output: '(foo: string) => {}'
        },
        {
            code: '(foo:(() => void)) => {}',
            errors: [{message: 'There must be a space after "foo" parameter type annotation colon.'}],
            options: ['always'],
            output: '(foo: (() => void)) => {}'
        },
        {
            code: '(foo: (() => void)) => {}',
            errors: [{message: 'There must be no space after "foo" parameter type annotation colon.'}],
            options: ['never'],
            output: '(foo:(() => void)) => {}'
        },
        {
            code: '(foo:  (() => void)) => {}',
            errors: [{message: 'There must be 1 space after "foo" parameter type annotation colon.'}],
            options: ['always'],
            output: '(foo: (() => void)) => {}'
        },
        {
            code: '({ lorem, ipsum, dolor } :   SomeType) => {}',
            errors: [{message: 'There must be 1 space after "{ lorem, ipsum, dolor }" parameter type annotation colon.'}],
            output: '({ lorem, ipsum, dolor } : SomeType) => {}'
        },
        {
            code: '(foo:{ a: string, b: number }) => {}',
            errors: [{message: 'There must be a space after "foo" parameter type annotation colon.'}],
            output: '(foo: { a: string, b: number }) => {}'
        },
        {
            code: '({ a, b } :{ a: string, b: number }) => {}',
            errors: [{message: 'There must be a space after "{ a, b }" parameter type annotation colon.'}],
            output: '({ a, b } : { a: string, b: number }) => {}'
        },
        {
            code: '([ a, b ] :string[]) => {}',
            errors: [{message: 'There must be a space after "[ a, b ]" parameter type annotation colon.'}],
            output: '([ a, b ] : string[]) => {}'
        }
    ],
    valid: [
        {
            code: '(foo) => {}'
        },
        {
            code: '(foo: string) => {}'
        },
        {
            code: '(foo: (string|number)) => {}'
        },
        {
            code: '(foo:string) => {}',
            options: ['never']
        },
        {
            code: '(foo: string) => {}',
            options: ['always']
        },
        {
            code: '(foo:(() => void)) => {}',
            options: ['never']
        },
        {
            code: '(foo: (() => void)) => {}',
            options: ['always']
        },
        {
            code: '({ lorem, ipsum, dolor }: SomeType) => {}'
        },
        {
            code: '(foo: { a: string, b: number }) => {}'
        },
        {
            code: '({ a, b }: ?{ a: string, b: number }) => {}'
        },
        {
            code: '([ a, b ]: string[]) => {}'
        }
    ]
};

const ARROW_FUNCTION_RETURN = {
    invalid: [
        {
            code: '():Object => {}',
            errors: [{message: 'There must be a space after return type colon.'}],
            options: ['always'],
            output: '(): Object => {}'
        },
        {
            code: '(): Object => {}',
            errors: [{message: 'There must be no space after return type colon.'}],
            options: ['never'],
            output: '():Object => {}'
        },
        {
            code: '():  Object => {}',
            errors: [{message: 'There must be 1 space after return type colon.'}],
            options: ['always'],
            output: '(): Object => {}'
        },
        {
            code: '():(() => void) => {}',
            errors: [{message: 'There must be a space after return type colon.'}],
            options: ['always'],
            output: '(): (() => void) => {}'
        },
        {
            code: '(): (() => void) => {}',
            errors: [{message: 'There must be no space after return type colon.'}],
            options: ['never'],
            output: '():(() => void) => {}'
        },
        {
            code: '():  (() => void) => {}',
            errors: [{message: 'There must be 1 space after return type colon.'}],
            options: ['always'],
            output: '(): (() => void) => {}'
        }
    ],
    valid: [
        {
            code: '():Object => {}',
            options: ['never']
        },
        {
            code: '(): Object => {}',
            options: ['always']
        },
        {
            code: '():(number | string) => {}',
            options: ['never']
        },
        {
            code: '(): (number | string) => {}',
            options: ['always']
        },
        {
            code: '():number|string => {}',
            options: ['never']
        },
        {
            code: '(): number|string => {}',
            options: ['always']
        },
        {
            code: '():(() => void) => {}',
            options: ['never']
        },
        {
            code: '(): (() => void) => {}',
            options: ['always']
        },
        {
            code: '():( () => void ) => {}',
            options: ['never']
        },
        {
            code: '(): ( () => void ) => {}',
            options: ['always']
        },
        {
            code: '(): { a: number, b: string } => {}'
        },
        {
            code: '() :{ a:number, b:string } => {}',
            options: ['never']
        }
    ]
};

const FUNCTION_PARAMS = {
    invalid: [
        {
            code: 'export default function (foo: string) {}',
            errors: [{message: 'There must be no space after "foo" parameter type annotation colon.'}],
            options: ['never'],
            output: 'export default function (foo:string) {}'
        },
        {
            code: 'function foo (foo: string) {}',
            errors: [{message: 'There must be no space after "foo" parameter type annotation colon.'}],
            options: ['never'],
            output: 'function foo (foo:string) {}'
        },
        {
            code: '(foo:string) => {}',
            errors: [{message: 'There must be a space after "foo" parameter type annotation colon.'}],
            options: ['always'],
            output: '(foo: string) => {}'
        },
        {
            code: 'function foo (foo:string) {}',
            errors: [{message: 'There must be a space after "foo" parameter type annotation colon.'}],
            output: 'function foo (foo: string) {}'
        },
        {
            code: 'async function foo({ lorem, ipsum, dolor }:SomeType) {}',
            errors: [{message: 'There must be a space after "{ lorem, ipsum, dolor }" parameter type annotation colon.'}],
            output: 'async function foo({ lorem, ipsum, dolor }: SomeType) {}'
        }
    ],
    valid: [
        {
            code: 'function x(foo: string) {}'
        },
        {
            code: 'class Foo { constructor(foo: string) {} }'
        },
        {
            code: 'function x(foo:string) {}',
            options: ['never']
        },
        {
            code: 'class Foo { constructor(foo:string) {} }',
            options: ['never']
        },
        {
            code: 'async function foo({ lorem, ipsum, dolor }: SomeType) {}'
        },
        {
            code: 'function x({ a, b }: { a: string, b: number }) {}'
        }
    ]
};

const FUNCTION_RETURN = {
    invalid: [
    ],
    valid: [
    ]
};

const FUNCTION_TYPE_PARAMS = {
    invalid: [
        {
            code: 'type X = (foo:number) => string',
            errors: [{message: 'There must be a space after "foo" parameter type annotation colon.'}],
            output: 'type X = (foo: number) => string'
        },
        {
            code: 'type X = (foo: number) => string',
            errors: [{message: 'There must be no space after "foo" parameter type annotation colon.'}],
            options: ['never'],
            output: 'type X = (foo:number) => string'
        },
        {
            code: 'type X = (foo:  number) => string',
            errors: [{message: 'There must be 1 space after "foo" parameter type annotation colon.'}],
            output: 'type X = (foo: number) => string'
        },
        {
            code: 'type X = (foo:?number) => string',
            errors: [{message: 'There must be a space after "foo" parameter type annotation colon.'}],
            output: 'type X = (foo: ?number) => string'
        },
        {
            code: 'type X = (foo:(number)) => string',
            errors: [{message: 'There must be a space after "foo" parameter type annotation colon.'}],
            output: 'type X = (foo: (number)) => string'
        },
        {
            code: 'type X = (foo:((number))) => string',
            errors: [{message: 'There must be a space after "foo" parameter type annotation colon.'}],
            output: 'type X = (foo: ((number))) => string'
        },
        {
            code: 'type X = (foo:  ((number))) => string',
            errors: [{message: 'There must be 1 space after "foo" parameter type annotation colon.'}],
            output: 'type X = (foo: ((number))) => string'
        },
        {
            code: 'type X = (foo: ((number))) => string',
            errors: [{message: 'There must be no space after "foo" parameter type annotation colon.'}],
            options: ['never'],
            output: 'type X = (foo:((number))) => string'
        },
        {
            code: 'type X = (foo:?(number)) => string',
            errors: [{message: 'There must be a space after "foo" parameter type annotation colon.'}],
            output: 'type X = (foo: ?(number)) => string'
        }
    ],
    valid: [
        {
            code: 'type X = (foo: number) => string;'
        },
        {
            code: 'type X = (foo : number) => string;'
        },
        {
            code: 'type X = (foo: ?number) => string;'
        },
        {
            code: 'type X = (foo? : ?number) => string;'
        },
        {
            code: 'type X = (foo: ?{ x: number }) => string;'
        },
        {
            code: 'type X = (foo:number) => string;',
            options: ['never']
        },
        {
            code: 'type X = (foo:?{ x:number }) => string;',
            options: ['never']
        },
        {
            code: 'type X = (foo: (number)) => string'
        },
        {
            code: 'type X = (foo: ((number))) => string'
        },
        {
            code: 'type X = (foo:((number))) => string',
            options: ['never']
        },
        {
            code: 'type X = ?(foo: ((number))) => string'
        },
        {
            code: 'type X = ?(foo:((number))) => string',
            options: ['never']
        }
    ]
};

const CLASS_PROPERTIES = {
    invalid: [
        {
            code: 'class X { foo:string }',
            errors: [{message: 'There must be a space after "foo" class property type annotation colon.'}],
            output: 'class X { foo: string }'
        },
        {
            code: 'class X { foo: string }',
            errors: [{message: 'There must be no space after "foo" class property type annotation colon.'}],
            options: ['never'],
            output: 'class X { foo:string }'
        },
        {
            code: 'class X { foo:?string }',
            errors: [{message: 'There must be a space after "foo" class property type annotation colon.'}],
            output: 'class X { foo: ?string }'
        },
        {
            code: 'class X { foo: ?string }',
            errors: [{message: 'There must be no space after "foo" class property type annotation colon.'}],
            options: ['never'],
            output: 'class X { foo:?string }'
        },
        {
            code: 'class X { static foo:number }',
            errors: [{message: 'There must be a space after "foo" class property type annotation colon.'}],
            output: 'class X { static foo: number }'
        },
        {
            code: 'class X { static foo: number }',
            errors: [{message: 'There must be no space after "foo" class property type annotation colon.'}],
            options: ['never'],
            output: 'class X { static foo:number }'
        },
        {
            code: 'class X { static foo :number }',
            errors: [{message: 'There must be a space after "foo" class property type annotation colon.'}],
            output: 'class X { static foo : number }'
        },
        {
            code: 'class X { static foo : number }',
            errors: [{message: 'There must be no space after "foo" class property type annotation colon.'}],
            options: ['never'],
            output: 'class X { static foo :number }'
        },
        {
            code: 'declare class X { static foo:number }',
            errors: [{message: 'There must be a space after "foo" type annotation colon.'}],
            output: 'declare class X { static foo: number }'
        },
        {
            code: 'declare class X { static foo: number }',
            errors: [{message: 'There must be no space after "foo" type annotation colon.'}],
            options: ['never'],
            output: 'declare class X { static foo:number }'
        },
        {
            code: 'declare class X { static foo :number }',
            errors: [{message: 'There must be a space after "foo" type annotation colon.'}],
            output: 'declare class X { static foo : number }'
        },
        {
            code: 'declare class X { static foo : number }',
            errors: [{message: 'There must be no space after "foo" type annotation colon.'}],
            options: ['never'],
            output: 'declare class X { static foo :number }'
        }
    ],
    valid: [
        {
            code: 'class Foo { bar }'
        },
        {
            code: 'class Foo { bar = 3 }'
        },
        {
            code: 'class Foo { bar: string }'
        },
        {
            code: 'class Foo { bar: ?string }'
        },
        {
            code: 'class Foo { bar:string }',
            options: ['never']
        },
        {
            code: 'class Foo { bar:?string }',
            options: ['never']
        },
        {
            code: 'class X { static foo : number }'
        },
        {
            code: 'class X { static foo :number }',
            options: ['never']
        },
        {
            code: 'declare class X { static foo : number }'
        },
        {
            code: 'declare class X { static foo :number }',
            options: ['never']
        }
    ]
};

const OBJECT_TYPE_PROPERTIES = {
    invalid: [
        {
            code: 'type X = { foo:string }',
            errors: [{message: 'There must be a space after "foo" type annotation colon.'}],
            output: 'type X = { foo: string }'
        },
        {
            code: 'type X = { foo:string }',
            errors: [{message: 'There must be a space after "foo" type annotation colon.'}],
            options: ['always'],
            output: 'type X = { foo: string }'
        },
        {
            code: 'type X = { foo: string }',
            errors: [{message: 'There must be no space after "foo" type annotation colon.'}],
            options: ['never'],
            output: 'type X = { foo:string }'
        },
        {
            code: 'type X = { foo:  string }',
            errors: [{message: 'There must be 1 space after "foo" type annotation colon.'}],
            output: 'type X = { foo: string }'
        },
        {
            code: 'type X = { foo?:string }',
            errors: [{message: 'There must be a space after "foo" type annotation colon.'}],
            output: 'type X = { foo?: string }'
        },
        {
            code: 'type X = { foo?: string }',
            errors: [{message: 'There must be no space after "foo" type annotation colon.'}],
            options: ['never'],
            output: 'type X = { foo?:string }'
        },
        {
            code: 'type X = { foo?:?string }',
            errors: [{message: 'There must be a space after "foo" type annotation colon.'}],
            output: 'type X = { foo?: ?string }'
        },
        {
            code: 'type X = { foo?:  ?string }',
            errors: [{message: 'There must be 1 space after "foo" type annotation colon.'}],
            output: 'type X = { foo?: ?string }'
        },
        {
            code: 'type Foo = { barType:(string | () => void) }',
            errors: [{message: 'There must be a space after "barType" type annotation colon.'}],
            output: 'type Foo = { barType: (string | () => void) }'
        },
        {
            code: 'type Foo = { barType:(((string | () => void))) }',
            errors: [{message: 'There must be a space after "barType" type annotation colon.'}],
            output: 'type Foo = { barType: (((string | () => void))) }'
        },
        {
            code: 'type Foo = { barType: (string | () => void) }',
            errors: [{message: 'There must be no space after "barType" type annotation colon.'}],
            options: ['never'],
            output: 'type Foo = { barType:(string | () => void) }'
        },
        {
            code: 'type Foo = { barType:  (string | () => void) }',
            errors: [{message: 'There must be 1 space after "barType" type annotation colon.'}],
            output: 'type Foo = { barType: (string | () => void) }'
        },
        {
            code: 'type Foo = { barType:  ((string | () => void)) }',
            errors: [{message: 'There must be 1 space after "barType" type annotation colon.'}],
            output: 'type Foo = { barType: ((string | () => void)) }'
        }
    ],
    valid: [
        {
            code: 'type X = { foo: string }'
        },
        {
            code: 'type X = { foo:string }',
            options: ['never']
        },
        {
            code: 'type X = { foo?: string }'
        },
        {
            code: 'type X = { foo?: ?string }'
        },
        {
            code: 'type X = { foo?:?string }',
            options: ['never']
        },
        {
            code: 'type Foo = { barType: (string | () => void) }'
        },
        {
            code: 'type Foo = { barType: ((string | () => void)) }'
        },
        {
            code: 'type Foo = { barType:(string | () => void) }',
            options: ['never']
        },
        {
            code: 'type Foo = { barType:((string | () => void)) }',
            options: ['never']
        }
    ]
};

const ALL = [
    ARROW_FUNCTION_PARAMS,
    ARROW_FUNCTION_RETURN,
    FUNCTION_PARAMS,
    FUNCTION_RETURN,
    FUNCTION_TYPE_PARAMS,
    CLASS_PROPERTIES,
    OBJECT_TYPE_PROPERTIES
];

export default {
    invalid: _.flatMap(ALL, (rules) => { return rules.invalid; }),
    valid: _.flatMap(ALL, (rules) => { return rules.valid; })
};
