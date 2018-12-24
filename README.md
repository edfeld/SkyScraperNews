# SkyScraperNews
Scrape news article and store on MongoDB.  Allow users to comment on them.  

This app scrapes news story information from the Huffington Post website.

This web app uses the following packages:

   1. express
   2. express-handlebars
   3. mongoose and Mongo
   4. cheerio
   5. axios

To run this app, go to this link: https://agile-inlet-23133.herokuapp.com/

Saved articles may exist in the database. If article exist, these will display on the main page.  If no article are displayed, click on the `Scrape Article` text in the top navigation bar.  New articles will be scraped from the Huffington Post and will display on the page.

A user can choose to delete all articles using the `Delete Articles` menu option in the navigation bar. Users will be prompted to confirm if they want to delete all articles from the database.  Comments will also be deleted.

A user can click on the article titles with the hyperlink to view the article content. The article will open in a new page.  If the user closes the article they can navigate back to the articles page.

A user can click on the `Open Comments` button to see comments for an individual article.  This opens in a separate page.

On the comments page uses can add comments and delete comments. These are stored in the database in the comments container.  Comments are tied to artcles through a reference in the Articles container.