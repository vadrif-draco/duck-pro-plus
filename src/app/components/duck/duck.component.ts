import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Duck } from "../../interfaces/duck-interface";
import { HighlightDirective } from "../../directives/highlight.directive";
import { TruncatePipe } from "../../pipes/truncate.pipe";
@Component({
  selector: "app-duck-card",
  imports: [CommonModule, HighlightDirective, TruncatePipe],
  template: `
    <div
      class="duck-card"
      [ngClass]="{
        endangered: duck.isEndangered,
        featured: duck.isFeatured
      }"
      (click)="toggleDetails()"
    >
      <small>Added to database: {{ duck.id > 3 ? "2025" : ("2024" | date : "shortDate") }}</small>
      <br />
      <br />
      <img [src]="duck.imageUrl" [alt]="duck.name" />
      <h2>{{ duck.name }}</h2>
      <p>Habitat: {{ duck.habitat }}</p>
      <button class="favorite-btn" (click)="favoriteClicked($event)">❤️ Favorite</button>
      <p *ngIf="!showDetails">{{ duck.fact | truncate : 30 }}</p>
      <div *ngIf="showDetails" class="details">
        <p appHighlight style="white-space: pre-line">{{ duck.fact }}</p>
      </div>
    </div>
  `,
  styles: [
    `
      small {
        color: gray;
        font-weight: 100;
      }
      .duck-card {
        border: 1px solid #ccc;
        padding: 1rem;
        margin: 1rem;
        cursor: pointer;
        min-width: 240px;
        max-width: 280px;
        transition: all 0.3s ease;
      }
      .endangered {
        border: 2px solid red;
      }
      .featured {
        background-color: #fffde7;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      img {
        width: 200px;
        height: 150px;
        object-fit: cover;
        margin: auto;
        display: block;
      }
      .favorite-btn {
        margin-top: 8px;
        padding: 8px 16px;
        background: linear-gradient(to right, #ff9966, #ff5e62);
        color: white;
        border: none;
        border-radius: 20px;
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s;
      }
      .favorite-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }
      .details {
        margin-top: 10px;
        padding-top: 10px;
        border-top: 1px dashed #ccc;
      }
    `,
  ],
})
export class DuckComponent {
  @Input() duck!: Duck;
  @Output() favorite = new EventEmitter<Duck>();
  showDetails = false;
  toggleDetails() {
    this.showDetails = !this.showDetails;
  }
  favoriteClicked(event: Event) {
    event.stopPropagation();
    this.favorite.emit(this.duck);
  }
}
