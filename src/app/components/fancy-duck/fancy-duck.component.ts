import { Component, Input, ContentChild, ElementRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Duck } from "../../interfaces/duck-interface";
@Component({
  selector: "app-fancy-duck",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fancy-container">
      <header class="fancy-header">
        <h2>{{ duck.name }}</h2>
      </header>
      <div class="content">
        <div class="projected-content">
          <ng-content></ng-content>
        </div>
        <div class="duck-details">
          <p>Habitat: {{ duck.habitat }}</p>
          <p>Endangered: {{ duck.isEndangered ? "Yes" : "No" }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .fancy-container {
        border: 2px solid gold;
        border-radius: 8px;
        overflow: hidden;
        margin: 1rem;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      .fancy-header {
        background-color: #ffeb3b;
        padding: 10px;
        text-align: center;
      }
      .content {
        padding: 15px;
        display: flex;
      }
      .projected-content {
        flex: 1;
        padding-right: 10px;
      }
      .duck-details {
        flex: 1;
        border-left: 1px solid #eee;
        padding-left: 10px;
      }
    `,
  ],
})
export class FancyDuckComponent {
  @Input() duck!: Duck;
  @ContentChild("projectedCaption") captionElement!: ElementRef;
  ngAfterContentInit() {
    if (this.captionElement) {
      alert(`Projected caption: ${this.captionElement.nativeElement.textContent}`);
    }
  }
}
