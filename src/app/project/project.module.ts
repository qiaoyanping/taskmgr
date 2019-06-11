import { NgModule } from "@angular/core";
import { ProjectListComponent } from "./project-list/project-list.component";
import { ProjectItemComponent } from "./project-item/project-item.component";
import { NewProjectComponent } from "./new-project/new-project.component";
import { InviteComponent } from "./invite/invite.component";
import { SharedModule } from "../shared/shared.module";
import { ProjectRoutingModule } from "./project-routing.module";
import { ProjectService } from "../services/project.service";
@NgModule({
  declarations: [
    ProjectListComponent,
    ProjectItemComponent,
    NewProjectComponent,
    InviteComponent
  ],
  imports: [SharedModule, ProjectRoutingModule],
  entryComponents: [InviteComponent, NewProjectComponent],
  providers: [ProjectService]
})
export class ProjectModule {}
