import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from "@angular/core";
import { MatMenuTrigger } from "@angular/material";

@Component({
  selector: "app-task-header",
  templateUrl: "./task-header.component.html",
  styleUrls: ["./task-header.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskHeaderComponent implements OnInit {
  @Input() header = "";
  @Output() newTasks = new EventEmitter();
  @Output() moveAll = new EventEmitter();
  @Output() onDelete = new EventEmitter();
  @Output() onEditList = new EventEmitter();
  // @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  constructor() {}

  ngOnInit() {}
  onNewTaskClick() {
    this.newTasks.emit();
  }
  onMoveAllClick() {
    this.moveAll.emit();
  }
  onDeleteClick() {
    this.onDelete.emit();
  }
  onEditListClick() {
    this.onEditList.emit();
  }
}
