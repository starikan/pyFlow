import cv2
from flask_restful import Resource

URL = "/cv/rgb2gray"


class RGB2Grey(Resource):
    def post(self, fileData=None, fileURL="", fileFormat="Base64"):
        return "POST"

    def get(self):
        return "GET"


if __name__ == '__main__':
    pass
