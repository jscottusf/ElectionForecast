# ElectionForecast

Nate Silver's FiveThirtyEight election model integrated into an Angular UI of my own creation. This application will update anytime fivethirtyeight updates their model (until the model was frozen on election day 2020).

The data is taken from directly from their publically available csv files containing the fivethirtyeight presidential forecast.
This application takes that data and converts it into a JSON format in order to be visualized.

I created this application simply because fivethirtyeight did not include an electoral map in their forecast this year.

Deployed at https://electionforecastjs.web.app/

# Projections

![Forecast](./ElectionForecast/src/assets/forecast.png)

# Electoral Map

![Forecast](./ElectionForecast/src/assets/map.png)

# How the Forecast has changed

![Forecast](./ElectionForecast/src/assets/chart.png)

# Technologies Used

-   Angular
-   Firebase hosting
-   Chart.js
-   FiveThirtyEight's Data
