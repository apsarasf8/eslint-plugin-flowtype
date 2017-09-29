export default {
  invalid: [
    {
      code: 'type X = Array<string>',
      errors: [{message: 'Use "SimpleType[]", not "Array<SimpleType>"'}]
    },
    {
      code: 'type X = string[]',
      errors: [{message: 'Use "Array<SimpleType>", not "SimpleType[]"'}],
      options: ['verbose']
    },
    {
      code: 'type X = Array<string>',
      errors: [{message: 'Use "SimpleType[]", not "Array<SimpleType>"'}],
      options: ['shorthand']
    },
    {
      code: 'type X = Array<Date>',
      errors: [{message: 'Use "SimpleType[]", not "Array<SimpleType>"'}]
    },
    {
      code: 'type X = Array<Promise<string>>',
      errors: [{message: 'Use "SimpleType[]", not "Array<SimpleType>"'}]
    },
    {
      code: 'type X = Array<$Keys<{ foo: string }>>',
      errors: [{message: 'Use "SimpleType[]", not "Array<SimpleType>"'}]
    },
    {
      code: 'type X = Array<any>',
      errors: [{message: 'Use "SimpleType[]", not "Array<SimpleType>"'}]
    },
    {
      code: 'type X = Array<mixed>',
      errors: [{message: 'Use "SimpleType[]", not "Array<SimpleType>"'}]
    },
    {
      code: 'type X = Array<void>',
      errors: [{message: 'Use "SimpleType[]", not "Array<SimpleType>"'}]
    },
    {
      code: 'type X = Array<null>',
      errors: [{message: 'Use "SimpleType[]", not "Array<SimpleType>"'}]
    },
    {
      code: 'type X = Array<string[]>',
      errors: [{message: 'Use "SimpleType[]", not "Array<SimpleType>"'}]
    }
  ],
  misconfigured: [
    {
      errors: [
        {
          data: 'normal',
          dataPath: '[0]',
          keyword: 'enum',
          message: 'should be equal to one of the allowed values',
          params: {
            allowedValues: [
              'verbose',
              'shorthand'
            ]
          },
          parentSchema: {
            enum: [
              'verbose',
              'shorthand'
            ],
            type: 'string'
          },
          schema: [
            'verbose',
            'shorthand'
          ],
          schemaPath: '#/items/0/enum'
        }
      ],
      options: ['normal']
    }
  ],
  valid: [
    {
      code: 'type X = string[]'
    },
    {
      code: 'type X = Array<string>',
      options: ['verbose']
    },
    {
      code: 'type X = string[]',
      options: ['shorthand']
    },
    {
      code: 'type X = string[][]'
    },
    {
      code: 'type X = (?string)[]',
      options: ['verbose']
    },
    {
      code: 'type X = string[]',
      options: ['verbose'],
      settings: {
        flowtype: {
          onlyFilesWithFlowAnnotation: true
        }
      }
    }
  ]
};
