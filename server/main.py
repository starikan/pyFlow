import logging
from base64 import b64encode
import json
# https://github.com/Pithikos/python-websocket-server
from websocket_server import WebsocketServer

from modules import __all__ as m_names
from modules import *

possibles = globals().copy()
possibles.update(locals())

ERROR_JSON = [0, "Can`t parse string"]
ERROR_NO_MODULE = [1, "Can`t find module"]
MESSAGE_ECHO = 0
MESSAGE_GET_BLOCKS_ALL = 1
MESSAGE_GET_BLOCK = 2
MESSAGE_RUN_MODULE = 3


class State:
    pass


def new_client(client, server):
    server.send_message_to_all("Hey all, a new client has joined us")


def message_echo(client, server, message, response):
    response.update(message)
    server.send_message(client, json.dumps(response))


def message_get_blocks_all(client, server, message, response):
    response["blocks"] = []
    for i in m_names:
        view_name = possibles.get(i).VIEW_NAME
        new_block = {
            "module": i,
            "module_view_name": view_name if view_name else i
        }
        response["blocks"].append(new_block)

    server.send_message(client, json.dumps(response))


def message_get_block(client, server, message, response):
    server.send_message(client, json.dumps(response))


def message_run_module(client, server, message, response):
    if message.get("module") not in m_names:
        response["error"] = ERROR_NO_MODULE
        response.update(message)
        server.send_message(client, json.dumps(response))

    module = possibles.get(message.get("module"))

    server.send_message(client, json.dumps(response))


def message(client, server, message):

    response = {}

    try:
        message = json.loads(message)
    except:
        response["error"] = ERROR_JSON
        server.send_message(client, response)
        return False

    message_type = message.get("type", MESSAGE_ECHO)

    if message_type == MESSAGE_ECHO:
        message_echo(client, server, message, response)
    elif message_type == MESSAGE_GET_BLOCKS_ALL:
        message_get_blocks_all(client, server, message, response)
    elif message_type == MESSAGE_GET_BLOCK:
        message_get_block(client, server, message, response)
    elif message_type == MESSAGE_RUN_MODULE:
        message_run_module(client, server, message, response)


server = WebsocketServer(8765, host='127.0.0.1', loglevel=logging.INFO)
server.set_fn_new_client(new_client)
server.set_fn_message_received(message)
server.run_forever()
