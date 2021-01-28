## Drink and Rate - NodeJS Back-end

api.js secures access to the data via json web tokens. You can establish your own .env file in this folder where you can also include the Auth0 Domain and Audience keys alongside your MongoDB URI to secure your information (or remove these lines if you wish to store data locally or with no security).

The add drink function is currently in development and drinks can be uploaded via the MongoImport command via terminal.

Mongo is currently used to store data in three different databases and the format for the data can be found in the ./modules folder. Drinks objects are used to store all information about each drink for data purposes, while peopleNames and drinkTypes are used to store a small number of names for display in charts and dropdown menus.