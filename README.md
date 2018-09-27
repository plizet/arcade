This Arcade project is merely a "having fun while discovering new technologies" project for me.

Feel free to create a pull request with your own game added to it if you feel like it!

You can test the app [here](https://plizet.github.io/arcade/).

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
You can find the most recent version of the Create React App guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Table of Contents

- [Folder Structure](#folder-structure)
- [Adding a game](#adding-a-game)
- [Available Scripts](#available-scripts)
  - [yarn start](#yarn-start)
  - [yarn run build](#yarn-run-build)

## Folder Structure

After creation, your project should look like this:

```
arcade/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    components/
      App/
      Games/
        [GameName]/
    fonts/
    redux/
      app/
      [gamename]/
      store.js
    index.css
    index.js
    logo.svg
```

For the project to build, **these files must exist with exact filenames**:

* `public/index.html` is the page template;
* `src/index.js` is the JavaScript entry point.

You can delete or rename the other files.

You may create subdirectories inside `src`. For faster rebuilds, only files inside `src` are processed by Webpack.<br>
You need to **put any JS and CSS files inside `src`**, otherwise Webpack won’t see them.

Only files inside `public` can be used from `public/index.html`.<br>

## Adding a game

Here are the minimum required things to do in order to add a game to this arcade:
* Add an entry in the GAMES constant in src/redux/app/settings.js: `{ active: false, author: 'Your Name', id: lastId + 1, name: 'Your Game Name' },`
* Import your game in src/components/App/App.jsx and add the case matching the id in the `renderGame` method
* Add a folder named after your game in src/components/Games/
* If you need to use redux, add a folder named after your game in src/redux/ and add your reducer to the global one in src/redux/store.js
* If you want to use the keyboard/arcade controls:
  * add a prop `parentHandleKeyDown` to your main game component
  * in `componentDidMount`, remove the parent keyboard listener: `window.removeEventListener('keydown', this.props.parentHandleKeyDown);`
  * in `componentWillUnmount`, don't forget to add the parent keyboard listener: `window.addEventListener('keydown', this.props.parentHandleKeyDown);`
* The dimensions of the screen usable by your game are found in the store under `state.appReducer.screenHeight` and `state.appReducer.screenWidth` or as constants (if your game does not use redux) names `SCREEN_HEIGHT` and `SCREEN_WIDTH` in src/redux/app/settings.js

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.