import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  HostListener,
  ChangeDetectionStrategy
} from "@angular/core";
import { itemAnim } from "../../anims/item.anim";
import { cardAnim } from "../../anims/card.ani";
@Component({
  selector: "app-task-item",
  templateUrl: "./task-item.component.html",
  styleUrls: ["./task-item.component.scss"],
  animations: [itemAnim],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskItemComponent implements OnInit {
  @Input() item;
  @Input() avatar;
  @Output() taskClick = new EventEmitter();
  widerProiority = "in";
  constructor() {}
  @HostListener("mouseenter")
  onMouseenter() {
    this.widerProiority = "out";
  }
  @HostListener("mouseleave")
  onMouseLeave() {
    this.widerProiority = "in";
  }
  ngOnInit() {
    this.avatar = this.item.owner ? this.item.owner.avatar : "unassigned";
  }
  onItemClick() {
    this.taskClick.emit();
  }
  onCheckBoxClick(ev: Event) {
    ev.stopPropagation();
  }
}
