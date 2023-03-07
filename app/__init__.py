from flask import Flask
from web3 import Web3
from config import config

app = Flask(__name__)
app.config.from_object(config)

web3 = Web3(Web3.HTTPProvider(app.config['URL']))
web3.eth.defaultAccount = web3.eth.accounts[0]
contract = web3.eth.contract(
    address=app.config['ADDRESS'], abi=app.config['ABI'])


from .route import *