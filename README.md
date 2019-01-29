
# HR A11y
This is an application for demoing the full Deque Worldspace tool suite.

## Tech Stuff
We use a variety of tools and frameworks in this project to make life _easier_. Here are the main things to know...
* **Strapi** - Strapi is a headless CMS for Node applications. We are using it for auth, permissions, and as a general API service for data transportation. Check [this link](https://strapi.io/) for more info on Strapi.
* **MongoDB** - This is the underlying data source. Everything is stored here and is provided to the front-end via the API layer.
* **React** - The front-end is built entirely on React. It's pretty cool.
* **Webpack** - (_Only for dev mode_) Webpack helps us dev build, hot reload, and production build the front-end source.
* **Jasmine** - A popular test runner framework used in TDD (test driven development) practices.
 
## Getting Started
There are a few simple steps you need to follow to get this application up and running.

### Prerequisites
* NodeJS v10 (or greater)
* MongoDB v4 (or greater)
 
### MongoDB Restore
To use some good demo content, fill in the username and password on the command below to import the sample DB.

`mongorestore -u [USERNAME] -p [PASSWORD] --gzip --db "hr-a11y" db_dump/hr-a11y/ --authenticationDatabase=admin`

### Installation
First off, clone this repo `git clone git@github.com:dequelabs/hr-a11y.git`.

Open a command prompt, navigate to the project folder, and run `npm install`.
 
### Run It!

#### Dev Mode...
This will run the server and front-end seperately to make development easier. Since we are using [react-hot-loader](https://www.npmjs.com/package/react-hot-loader), the front-end runs on it's own and sets up a proxy to communicate with the server.
* Be sure that MongoDB is running!
* Start the server using `npm start`
* Start the front-end using `npm run start:dev`
* Navigate to [http://localhost:9999](http://localhost:9999) in your browser to view

#### Production / Demo Mode...
* Be sure that MongoDB is running!
* Build the project using `npm build`
* Start the project using `npm start`
* Navigate to [http://localhost:1337](http://localhost:1337) in your browser to view
