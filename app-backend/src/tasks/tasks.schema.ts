import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { type User } from "src/authentication/user.schema";
import { Types } from "mongoose";

@Schema({
  timestamps: true,
})
export class Task {
  @Prop()
  id: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  status: TaskStatus;

  @Prop({ type: Types.ObjectId, ref: "User" })
  userId: Types.ObjectId;

  user: User;
}

export enum TaskStatus {
  ALL = "ALL",
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
}

export const TaskSchema = SchemaFactory.createForClass(Task);
