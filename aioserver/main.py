from aiohttp import web
from routes import setup_routes
import aiohttp_jinja2
import jinja2
import os

app = web.Application()

aiohttp_jinja2.setup(
    app, loader=jinja2.FileSystemLoader(os.path.join(os.path.dirname(__file__), 'templates')))

setup_routes(app)
web.run_app(app, host='127.0.0.1', port=8080)


async def close_pg(app):
    # Close base conn
    pass

app.on_cleanup.append(close_pg)
