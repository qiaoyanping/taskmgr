import { Component, OnInit, Input, forwardRef, OnDestroy } from "@angular/core";
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  FormControl,
  FormGroup,
  FormBuilder
} from "@angular/forms";
import {
  map,
  filter,
  startWith,
  debounceTime,
  distinctUntilChanged
} from "rxjs/operators";
import { combineLatest, merge, Subscription } from "rxjs";
import {
  subDays,
  subMonths,
  subYears,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  isBefore,
  parse,
  format,
  isDate,
  isValid,
  isFuture
} from "date-fns";
import { isVaildDate } from "src/app/utils/date.util";
export enum AgeUnit {
  Year = 0,
  Month,
  Day
}
export interface Age {
  age: number;
  unit: AgeUnit;
}
@Component({
  selector: "app-age-input",
  templateUrl: "./age-input.component.html",
  styleUrls: ["./age-input.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AgeInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AgeInputComponent),
      multi: true
    }
  ]
})
export class AgeInputComponent
  implements ControlValueAccessor, OnInit, OnDestroy {
  @Input() daysTop = 90;
  @Input() daysBottom = 0;
  @Input() monthsTop = 24;
  @Input() monthsBottom = 0;
  @Input() yearsTop = 150;
  @Input() yearsBottom = 0;
  @Input() format = "YYYY-MM-DD";
  @Input() debounceTime = 300;
  selectedUnit = AgeUnit.Year;
  ageUnits = [
    { value: AgeUnit.Year, label: "岁" },
    { value: AgeUnit.Month, label: "月" },
    { value: AgeUnit.Day, label: "天" }
  ];
  sub: Subscription;
  form: FormGroup;
  private propagateChange = (_: any) => {};
  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.form = this.fb.group({
      birthday: ["", this.validateDate],
      age: this.fb.group(
        {
          ageNum: [],
          ageUnit: [AgeUnit.Year]
        },
        { validator: this.validateAge("ageNum", "ageUnit") }
      )
    });
    const birthday = this.form.get("birthday");
    const ageNum = this.form.get("age").get("ageNum");
    const ageUnit = this.form.get("age").get("ageUnit");

    const birthday$ = birthday.valueChanges.pipe(
      map(d => {
        return { data: d, from: "birthday" };
      }),
      debounceTime(this.debounceTime),
      distinctUntilChanged(),
      filter(_ => birthday.valid)
    );
    const ageNum$ = ageNum.valueChanges.pipe(
      startWith(ageNum.value),
      debounceTime(this.debounceTime),
      distinctUntilChanged()
    );
    const ageUnit$ = ageUnit.valueChanges.pipe(
      startWith(ageUnit.value),
      debounceTime(this.debounceTime),
      distinctUntilChanged()
    );
    const age$ = combineLatest(ageNum$, ageUnit$, (_n, _u) => {
      return this.toDate({ age: _n, unit: _u });
    }).pipe(
      map(d => {
        return { data: d, from: "age" };
      }),
      filter(_ => this.form.get("age").valid)
    );

    const merged$ = merge(birthday$, age$).pipe(filter(_ => this.form.valid));
    this.sub = merged$.subscribe(d => {
      const age = this.toAge(d.data);
      if (d.from === "birthday") {
        if (age.age !== ageNum.value) {
          ageNum.patchValue(age.age, { emitEvent: false });
        }
        if (age.unit !== ageUnit.value) {
          this.selectedUnit = age.unit;
          ageUnit.patchValue(age.unit, { emitEvent: false });
        }
        this.propagateChange(d.data);
      } else {
        const ageToCompare = this.toAge(birthday.value);
        if (age.age !== ageToCompare.age || age.unit !== ageToCompare.unit) {
          birthday.patchValue(d.data, { emitEvent: false });
          this.propagateChange(d.data);
        }
      }
    });
  }
  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
  validate(c: FormControl): { [key: string]: any } {
    const val = c.value;
    if (!val) {
      return null;
    }
    if (isVaildDate(val)) {
      return null;
    }
    return {
      dateOfBirthInvalid: true
    };
  }
  validateDate(c: FormControl): { [key: string]: any } {
    const val = c.value;

    return isVaildDate(val)
      ? null
      : {
          birthdayInvaild: true
        };
  }
  validateAge(ageNumKey: string, ageUnitKey: string) {
    return (group: FormGroup): { [key: string]: any } => {
      const ageNum = group.controls[ageNumKey];
      const ageUnit = group.controls[ageUnitKey];
      let result = false;
      const ageNumVal = ageNum.value;
      switch (ageUnit.value) {
        case AgeUnit.Year: {
          result = ageNumVal >= this.yearsBottom && ageNumVal < this.yearsTop;
          break;
        }
        case AgeUnit.Month: {
          console.log("months");
          console.log(ageNumVal < this.monthsTop);
          result = ageNumVal >= this.monthsBottom && ageNumVal < this.monthsTop;
          break;
        }
        case AgeUnit.Day: {
          result = ageNumVal >= this.daysBottom && ageNumVal < this.daysTop;
        }
        default: {
          break;
        }
      }
      return result ? null : { ageInvalid: true };
    };
  }
  writeValue(obj: any): void {
    if (obj) {
      const date = format(obj, this.format);
      this.form.get("birthday").patchValue(date);
      const age = this.toAge(date);
      this.form
        .get("age")
        .get("ageNum")
        .patchValue(age.age);
      this.form
        .get("age")
        .get("ageUnit")
        .patchValue(age.unit);
    }
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {}

  toAge(dateStr: string): Age {
    const date = parse(dateStr);
    const now = Date.now();
    return isBefore(subDays(now, this.daysTop), date)
      ? { age: differenceInDays(now, date), unit: AgeUnit.Day }
      : isBefore(subMonths(now, this.monthsTop), date)
      ? { age: differenceInMonths(now, date), unit: AgeUnit.Month }
      : {
          age: differenceInYears(now, date),
          unit: AgeUnit.Year
        };
  }
  toDate(age: Age): string {
    const now = Date.now();

    switch (age.unit) {
      case AgeUnit.Year: {
        return format(subYears(now, age.age), this.format);
      }
      case AgeUnit.Month: {
        return format(subMonths(now, age.age), this.format);
      }
      case AgeUnit.Day: {
        return format(subDays(now, age.age), this.format);
      }
      default: {
        return null;
      }
    }
  }
}
