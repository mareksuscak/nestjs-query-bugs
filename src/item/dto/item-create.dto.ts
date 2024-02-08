import { Field, InputType } from '@nestjs/graphql';

@InputType('CreateItemInput')
export class CreateItemInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  parent?: string;
}
