import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { trigger, transition, style, animate } from "@angular/animations";
import { CommonModule } from "@angular/common";
import { FirebaseService } from "../../services/firebase.service";
import { Duck } from "../../interfaces/duck-interface";

@Component({
  selector: "app-duck-editor",
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./duck-editor.component.html",
  styleUrls: ["./duck-editor.component.css"],
  animations: [trigger("fadeIn", [transition(":enter", [style({ opacity: 0 }), animate("0.3s ease-out", style({ opacity: 1 }))])])],
})
export class DuckEditorComponent implements OnInit {
  duckForm?: FormGroup;
  formErrors: any = {};
  saving: boolean = false;
  id: string | null = null;

  constructor(private fb: FormBuilder, private router: Router, private activeRoute: ActivatedRoute, private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get("id");
      let myDuck: Duck | undefined = undefined;
      if (this.id) {
        this.createForm(myDuck);
        const unsub = this.firebaseService.getDuck(this.id).subscribe((duck?: Duck) => {
          if (duck) {
            myDuck = duck;
          } else {
            alert("Duck not found. Redirecting to dashboard.");
            this.router.navigate(["/admin/dashboard"]);
          }
          this.createForm(myDuck);
          this.validateForm();
          this.duckForm!.valueChanges.subscribe(() => {
            this.validateForm();
          });
        });
      } else {
        this.createForm();
        this.duckForm!.valueChanges.subscribe(() => {
          this.validateForm();
        });
      }
    });

  }

  createForm(duck?: Duck): void {
    // BUG: Doesn't show what's wrong with retrieved data if something is wrong
    this.duckForm = this.fb.group({
      id: [duck?.id ?? this.generateId()],
      name: [duck?.name ?? "", [Validators.required, Validators.minLength(3)]],
      scientificName: [duck?.scientificName ?? "", [Validators.required, Validators.pattern(/^[A-Z][a-z]+ [a-z]+$/)]],
      description: [duck?.description ?? "", [Validators.required, Validators.minLength(50)]],
      imageUrl: [duck?.imageUrl ?? "", [Validators.required, Validators.pattern(/^(assets\/|(http|https):\/\/).*\.(jpeg|jpg|gif|png|webp)$/)]],
      habitat: [duck?.habitat ?? "", [Validators.required, Validators.minLength(5)]],
      facts: this.fb.array(duck ? duck.facts.map(f => this.fb.control(f)) : [this.fb.control("")]),
      isEndangered: [duck?.isEndangered ?? false],
    });
  }

  generateId(): string {
    return Math.random().toString(36).substring(2, 12);
  }

  get factsArray(): FormArray {
    return this.duckForm?.get("facts") as FormArray;
  }

  addFact(): void {
    this.factsArray.push(this.fb.control(""));
  }

  removeFact(index: number): void {
    this.factsArray.removeAt(index);
  }

  validateForm(): void {
    this.formErrors = {};

    const form = this.duckForm;

    for (const field in this.validationMessages) {
      const control = form?.get(field);

      if (control && control.invalid) {
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
    if (this.duckForm?.invalid) {
      return;
    }

    this.saving = true;

    if (this.id) {
      this.firebaseService.updateDuck(this.duckForm?.value);
    } else {
      this.firebaseService.addDuck(this.duckForm?.value)
    }
    this.saving = false;
    alert("Duck data saved successfully! Returning to dashboard.");
    this.router.navigate(["/admin/dashboard"]);
  }

  goBack(): void {
    this.router.navigate(["/admin/dashboard"]);
  }
}
