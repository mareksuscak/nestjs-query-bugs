import { Field, InputType } from '@nestjs/graphql';

@InputType('CreateBroker')
export class CreateBrokerDto {
  @Field()
  email: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;
}
