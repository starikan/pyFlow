VIEW_NAME = "Init Values"

block = {
    "tags": ["Test"],
    "groups": ["Test"],
    "title": "Инициалиатор переменной",
    "description": "Инициализируются значения на сервере",
    "dots": [{
        "type": "output",
        "name": "val",
        "fields": [],
        "value": {
            "type": "bool",
            "default": True
        },
        "uniq": False
    }]
}


def get_name():
    return VIEW_NAME


if __name__ == '__main__':
    pass
