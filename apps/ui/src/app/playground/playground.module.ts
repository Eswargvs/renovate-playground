import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { PlaygroundComponent } from './playground.component';
import { NavbarComponent } from "../navbar.component";

import {
  DfAdvancedInputModule,
  DfSideNavModule,
  DfSideNavComponent,
} from "@design-factory/design-factory";

@NgModule({
  declarations: [PlaygroundComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DfAdvancedInputModule,
    DfSideNavModule,
    NavbarComponent,
    DfSideNavComponent,
    RouterModule.forChild([
      { path: "", component: PlaygroundComponent, pathMatch: "full" },
    ]),
  ],
})
export class PlaygroundModule {}
