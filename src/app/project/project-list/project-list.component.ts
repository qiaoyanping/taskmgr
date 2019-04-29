import {
  Component,
  OnInit,
  Input,
  HostBinding,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from "@angular/core";
import { fadeInItems, MatDialog } from "@angular/material";
import { NewProjectComponent } from "../new-project/new-project.component";
import { InviteComponent } from "../invite/invite.component";
import { ConfirmDialogComponent } from "../../shared/confirm-dialog/confirm-dialog.component";
import { slideToRight } from "src/app/anims/router.anim";
import { listAnimation } from "src/app/anims/list.anim";
@Component({
  selector: "app-project-list",
  templateUrl: "./project-list.component.html",
  styleUrls: ["./project-list.component.scss"],
  animations: [slideToRight, listAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit {
  @HostBinding("@routeAnim") state;
  projects = [
    {
      id: 1,
      name: "企业协作平台",
      desc: "这是一个企业内部项目",
      coverImg: "../../../assets/mg2.jpeg"
    },
    {
      id: 2,
      name: "企业协作平台民古2",
      desc: "这是一个企业内部项目",
      coverImg: "../../../assets/mg3.jpeg"
    }
  ];
  constructor(private dialog: MatDialog, private cd: ChangeDetectorRef) {}

  ngOnInit() {}
  openNewProjectDialog() {
    const dialogRef = this.dialog.open(NewProjectComponent, {
      data: { title: "新增项目:" }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.projects = [
        ...this.projects,
        {
          id: 3,
          name: "新民古3",
          desc: "这是一个企业内部项目",
          coverImg: "../../../assets/mg3.jpeg"
        },
        {
          id: 4,
          name: "新民古4",
          desc: "这是一个企业内部项目",
          coverImg: "../../../assets/mg3.jpeg"
        }
      ];
      this.cd.markForCheck();
    });
  }
  launchInviteDialog() {
    const dialogRef = this.dialog.open(InviteComponent);
  }
  launchEditDialog() {
    const dialogRef = this.dialog.open(NewProjectComponent, {
      data: { title: "编辑项目:" }
    });
  }
  launchDeleteDialog(project) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title: "删除项目", content: "您确认删除该项目吗？" }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.projects = this.projects.filter(p => p.id !== project.id);
      this.cd.markForCheck();
    });
  }
}
