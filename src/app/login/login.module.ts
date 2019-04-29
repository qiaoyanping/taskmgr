import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { SharedModule } from "../shared/shared.module";
import { LoginRoutingModule } from "./login-routing.module";
import { RegisterComponent } from "./register/register.component";
import { QuoteService } from "../services/quote.service";
@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [SharedModule, LoginRoutingModule],
  providers: [QuoteService]
})
export class LoginModule {}
