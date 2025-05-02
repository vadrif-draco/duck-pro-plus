import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { DuckService } from "../../services/duck.service";
import { Duck } from "../../interfaces/duck-interface";
import { DuckCardComponent } from "../duck-card/duck-card.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-duck-list",
  standalone: true,
  imports: [DuckCardComponent, CommonModule, FormsModule],
  templateUrl: "./duck-list.component.html",
  styleUrls: ["./duck-list.component.css"],
})
export class DuckListComponent implements OnInit, AfterViewInit {
  ducks: Duck[] = [];
  filteredDucks: Duck[] = [];
  favoriteDucks: Duck[] = [];
  searchTerm = "";
  @ViewChild("searchInput") searchInput!: ElementRef;

  constructor(private duckService: DuckService) {}

  ngOnInit() {
    this.ducks = this.duckService.getDucks();
    this.filteredDucks = this.ducks;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.searchInput.nativeElement.focus();
    }, 0);
  }

  getGridRow(index: number) {
    return Math.floor(index / 3) + 1;
  }

  addToFavorites(duck: Duck) {
    if (!this.favoriteDucks.some((d) => d.id === duck.id)) {
      this.favoriteDucks.push(duck);
    } else {
      this.favoriteDucks = this.favoriteDucks.filter((d) => d.id !== duck.id);
    }
  }

  filterDucks() {
    if (!this.searchTerm.trim()) {
      this.filteredDucks = this.ducks;
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredDucks = this.ducks.filter((duck) => duck.name.toLowerCase().includes(term) || duck.habitat.toLowerCase().includes(term));
    }
  }

  getFavoriteDuckNames(): string {
    return this.favoriteDucks
      .filter((duck) => !!duck && !!duck.name)
      .map((duck) => duck.name)
      .join(", ");
  }
}
