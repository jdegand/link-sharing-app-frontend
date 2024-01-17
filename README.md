# Link Sharing App Frontend

This is inspired by the [Link Sharing App Frontend Mentor Challenge](https://www.frontendmentor.io/challenges/linksharing-app-Fbt7yweGsT).  I have yet to determine how close I will match the design.  

## Screenshots

![](screenshots/frontendmentor-link-sharing-app-mobile-1.jpg "Frontend Mentor Mobile Design")

## Built With

- [Angular](https://angular.dev)
- [Angular CLI](https://github.com/angular/angular-cli) version 17.0.7.
- [Prime Ng](https://primeng.org/)
- [Prime Icons](https://primeng.org/icons)

## Thoughts

- I started the app by building out the dynamic reactive form to add the links.
- I used `FormBuilder`.  FormBuilder has implications for adding custom validators, as there can be extra snags and TypeScript issues.
- This [StackBlitz](https://stackblitz.com/edit/angular-custom-validator-formgroup-formarray?file=src%2Fapp%2Fapp.component.ts) was a great help.  
- I had included the errors in the wrong place and moved the error message conditional statement into the `for` loop for the link controls.  This change helped to localize the errors for each link group.  
- Creating a regex to handle every error scenario and url deviation is very difficult and time-consuming.  It is very difficult to trust a regex.  Using a custom validator seems to be the best choice to make sure the url link is for the selected platform.  
- I went through many changes to the regex.  I also looked into using the [URL API](https://developer.mozilla.org/en-US/docs/Web/API/URL) inside a custom validator to validate the URL value.  
- Material design icons has removed all 3rd party icons. See [Github](https://github.com/google/material-design-icons/issues/166) for more. `facebook` still works, but it is deprecated and will be removed shortly.  None of the other select options have working icons.  It would have been nice just to use a `mat-icon` inside a `mat-option` of a `mat-select`.  This really negates a big benefit of switching the form to an Angular Material Form.
- Adding a little icon to each input is a lot more involved than it really should be.  
- I had problems using `mat-label` and the `for` attribute with a dynamic index. I had to add `CUSTOM_ELEMENTS_SCHEMA` to the schemas array of the home component to use the `for` attribute.
- Removing the `for` attributes and just using `mat-label`, chrome complained about there being no `id` matching the generated `for` attribute.
- I also had trouble getting the `mat-select` working correctly.  
- Ultimately, I think there is limited benefit in converting the form to use Angular Material.
- I did some research and decided to try to use `primeng` and `primeicons`.
- Prime Ng has third party icons.  It also has drag and drop functionality.
- Prime Ng doesn't have an `ng add` command so you have to add theme styles to the `angular.json` yourself.  
- Prime icons require a single import in the global `styles.css` file.  
- `FormField doesn't have a name or id` warning in the browser console so I added a name with the `index` to the url input.  
- It is tough to an associate label with the dropdown.  The `ng-template` cannot take an id.  

## Continued Development

- Platform label
- Allow multiple links for same platform -> need another custom validator?
- Drag and Drop functionality on Preview page
- When to send the API request -> have to save the links array when order of links changes
- Authentication
- Services & Interceptors
- Spring Boot Backend
- JWT & Route Guards
- Profile photo vs profile picture url
- Profile form
- Testing (I left the Karma and Jasmine packages installed)
- ESLint

## Useful Resources

- [Image Color Picker](https://imagecolorpicker.com/)
- [Frontend Mentor](https://www.frontendmentor.io/challenges/linksharing-app-Fbt7yweGsT) - Link Sharing App
- [W3 Schools](https://www.w3schools.com/howto/howto_css_devices.asp) - how to create devices with CSS
- [YouTube](https://www.youtube.com/watch?v=Ekkt5S0BzCo&list=PL1BztTYDF-QNlGo5-g65Xj1mINHYk_FM9&index=130) - #130 Adding Form Groups Dynamically | Reactive Forms | A Complete Angular Course
- [Make Use Of](https://www.makeuseof.com/regular-expressions-validate-url/#:~:text=The%20regex%20will%20consider%20a,characters%20and%2For%20special%20characters.) - regular expressions validate url
- [Angular University](https://blog.angular-university.io/angular-form-array/) - angular form array
- [YouTube](https://www.youtube.com/watch?v=aOQ1xFC3amw) - Angular Form Array - Step by Step Example
- [Stack Overflow](https://stackoverflow.com/questions/59284894/type-abstractcontrol-is-missing-the-following-properties-from-type-formgroup) - type abstract control is missing the following properties from type formgroup
- [YouTube](https://www.youtube.com/watch?v=ZfWCr8BzYHY) - Angular Drag and Drop - The Best Way
- [FreeCodeCamp](https://www.freecodecamp.org/news/how-to-write-a-regular-expression-for-a-url/) - how to write a regular expression for a url
- [Stack Overflow](https://stackoverflow.com/questions/49746997/angular-material-maticon-in-matselect) - angular maticon in matselect
- [Stack Blitz](https://stackblitz.com/edit/angular-validate-dynamic-formarray-formbuilder?file=src%2Fform-builder%2Fform-builder.component.ts) - angular validate dynamic formarray formbuilder
- [Stack Overflow](https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url) - what is a good regular expression to match a url
- [Gist](https://gist.github.com/horrormyth/7908abda1e355cf9e5ab4e152b15aac0/revisions) - domain regex
- [Stack Overflow](https://stackoverflow.com/questions/32730133/javascript-reg-exp-to-match-specific-domain-name) - javascript reg exp to match specific domain name
- [Stack Overflow](https://stackoverflow.com/questions/51954038/angular-reactive-form-custom-validation-using-formbuilder) - angular reactive form custom validation using FormBuilder
- [YouTube](https://www.youtube.com/watch?v=mK0CX-68hBE) - Angular Reactive Forms: Learn How to Create A Custom Validator
- [Stack Overflow](https://stackoverflow.com/questions/57794118/how-to-add-custom-validator-to-a-formarray) - how to add custom validator to a form array
- [Stack Blitz](https://stackblitz.com/edit/angular-ktzv69?file=src%2Fapp%2Fapp.component.ts) - form array vs form array group validator
- [Stack Overflow](https://stackoverflow.com/questions/66426678/angular-11-type-controlarray-formarray-validationerrors-null-is-not) - form array validation errors
- [Stack Blitz](https://stackblitz.com/edit/angular-custom-validator-formgroup-formarray?file=src%2Fapp%2Fapp.component.ts) - Angular Custom Validator Formgroup Formarray
- [Medium](https://medium.com/@aayyash/authentication-in-angular-why-it-is-so-hard-to-wrap-your-head-around-it-23ea38a366de) - authentication in angular why it is so hard to wrap your head around it
- [Stack Blitz](https://stackoverflow.com/questions/48681594/angular-dynamic-forms-and-angular-material) - angular dynamic forms and angular material
- [Medium](https://medium.com/ngconf/an-introduction-to-angular-material-form-fields-5828b92d3a3c) - an introduction to angular material form fields
- [Stack Overflow](https://stackoverflow.com/questions/55299113/replace-mat-icon-with-svg-graphic) - replace mat icon with svg graphic
- [Stack Overflow](https://stackoverflow.com/questions/56882657/mat-select-value-doesnt-work-with-formcontrolname) - mat select value doesnt work with formcontrolname
- [Stack Overflow](https://stackoverflow.com/questions/57646437/how-to-use-mat-select-with-reactive-forms-formarray-angular) - how to use mat select with reactive forms formarray angular
- [Stack Overflow](https://stackoverflow.com/questions/54877520/prime-ng-dropdown-with-icons) - prime ng dropdown with icons
- [Blog](https://medium.com/@haseenakhader.uk/angular-reactive-form-using-primeng-and-its-validation-8baf6b9e7ed4) - angular reactive form using primeng and its validation
- [YouTube](https://www.youtube.com/watch?v=HbK3uA5F7bc) - Reactive Form with Validation using Angular and PrimeNG
- [Stack Overflow](https://stackoverflow.com/questions/57272026/primeng-dropdown-not-binding-the-options-in-angular-formarray) - primeng dropdown not binding the options in angular form array
- [Stack Overflow](https://stackoverflow.com/questions/46926182/property-controls-does-not-exist-on-type-abstractcontrol-angular-4) - property controls does not exist on type abstract control angular
- [Stack Overflow](https://stackoverflow.com/questions/41070478/no-value-accessor-for-form-control) - no value accessor for form control
- [How to JS](https://howtojs.io/how-to-solve-property-controls-does-not-exist-on-type-abstractcontrol-error-in-angular-13-applications/) - how to solve property controls does not exist on type abstract control error 
- [Angular Docs](https://angular.io/errors/NG01203) - NG01203 error
- [Angular Docs](https://angular.dev/guide/animations#enabling-the-animations-module) - animations module
- [Stack Overflow](https://stackoverflow.com/questions/50508712/validate-an-url) - validate an url
- [FreeCodeCamp](https://www.freecodecamp.org/news/how-to-write-a-regular-expression-for-a-url/) - how to write a regular expression for a url
- [Stack Overflow](https://stackoverflow.com/questions/45356089/can-i-include-an-icon-to-the-highlighted-item-for-primeng-dropdown) - can I include an icon to highlighted item for primeng dropdown