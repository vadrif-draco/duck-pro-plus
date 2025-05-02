import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { RouterLink, ActivatedRoute, ParamMap } from "@angular/router";
import { Subscription } from "rxjs";
import { ApiService } from "../../services/api.service";
import { trigger, state, style, animate, transition } from "@angular/animations";

@Component({
  selector: "app-random-duck",
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink],
  templateUrl: "./random-duck.component.html",
  styleUrls: ["./random-duck.component.css"],
  animations: [
    trigger("fadeInOut", [
      state(
        "visible",
        style({
          opacity: 1,
        })
      ),
      state(
        "hidden",
        style({
          opacity: 0,
        })
      ),
      transition("hidden => visible", [animate("0.5s ease-in")]),
      transition("visible => hidden", [animate("0.5s ease-out")]),
    ]),
  ],
})
export class RandomDuckComponent implements OnInit, OnDestroy {
  duckImageUrl?: string;
  quoteText?: string;
  quoteAuthor?: string;
  loading = false;
  quoteLoading = true;
  quoteBubbleStyle: any = {};
  duckId?: number;

  @ViewChild("duckContainer") duckContainer!: ElementRef;

  private subscription?: Subscription;
  private routeSubscription?: Subscription;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get("id");
      if (id) {
        this.duckId = +id;
        this.fetchDuckWithQuoteById(this.duckId);
      } else {
        this.duckId = undefined;
        this.fetchRandomDuckWithQuote();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  onImageLoad(): void {
    setTimeout(() => {
      if (this.duckContainer && this.duckContainer.nativeElement) {
        const containerWidth = this.duckContainer.nativeElement.offsetWidth;

        this.quoteBubbleStyle = {
          left: `${Math.round(containerWidth) - Math.ceil(containerWidth / 100) * 10}px`,
        };

        this.quoteLoading = false;
      }
    }, 0);
  }

  extractDuckId(): number | null {
    if (!this.duckImageUrl) return null;

    try {
      const urlParts = this.duckImageUrl.split("/");
      const fileNameWithExt = urlParts[urlParts.length - 1];
      const fileName = fileNameWithExt.split(".")[0];
      const fileExt = fileNameWithExt.split(".")[1];

      const baseId = parseInt(fileName, 10);
      return fileExt === "gif" ? baseId + 600 : baseId;
    } catch (error) {
      console.error("Error extracting duck ID from URL:", error);
      return null;
    }
  }

  fetchDuckWithQuoteById(id: number): void {
    this.loading = true;
    this.quoteLoading = true;
    this.quoteBubbleStyle = {};

    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.subscription = this.apiService.getDuckWithQuoteById(id).subscribe({
      next: (result) => {
        this.duckImageUrl = result.duckUrl;
        this.quoteText = result.quote.quote;
        this.quoteAuthor = result.quote.author;
        this.loading = false;
      },
      error: (error) => {
        console.error("Error fetching duck and quote by ID:", error);
        this.quoteText = "Quack! Something went wrong.";
        this.quoteAuthor = "Error Duck";
        this.loading = false;
      },
    });
  }

  fetchRandomDuckWithQuote(): void {
    this.loading = true;
    this.quoteLoading = true;
    this.quoteBubbleStyle = {};

    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.subscription = this.apiService.getDuckWithQuote().subscribe({
      next: (result) => {
        this.duckImageUrl = result.duckUrl;
        this.quoteText = result.quote.quote;
        this.quoteAuthor = result.quote.author;
        this.loading = false;
      },
      error: (error) => {
        console.error("Error fetching random duck and quote:", error);
        this.quoteText = "Quack! Something went wrong.";
        this.quoteAuthor = "Error Duck";
        this.loading = false;
      },
    });
  }
}
