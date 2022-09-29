import os
import requests
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from flask_restful import Api, Resource


app = Flask(__name__)
cors = CORS(app)
api = Api(app)


def get_headers():
    load_dotenv()
    token = 'Bearer ' + os.environ['TOKEN']
    headers = { "Authorization": token }
    return headers


def get_response(url, headers):
    response = requests.get(url, headers=headers)

    if response.status_code != requests.codes.ok:
        return 'Twitter server error', response.status_code

    return response.json(), 200


class Tweets(Resource):
    def get(self, query):

        if query.startswith('@'):
            search = f'from:{query[1:]}'
        else:
            search = f'{query} -is:retweet -is:reply'

        url = f'https://api.twitter.com/2/tweets/search/recent?query={search}&max_results=10&tweet.fields=author_id,id,text,created_at,public_metrics,source,entities&expansions=author_id,attachments.media_keys,referenced_tweets.id&user.fields=id,name,username,description,profile_image_url,verified&media.fields=url,preview_image_url'

        headers = get_headers()
        response, code = get_response(url, headers)

        if code != requests.codes.ok:
            return response, code
        
        count = response['meta']['result_count']

        if count > 0:
            tweets = response['data']
            users = response['includes']['users']
            media = response['includes']['media']
            payload = {'tweets': tweets, 'users': users, 'media': media}
        else:
            payload = 'No matches found'

        return payload, 200


class UserData(Resource):
    def get(self, query):
        url = f'https://api.twitter.com/2/users/by?usernames={query}'

        headers = get_headers()
        response, code = get_response(url, headers)

        return response['data'], code


@app.route('/')
def home():
    return '<h1>Server Home</h1>'

api.add_resource(Tweets, '/api/tweets/<string:query>')
api.add_resource(UserData, '/api/userdata/<string:query>')

if __name__ == '__main__':
    app.run(debug=True)
