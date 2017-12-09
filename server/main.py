import logging
import json

from aiohttp import web
import socketio

from modules import __all__ as m_names
from modules import *

possibles = globals().copy()
possibles.update(locals())

API_VERSION = "0.0.1"

ERROR_JSON = [0, "Can`t parse string"]
ERROR_NO_MODULE = [1, "Can`t find module"]
ERROR_NO_BLOCK_IN_MODULE = [2, "Can`t find block module"]
MESSAGE_ECHO = 0
MESSAGE_GET_BLOCKS_ALL = 1
MESSAGE_GET_BLOCK = 2
MESSAGE_RUN_MODULE = 3


class State:
    pass


sio = socketio.AsyncServer()
app = web.Application()
sio.attach(app)


async def all_blocks(request):
    response = {}
    for i in m_names:
        title = possibles.get(i).block.get("title")
        response[i] = {
            "title": title if title else i,
            "id": i
        }

    return web.json_response(response, headers={"Access-Control-Allow-Origin": "*"})


async def block(request):
    blockId = request.rel_url.query["blockId"]
    block = possibles.get(blockId).block
    response = {
        "block": block
    }

    return web.json_response(response, headers={"Access-Control-Allow-Origin": "*"})


@sio.on('connect', namespace='/chat')
def connect(sid, environ):
    print("connect ", sid)


# @sio.on('chat message', namespace='/chat')
# async def message(sid, data):
#     print("message ", data)
#     await sio.emit('reply', room=sid)


@sio.on('disconnect', namespace='/chat')
def disconnect(sid):
    print('disconnect ', sid)


# app.router.add_static('/static', 'static')
app.router.add_get('/all_blocks', all_blocks)
app.router.add_get('/block', block)

if __name__ == '__main__':
    web.run_app(app, host="localhost", port=8765)
