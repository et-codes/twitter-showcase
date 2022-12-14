import os
import requests
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from flask_restful import Api, Resource


app = Flask(__name__, static_folder='./build', static_url_path='/')
cors = CORS(app)
api = Api(app)
load_dotenv()

# Fields to return from Tweet searches
tweet_fields = 'tweet.fields=author_id,id,text,created_at,public_metrics,source,entities&expansions=author_id,attachments.media_keys,referenced_tweets.id&user.fields=id,name,username,description,profile_image_url,verified&media.fields=url,preview_image_url'


def get_response(url):
    token = 'Bearer ' + os.environ['TOKEN']
    headers = { "Authorization": token }
    response = requests.get(url, headers=headers)

    if response.status_code != requests.codes.ok:
        return 'Twitter server error', response.status_code

    return response.json(), 200


def build_payload(response):
    tweets = response['data']
    users = response['includes']['users']
    if 'media' in response['includes']:
        media = response['includes']['media']
    else:
        media = []
    payload = {'tweets': tweets, 'users': users, 'media': media}
    return payload


class SearchTweets(Resource):
    def get(self, query):

        if query.startswith('@'):
            search = f'from:{query[1:]}'
        else:
            search = f'{query} -is:retweet -is:reply'

        url = f'https://api.twitter.com/2/tweets/search/recent?query={search}&max_results=10&{tweet_fields}'

        response, code = get_response(url)

        if code != requests.codes.ok:
            return response, code
        
        count = response['meta']['result_count']

        if count > 0:
            payload = build_payload(response)
        else:
            payload = 'No matches found'

        return payload, 200


class UserTimeline(Resource):
    def get(self, id):
        url = f'https://api.twitter.com/2/users/{id}/tweets'

        response, code = get_response(url)

        return response['data'], code


class UserData(Resource):
    def get(self, query):
        url = f'https://api.twitter.com/2/users/by?usernames={query}'

        response, code = get_response(url)

        return response['data'], code


class SingleTweet(Resource):
    def get(self, id):
        url = f'https://api.twitter.com/2/tweets/{id}?{tweet_fields}'

        response, code = get_response(url)

        payload = build_payload(response)

        return payload, 200

api.add_resource(SearchTweets, '/api/tweets/<string:query>')
api.add_resource(UserTimeline, '/api/timeline/<string:id>')
api.add_resource(UserData, '/api/userdata/<string:query>')
api.add_resource(SingleTweet, '/api/tweet/<string:id>')

@app.route('/', defaults={'path': ''})
@app.route('/<string:path>')
def index(path):
    return app.send_static_file('index.html')


if __name__ == '__main__':
    app.run(debug=True)
