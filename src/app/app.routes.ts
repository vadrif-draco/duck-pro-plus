import { Routes } from "@angular/router";
import { DuckListComponent } from "./components/duck-list/duck-list.component";
import { AboutComponent } from "./components/about/about.component";
import { RandomDuckComponent } from "./components/random-duck/random-duck.component";

export const routes: Routes = [
  { path: "", component: DuckListComponent },
  { path: "about", component: AboutComponent },
  { path: "random-duck", component: RandomDuckComponent },
  { path: "random-duck/:id", component: RandomDuckComponent },
  {
    path: "admin",
    loadChildren: () => import("./admin/admin.module").then((m) => m.AdminModule),
  },
];
