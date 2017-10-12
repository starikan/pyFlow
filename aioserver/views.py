from aiohttp import web
import aiohttp_jinja2
import jinja2

# async def index(request):
#     return web.Response(text='Hello Aiohttp!')


@aiohttp_jinja2.template('index.html')
async def index(request):
    return {
        'data': "data"
    }
