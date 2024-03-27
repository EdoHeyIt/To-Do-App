import { NgModule } from "@angular/core";
import {
  BrowserModule,
  provideClientHydration,
} from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { CommonModule } from "@angular/common";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { LoginComponent } from "./pages/login/login.component";
import { SignupComponent } from "./pages/signup/signup.component";
import { UserPathComponent } from "./pages/user-path/user-path.component";
import { NavComponent } from "./pages/nav/nav.component";

@NgModule({
  declarations: [
    NavComponent,
    AppComponent,
    LoginComponent,
    SignupComponent,
    UserPathComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
