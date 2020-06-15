import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
  ManyToMany,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Tag } from "./Tag";

@Entity()
@ObjectType()
export class Task extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: BigInt;

  @Field(() => String)
  @Column()
  title: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  description: string;

  @Field(() => Date, { nullable: true })
  @Column({ nullable: true })
  dueTo: Date;

  @Field(() => Boolean)
  @Column({ default: false })
  isChecked: boolean;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => [Tag])
  @ManyToMany((type) => Tag, { eager: true })
  @JoinTable({
    name: "tasks_tags",
    joinColumns: [{ name: "taskId" }],
    inverseJoinColumns: [{ name: "tagId" }],
  })
  tags: Tag[];
}
