# census-data-query-back

To run:

- clone github repo
- npm install
- create a .env file with the RDS connection data
(DB_HOST,
DB_USER,
DB_PASS,
DB_DATABASE,
DB_SSL)
- nodemon script
  (- send queries from the front-end application)

Purpose

This node back end queries a remote Amazon RDS for census data. It returns the relevant data for that query key in JSON format.

Example end point

http://localhost:1337/api/censusDB?key=education
