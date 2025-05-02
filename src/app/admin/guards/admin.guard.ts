import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { take, map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    const isAuthenticated = localStorage.getItem("admin_authenticated") === "true";

    if (!isAuthenticated) {
      console.log("Admin access denied, redirecting to login");
      this.router.navigate(["/admin"]);
      return false;
    }

    console.log("Admin access granted");
    return true;
  }
}
