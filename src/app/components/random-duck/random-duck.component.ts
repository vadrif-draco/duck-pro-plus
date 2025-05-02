import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { RouterLink, ActivatedRoute, ParamMap } from "@angular/router";
import { Subscription, Observable } from "rxjs";
import { switchMap } from "rxjs/operators";
import { ApiService } from "../../services/api.service";
import { trigger, state, style, animate, transition } from "@angular/animations";

@Component({
  selector: "app-random-duck",
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink],
  template: `
    <div class="random-duck-container">
      <h2>{{ duckId ? "Specific Duck #" + duckId : "Random Duck Generator" }}</h2>

      <div class="duck-quote-container" *ngIf="!loading; else loadingTemplate" [@fadeInOut]="'visible'">
        <div class="duck-image-container" #duckContainer>
          <img
            *ngIf="duckImageUrl"
            [src]="duckImageUrl"
            alt="{{ duckId ? 'Duck #' + duckId : 'Random Duck' }}"
            class="duck-image"
            (load)="onImageLoad()"
          />
          <div class="quote-bubble" *ngIf="quoteText" [ngStyle]="quoteBubbleStyle" [class.loading]="quoteLoading">
            <p>"{{ quoteText }}"</p>
            <small>- {{ quoteAuthor }}</small>
          </div>
        </div>

        <div *ngIf="!duckId && duckImageUrl" class="share-container">
          <p>
            <a [routerLink]="['/random-duck', extractDuckId()]">🔗 Permalink to this duck</a>
          </p>
        </div>
      </div>

      <ng-template #loadingTemplate>
        <div class="loading-container" [@fadeInOut]="'visible'">
          <p>Looking for a duck...</p>
          <div class="loading-spinner"></div>
        </div>
      </ng-template>

      <button *ngIf="!duckId" class="fetch-button" (click)="fetchRandomDuckWithQuote()" [disabled]="loading">
        {{ loading ? "Fetching Duck..." : "Get Random Duck" }}
      </button>

      <button *ngIf="duckId" class="fetch-button" routerLink="/random-duck" [disabled]="loading">Get a Random Duck Instead</button>
    </div>
  `,
  styles: [
    `
      .random-duck-container {
        padding: 20px;
        background-color: #f9f9f9;
        border-radius: 8px;
        text-align: center;
        margin-bottom: 30px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .duck-image-container {
        position: relative;
        display: inline-block;
        margin: 20px 0;
      }

      .duck-image {
        max-width: 100%;
        height: auto;
        max-height: 400px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }

      .quote-bubble {
        position: absolute;
        top: 40px;
        right: -999px;
        left: 0px;
        background-color: white;
        padding: 15px;
        border-radius: 20px;
        border: 2px solid #ddd;
        max-width: 250px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        z-index: 10;
        transition: left 0.3s ease, opacity 0.3s ease;
        opacity: 1;
      }

      .quote-bubble.loading {
        opacity: 0;
      }

      .quote-bubble::before {
        content: "";
        position: absolute;
        left: -20px;
        top: 30px;
        border-width: 10px;
        border-style: solid;
        border-color: transparent white transparent transparent;
      }

      .share-container {
        margin-top: 15px;
      }

      .share-container a {
        color: #2196f3;
        text-decoration: none;
        font-weight: bold;
        transition: color 0.2s;
      }

      .share-container a:hover {
        color: #0d47a1;
        text-decoration: underline;
      }

      .fetch-button {
        padding: 10px 20px;
        background: linear-gradient(to right, #ff9966, #ff5e62);
        color: white;
        border: none;
        border-radius: 25px;
        font-size: 16px;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-top: 20px;
      }

      .fetch-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }

      .fetch-button:disabled {
        background: #cccccc;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
      }

      .loading-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 300px;
      }

      .loading-spinner {
        border: 5px solid #f3f3f3;
        border-top: 5px solid #ff5e62;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        animation: spin 1s linear infinite;
        margin-top: 20px;
      }

      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `,
  ],

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

        console.log("Container width:", containerWidth, "Setting quote bubble right position:", this.quoteBubbleStyle.right);

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
