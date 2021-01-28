## Project

Drink And Rate, a MERN app where you can record scores to your beverages to share and display with others. Various pages outlay data relating to drinks, drinkers, ratings, companies and their countries of origin.

## Project Status

Currently in development. The various pages are at varying stages of completion with regards to information displayed and design. The add drink function is currently in development and drinks can be uploaded via the MongoImport command via terminal.

## Project Screenshots

As of 28/01/2021

![Main Table (ReadmeImagesFolder/MainTable.png)]
- Here all drinks and be viewed and searched for

![Drinkers Page (ReadmeImagesFolder/DrinkersPage.png)]
- Here data on each drinker can be viewed

![All Rating Words (ReadmeImagesFolder/RatingWordsAll.png)]
- Here data on every rating word used can be seen

![Selected Rating Word (ReadmeImagesFolder/RatingWordSelected.png)]
- By selected a word you can view how many times it has been said and who by. By selecting a chart segment you can see just that person's drinks described by that word.

![Sessions Page (ReadmeImagesFolder/Sessions.png)]
- Here you can see drink numbers for each gathering.

![Breweries Page (ReadmeImagesFolder/BreweriesPage.png)]
- Here you can search for and see ratings pertaining to each individual brewery, cidery or distillary.

![US Map Page (ReadmeImagesFolder/USPage.png)]
- Here you can see data relating to drinks drunk from the United States, choosing to limit them to just beers and ciders if preferred. Clicking each state reveals drinks drunk from that state along with data on individuals who have had drinks from that state.

## Installation and Setup

To gain a copy of the app you can use

### `npm install`

For security the app comes with Auth0 securing all routes via index.js in the front-end folder. The 'Auth0Provider' can either be removed or you can set up your own Auth0 account and a .env file where you can store your Auth0 Domain, Client_ID and Audience keys.

In the api folder, api.js secures access to the data via json web tokens. You can establish your own .env file here where you can also include the Auth0 Domain and Audience keys alongside your MongoDB URI to secure your information (or remove these lines if you wish to store data locally or with no security).

Each browser route is separated into its own folder branch in the fe folder, plus folders for auth0, stylesheets and my own utilities. Only the index.js and my custom hooks are in the main folder.

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Ongoing Reflection

I began design on this app during the early stages of the government's Covid lockdown as a way to maintain and develop my skills using Javascript alongside React, Express, Node and MongoDB.

I've managed to gain a good grasp on React Hooks having previously mainly stuck to React Classes and lifecycle methods to construct applications. This is also the first application I've built where I've used Auth0 to manage site entry.

I'm in the process of learning more and more about data manipulation and visualization, having created multiple tables and charts to display the information relating to over 2500 beverages. Each drink can have up to six different mixers with varying degrees of information. I'm still in the process of establishing different ways of storing and displaying this data.