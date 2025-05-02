import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Duck } from "../../interfaces/duck-interface";
import { HighlightDirective } from "../../directives/highlight.directive";
import { TruncatePipe } from "../../pipes/truncate.pipe";
import { trigger, state, style, transition, animate } from "@angular/animations";

@Component({
  selector: "app-duck-card",
  standalone: true,
  imports: [CommonModule, HighlightDirective, TruncatePipe],
  templateUrl: "./duck-card.component.html",
  styleUrls: ["./duck-card.component.css"],
  animations: [
    trigger("expandCollapse", [
      state(
        "collapsed",
        style({
          height: "0",
          opacity: 0,
          overflow: "hidden",
          padding: "0",
        })
      ),
      state(
        "expanded",
        style({
          height: "*",
          opacity: 1,
          padding: "10px 0",
        })
      ),
      transition("collapsed <=> expanded", [animate("300ms ease-in-out")]),
    ]),
  ],
})
export class DuckCardComponent {
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

  showMoreInfo() {
    this.toggleDetails();
  }
}
