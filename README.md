# cinestat
[A tool](https://cinestat.victor.avasiloaei.com) that gives you more insight into your movie watching habits and provides fun information about the movies you watched, based on your IMDb rating history.
An example of what the stats look like can be seen [here, on my own movie ratings history](https://cinestat.victor.avasiloaei.com/#/stats/5b01501ee6eab64216940a2f).
This application is not affiliated wih IMDb in any way.

## Who can use this?
It can be used by anyone with a IMDb user account that has made it a habit of rating movies after watching them.

## How does it work?
* I already have an IMDb account
  * Log in to IMDb
  * Click on your name in the top right
  * Click on Your Ratings
  * Click on the three vertical dots - it's a menu!
  * Click on Export - this will download a CSV file to your computer.
  * Go to the [app](https://cinestat.victor.avasiloaei.com) and upload the file.
* I don't have an IMDb account
  * Things get tricky if you don't have an account as the application can (for now) only parse information from a file in the structure exported by IMDb. The file itself is a regular CSV file which can be open with most/all spreadsheet software such as Microsoft Excel.
  * You can grab a template of the IMDb ratings export from [here](https://cinestat.victor.avasiloaei.com/static/example.csv)
  * Fill your movie ratings historical data in manually. If you're tech savvy enough and can do it automatically somehow, that's obviously also an option.

## What about the privacy of my data?
No information is sent to a server - all the data parsing happens in the browser. No need to be afraid of being shamed by your friends for the movies you watched. Unless...

## What if I do want my friends to see my ratings?
Once the app parses your uploaded CSV, you also get the option of sharing your movie watch history with other people. It's your choice who you share this with. It's only at this point that information in the movie history file is sent and saved to a server. A very simple back-end handles this and it can also be seen [here](https://github.com/victorelu/cinestat-backend).

## Who built this thing?
It's built by Victor Avasiloaei, a software developer based in Amsterdam, Netherlands, who finds it weird to refer to himself in 3rd person.

## What is it built with?
* Vue (prototyped with vue-cli [webpack-simple](https://github.com/vuejs-templates/webpack-simple)) for the application itself
* [PapaParse](https://github.com/mholt/PapaParse) for parsing the csv - is this thing fast or what.
* [Axios](https://github.com/axios/axios) for http requests
* [ChartJs](https://github.com/chartjs/Chart.js) for the charts
* [Lodash](https://github.com/lodash/lodash) to make my life easier
