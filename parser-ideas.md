```ts
const commands = {
    get: {
        args: {
            templateNames: {
                // 1) Tuple: [string, number]
                type: ['string', 'number'],
                // 2) Tuple: [string, string]
                type: ['string', 'string'],
                // 3) Tuple: [string, string, number]
                type: ['string', 'string', 'number'],
                // 4) just a string
                type: ['string'],
                type: 'string',
				// 5) array: string[]
				type: 'string[]'
				// 6) array: number[]
				type: 'number[]'
                required: true,
                min: 1,
            },
        },
    },
};
```
