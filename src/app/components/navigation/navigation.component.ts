import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  standalone: true,
  selector: "app-navigation",
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav>
      <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Home</a>
      <a routerLink="/about" routerLinkActive="active">About Ducks</a>
      <a routerLink="/random-duck" routerLinkActive="active">Random Duck</a>
      <a routerLink="/admin" routerLinkActive="active">Admin Area</a>
    </nav>
  `,
  styles: [
    `
      nav {
        background: #f0f0f0;
        padding: 1rem;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        gap: 15px;
      }
      a {
        text-decoration: none;
        color: #333;
        padding: 8px 16px;
        border-radius: 4px;
        transition: all 0.3s;
      }
      a:hover {
        background-color: #e0e0e0;
      }
      .active {
        background-color: #ffeb3b;
        font-weight: bold;
      }
    `,
  ],
})
export class NavigationComponent {}
