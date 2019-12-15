# Packers News Web scraper
- Javascript web scraper, hosted on Heroku, requiring Express, Axios, Cheeroio, Morgan, and MongoDB / Mongoose OM to handle and store data. Data is stored in an MLab database via Heroku.

**ABOUT THIS APP** 
- Packers News Scraper is a javascript application that pulls the latest news from the Packers.com "All News" subsection. It stores a link to the news article, the title of the article, a caption image, and brief summary. 
- The user is required to scrape the news via the "Pull the latest news" danger button. It is then stored in the MLab database and displayed on the Home Page. Users can select which articles they would like to Save, and view these articles on the "Saved Articles" page. When the user  visits the Saved Articles page, they have two choices for each article; remove from Saved Articles, or comment. All comments are stored in the Mlab database for the user to view later. 

- Express is is required for running the application. Cheerio is required for scraping the data from the Packers website.  Morgan is required for logging in node.js. 

- Once the data is scraped, it is then pushed to the MongoDB via Mongoose, and accessed via Axios requrests. Lastly, it is displayd on the Home page using Express-Handlebars. 

**Link to Heroku**
https://packers-scraper.herokuapp.com/

**Purpose of this app**
- This app was fundamental in solidifying the programmer's (myself, Logan McNulty) knowledge of working with Cheerio, Mongoose, and Mongo DBs specifically. The rest of the required packages I was already familiar with.

**Modules required, and their Documentation Links**
- Express webframework 
https://expressjs.com/en/api.html

- Cheerio 
https://cheerio.js.org/

- Axios
https://www.npmjs.com/package/axios

- Morgan
https://www.npmjs.com/package/morgan/v/1.1.1

- Mongoose
https://mongoosejs.com/docs/api.html

- Express Handlebars
https://www.npmjs.com/package/express-handlebars

- 