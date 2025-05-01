# Duck

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.6.

## About This Project

The Duck Encyclopedia is an educational Angular application designed to showcase core Angular concepts in a progressive, step-by-step manner. Each component, service, and file contains numbered comments (`#01`, `#02`, etc.) that explain specific Angular features and best practices.

## Learning Path

Follow these concepts in order to understand how Angular applications are built:

1. **TypeScript Interfaces** (`#01`) - Learn how interfaces define the shape of objects in TypeScript
   - See: [interfaces/duck-interface.ts](src/app/interfaces/duck-interface.ts)
<br/><br/>

2. **Angular Services** (`#02`) - Understand how singleton services provide shared functionality
   - See: [services/duck.service.ts](src/app/services/duck.service.ts)
<br/><br/>

3. **Angular Components** (`#03`) - Explore the building blocks of Angular applications
   - See: [components/duck/duck.component.ts](src/app/components/duck/duck.component.ts)
<br/><br/>

4. **Data Binding** (`#04`) - Learn various ways to bind data between templates and components
   - Property binding, interpolation, event binding, two-way binding
   - See: [components/duck/duck.component.ts](src/app/components/duck/duck.component.ts)
<br/><br/>

5. **Template Reference Variables** (`#05`) - Access DOM elements directly in your components
   - See: [components/duck-list/duck-list.component.ts](src/app/components/duck-list/duck-list.component.ts)
<br/><br/>

6. **Directives Overview** (`#06`) - Understand structural and attribute directives
   - See: [components/duck/duck.component.ts](src/app/components/duck/duck.component.ts)
<br/><br/>

7. **Custom Directives** (`#07`) - Create your own directives to extend HTML functionality
   - See: [directives/highlight.directive.ts](src/app/directives/highlight.directive.ts)
<br/><br/>

8. **Custom Pipes** (`#08`) - Transform displayed data with built-in and custom pipes
   - See: [pipes/truncate.pipe.ts](src/app/pipes/truncate.pipe.ts)
<br/><br/>

9. **Container Components** (`#09`) - Organize components by responsibility (containers vs. presentational)
   - See: [components/duck-list/duck-list.component.ts](src/app/components/duck-list/duck-list.component.ts)
<br/><br/>

10. **Component Communication** (`#10`) - Learn parent-child communication patterns
    - See: [components/duck-list/duck-list.component.ts](src/app/components/duck-list/duck-list.component.ts), [components/duck/duck.component.ts](src/app/components/duck/duck.component.ts)
<br/><br/>

11. **Angular Routing** (`#11`) - Implement navigation between different views
    - See: [app.routes.ts](src/app/app.routes.ts)
<br/><br/>

12. **Application Configuration** (`#12`) - Configure your application with providers
    - See: [app.config.ts](src/app/app.config.ts)
<br/><br/>

13. **Navigation Components** (`#13`) - Create dedicated navigation using RouterLink
    - See: [components/navigation/navigation.component.ts](src/app/components/navigation/navigation.component.ts)
<br/><br/>

14. **Component Lifecycle** (`#14`) - Understand and use Angular's lifecycle hooks
    - See: [components/duck-list/duck-list.component.ts](src/app/components/duck-list/duck-list.component.ts)
<br/><br/>

15. **Global Styles** (`#15`) - Implement application-wide styling
    - See: [styles.css](src/styles.css)
<br/><br/>

16. **Angular Application Structure** (`#16`) - Learn about the core structural elements
    - See: [index.html](src/index.html)
<br/><br/>

17. **Template-driven Forms** (`#17`) - Build and manage forms with NgModel
    - See: [components/duck-list/duck-list.component.ts](src/app/components/duck-list/duck-list.component.ts)
<br/><br/>

18. **Advanced Component Techniques** (`#18`) - Use content projection and ContentChild
    - See: [components/fancy-duck/fancy-duck.component.ts](src/app/components/fancy-duck/fancy-duck.component.ts)
<br/><br/>

19. **Application Bootstrap** (`#19`) - Understand how Angular applications start up
    - See: [main.ts](src/main.ts)
<br/><br/>

20. **Root Component** (`#20`) - Configure the main application component
    - See: [app.component.ts](src/app/app.component.ts)
<br/><br/>

## Features Demonstrated

- Displaying lists of data with filtering capabilities
- Navigation between routes
- Component communication patterns
- Form controls with two-way binding
- Content projection
- Custom directives and pipes
- Service injection and data management
- Responsive design with CSS

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Deployment

This project can be easily deployed to GitHub Pages using the [angular-cli-ghpages](https://www.npmjs.com/package/angular-cli-ghpages) package.

### Installation

First, install the package as a dev dependency:

```bash
npm install angular-cli-ghpages --save-dev
```

### Basic Deployment

To deploy your application to GitHub Pages:

1. Build your application with the correct base-href:

```bash
ng build --configuration=production --base-href="https://USERNAME.github.io/REPOSITORY_NAME/"
```

Replace `USERNAME` with your GitHub username and `REPOSITORY_NAME` with your repository name.

2. Deploy using angular-cli-ghpages:

```bash
npx angular-cli-ghpages --dir=dist/duck
```

### Advanced Configuration

You can customize your deployment with additional options:

```bash
npx angular-cli-ghpages --branch=gh-pages --dir=dist/duck --cname=example.com --no-silent
```

Common options:
- `--branch`: The branch to deploy to (default: gh-pages)
- `--dir`: The directory to deploy (default: dist/<project-name>)
- `--cname`: Use a custom domain
- `--no-silent`: Display more verbose output
- `--dry-run`: Run through without making any changes

### Automating Deployment

You can add a deployment script to your `package.json`:

```json
"scripts": {
  "deploy": "ng build --configuration=production --base-href=\"https://USERNAME.github.io/REPOSITORY_NAME/\" && npx angular-cli-ghpages --dir=dist/duck"
}
```

Then simply run:

```bash
npm run deploy
```

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
