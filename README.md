# Link Sharing App Frontend

This is inspired by the [Link Sharing App Frontend Mentor Challenge](https://www.frontendmentor.io/challenges/linksharing-app-Fbt7yweGsT).  I have yet to determine how close I will match the design.  

## Screenshots

![](screenshots/frontendmentor-link-sharing-app-mobile-1.jpg "Frontend Mentor Mobile Design")

## Built With

- [Angular](https://angular.dev)
- [Angular CLI](https://github.com/angular/angular-cli) version 17.0.7.

## Thoughts

- I started the app by building out the dynamic reactive form to add the links.
- I used `FormBuilder`.  FormBuilder has implications for adding custom validators, as there can be extra snags and TypeScript issues.
- This [StackBlitz](https://stackblitz.com/edit/angular-custom-validator-formgroup-formarray?file=src%2Fapp%2Fapp.component.ts) was a great help.  
- I had included the errors in the wrong place and moved the error message conditional statement into the `for` loop for the link controls.  This change helped to localize the errors for each link group.  
- Creating a regex to handle every error scenario and url deviation is very difficult and time-consuming.  It is very difficult to trust a regex.  Using a custom validator seems to be the best choice to make sure the url link is for the selected platform.  

## Continued Development

- Angular Material or Tailwind ?
- Drag and Drop functionality on Preview page -> Angular Material CDK
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

- [Regex 101](https://regex101.com/)
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