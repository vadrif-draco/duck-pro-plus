import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { environment } from "../../environments/environment";
import { arrayUnion, doc, DocumentReference, Firestore, onSnapshot, updateDoc } from "@angular/fire/firestore";
import { Duck } from "../interfaces/duck-interface";


@Injectable({
  providedIn: "root",
})
export class FirebaseService {

  ducksDoc: DocumentReference;
  ducksListObservable: Observable<Duck[]>;
  ducksList: Duck[] = [];

  // constructor(private fs: Firestore, private duckService: DuckService) {
  constructor(private fs: Firestore) {
    console.log("Firebase service initialized");
    this.ducksDoc = doc(this.fs, `${environment.firestoreCollection}/ducks`);
    this.ducksListObservable = new Observable<Duck[]>((subscriber) => {
      onSnapshot(this.ducksDoc, (doc) => {
        let ducksDocData = doc.data() ?? { "ducksArray": [] };
        subscriber.next(ducksDocData["ducksArray"]);
        this.ducksList = ducksDocData["ducksArray"];
      });
    });
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

  getDucks(): Observable<Duck[]> {
    console.log("Fetching ducks from Firebase");
    return this.ducksListObservable;
  }

  getDuck(id: string): Observable<Duck | undefined> {
    // const duck = this.ducks.find((d) => d.id === id);
    // if (!duck) {
    //   return throwError(() => new Error(`Duck with id ${id} not found`));
    // }
    // return of(duck);
    return new Observable<Duck | undefined>((subscriber) => {
      const unsub = onSnapshot(this.ducksDoc, (doc) => {
        subscriber.next(doc.data()!['ducksArray'].filter((duck: Duck) => (duck.id == id))[0])
      })
      return () => { unsub(); };
    })
  }

  addDuck(duck: Duck): Promise<void> {
    // this.ducks.push(duck);
    // return of(duck);
    return updateDoc(this.ducksDoc, { ducksArray: arrayUnion(duck) })
  }

  updateDuck(duck: Duck): Promise<void> {
    // const index = this.ducks.findIndex((d) => d.id === duck.id);
    // if (index !== -1) {
    //   this.ducks[index] = duck;
    //   return of(duck);
    // }
    // return throwError(() => new Error(`Duck with id ${duck.id} not found`));
    let ducks = [...this.ducksList];
    const index = ducks.findIndex((d) => d.id == duck.id);
    if (index !== -1) { ducks[index] = duck; }
    return updateDoc(this.ducksDoc, { ducksArray: ducks })
  }

  // deleteDuck(id: string): Promise<void> {
  //   // const index = this.ducks.findIndex((d) => d.id === id);
  //   // if (index !== -1) {
  //   //   this.ducks.splice(index, 1);
  //   //   return of(undefined);
  //   // }
  //   // return throwError(() => new Error(`Duck with id ${id} not found`));
  //   // return updateDoc(this.ducksDoc, {
  //   //   arrayRemove(duck)
  //   // })
  // }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  // addAllDucks() {
  //   const allDucksMockData = this.duckService.getDucks()
  //   return updateDoc(this.ducksDoc, {ducksArray: allDucksMockData})
  // }
}
