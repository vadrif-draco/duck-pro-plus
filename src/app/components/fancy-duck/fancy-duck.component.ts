import { Component, Input, ContentChild, ElementRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Duck } from "../../interfaces/duck-interface";

@Component({
  selector: "app-fancy-duck",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./fancy-duck.component.html",
  styleUrls: ["./fancy-duck.component.css"],
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
