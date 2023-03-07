import json

class config:
    URL = 'http://127.0.0.1:8545'
    FILE = json.load(open('abi.json'))
    ADDRESS = FILE['ADDRESS']
    ABI = FILE['ABI']