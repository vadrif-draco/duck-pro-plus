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
  templateUrl: "./duck-editor.component.html",
  styleUrls: ["./duck-editor.component.css"],
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
