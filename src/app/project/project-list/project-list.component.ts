import {
  Component,
  OnInit,
  OnDestroy,
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
import { ProjectService } from "src/app/services/project.service";
import * as _ from "lodash";
import { filter, switchMap, map, take } from "rxjs/operators";
import { Project } from "src/app/domain";
import { Subscribable, Subscription } from "rxjs";
@Component({
  selector: "app-project-list",
  templateUrl: "./project-list.component.html",
  styleUrls: ["./project-list.component.scss"],
  animations: [slideToRight, listAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit, OnDestroy {
  @HostBinding("@routeAnim") state;
  projects;
  sub: Subscription;
  constructor(
    private dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private service$: ProjectService
  ) {}

  ngOnInit() {
    this.sub = this.service$.get("1").subscribe(projects => {
      this.projects = projects;
      this.cd.markForCheck();
    });
  }
  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
  openNewProjectDialog() {
    const selectedImg = `/assets/img/covers/${Math.floor(
      Math.random() * 40
    )}_tn.jpg`;
    const dialogRef = this.dialog.open(NewProjectComponent, {
      data: {
        title: "新增项目:",
        thumbnails: this.getThumbnails(),
        img: selectedImg
      }
    });
    dialogRef
      .afterClosed()
      .pipe(
        take(1),
        filter(n => n),
        switchMap(v => this.service$.add(v)),
        map(val => ({ ...val, coverImg: this.buildImgSrc(val.coverImg) }))
      )
      .subscribe(project => {
        this.projects = [...this.projects, project];
        this.cd.markForCheck();
      });
  }
  launchInviteDialog() {
    const dialogRef = this.dialog.open(InviteComponent);
  }
  launchEditDialog(project: Project) {
    const dialogRef = this.dialog.open(NewProjectComponent, {
      data: {
        title: "修改项目:",
        thumbnails: this.getThumbnails(),
        project: project
      }
    });
    dialogRef
      .afterClosed()
      .pipe(
        take(1),
        filter(n => n),
        map(val => ({
          ...val,
          coverImg: this.buildImgSrc(val.coverImg),
          id: project.id
        })),
        switchMap(v => this.service$.update(v))
      )
      .subscribe(project => {
        const index = this.projects.map(p => p.id).indexOf(project.id);
        this.projects = [
          ...this.projects.slice(0, index),
          project,
          ...this.projects.slice(index + 1)
        ];
        this.cd.markForCheck();
      });
  }
  launchDeleteDialog(project) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title: "删除项目", content: "您确认删除该项目吗？" }
    });
    dialogRef
      .afterClosed()
      .pipe(
        take(1),
        filter(n => n),
        switchMap(_ => this.service$.del(project))
      )
      .subscribe(result => {
        this.projects = this.projects.filter(p => p.id !== result.id);
        this.cd.markForCheck();
      });
  }
  private getThumbnails() {
    return _.range(0, 40).map(i => `/assets/img/covers/${i}_tn.jpg`);
  }
  private buildImgSrc(img: string): string {
    return img.indexOf("_") > -1 ? img.split("_")[0] + ".jpg" : img;
  }
}
