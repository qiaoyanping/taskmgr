import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { QuoteService } from "./quote.service";

export { QuoteService };
@NgModule()
export class ServicesModule {
  static forRoot() {
    return {
      ngModule: ServicesModule,
      providers: [QuoteService]
    };
  }
}
