import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { type Task } from "src/tasks/tasks.schema";
import { Types } from "mongoose";

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ unique: [true, "This name is already taken"] })
  name: string;

  @Prop({ minlength: 5 })
  password: string;

  @Prop({ unique: [true, "This email is already taken"] })
  email: string;

  @Prop({ type: [{ type: Types.ObjectId }], ref: "Task" })
  tasks: Task[];
}
export const UserSchema = SchemaFactory.createForClass(User);
