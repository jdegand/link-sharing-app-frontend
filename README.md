# Link Sharing App Frontend

This is inspired by the [Link Sharing App Frontend Mentor Challenge](https://www.frontendmentor.io/challenges/linksharing-app-Fbt7yweGsT). I have taken some liberties, as the design does not fully account for authentication.

## Screenshots

![](screenshots/frontendmentor-link-sharing-app-mobile-1.jpg "Frontend Mentor Mobile Design")

## Built With

- [Angular](https://angular.dev)
- [Angular CLI](https://github.com/angular/angular-cli) version 17.0.7.
- [Prime Ng](https://primeng.org/)
- [Prime Icons](https://primeng.org/icons)

## Thoughts

- I started the app by building out the dynamic reactive form to add the links.
- I used `FormBuilder`. FormBuilder has implications for adding custom validators, as there can be extra snags and TypeScript issues.
- This [StackBlitz](https://stackblitz.com/edit/angular-custom-validator-formgroup-formarray?file=src%2Fapp%2Fapp.component.ts) was a great help.
- I had included the errors in the wrong place, so I moved the error message conditional statement into the `for` loop for the link controls. This change helped to localize the errors for each link group.
- Creating a regex to handle every error scenario and URL deviation is very difficult and time-consuming. It is very difficult to trust a regex. Using a custom validator seems to be the best choice to make sure the URL matches the selected platform.
- I went through many changes to the regex. I also looked into using the [URL API](https://developer.mozilla.org/en-US/docs/Web/API/URL) inside a custom validator to validate the URL value.
- Material Design icons have removed all third-party icons. See [Github](https://github.com/google/material-design-icons/issues/166) for more. `facebook` still works, but it is deprecated and will be removed shortly. None of the other select options have working icons. It would have been nice just to use a `mat-icon` inside a `mat-option` of a `mat-select`. This really negates a big benefit of switching the form to an Angular Material form.
- Adding a little icon to each input is a lot more involved than it really should be.
- I also had problems using `mat-label` and the `for` attribute with a dynamic index. I had to add `CUSTOM_ELEMENTS_SCHEMA` to the schemas array of the home component to use the `for` attribute.
- After removing the `for` attributes and just using `mat-label`, Chrome complained about there being no `id` matching the generated `for` attribute.
- I also had trouble getting the `mat-select` working correctly.
- If you have to add `CUSTOM_ELEMENTS_SCHEMA`, you probably have a misconfiguration.
- Ultimately, I think there is limited benefit in converting the form to use Angular Material.
- I did some research and decided to use `primeng` and `primeicons`.
- Prime Ng has third-party icons. It is almost as feature complete as Angular Material (I would later find out that it doesn't have any copy-to-clipboard features).
- Prime Ng doesn't have an `ng add` command, so you have to add theme styles to the `angular.json` yourself.
- Prime icons require a single import in the global `styles.css` file.
- `FormField doesn't have a name or id` warning in the browser console, so I added a name with the `index` to the URL input.
- It is tough to associate a label with the dropdown. The `ng-template` cannot take an ID.
- I think the ng-template loop creates IDs for each dropdown option.
- The dropdown's `name` property is `platform`.
- Firefox doesn't show an error for the label. Firefox had quite a few warnings associated with the `primeng` styling.
- To fix this label issue, I may have to refactor again.
- In Chrome, the error choice is `incorrect label use` or `no label associated with a form field`.
- I used the [Messages Module](https://primeng.org/messages) to show inline errors on the forms.
- `visible` in the menubar does not update from state changes. It is only evaluated once.
- Is it best to localize the navbar per page versus adding it once to the `app` component? This strategy would lead to a lot of duplicated code.
- `primeng` has a design philosophy to minimize conditionals in templates.
- One strategy I have seen for primeng navbars is to use `ngIf` to conditionally render them. Basically, you show no menubar when unauthenticated. I searched Github, and [this](https://github.com/softrams/bulwark/blob/master/frontend/src/app/navbar/navbar.component.html) is an example of that strategy.
- Initially, I used a `computed` signal to update the menu items. Since I am using a signal for the auth state, this made sense, and I was able to toggle menu items. However, when I tried to add `visible` and `fragment` to the menubar, I encountered problems.
- `computed` menubar fragments are missing on first-run navigation. You can use `visible` to have the links added when the fragment is available. I envisioned using either approach to allow the profile route to be unique and shareable.
- I don't think the fragments are `recomputed` inside `computed` or `effect`. See this [Stack Overflow article](https://stackoverflow.com/questions/76312588/angular-effects-and-conditional-use-of-signals).
- I changed to use `effect` in the navbar component, as `computed` is not intended to have conditionals. See [Github](https://github.com/angular/angular/issues/49161) for more.
- Using `computed` or `effect` did not change the fact that fragment and visible parameters were not evaluated in time for the first navigation to a route, so I created a separate `public-profile` page that can be shared.
- I initially used the [Realworld API](https://realworld-docs.netlify.app/docs/specs/frontend-specs/api) and my [Angular Auth repo](https://github.com/jdegand/angular-auth) as a starting point for authentication.
- Using a signal for authentication state is a [new strategy](https://www.youtube.com/watch?v=R8a8ituFkls). See this [video](https://www.youtube.com/watch?v=foUS5JlDlCs) for how signals and RxJs can work together for authentication.
- Creating a simple guard to prevent a user from visiting `login` and `register` when authenticated was difficult.
- Since auth signal is only saved in memory, a refresh or typing a URL erases the signal state. By persisting the auth signal, you can add a guard to `register` and `login`. A user visits the routes, but sees nothing on the page besides the navbar.
- Even if you conditionally remove links from the menubar, a user can visit those routes typing the correct URL.
- Instead of using a guard for the `register` and `login` pages, you can check for the auth signal in the constructor and redirect based on the state of the auth signal. I got the idea from looking at this [Github project](https://github.com/joshuamorony/angularstart-chat/blob/main/src/app/auth/login/login.component.ts).
- Signals and guards are a problematic combination. If you change the signal to an observable, you create a memory leak. See [Github](https://github.com/angular/angular/issues/51280) for more.
- I used [FileUpload](https://primeng.org/fileupload) to save a profile picture.
- I did not add the `FileUpload` component to the existing form originally. I used the `url` action to send the file to the backend. I used the `onUpload` and `onError` methods to handle successful and unsuccessful API responses. I refactored to send `formData` back to the backend. You have to loop over the `formData` object to see the values and you will have to ignore TypeScript issues.
- To reset the file input, I used a `ViewChild` ref. I tried to pass a form template variable on the file input to the `onUpload` function and call the `clear` method inside that function, but it did not work, although the file was correctly saved. `ViewChild` is an easy way to grab the template variable, and you can call the `clear` method on the `ViewChild` variable. I had to use `any` for the TypeScript type. I fixed the typing for the `ViewChild` variable by using `ElementRef`.
- Prime Ng does not have a `Clipboard` component. [Angular Material CDK](https://material.angular.io/cdk/clipboard/overview) has a clipboard directive. In lieu of adding that dependency, I used the [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API). The clipboard API can be blocked by the [Permissions API](https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API) if you don't use the clipboard API in conjunction with a user click.
- Using binding, you can sanitize (albeit not fully (hrefs are still displayed)) DOM input. The profile image is `base64` and I did not sanitize it. I used `src="data:{{userInfo.profile.fileType}};base64,{{userInfo.profile.img}}"` inside the `img` tag. I could not bind the image value to `[src]` because the type of `img` was `File`. I needed to change it to `string` for the binding to work. I duplicated `UserInfoDto` into `Preview` and created a separate `ProfileDto` with `img` being set to `string`. This is a marginal improvement. If you were to inject and use `DomSanitizer`, I think it might be best to construct the string separately and save the sanitized output to another variable that you would then use in the template.
- I used `take` to unsubscribe from my observables. You could manually call `unsubscribe` or convert to a declarative approach with async pipe.
- I have a jwt decoder service that can be used in combination with the auth guard to prevent a user from accessing routes if the jwt is expired. I have not done that, as the interceptor can refresh the access token. So a user with an expired token can access the links and profile pages and the token will be refreshed when those page's forms are submitted. The preview page refreshes on route navigation.
- Initially, I had a simple, functional interceptor. I converted that to a class based interceptor. The interceptor does a lot, and it could be possible to refactor into multiple interceptors. The backend had problems when an expired token header was attached to refresh token requests. Although the refresh route permitted all users, an `ExpiredJwtException` would still be thrown and prevent a response back to the frontend. I refactored to make sure the header would not be set at all on refresh requests.
- I have two different API requests (`GET` and `POST`) to get the refresh token.
- [VS Code](https://github.com/microsoft/vscode/issues/205651) does not plan on supporting the new Angular control flow syntax. Apparently, [JS Beautify](https://github.com/beautifier/js-beautify/issues/2219) is used by VS Code, and it added control flow formatting that is not perfect, so the formatting option for it is turned off by default. It seems like it will be some time before formatting for the new control flow syntax is handled error-free. `Prettier` may be necessary.
- I periodically add linting with `ng add @angular-eslint/schematics`. I lint, fix the errors, and remove the dependencies.
- The register page's `p-password` and label were correctly associated. The documentation was not clear. This [github issue](https://github.com/primefaces/primeng/issues/13952) shows a solution, but there still seems to be issues with the `p-password` component.
- A lot of primeng components have accessibility issues. I used `ariaLabelledBy` to get around issues where a label `for` attribute would not work.

## Continued Development

- Allow multiple links for same platform? Need another custom validator to prevent it?
- Dark Mode added to Navbar
- Styling
- Drag and Drop functionality on Preview page
- Testing (I left the Karma and Jasmine packages installed)
- TypeScript improvements. Zod?
- Handle failed submit -> need to loop through controls and mark them as touched or dirty to get inline errors to display
- Best to refactor `Preview` template into more components?
- Convert class based interceptor into a functional interceptor? Refresh token expiration ?

## Useful Resources

- [Image Color Picker](https://imagecolorpicker.com/)
- [Transform Tools](https://transform.tools/) - JSON to TypeScript converter & more
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
- [Stack Overflow](https://stackoverflow.com/questions/41825698/add-custom-headers-before-upload-with-primengs-fileupload-component) - add custom headers before upload
- [Stack Overflow](https://stackoverflow.com/questions/45672235/hide-upload-button-primeng) - hide upload button primeng
- [Reddit](https://www.reddit.com/r/Angular2/comments/qwt1k9/primeng_pfileupload_reactive_form_approach/?rdt=35579) - primeng file upload reactive form
- [Stack Overflow](https://stackoverflow.com/questions/50677868/error-ts2339-property-entries-does-not-exist-on-type-formdata) - property entries does not exist on type formData
- [Stack Overflow](https://stackoverflow.com/questions/55591871/view-blob-response-as-image-in-angular) - view blob response as image in angular
- [Stack Overflow](https://stackoverflow.com/questions/33923985/parameter-is-not-of-type-blob) - parameter is not of type blob
- [Stack Overflow](https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript) - creating a blob from a base64 string in javascript
- [Medium](https://netbasal.com/how-to-implement-file-uploading-in-angular-reactive-forms-89a3fffa1a03) - how to implement file uploading in angular reactive forms
- [Stack Overflow](https://stackoverflow.com/questions/7120456/how-to-get-file-type-extension-from-byte-blob) - how to get file type extension from byte blob
- [Stack Overflow](https://stackoverflow.com/questions/35618463/change-route-params-without-reloading-in-angular-2) - change route params without reloading
- [Stack Overflow](https://stackoverflow.com/questions/47057696/how-to-use-es6-template-literal-as-angular-component-input) - es6 template literal as angular component input
- [Stack Blitz](https://stackblitz.com/edit/angular-clipboard-example?file=src%2Fapp%2Fapp.component.ts) - Clipboard API and Angular
- [Stack Overflow](https://stackoverflow.com/questions/60581285/execcommand-is-now-obsolete-whats-the-alternative) - execCommand is now obsolete whats the alternative (there is none.)
- [Stack Overflow](https://stackoverflow.com/questions/72109664/how-to-show-primeng-tooltip-only-on-click) - how to show primeng tooltip only on click
- [Stack Overflow](https://stackoverflow.com/questions/74645689/upload-files-using-reactiveforms-and-fileupload-component-angular) - upload files using reactive forms and file upload component angular
- [Stack Overflow](https://stackoverflow.com/questions/64319089/primeng-listbox-how-to-allow-re-ordering-of-items-via-drag-and-drop) - primeng listbox how to allow reording of items vis drag and drop
- [Medium](https://medium.com/@bakhtmunir/refresh-token-in-angular-e212c2adaa77) - refresh token in angular
- [YouTube](https://www.youtube.com/watch?v=HXwj-_mii3c) - How Interceptors EASILY implement Refresh Tokens in Angular!
- [Stack Overflow](https://stackoverflow.com/questions/66074693/warning-sanitizing-unsafe-url-value-datatext-htmlbase64) - warning sanitizing unsafe url value datatext htmlbase64
- [Stack Overflow](https://stackoverflow.com/questions/38812993/base64-to-image-angular-2) - base64 to image angular 2
- [Medium](https://betterprogramming.pub/angular-vs-interceptors-guide-c256b72f3415#:~:text=This%20means%20that%20if%20you,you%20should%20use%20a%20guard.) - can activate vs interceptors guide
- [Angular University](https://blog.angular-university.io/angular-if/) - angular if
- [Stack Overflow](https://stackoverflow.com/questions/59208257/file-input-event-type-in-angular) - file input event type in angular
- [Stack Overflow](https://stackoverflow.com/questions/77477534/how-can-i-use-async-pipe-with-defer-to-load-and-declare-variable-in-template-in) - how can I use async pipe with defer to load and declare variable in template
- [Stack Overflow](https://stackoverflow.com/questions/45082603/p-fileupload-does-not-work-more-than-once-primeng) - p fileupload does not work more than once primeng
- [Dev.to](https://dev.to/rensjaspers/stop-pretending-the-error-never-happened-1pfn) - stop pretending the error never happened
- [Medium](https://codereacter.medium.com/goodbye-async-pipe-hello-signals-w-ngrx-signals-f61f1f3074bd) - goodbye async pipe hello signals w ngrx signals
- [Medium](https://itnext.io/migrate-angular-interceptors-to-function-based-interceptors-90bd433e0c2a) - migrate angular interceptors to function based interceptors
- [Stack Overflow](https://stackoverflow.com/questions/55711337/angular-http-interceptor-subscribing-to-observable-and-then-returning-next-handl) - angular http interceptor subscribing to observable and then return next handl
- [Blog](https://danielk.tech/home/angular-retry-an-http-request) - angular retry an http request
- [Stack Overflow](https://stackoverflow.com/questions/76851243/angular-interceptor-always-get-null-value-accessing-the-accesstoken-from-local) - angular interceptor always get null value accesing the access token from local
- [Stack Overflow](https://stackoverflow.com/questions/77840978/how-to-use-functional-interceptor-for-refreshing-token-in-angular-17) - how to use functional interceptor for refreshing token in angular 17
- [Stack Overflow](https://stackoverflow.com/questions/58377068/remove-authorization-header-for-some-http-calls-angular) - remove authorization header for http calls angular
