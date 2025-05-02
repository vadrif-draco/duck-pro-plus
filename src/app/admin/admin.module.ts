import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

import { AdminDashboardComponent } from "./components/admin-dashboard/admin-dashboard.component";
import { DuckEditorComponent } from "./components/duck-editor/duck-editor.component";
import { AdminLoginComponent } from "./components/admin-login/admin-login.component";
import { AdminGuard } from "./guards/admin.guard";

@NgModule({
  imports: [
    AdminDashboardComponent,
    DuckEditorComponent,
    AdminLoginComponent,
    CommonModule,
    ReactiveFormsModule,

    RouterModule.forChild([
      { path: "", component: AdminLoginComponent },
      {
        path: "dashboard",
        component: AdminDashboardComponent,
        canActivate: [AdminGuard],
      },
      {
        path: "editor",
        component: DuckEditorComponent,
        canActivate: [AdminGuard],
      },
    ]),
  ],
  providers: [AdminGuard],
})
export class AdminModule {
  constructor() {
    console.log("Admin Module loaded lazily");
  }
}
