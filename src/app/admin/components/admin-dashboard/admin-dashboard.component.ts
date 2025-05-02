import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { trigger, transition, style, animate } from "@angular/animations";

@Component({
  selector: "app-admin-dashboard",
  template: `
    <div class="admin-dashboard" [@fadeIn]>
      <h2>Admin Dashboard</h2>

      <div class="admin-stats">
        <div class="stat-card">
          <h3>Total Ducks</h3>
          <div class="stat-value">42</div>
          <p>Different duck species in database</p>
        </div>

        <div class="stat-card">
          <h3>Duck Views</h3>
          <div class="stat-value">1,337</div>
          <p>Total page views this month</p>
        </div>

        <div class="stat-card">
          <h3>API Calls</h3>
          <div class="stat-value">8,675</div>
          <p>External API requests made</p>
        </div>
      </div>

      <div class="admin-actions">
        <h3>Quick Actions</h3>

        <div class="action-buttons">
          <button (click)="navigateToEditor()" class="primary"><i class="icon edit"></i>Edit Duck Database</button>

          <button class="secondary"><i class="icon refresh"></i>Refresh Cache</button>

          <button class="danger" (click)="logout()"><i class="icon logout"></i>Logout</button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .admin-dashboard {
        padding: 2rem;
        max-width: 1200px;
        margin: 0 auto;
      }

      h2 {
        margin-bottom: 2rem;
        color: #333;
        border-bottom: 2px solid #f0f0f0;
        padding-bottom: 0.5rem;
      }

      .admin-stats {
        display: flex;
        gap: 2rem;
        margin-bottom: 3rem;
        flex-wrap: wrap;
      }

      .stat-card {
        flex: 1;
        min-width: 200px;
        background: white;
        padding: 1.5rem;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        text-align: center;
      }

      .stat-value {
        font-size: 2.5rem;
        font-weight: bold;
        color: #4caf50;
        margin: 1rem 0;
      }

      .admin-actions {
        background: white;
        padding: 1.5rem;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      .action-buttons {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        margin-top: 1.5rem;
      }

      button {
        padding: 12px 24px;
        border: none;
        border-radius: 4px;
        font-size: 1rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        transition: all 0.2s;
      }

      button.primary {
        background: #4caf50;
        color: white;
      }

      button.secondary {
        background: #2196f3;
        color: white;
      }

      button.danger {
        background: #f44336;
        color: white;
      }

      button:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }

      .icon {
        display: inline-block;
        width: 18px;
        height: 18px;
        position: relative;
      }

      .icon.edit:before {
        content: "✏️";
      }

      .icon.refresh:before {
        content: "🔄";
      }

      .icon.logout:before {
        content: "🚪";
      }
    `,
  ],
  animations: [
    trigger("fadeIn", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(10px)" }),
        animate("0.3s ease-out", style({ opacity: 1, transform: "translateY(0)" })),
      ]),
    ]),
  ],
})
export class AdminDashboardComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem("admin_authenticated") !== "true") {
      this.router.navigate(["/admin"]);
    }
  }

  navigateToEditor(): void {
    this.router.navigate(["/admin/editor"]);
  }

  logout(): void {
    localStorage.removeItem("admin_authenticated");
    this.router.navigate(["/admin"]);
  }
}
