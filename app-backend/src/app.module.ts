import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthenticationModule } from "./authentication/authentication.module";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { TasksModule } from "./tasks/tasks.module";

@Module({
  imports: [
    AuthenticationModule,
    MongooseModule.forRoot("mongodb://127.0.0.1:27017/to-do-app"),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
