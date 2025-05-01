import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
@Component({
  standalone: true,
  imports: [RouterLink],
  selector: "app-about",
  template: `
    <h2>About Ducks</h2>
    <p>Ducks are amazing birds found worldwide!</p>
    <button routerLink="/">Back to Duck List</button>
  `,
})
export class AboutComponent {}
