import { InputType, Field } from "type-graphql";

@InputType()
export class CreateTodoInput {
  @Field()
  title: string;

  @Field()
  description: string;
  
  @Field({ nullable: true })
  isCompleted?: boolean;
}