import { Module } from "@nestjs/common";
import { AuthenticationController } from "./authentication.controller";
import { AuthenticationService } from "./authentication.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./user.schema";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: () => {
        return {
          signOptions: { expiresIn: "1d" },
          secret: "JWT_SECRET",
        };
      },
    }),
    PassportModule.register({ defaultStrategy: "jwt" }),
    MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
