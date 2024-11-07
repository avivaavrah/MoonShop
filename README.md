# MoonShop

MoonShop Web Store
A simple web store application to present a list of offers and allow users to purchase items. Each offer has a purchase limit for each user, tracked independently.

Getting Started:

These instructions will help you set up and run the app locally.

1. Prerequisites
    Visual Studio Code (VS Code) - Code editor.
   
    Node.js - JavaScript runtime.
   
    MongoDB Compass - GUI for MongoDB.

3. Installation
    Download the MoonShop project 

    Open the folder in VS Code.

    Install dependencies for both frontend and backend:

    cd ../moon-shop-backend
    npm install
    cd ../moon-shop-frontend
    npm install

4. Import Database Data
    Open MongoDB Compass and connect to your MongoDB instance.
   
    In the Compass interface, create a new database named moon-shop.
   
    Within the moon-shop database, create a collection named offers.
   
    Import the offers.json file:
   
    Go to Collection > Import Data.
   
    Select ...\moon-shop-backend\db\offers.json to import the initial data.


6. Running the Application
    Start the backend server:

    cd moon-shop-backend
    node index.js
   
    The backend server will be running on http://localhost:5000.

    Start the frontend application:

    cd moon-shop-frontend
    npm start
   
    The frontend server will be running on http://localhost:3000.

8.  URL Example and Configuration

    Once both servers are running, open http://localhost:3000?userId= {userId} in your browser.
    The offers page will display a list of items available for purchase.
    The userId variable is a string, for example http://localhost:3000?userId=userId123
    If you won't send a userId in the url, default user id will be set.
    To change the user, simply change the variable value : http://localhost:3000?userId=userId124

    To make a purchase, simply click on the offer button. Each user has an independent limit for purchasing each offer.

    Additional Notes
    If you open multiple tabs or run the application in different browsers with the same userId, the purchase limit will be shared across those instances, simulating multiple purchases by the same user.
