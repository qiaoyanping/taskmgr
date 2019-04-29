import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder
} from "@angular/forms";
import { QuoteService } from "src/app/services/quote.service";
import { Quote } from "@angular/compiler";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  // quote:Quote;
  quote: Quote = {
    id: "0",
    cn:
      "我突然就觉得自己像个华丽的木偶,演尽了所有的悲欢离合,可是背上总是有无数闪亮的银色丝线,操纵我哪怕一举手一投足。",
    en:
      "I suddenly feel myself like a doll,acting all kinds of joys and sorrows.There are lots of shining silvery thread on my back,controlling all my action.",
    pic: "/assets/img/quotes/0.jpg"
  };
  constructor(private fb: FormBuilder, private quoteService$: QuoteService) {
    this.quoteService$.getQuote().subscribe(q => {
      this.quote = q;
    });
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: [
        "yanping7862@163.com",
        Validators.compose([
          Validators.required,
          Validators.email,
          this.validate
        ])
      ],
      password: ["", Validators.required]
    });
  }
  onSubmit({ value, valid }, ev: Event) {
    ev.preventDefault();
    console.log(JSON.stringify(value));
    console.log(valid);
    this.form.controls["email"].setValidators(this.validate);
  }
  validate(c: FormControl): { [key: string]: any } {
    if (!c.value) {
      return null;
    }
    const pattern = /^yan+/;
    if (pattern.test(c.value)) {
      return null;
    }
    return {
      emailNotVaild: "The email must start with yan"
    };
  }
}
