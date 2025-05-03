import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { Duck } from "../../interfaces/duck-interface";
import { DuckService } from "../../services/duck.service";
import { trigger, transition, style, animate } from "@angular/animations";

@Component({
  selector: "app-admin-dashboard",
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.css"],
  standalone: true,
  imports: [CommonModule, RouterModule],
  animations: [trigger("fadeIn", [transition(":enter", [style({ opacity: 0 }), animate("300ms ease-in", style({ opacity: 1 }))])])],
})
export class AdminDashboardComponent implements OnInit {
  ducks: Duck[] = [];
  recentDucks: Duck[] = [];

  constructor(private duckService: DuckService, private router: Router) {}

  ngOnInit(): void {
    if (!this.isAuthenticated()) {
      this.router.navigate(["/admin/login"]);
      return;
    }

    this.loadDucks();
  }

  isAuthenticated(): boolean {
    return localStorage.getItem("admin_authenticated") === "true";
  }

  loadDucks(): void {
    // this.ducks = this.duckService.getDucks();
    this.duckService.getDucks().subscribe((ducks) => {
      this.ducks = ducks;
      if (this.ducks) {
        this.recentDucks = [...this.ducks].reverse().slice(0, 5);
      } else {
        this.recentDucks = [];
        console.log("No ducks found");
      }
    })
  }

  getEndangeredDucksCount(): number {
    return this.ducks.filter((duck) => duck.isEndangered).length;
  }

  getFeaturedDucksCount(): number {
    return this.ducks.filter((duck) => duck.isFeatured).length;
  }

  refreshData(): void {
    this.loadDucks();
  }

  logout(): void {
    localStorage.removeItem("admin_authenticated");
    this.router.navigate(["/admin/login"]);
  }
}
