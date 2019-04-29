import { environment } from "../../environments/environment";
import { tap } from "rxjs/Operators";
import { pipe } from "rxjs/index";

export const debug = (message: string) =>
  pipe(
    tap(
      next => {
        if (!environment.production) {
          console.log(message, next);
        }
      },
      err => {
        if (!environment.production) {
          console.log("ERROR>>", message, err);
        }
      },
      () => {
        if (!environment.production) {
          console.log("Completed - ");
        }
      }
    )
  );
