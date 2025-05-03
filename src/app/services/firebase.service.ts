import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { environment } from "../../environments/environment";
import {
  arrayUnion,
  collection,
  CollectionReference,
  deleteField,
  doc,
  DocumentReference,
  Firestore,
  onSnapshot,
  setDoc,
  updateDoc,
} from "@angular/fire/firestore";
import { Duck } from "../interfaces/duck-interface";
import { Globals } from "../../globals";

@Injectable({
  providedIn: "root",
})
export class FirebaseService {
  ducksDoc: DocumentReference;
  firestoreCollection: CollectionReference;

  simpleDucksList: Duck[] = [];
  simpleDucksListObservable: Observable<Duck[]>;

  constructor(private fs: Firestore, private globals: Globals) {
    this.firestoreCollection = collection(this.fs, environment.firestoreCollection);
    this.ducksDoc = doc(this.fs, environment.firestoreCollection, environment.ducksDocumentId);
    this.simpleDucksListObservable = new Observable<Duck[]>((subscriber) => {
      onSnapshot(this.ducksDoc, (doc) => {
        let ducksDocData = doc.data() ?? {};
        this.simpleDucksList = Object.values(ducksDocData);
        subscriber.next(this.simpleDucksList);
      });
    });
    console.log("Firebase service initialized");
  }

  login(email: string, password: string): Observable<any> {
    console.log(`Attempting login with ${email}`);

    if (email === "admin@ducks.com" && password === "Duck@123") {
      const user = {
        uid: "admin123",
        email: email,
        displayName: "Admin User",
      };
      localStorage.setItem("user", JSON.stringify(user));
      return of(user);
    }

    return throwError(() => new Error("Invalid login credentials"));
  }

  logout(): Observable<void> {
    localStorage.removeItem("user");
    return of(undefined);
  }

  getCurrentUser(): any {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }

  observeDucks(): Observable<Duck[]> {
    return this.simpleDucksListObservable;
  }

  getDuck(id: string): Observable<Duck | undefined> {
    return new Observable<Duck | undefined>((subscriber) => {
      const unsub = onSnapshot(this.ducksDoc, (doc) => {
        let ducksDocData = doc.data() ?? {};
        subscriber.next(ducksDocData[id]);
      });
      return () => {
        unsub();
      };
    });
  }

  addDuck(duck: Duck): Promise<void> {
    return updateDoc(this.ducksDoc, { [duck.id]: duck });
  }

  updateDuck(duck: Duck): Promise<void> {
    return updateDoc(this.ducksDoc, { [duck.id]: duck });
  }

  deleteDuck(id: string): Promise<void> {
    return updateDoc(this.ducksDoc, { [id]: deleteField() });
  }

  resetFirestore() {
    setDoc(
      doc(this.fs, environment.firestoreCollection, environment.ducksDocumentId),
      this.globals.mockDucks.reduce(
        (ducksDict: Record<string, Duck>, duck: Duck) => {
          ducksDict[duck.id] = duck;
          return ducksDict;
        },
        {} /* empty dict by default */
      )
    );
  }
}
