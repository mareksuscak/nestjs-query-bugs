import { Field, InputType } from '@nestjs/graphql';

@InputType('CreateItemInput')
export class CreateItemInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  parent?: string;

  @Field({ nullable: true })
  random?: string;
}
