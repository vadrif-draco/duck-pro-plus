import { Component, NgModule, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { trigger, transition, style, animate } from "@angular/animations";
import { CommonModule } from "@angular/common";

interface DuckFormData {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  imageUrl: string;
  facts: string[];
  habitat: string[];
  isEndangered: boolean;
}

@Component({
  selector: "app-duck-editor",
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="duck-editor" [@fadeIn]>
      <h2>Duck Database Editor</h2>

      <form [formGroup]="duckForm" (ngSubmit)="onSubmit()">
        <div class="form-section main-details">
          <h3>Main Details</h3>

          <div class="form-group">
            <label for="name">Duck Name:</label>
            <input type="text" id="name" formControlName="name" />
            <div *ngIf="formErrors.name" class="error-message">{{ formErrors.name }}</div>
          </div>

          <div class="form-group">
            <label for="scientificName">Scientific Name:</label>
            <input type="text" id="scientificName" formControlName="scientificName" />
            <div *ngIf="formErrors.scientificName" class="error-message">{{ formErrors.scientificName }}</div>
          </div>

          <div class="form-group">
            <label for="description">Description:</label>
            <textarea id="description" formControlName="description" rows="5"></textarea>
            <div *ngIf="formErrors.description" class="error-message">{{ formErrors.description }}</div>
          </div>

          <div class="form-group">
            <label for="imageUrl">Image URL:</label>
            <input type="url" id="imageUrl" formControlName="imageUrl" />
            <div *ngIf="formErrors.imageUrl" class="error-message">{{ formErrors.imageUrl }}</div>
          </div>

          <div class="form-check">
            <input type="checkbox" id="isEndangered" formControlName="isEndangered" />
            <label for="isEndangered">Endangered Species</label>
          </div>
        </div>

        <div class="form-section">
          <h3>Duck Facts</h3>
          <p class="section-description">Add interesting facts about this duck</p>

          <div formArrayName="facts">
            <div *ngFor="let fact of factsArray.controls; let i = index" class="array-form-group">
              <input [formControlName]="i" placeholder="Enter a duck fact" />
              <button type="button" class="remove-btn" (click)="removeFact(i)">✕</button>
            </div>
          </div>

          <button type="button" class="add-btn" (click)="addFact()">Add Fact</button>
        </div>

        <div class="form-section">
          <h3>Habitats</h3>
          <p class="section-description">Where can this duck be found?</p>

          <div formArrayName="habitat">
            <div *ngFor="let habitat of habitatArray.controls; let i = index" class="array-form-group">
              <input [formControlName]="i" placeholder="Enter a habitat" />
              <button type="button" class="remove-btn" (click)="removeHabitat(i)">✕</button>
            </div>
          </div>

          <button type="button" class="add-btn" (click)="addHabitat()">Add Habitat</button>
        </div>

        <div class="form-actions">
          <button type="button" class="cancel-btn" (click)="goBack()">Cancel</button>
          <button type="submit" [disabled]="duckForm.invalid || saving">
            {{ saving ? "Saving..." : "Save Duck" }}
          </button>
        </div>
      </form>

      <div class="form-preview">
        <h3>Preview</h3>
        <pre>{{ duckForm.value | json }}</pre>
      </div>
    </div>
  `,
  styles: [
    `
      .duck-editor {
        padding: 2rem;
        max-width: 800px;
        margin: 0 auto;
      }

      h2 {
        margin-bottom: 2rem;
        color: #333;
        border-bottom: 2px solid #f0f0f0;
        padding-bottom: 0.5rem;
      }

      .form-section {
        background: white;
        padding: 1.5rem;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        margin-bottom: 2rem;
      }

      h3 {
        margin-top: 0;
        color: #333;
      }

      .section-description {
        color: #666;
        margin-bottom: 1.5rem;
      }

      .form-group {
        margin-bottom: 1rem;
      }

      label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: bold;
      }

      input,
      textarea {
        width: 100%;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 1rem;
      }

      textarea {
        resize: vertical;
      }

      .form-check {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin: 1rem 0;
      }

      .form-check input {
        width: auto;
      }

      .array-form-group {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
      }

      .remove-btn {
        background: #f44336;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        padding: 0 10px;
      }

      .add-btn {
        background: #2196f3;
        color: white;
        border: none;
        border-radius: 4px;
        padding: 10px 15px;
        cursor: pointer;
        margin-top: 0.5rem;
      }

      .form-actions {
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
        margin-top: 2rem;
      }

      .form-actions button {
        padding: 12px 24px;
        border: none;
        border-radius: 4px;
        font-size: 1rem;
        cursor: pointer;
      }

      .cancel-btn {
        background: #ccc;
        color: #333;
      }

      button[type="submit"] {
        background: #4caf50;
        color: white;
      }

      button:disabled {
        background: #ccc;
        cursor: not-allowed;
      }

      .error-message {
        color: #f44336;
        font-size: 0.875rem;
        margin-top: 0.25rem;
      }

      .form-preview {
        margin-top: 2rem;
        background: #f5f5f5;
        padding: 1rem;
        border-radius: 4px;
      }

      pre {
        margin: 0;
        white-space: pre-wrap;
        word-wrap: break-word;
      }
    `,
  ],
  animations: [trigger("fadeIn", [transition(":enter", [style({ opacity: 0 }), animate("0.3s ease-out", style({ opacity: 1 }))])])],
})
export class DuckEditorComponent implements OnInit {
  duckForm!: FormGroup;
  formErrors: any = {};
  saving: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.createForm();

    this.duckForm.valueChanges.subscribe(() => {
      this.validateForm();
    });
  }

  createForm(): void {
    this.duckForm = this.fb.group({
      id: [this.generateId()],
      name: ["", [Validators.required, Validators.minLength(3)]],
      scientificName: ["", [Validators.required, Validators.pattern(/^[A-Z][a-z]+ [a-z]+$/)]],
      description: ["", [Validators.required, Validators.minLength(50)]],
      imageUrl: ["", [Validators.required, Validators.pattern(/^(http|https):\/\/.*\.(jpeg|jpg|gif|png|webp)$/)]],
      facts: this.fb.array([this.fb.control("")]),
      habitat: this.fb.array([this.fb.control("")]),
      isEndangered: [false],
    });
  }

  generateId(): string {
    return Math.random().toString(36).substring(2, 12);
  }

  get factsArray(): FormArray {
    return this.duckForm.get("facts") as FormArray;
  }

  get habitatArray(): FormArray {
    return this.duckForm.get("habitat") as FormArray;
  }

  addFact(): void {
    this.factsArray.push(this.fb.control(""));
  }

  removeFact(index: number): void {
    this.factsArray.removeAt(index);
  }

  addHabitat(): void {
    this.habitatArray.push(this.fb.control(""));
  }

  removeHabitat(index: number): void {
    this.habitatArray.removeAt(index);
  }

  validateForm(): void {
    this.formErrors = {};

    const form = this.duckForm;

    for (const field in this.validationMessages) {
      const control = form.get(field);

      if (control && control.invalid && (control.dirty || control.touched)) {
        this.formErrors[field] = "";

        for (const key in control.errors) {
          this.formErrors[field] += this.validationMessages[field][key] + " ";
        }
      }
    }
  }

  validationMessages: any = {
    name: {
      required: "Duck name is required.",
      minlength: "Duck name must be at least 3 characters long.",
    },
    scientificName: {
      required: "Scientific name is required.",
      pattern: "Scientific name must follow format: Genus species (e.g. Anas platyrhynchos).",
    },
    description: {
      required: "Description is required.",
      minlength: "Description must be at least 50 characters long.",
    },
    imageUrl: {
      required: "Image URL is required.",
      pattern: "Must be a valid image URL ending in jpeg, jpg, gif, png, or webp.",
    },
  };

  onSubmit(): void {
    if (this.duckForm.invalid) {
      return;
    }

    this.saving = true;

    setTimeout(() => {
      this.saving = false;
      alert("Duck data saved successfully!");
      this.router.navigate(["/admin/dashboard"]);
    }, 1500);
  }

  goBack(): void {
    this.router.navigate(["/admin/dashboard"]);
  }
}
