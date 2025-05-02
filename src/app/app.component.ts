import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { NavigationComponent } from "./components/navigation/navigation.component";
import { environment } from "../environments/environment";
import { trigger, transition, style, animate } from "@angular/animations";
import { WalkingDuckFooterComponent } from "./components/walking-duck-footer/walking-duck-footer.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavigationComponent, WalkingDuckFooterComponent],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
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
