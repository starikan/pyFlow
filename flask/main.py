from flask import Flask, request, render_template, send_from_directory, send_file
from flask_restful import Resource, Api

from cv_module import *

# print(dir(LoadFile))

app = Flask(__name__, static_url_path='')
api = Api(app)


@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('js', path)


@app.route("/")
def index():
    return send_from_directory('templates', 'index.html')


api.add_resource(LoadFile.LoadFile, LoadFile.URL)
api.add_resource(RGB2Grey.RGB2Grey, RGB2Grey.URL)

if __name__ == '__main__':
    app.run(debug=True, port=1234)
