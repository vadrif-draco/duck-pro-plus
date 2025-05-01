import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
@Component({
  standalone: true,
  selector: "app-navigation",
  imports: [RouterLink],
  template: `
    <nav>
      <a routerLink="/">Home</a>
      <a routerLink="/about">About Ducks</a>
    </nav>
  `,
  styles: [
    `
      nav {
        background: #f0f0f0;
        padding: 1rem;
      }
      a {
        margin-right: 1rem;
        text-decoration: none;
        color: #333;
      }
    `,
  ],
})
export class NavigationComponent {}
