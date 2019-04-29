import { Injectable, Inject } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Quote } from "../domain/quote.model";
import { map } from "rxjs/operators";
import { debug } from "../utils/debug.util";
@Injectable()
export class QuoteService {
  constructor(
    @Inject("BASE_CONFIG") private config,
    private http: HttpClient
  ) {}
  getQuote(): Observable<Quote> {
    const uri = `${this.config.uri}/quotes/${Math.floor(Math.random() * 10)}`;
    return this.http.get(uri).pipe(
      debug(":quote"),
      map(res => res as Quote)
    );
  }
}
