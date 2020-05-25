import { InputType, Field } from "type-graphql";

@InputType()
export class CreateTaskInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  dueTo: Date;

  @Field({ nullable: true })
  isChecked: boolean;
}
