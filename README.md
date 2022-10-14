# Twitter Showcase App

### Try the app yourself [here](https://et-twitter-app.herokuapp.com/)!

_This app allows the user to search Twitter by keywords or user (use "@" before the user name). The 10 most recent results are displayed, with a link to the Tweet on the Twitter website. In the Random Tweet section, click on one of the profiles in the list to get a random Tweet from that user._

![GIF of the app in action](/client/src/assets/twitter-app.gif)

## Installation Instructions

1. Run `npm install` in the `client` directory.
1. Install the `poetry` dependency management tool. ([Link](https://python-poetry.org/docs/#installation))
1. Run `poetry shell` in the `server` directory.
1. Run `poetry install` in the `server` directory.
1. Set an environment variable `REACT_APP_BACKEND` to `http://localhost:5000'.
1. Set an environment variable `TOKEN` to your bearer token value for the Twitter API.
1. Run `npm run build` command from the `client` folder.
1. Delete the existing `build` folder from the `server` directory.
1. Move the new `build` folder from the `client` directory to the `server` directory.
1. Run `poetry run flask run` from the `server` directory.
1. Navigate to `http://localhost:5000` and enjoy!

## Technical Details

**Front End**

- Written with **HTML**, **CSS**, and **JavaScript**, using the **React** framework.
- The `react-router-dom` module is employed to navigate the "pages" of the app.
- The `axios` library is used to make calls to the custom API.

**Back End**

- Written in **Python** with the **Flask** framework.
- Serves the front end as well as the API for the app.
- The API receives search parameters from the front end, pulls the data from the Twitter API v2, and sends the results back to the front end for display.
- Twitter API credentials are stored in environment variables for security.
- Hosted on [Heroku](https://www.heroku.com).

## Author

Eric Thornton | [LinkedIn](https://www.linkedin.com/in/ethornton/)
