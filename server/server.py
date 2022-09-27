import os
import requests
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from flask_restful import Api, Resource


load_dotenv()
token = 'Bearer ' + os.environ['TOKEN']

app = Flask(__name__)
cors = CORS(app)
api = Api(app)

class Tweets(Resource):
    def get(self, query):
        if query.startswith('@'):
            search = f'from:{query[1:]}'
        else:
            search = f'{query} -is:retweet -is:reply'

        url = f'https://api.twitter.com/2/tweets/search/recent?query={search}&max_results=10&tweet.fields=author_id,id,text,created_at,public_metrics,source,entities&expansions=author_id,attachments.media_keys,referenced_tweets.id&user.fields=id,name,username,description,profile_image_url,verified&media.fields=url,preview_image_url'
        
        headers = { "Authorization": token }

        response = requests.get(url, headers=headers)

        if response.status_code != requests.codes.ok:
            return 'Twitter server error', response.status_code
        
        response_content = response.json()
        count = response_content['meta']['result_count']

        if count > 0:
            tweets = response_content['data']
            users = response_content['includes']['users']
            media = response_content['includes']['media']
            payload = {'tweets': tweets, 'users': users, 'media': media}
            return payload, 200
        else:
            return 'No matches found', 200

@app.route('/')
def home():
    return '<h1>Server Home</h1>'

api.add_resource(Tweets, '/api/<string:query>')

if __name__ == '__main__':
    app.run(debug=True)
