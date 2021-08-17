
import { FieldMiddleware, ObjectType, Field, ID } from '@nestjs/graphql';//v8.0.2

// Implementation
export const idFieldMiddlewareBuilder = (prefix: string): FieldMiddleware => async (ctx, next) => {
  const value = await next();

  return `${prefix}:${value}`;
};

// Usage
@ObjectType()
export class Test {

  public static readonly ID_PREFIX: string = 'TEST';
  @Field(
    () => ID,
    {middleware: [idFieldMiddlewareBuilder(Test.ID_PREFIX)]}
  )
  id: string;

}

// Result -> Actual value still remains the same but resolver returns it with prefix
