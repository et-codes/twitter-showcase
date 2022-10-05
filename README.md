# Twitter Showcase App

###Try the app yourself [here](https://et-twitter-app.herokuapp.com/)!

_This app allows the user to search Twitter by keywords or user (use "@" before the user name). The 10 most recent results are displayed, with a link to the Tweet on the Twitter website. In the Random Tweet section, click on one of the profiles in the list to get a random Tweet from that user._

![GIF of the app in action](/client/src/assets/twitter-app.gif)

## Technical Details

**Front End**

- Written with **HTML**, **CSS**, and **JavaScript**, using the **React** framework.
- The `react-router-dom` is employed to navigate the "pages" of the app.
- The `axios` library is used to make calls to the custom API.

**Back End**

- Written in **Python** with the **Flask** framework.
- Serves the front end as well as the API for the app.
- The API receives search parameters from the front end, pulls the data from the Twitter API v2, and sends the results back to the front end for display.
- Twitter API credentials are stored in environment variables for security.
- Hosted on [Heroku](https://www.heroku.com).

## Author

Eric Thornton | [LinkedIn](https://www.linkedin.com/in/ethornton/)
