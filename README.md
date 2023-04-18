# Exercise Tracker

## Purpose

The exercise tracker itself is an API, built with the purpose of gaining
a better understanding of how server routes work and to gain exposure to mongoDB
through Mongoose.js.

## Features / How to Use
* You can create a user by sending a `POST` request to `/api/users/`
containing the username you wish to create.
* Runnning a `GET` request at `/api/users` will return the list of
all users.
* Running a `POST` request to `/api/users/:_id/exercises` will allow
you to create an exercise for the especified user id. Please note the
id you wish to create the exercise for is a URL parameter.
* Running a `GET` request on `/api/users/:_id/logs` will return a log
containing all the exercises associated with the user ID. Additionally,
if you include `query` parameters `from`, `to`, `limit`, you can filter
the exercises returned per user.

* An example would be 
`localhost:<port>/api/users/<id>/logs?[from=2001-01-03]&[to=2023-04-17]&[limit=3]`.
This query would return 3 exercises from 2001-01-03 to 2023-04-17. Please note
the format of the dates as (YYYY-MM-DD). Any other format will not be accepted
by the API.

Please also note the query parameters are enclosed in []. This means they are optional
and you do not need to provide all of them to obtain a log from a user.

## How to Run

### Part A: Setting Up MongoDB
1. The first thing you need to do is to set up a free MongoDB cluster. [Here](https://www.freecodecamp.org/news/get-started-with-mongodb-atlas/) are the instructions you can follow
to create one. This will allow you to store all your data.
2. On the MongoDB Atlas website, click on `Connect` then on `Connect to Application`. You
will get a string that you will need to populate with some options. It has the following
format:
`mongodb+srv://<username>:<password>@<clusteraddress>/<database_name>?retryWrites=true&w=majority`.
3. Fill it out with your username and password. Atlas gives you the cluster address.
4. After your cluster address and before the question mark `?` (query options), you can specify the name of the database
you want to save your data to. The string
Atlas gives you does not include the database name. If you don't give it a meaningful name, all your entries will be saved to a default `test` database.
5. Once you have filled out the mongoDB string, set `MONGO_URI` on your `.env` file to that address. Your `.env` file should look like this.
`MONGO_URI='mongodb+srv://<username>:<password>@<clusteraddress>/<database_name>?retryWrites=true&w=majority'`. Notice there are no spaces inbetween the equals sign. Adding spaces will cause errors.

### Part B: Setting Up This Application
1. Run `npm install` to install all the necessary dependencies for this project. These dependencies will also install `nodemon`, which you can use to run a server that will reload every time you save a file. 
2. Once all the dependencies are installed, you can run the server with `npm start` or if you want to run it with `nodemon`, you can type in `npm run dev`.

### Part C: Sending Requests
You can use your Web browser to interact with the API once it is running. The application runs on [`localhost:3000`](`localhost:3000`) by default. You can run it on a different port by defining `PORT=<port_number>` in your `.env` file.

You can send requests using the frontend provided, but if this is boring to you, I highly recommend using [Postman](https://www.postman.com/).

## Thoughts and Takeaways

This project was pretty challenging to implement. I had many difficulties along the way. These included dealing with dates and different time zones, complying with the FreeCodeCamp tests, dealing with different ways to structure schemas and the different ways in which data can be stored, the limitations of each approach, and dealing with deployment.

First, I had many difficulties implementing the expected responses. I stored the dates as date objects, and these dates follow the UTC format by convention. The tests required the strings to be in the EEE dd MMM YYYY, where EEE denotes the day of the week. Retrieving the dates using `.toDateString()` causes the string to be returned in local time. This was an issue because when the dates were supplied as `YYYY-MM-DD`, the `Date()` constructor assigns them a time at midnight. 
Calling `.toDateString()` converts them back to local time. If you are in a zone that's behind UTC time, the time will be taken back 4 hours, leading to an incorrect date being supplied. This application takes care of all timezone differences, so you don't have to worry about it when you run the app.

Another difficulty I ran into was retrieving documents stored in a different collection. This is the most efficient way to store data in the long run because each document has a 16MB max size in mongoDB. Storing data this way overcomes that limitation but is more challenging to retrieve. You can use `.populate()` for that purpose and provide parameters that I highly recommend you deal with before calling it. An alternative to this is [Aggregation](https://mongoosejs.com/docs/api/aggregate.html), but it can be difficult to understand.

The FreeCodeCamp tests were the most frustrating. Some of them will fail if you don't account for the dates to be in the right format. I could only find this once I dug deep into their Github to find how they were conducting the tests. Make sure dates are in the correct format and that you return the responses they expect.



