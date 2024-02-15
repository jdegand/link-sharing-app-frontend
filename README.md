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
- I had included the errors in the wrong place, so I moved the error message conditional statement into the `for` loop for the link controls.  This change helped to localize the errors for each link group.  
- Creating a regex to handle every error scenario and URL deviation is very difficult and time-consuming.  It is very difficult to trust a regex.  Using a custom validator seems to be the best choice to make sure the url matches the selected platform.  
- I went through many changes to the regex.  I also looked into using the [URL API](https://developer.mozilla.org/en-US/docs/Web/API/URL) inside a custom validator to validate the URL value.  
- Material Design icons have removed all third-party icons. See [Github](https://github.com/google/material-design-icons/issues/166) for more. `facebook` still works, but it is deprecated and will be removed shortly.  None of the other select options have working icons.  It would have been nice just to use a `mat-icon` inside a `mat-option` of a `mat-select`.  This really negates a big benefit of switching the form to an Angular Material form.
- Adding a little icon to each input is a lot more involved than it really should be.  
- I also had problems using `mat-label` and the `for` attribute with a dynamic index. I had to add `CUSTOM_ELEMENTS_SCHEMA` to the schemas array of the home component to use the `for` attribute.
- Removing the `for` attributes and just using `mat-label`, Chrome complained about there being no `id` matching the generated `for` attribute.
- I also had trouble getting the `mat-select` working correctly.  
- If you have to use `CUSTOM_ELEMENTS_SCHEMA`, you probably have done something wrong.  
- Ultimately, I think there is limited benefit in converting the form to use Angular Material.
- I did some research and decided to try to use `primeng` and `primeicons`.
- Prime Ng has third-party icons.  It also has drag-and-drop functionality.
- Prime Ng doesn't have an `ng add` command, so you have to add theme styles to the `angular.json` yourself.  
- Prime icons require a single import in the global `styles.css` file.  
- `FormField doesn't have a name or id` warning in the browser console, so I added a name with the `index` to the url input.  
- It is tough to associate a label with the dropdown.  The `ng-template` cannot take an ID.
- I think the ng-template loop creates IDs for each dropdown option.  
- The dropdown's `name` property is `platform`.  
- Firefox doesn't show an error for the label.  Firefox had quite a few warnings associated with the `primeng` styling.    
- To fix this label issue, I may have to refactor again.  
- In Chrome, the error choice is `incorrect label use` or `no label associated with a form field`.
- I used the [Messages Module](https://primeng.org/messages) to show inline errors on the forms.   
- `visible` in the menubar does not update from state changes.  It appears to have been only evaluated once.  I have a correct conditional statement and the `logout` link's visibility does not change.  
- Is it best to localize the navbar per page versus adding it once to the `app` component?  This strategy would lead to duplicated code.
- `primeng` has a design philosophy to minimize conditionals in templates.    
- One strategy I have seen for primeng navbars is to use `ngIf` to conditionally render them.  Basically, you show no menubar when unauthenticated.  I searched Github, and [this](https://github.com/softrams/bulwark/blob/master/frontend/src/app/navbar/navbar.component.html) is an example of that strategy.
- Ultimately, I used a `computed` signal to update the menu items.  Since I am using a signal for the auth state, this made sense and I was able to toggle menu items.   
- Signals and guards are a problematic combination.  If you change the signal to an observable, you create a memory leak.  See [Github](https://github.com/angular/angular/issues/51280) for more.  
- Checking signals with conditionals in templates is problematic.  See [Github](https://github.com/angular/angular/issues/49161) for more.
- Creating a simple guard to prevent a user from visiting `login` and `register` when authenticated has been difficult.
- I have removed both links from the navbar, but a user can visit those routes from the URL.  
- Instead of using a guard for the `register` and `login` pages, I can check for the auth signal in the constructor and redirect if the auth signal is not `undefined`.  I got the idea from looking at this [Github project](https://github.com/joshuamorony/angularstart-chat/blob/main/src/app/auth/login/login.component.ts).
- Since auth signal is only saved in memory, a refresh or typing a URL erases the signal state.  By persisting the auth signal, you can add a guard to `register` and `login`.  A user visits the routes but sees nothing on the page besides the navbar.     
- Using a signal for authentication state is a [new strategy](https://www.youtube.com/watch?v=R8a8ituFkls). See this [video](https://www.youtube.com/watch?v=foUS5JlDlCs) for how signals and RxJs can work together for authentication.  
- An implementation choice between including the profile image inside the other form or having the image inside another form.  If it is separate, you would potentially need to make multiple api requests for the preview page. 
- Primeng file upload doesn't appear to need to be inside a form.  You can complete the upload with an async function or use the `url` action. 
- `computed` menubar fragments can be missing on navigation.  I can use `visible` to have the links add when the fragment is available.  I would have no routes visible, as I wanted to add a fragment to every route I have.   
- I don't think the fragments are `recomputed` inside `computed` or `effect`.  See this [Stack Overflow](https://stackoverflow.com/questions/76312588/angular-effects-and-conditional-use-of-signals).
- I changed to use `effect` in the navbar component.  `computed` is not intended to have conditionals.     
- When you first login from the [realworld API](https://realworld-docs.netlify.app/docs/specs/frontend-specs/api), the response doesn't have an `id`.  I changed the fragment to `username`.  The fragment is missing on the `links` page only (the first navigation).  It doesn't matter what route you navigate to, the fragment will not be added to *any* route on first navigation.  I guess I need to read the signal inside the submit functions and add the user `id` to the payload.  I can use fragment on other routes.  
- I may replace my use of signals for auth state and use an Observable approach instead.  
- I could try to localize the menubars on each page again.  
- I used [FileUpload](https://primeng.org/fileupload) to save a profile picture.  
- I did not add the `FileUpload` to the existing form.  It is separate.  I used the `url` action to send the file to the backend.  I used the `onUpload` and `onError` methods to handle successful and unsuccessful API responses.  
- I ran into a problem where the input did not clear the file name and allow for other requests.  The `FileUpload` does not take multiple files, but a user should be able to change profile pictures, as often as they'd like.  On the backend, I may have to look into adding a function that removes `orphan` images that are not tied to any user account.
- To reset the file input, I used a `ViewChild` ref.  I tried to pass a form template variable on the file input to the `onUpload` function and call the `clear` method inside that function, but it did not work although the file was correctly saved.  `ViewChild` was an easy way to grab the template variable and I could call the `clear` method on the `ViewChild` variable.  I had to use `any` for the TypeScript type.  I will need to look more into the proper typing for the `ViewChild` variable.
- Keeping the file data separate affects the mappings between entities.  You can have a `FileData` class and have a `OneToOne` mapping between that and the `User` class.  I have also thought about creating an intermediate `Profile` class and using that class to hold all the necessary data and the mappings.  I have also thought about adding all the mapping references to the `User` object.         
- Ultimately, the mapping may not matter if I build a `DTO` object to send back the necessary info for the `preview` component.  You can query the database for the required objects and build a DTO that eliminates the need for multiple API requests in the frontend.   

## Continued Development

- Platform label
- Allow multiple links for same platform? Need another custom validator to prevent it?
- Dark Mode added to Navbar
- Styling
- Drag and Drop functionality on Preview page
- When to send the API request -> have to save the links array when order of links changes
- Authentication
- Services & Interceptors
- Spring Boot Backend
- Testing (I left the Karma and Jasmine packages installed)
- Zod & TypeScript improvements
- Preview route -> need to make URL unique
- Use copy-to-clipboard functionality for sharing the preview link -> directive?
- ViewChild typing

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
- [Stack Overflow](https://stackoverflow.com/questions/77625251/angular-17-route-guard-using-signal-not-working) - angular 17 route guard using signal not working
- [Stack Overflow](https://stackoverflow.com/questions/72459282/how-can-i-use-ngif-on-primeng-menubar-i-am-trying-to-use-it-when-displaying-lo) - how can I use ngIf on primeng menubar
- [Stack Overflow](https://stackoverflow.com/questions/76789680/primeng-tab-menu-items-not-updating-with-model-change) - primeng tab menu items not updating with model change
- [Github](https://github.com/primefaces/primeng/issues/13242) - Component: MenuBar - should watch changes on MenuItems
- [Angular Gems](https://angulargems.beehiiv.com/p/angular-signals-rfcs-overview) - signals overview
- [Stack Overflow](https://stackoverflow.com/questions/50674470/show-primeng-menuitem-only-when-authenticated) - show primeng menuitem only when authenticated
- [Primefaces](https://forum.primefaces.org/viewtopic.php?t=58402) - Hide/display menu items based on user role
- [YouTube](https://www.youtube.com/watch?v=P1r2QjuJWcI&t=112s) - User Login and Register Form Full Video (Code Attatched) - Angular 16 | PrimeNG | Json Server
- [Github](https://github.com/softrams/bulwark/pull/379/files) - Refactor navbar to use PrimeNG menubar #379
- [Github](https://github.com/softrams/bulwark/blob/master/frontend/src/app/navbar/navbar.component.html) - frontend/src/app/navbar/navbar.component.html
- [Github](https://github.com/primefaces/primeng/issues/13394) - Menubar (and other menu components): PrimeNG 16.1.0 unable to dynamically update menu items
- [Medium](https://medium.com/ngconf/functional-route-guards-in-angular-8829f0e4ca5c) - functional route guards in angular
- [Github](https://github.com/primefaces/primeng/issues/4197) - Tabmenu - class ui-state-active is not set correctly on `<a>` and `<li>` elements when routing with guards #4197
- [Stack Overflow](https://stackoverflow.com/questions/65360736/angular-guard-not-called-on-route-path-that-redirects) - angular guard not called on route path that redirects
- [Stack Overflow](https://stackoverflow.com/questions/77625251/angular-17-route-guard-using-signal-not-working) - angular 17 route guard using signal not working
- [Github](https://github.com/angular/angular/issues/51280) - effect() created in toObservable() keeps watching the signal when using in Guards #51280
- [Github](https://github.com/angular/angular/issues/49161) - signals: TypeScript and nullability #49161
- [Stack Overflow](https://stackoverflow.com/questions/67027172/subscribing-subject-in-guard-not-giving-response) - subscribing subject in guard not giving response
- [Stack Overflow](https://stackoverflow.com/questions/38425461/angular2-canactivate-calling-async-function) - canActivate calling async function
- [Medium](https://netbasal.com/converting-signals-to-observables-in-angular-what-you-need-to-know-971eacd3af2) - converting signals to observables
- [Stack Overflow](https://stackoverflow.com/questions/44742091/how-to-call-an-async-method-in-canactivate-with-angular) - how to call an async method in canActivate
- [Stack Overflow](https://stackoverflow.com/questions/64676206/authguard-loaded-before-authservice) - authguard-loaded before authservice
- [Blog](https://devlinduldulao.pro/unveiling-global-state-management-in-angular-with-signals-with-localstorage/) - unveiling global state management in angular in signals with local storage
- [Medium](https://medium.com/kanlanc/heres-why-storing-jwt-in-local-storage-is-a-great-mistake-df01dad90f9e) - heres why storing jwt in local storage is a great mistake
- [Stack Overflow](https://stackoverflow.com/questions/40387979/angular-2-observables-destroy-itself-when-navigating-to-another-route) - observables destroy itself when navigating to another route
- [Medium](https://blog.herodevs.com/navigating-angular-router-events-the-sweet-sixteen-fed8fb8e5f8b) - navigating angular router events the sweet sixteen
- [Stack Overflow](https://stackoverflow.com/questions/67975666/angular-authguard-and-login-persistence-router-automatically-redirects-to-non-t) - angular authGuard and login persistence
- [YouTube](https://www.youtube.com/watch?v=V31kisDl4KI) - How to decode JWT token in Angular 17?
- [YouTube](https://www.youtube.com/@CodeShotsWithProfanis/search?query=authentication) - CodeShots With Profanis authentication videos
- [YouTube](https://www.youtube.com/watch?v=5nwDz9gfBho) - Angular Signals with Objects and Arrays: Common Pitfall
- [Stack Overflow](https://stackoverflow.com/questions/71051108/angular-primeng-value-p-message-is-not-allowed) - p-message is not allowed
- [Medium](https://netbasal.com/create-reusable-copy-to-clipboard-directive-in-angular-fc1139b9e755) - create reusable copy to clipboard directive in angular
- [Stack Overflow](https://stackoverflow.com/questions/36665234/retrieve-hash-fragment-from-url-with-angular2) - retrieve hash fragment from url with angular2
- [Medium](https://medium.com/weareaize/creating-a-loading-indicator-using-rxjs-and-the-withloading-pattern-8add4500008e) - creating a loading indicator using rxjs and the with loading pattern
- [Blog](https://blog.dai.codes/handling-http-loadng-states-in-angular-with-rxjs/) - handling http loading states in angular with rxjs
- [Stack Overflow](https://stackoverflow.com/questions/75777093/spring-boot-pass-file-through-form) - spring boot pass file through form
- [Spring Content](https://paulcwarren.github.io/spring-content/) - spring content
- [Stack Overflow](https://stackoverflow.com/questions/73284094/how-to-store-profile-pictures-in-spring-boot-rest-api-application) - how to store profile pictures in spring boot rest api application
- [Stack Overflow](https://stackoverflow.com/questions/76312588/angular-effects-and-conditional-use-of-signals) - angular effects and conditional use of signals
- [Blog](https://danielk.tech/home/basic-auth-state-management) - basic auth state management
- [Stack Overflow](https://stackoverflow.com/questions/45082603/p-fileupload-does-not-work-more-than-once-primeng) - fileupload does not work more than once primeng
- [Github](https://github.com/primefaces/primeng/issues/4018) - When using custom file uploads, selected file does not clear
- [Stack Overflow](https://stackoverflow.com/questions/73295132/how-do-i-bind-a-primeng-file-upload-component-to-my-angular-form-control) - how do I bind a primeng file upload component to my angular form control
- [Stack Blitz](https://stackblitz.com/edit/jhcz9a?file=src%2Fapp%2FFileUploadControlValueAccessor.directive.ts) - FileUploadControlValueAccessor