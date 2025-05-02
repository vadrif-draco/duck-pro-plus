import { Component, OnInit, HostListener, ElementRef } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-walking-duck-footer",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./walking-duck-footer.component.html",
  styleUrls: ["./walking-duck-footer.component.css"],
})
export class WalkingDuckFooterComponent implements OnInit {
  duckPosition = 0;
  duckDirection = 1; // 1 for right, -1 for left
  containerWidth = 0;
  duckWidth = 50;
  animating = false;
  stepSize = 4; // pixels per step
  animationDelay = 200; // milliseconds
  isSitting = false; // Track if duck is sitting

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.updateContainerWidth();
    setTimeout(() => {
      this.startAnimation();
    }, 350);
  }

  @HostListener("window:resize")
  onResize() {
    this.updateContainerWidth();
  }

  updateContainerWidth() {
    const containerElement = this.elementRef.nativeElement.querySelector(".walking-duck-container");
    if (containerElement) {
      this.containerWidth = containerElement.offsetWidth;
    }
  }

  onDuckImageLoad(event: Event) {
    const img = event.target as HTMLImageElement;
    this.duckWidth = img.offsetWidth;
  }

  startAnimation() {
    if (this.animating) return;
    this.animating = true;
    this.animate();
  }

  animate() {
    if (!this.animating) return;

    this.duckPosition += this.duckDirection * this.stepSize;
    if (this.duckPosition > this.containerWidth - this.duckWidth) {
      this.duckDirection = -1; // Change direction to left
      this.duckPosition = this.containerWidth - this.duckWidth;
    } else if (this.duckPosition < 0) {
      this.duckDirection = 1; // Change direction to right
      this.duckPosition = 0;
    }

    setTimeout(() => this.animate(), this.animationDelay);
  }

  toggleDuckState() {
    this.isSitting = !this.isSitting;
    if (this.isSitting) {
      this.animating = false;
    } else {
      this.startAnimation();
    }
  }
}
