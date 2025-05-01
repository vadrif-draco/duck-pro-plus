import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { DuckService } from "../../services/duck.service";
import { Duck } from "../../interfaces/duck-interface";
import { DuckComponent } from "../duck/duck.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
@Component({
  selector: "app-duck-list",
  imports: [DuckComponent, CommonModule, FormsModule],
  template: `
    <div class="search-container">
      <input [(ngModel)]="searchTerm" placeholder="Search ducks..." (input)="filterDucks()" #searchInput />
    </div>
    <div *ngIf="favoriteDucks.length > 0" class="favorites">
      <h3>Favorite Ducks</h3>
      <p>{{ getFavoriteDuckNames() }}</p>
    </div>
    <div class="duck-list">
      <app-duck-card
        [ngStyle]="{ 'grid-row': getGridRow(i) }"
        *ngFor="let duck of filteredDucks; index as i"
        [duck]="duck"
        (favorite)="addToFavorites($event)"
      >
      </app-duck-card>
    </div>
  `,
  styles: [
    `
      .duck-list {
        display: grid;
        flex-wrap: wrap;
        justify-content: center;
      }
      .search-container {
        text-align: center;
        margin-bottom: 20px;
      }
      input {
        padding: 8px;
        width: 300px;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
      .favorites {
        margin: 20px;
        padding: 10px;
        background-color: #f8f8f8;
        border-radius: 4px;
      }
    `,
  ],
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
