# Weather app

Live at https://wwweather-sand.vercel.app/

## Local setup

1. Clone the repo
2. `npm i`
3. `npm dev` will run the app with Vite dev server
4. `npm test` to run the tests

## App structure

### Functionality

The app has 2 pages:
* "/" - displays list of locations and their weather
* "/:location" – shows weather details for specified location
* you can add/remove locations, your changes are saved in localstorage

### Tech stack

* React, TypeScript
* ESLint / Prettier
* [Vite](https://vitejs.dev/) blazing fast build system
* [react-query](https://tanstack.com/query/latest) - to cache server state and have handy fetch hooks
* [react-router v6](https://reactrouter.com/en/main)
* [Vitest](https://vitest.dev/) unit-test framework
* [React testing library](https://testing-library.com/docs/react-testing-library/intro/)
* [Mock service worker](https://mswjs.io/) – use it for integration tests with vitest and RTL.
* Deployed with [Vercel](https://vercel.com/)

### Folder structure and naming

* Use [screaming architecture](https://levelup.gitconnected.com/what-is-screaming-architecture-f7c327af9bb2) pattern as opposed to putting all the similar things by type into one folder. 
* [Colocate things](https://kentcdodds.com/blog/colocation) as much as possible. If something is not used outside the feature, there is no point to have it outside the feature-folder. Exceptions are possible though.
* Use kebab-case for file/folder names. [Why?](https://profy.dev/article/react-folder-structure#:~:text=stays%20the%20same.-,kebab%2Dcase%20for%20file%20and%20folder%20names,-Like%20many%20others)

### Potential improvements

Well, functionality and design could be way better, that goes without saying. 

Just a few tech related things below.

#### Approach to testing

You can always write more tests 🙃

Mostly, I write unit tests for utility functions or small presentational components without too many dependencies. 
In this project I didn't bother with that as both pages of the app covered pretty well with the integration tests.

#### Approach to styling

I didn't use any particular thing here (only the slightest hint of [BEM](https://getbem.com/naming/)) as the project is quite small and regular CSS does the job here.
For a real project I would probably prefer [tailwind](https://tailwindcss.com/). 
