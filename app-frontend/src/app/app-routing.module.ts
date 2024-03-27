import { NgModule } from "@angular/core";
import { RouterModule, type Routes } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { SignupComponent } from "./pages/signup/signup.component";
import { UserPathComponent } from "./pages/user-path/user-path.component";

const routes: Routes = [
  { path: "", redirectTo: "", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "user", component: UserPathComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
