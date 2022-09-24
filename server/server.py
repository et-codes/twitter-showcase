import os
import requests
from contextlib import nullcontext
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from flask_restful import Api, Resource

load_dotenv()
token = 'Bearer ' + os.environ['TOKEN']
app = Flask(__name__)
CORS(app)
api = Api(app)

class Tweets(Resource):
    def get(self, query):
        url = f'https://api.twitter.com/2/tweets/search/recent?query={query} -is:retweet -is:reply&max_results=10&tweet.fields=author_id,id,text,created_at,public_metrics,source&expansions=author_id,attachments.media_keys,referenced_tweets.id&user.fields=id,name,username,description,profile_image_url'
        headers = {
            "Authorization": token
        }

        response = requests.get(url, headers=headers)
        response_json = response.json()
        response_content = response_json

        count = response_content['meta']['result_count']
        if count > 0:
            tweets = response_content['data']
            users = response_content['includes']['users']
        else:
            count = -1
            tweets = []
            users = []
        payload = {'count': count, 'tweets': tweets, 'users': users}
        return payload, 200

@app.route('/')
def home():
    return '<h1>Server Home</h1>'

api.add_resource(Tweets, '/api/<string:query>')

if __name__ == '__main__':
    app.run(debug=True)
