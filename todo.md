- [ ] Global variables in angular
- [ ] Environment variables in angular

- [ ] Angular Animations: Creating smooth transitions and animations in the UI

- [ ] HTTP Client: Making API calls to backend services and handling responses
- [ ] Observable and RxJS: Understanding reactive programming with Observables for async operations
- [ ] Lazy Loading: Loading modules on-demand to improve initial load performance
- [ ] Interceptors: Handling HTTP requests and responses globally
- [ ] Custom Form Validators: Creating reusable validation logic

- [ ] Firebase Integration: Using Firebase for authentication, database, and hosting
- [ ] Reactive Forms: More powerful than Template-driven Forms for complex validation and dynamic form controls
- [ ] Route Guards: Protecting routes based on authentication, permissions, or other conditions

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# The ideas in my mind to integrate the above topic groups are:

- I don't have ideas for global / environment variables aside from generic API stuff or prod vs. dev stuff...

- For animations, anything toggled on/off by *ngIf should be animated, page switching, etc. -- all via angular animations and not plain CSS

- For the HTTP interactions, we can have a 3rd tab page where:
  - We fetch a random duck from https://random-d.uk/api/v2/random (normal GET request, parse its response 'url' param as img src)
  - We use the observer pattern to fetch the duck and add loading in its place and display it (e.g., using a service that returns an observable)
  - Likewise we do the same for quotes API to fetch a quote, but, we pass the duck image url to the quote API as a parameter
    - https://dummyjson.com/quotes/[duck number from url], e.g., we get duck image url ending with 321.jpg, so we go quotes /321
    - If image is a .gif, add 600 to its ID, for example, if we get a gif ending with 123.gif, we go quotes /723
    - Since this means that we can't send the quote request until we have the duck request response, let's use rxjs or other angular features to handle this
  - We use a service to fetch the quote and add loading in its place and display it (e.g., using a service that returns an observable)
  - We add the "x says blabla" bubble quote to the duck image and place the quote text in it

- For the firebase integration and forms and route guards, we can have a login page that uses firebase authentication to log in the user and then redirect them to the main page. We can also use firebase database to store the duck images and quotes, and use reactive forms to create a form for the user to submit their own duck images and quotes.
  - We can also use route guards to protect the main page and only allow logged-in users to access it.
  - Logged in users can add their own duck images and quotes to the firebase database, and we can use reactive forms to create a form for them to submit their own duck images and quotes.
  - We can also use lazy loading to load the firebase module only when the user is logged in, and use interceptors to handle the authentication token for the firebase API calls.
  - We can also use custom form validators to validate the user input for the duck images and quotes, and display error messages if the input is invalid.
  - We can also use the router to navigate between the login page and the main page, and use route guards to protect the main page and only allow logged-in users to access it.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
