import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { NavigationComponent } from "./components/navigation/navigation.component";
import { environment } from "../environments/environment";
import { trigger, transition, style, animate } from "@angular/animations";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavigationComponent],
  template: `
    <header class="app-header" [@fadeSlideInOut]>
      <div class="header-content">
        <!-- <h1>{{ appTitle }}</h1> -->
        <h1 [innerHTML]="appTitle"></h1>
        <p class="app-subtitle">{{ environment.production ? "Production" : "Development" }} Environment</p>
      </div>
    </header>

    <app-navigation></app-navigation>

    <main>
      <router-outlet></router-outlet>
    </main>

    <footer [@fadeSlideInOut]>
      <p>{{ footerText }}</p>
    </footer>
  `,
  styles: [
    `
      .app-header {
        background-color: #ffeb3b;
        padding: 2rem;
        text-align: center;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .header-content {
        max-width: 800px;
        margin: 0 auto;
      }

      h1 {
        margin: 0;
        color: #333;
        font-size: 2.5rem;
      }

      .app-subtitle {
        font-style: italic;
        color: #666;
        margin-top: 0.5rem;
      }

      main {
        max-width: 1200px;
        margin: 2rem auto;
        padding: 0 1rem;
        min-height: calc(100vh - 300px);
      }

      footer {
        background-color: #f5f5f5;
        padding: 1rem;
        text-align: center;
        color: #666;
        border-top: 1px solid #eee;
      }
    `,
  ],
  animations: [
    trigger("fadeSlideInOut", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(-10px)" }),
        animate("0.5s ease-out", style({ opacity: 1, transform: "translateY(0)" })),
      ]),
      transition(":leave", [animate("0.5s ease-in", style({ opacity: 0, transform: "translateY(-10px)" }))]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  appTitle = environment.appName.replace("+", "<sup>+</sup>");
  environment = environment;
  footerText = `© ${new Date().getFullYear()} Duck Encyclopedia - All rights reserved`;

  ngOnInit() {
    console.log("App initialized with environment:", environment.production ? "Production" : "Development");
  }
}
