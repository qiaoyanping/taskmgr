import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { take } from "rxjs/operators";
export interface DragData {
  tag: string;
  data: any;
}
@Injectable({
  providedIn: "root"
})
export class DragDropService {
  private _dragdata = new BehaviorSubject<DragData>(null);

  setDragData(data: DragData) {
    this._dragdata.next(data);
  }
  getDragData(): Observable<DragData> {
    return this._dragdata.asObservable();
  }
  clearDragData() {
    this._dragdata.next(null);
  }
}
