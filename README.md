# Amaro Builder Site

### A Liqueur and Syrup recipe builder site using MERN stack.

## Idea

Original concept is from a spreadsheet by reverblueflame available [here](https://docs.google.com/spreadsheets/d/1AhiRiem8g8Quiu_OruYpW2sxqpdqvNajwGk9833c734/edit#gid=287178337). I have found this spreadsheet very useful in making liqueurs and syrups, but find the usability of Google Sheets (and certain choices in the structure of this particular spreadsheet) to be inadequate.

This site is built as a personal learning project as well as to improve my own experience.

## Features

As opposed to a Google Sheets document, the amaro builder: 

- Search for ingredients by name & description
- Reorder ingredients in recipe
- Save recipes without copy & paste
- Save dedicated process details and tasting notes to a recipe, in a consistent manner
- Add new ingredients while working on a recipe
- Change ingredient amounts without changing default starting points

There are some other features to be implemented, such as a recipe viewer, ingredient viewer & editor, use of any recipe as a quick template and autoscaling of ingredient amounts. 

## Technologies used:

This list is not conclusive.

- Vite & React for Frontend
  - creatable-select for ingredient search + quick creation
  - dnd-kit to provide drag&drop for ingredient table, process list & notes list
  - TailwindCSS for styling
- Express, NodeJS for Backend
  - mongoose to communicate with DB
- MongoDB for Database

