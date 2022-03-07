# Require Login

A simplistic app where custom content is only available after the user logs in.

It contains three pages:

1. A public "Welcome" page, with a link to the Log In page.
2. A "Log In" page, where you can enter (any) username. (To keep the demo simple, there are no authentication checks.)
3. A "Custom" page, where you will see your username displayed and a Log Out button. If you click on the Log Out button, you will return to the public "Welcome" page.

If you type a username after the domain name (e.g.: [http://localhost:3000/myUserName](http://localhost:3000/myUserName)), you will be invited to log in with that username.

If you type any other address in the browser address bar (e.g.: [http://localhost:3000/non/existant/path](http://localhost:3000/non/existant/path)), you will be redirected to the public "Welcome" page. 

---

## React Features Used

This app uses the following features:

React
* [useState](https://reactjs.org/docs/hooks-state.html)
* [useContext](https://reactjs.org/docs/context.html)
* [useEffect](https://reactjs.org/docs/hooks-effect.html)
React Router Dom
* [BrowserRouter, Routes and Route](https://reactrouter.com/docs/en/v6/getting-started/overview)
* [useParams](https://reactrouter.com/docs/en/v6/api#useparams)
* [useNavigate](https://reactrouter.com/docs/en/v6/getting-started/overview#navigation)
* [Navigate](https://reactrouter.com/docs/en/v6/api#navigate)
* [Outlet](https://reactrouter.com/docs/en/v6/api#outlet)
* children
* redirectTo
* nested routes

You might like to watch [this video](https://www.youtube.com/watch?v=zCgruoRUxlk) for demonstration of a similar feature.

---

## Routes

The `<App />` component (found in App.jsx), creates a set of nested routes, each of which renders a different component:

* The `<Home />` component is simply a parent that the components for he four other routes are nested in. It contains an `<Outlet />` component where any nested components are rendered.
* The `<Welcome /`> component is the public page which is displayed by default when you visit the `/` route.
* The `<Login />` component contains an input field and a button that allows you to simulate a log in action. However, for simplicity there are no authentication checks. Any username that you enter will be accepted automatically. This is shown when the route is `/login`.
* If a single item is entered after the `/`, it is treated as a username.However, the `<RequireLogin />` component that is used as the `element` of the route does not render anything directly. Instead, it checks if a `loggedInUser` has been registered. If so, it redirects to the `<Personal />` component. If not, it redirects to the `<Login \>` component.
* Finally, if the user enters any path other than `/`, `/login` or `/<someusername>` (such as `/no/known/path`), the final Route simply navigates back to `/`, and the Welcome component is rendered instead.

## Context

The logic of the `<Login />` and `<RequireLogin />` components is handled by a `UserContext` context, at `src/contexts/UserContext.jsx`.

The `UserContext.jsx` script exports two objects:

1. A `UserContext` object, which any component can import. Importing the `UserContext` object gives the importer component access to the `value` property of the `UserContext`'s `Provider` object, as described below.
2. A `UserProvider` component, which wraps the `UserContext.Provider` and provides it with a custom `value` object. It also acts as parent for any children of the `<UserProvider />` component. Any such children will be able to access the custom `value` object, through a call to `useContext`.

If you look at the `App.jsx` file, you will see that it imports `UserProvider`, and that the `<Routes>` component (and all its `<Route>` children) are nested inside `<UserProvider>`. This is the first step that allows a Context to share its data.

### UserContext.Provider value

The `UserProvider` object creates a set of variables and functions, governed by `useState`:

* `loggedInUser` starts as `undefined`, but can be set to a string when the `logIn` function is called. Non-empty strings are *truthy*. This will be used in `RequireLogin.jsx` as a shortcut for determining if a user is logged in or not.
* When `logIn` is called, React Router's `navigate` method is called. It will change the entry in the browser's address bar either to `/<someusernamestring>` or `/`, if the user logs out. When `logIn` is called, React Router's `navigate` method is called. It will change the entry in the browser's address bar either to `/<someusernamestring>` or `/`, if the user logs out.
* The `urlUser` may be used to store a user named that has been typed manually into the URL address bar, so that it can be provided as the default username in the `<Login />` component.
* The `setUrlUser` function allows `urlUser` to be set.

These four state variables and functions are made available through the `value` object of the `<UserProvider />` component. They can be accessed and called from any component that is both a child of the `<UserProvider />` component and which calls `useContext(UserContext)`. This is described below.

## RequireLogin

The `<RequireLogin />` component does not directly render anything itself. Instead, it imports `UserContext` and checks whether the value of `loggedInUser` is truthy (a non-empty string) or not. If so, it renders the component that is provided as its "children": the `<Personal />` component. If not, it uses `Navigate` to redirect to the `/login` route.

In order to be user-friendly, it checks for the `:username` param from the URL, and calls `setUrlUser()` with this value. This means that the `<Login />` component can use the value of `urlUser` as the default for the username input field.

Because of the immediate redirect, a url such as `/George` will immediately be replaced by `/login` in the browser's address bar, but the value `George` will have been saved in `urlUser`, so it will still be available.

## Login

The `<Login />` component displays an input element. The default value of the input element is the `urlUser` that is shared by the `UserContext`. If the visitor reaches the Login page from the Welcome page, `urlUser` will be undefined. If the visitor types in the address for the Login page directly as `/login/George`, then `urlUser` will be `George` (or whatever other username the visitor typed in the address bar).

When the visitor presses the Log In button, the value of the input field will be sent as an argument to the `logIn` function in `UserContext`. If this value is not an empty string, then `UserContext`'s `loggedInUser` variable will be truthy, and so the `<RequireLogin />` component will display the personal page for `/George` (or whatever other username is given.)

Indeed, the `logIn` function will explictly navigate to that page.


## Log Out

The Log Out button on the Personal page simply calls the `logIn` function in `UserContext`, without a string username. The argument received by the `logIn` function will be an event object, and so an empty string will be used instead when `loggedInUser` is set.

An empty string is falsy so the `logIn` function will explicitly navigate back to the public `/` Welcome page.