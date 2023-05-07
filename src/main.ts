import { z } from 'zod';

const UserSchema = z.object({
  name: z.string().min(3).max(5).default('김승윤'),
  age: z.number(),
  email: z.string().email().optional(),
  create_date: z.date().optional(),
  address: z.object({
    1: z.string()
  }).optional(),
  languages: z.array(z.string()).nonempty(),
});

type User = z.infer<typeof UserSchema>;

const user: User = {
  name: '김승윤',
  age: 123,
  languages: ['a'],
}

console.debug(UserSchema.parse(user));
/*
{
  "name": "123",
  "age": 123
}
*/
console.debug(UserSchema.safeParse(user));
/**
{
  "success": true,
  "data": {
      "name": "123",
      "age": 123
  }
}

{
    "success": false,
    "error": {
        "issues": [
            {
                "code": "invalid_type",
                "expected": "number",
                "received": "string",
                "path": [
                    "age"
                ],
                "message": "Expected number, received string"
            }
        ],
        "name": "ZodError"
    }
}
 * 
 */

const PromiseSchema = z.promise(z.string());

const p = (str: unknown) => {
  return new Promise((resolve, reject) => {
    if (str === 'string') {
      resolve(str)
      return
    }
    reject()
  })
}

const result = p('');

console.debug(PromiseSchema.safeParse(result))