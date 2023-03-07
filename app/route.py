from app import app
from flask import render_template, jsonify ,request

from contract.contract import contract_Method
import re

contract = contract_Method()



@app.route('/')
def index():
    return render_template('index.html')


@app.route('/calculate', methods=['POST'])
def result():
    data = request.get_json()
    equation = data['equation']
    if re.match(r'^\d+[\+\-\*\/]\d+$', equation):
        a, operator, b = re.split(r'([\+\-\*\/])', equation)
        a = int(a)
        b = int(b)
        switcher = {
            '+': contract.add(a, b),
            '-': contract.sub(a, b),
            '*': contract.mul(a, b),
            '/': contract.div(a, b)
        }
        result = switcher.get(operator, 'Invalid Equation')

    else:
        result = 'Invalid Equation'

    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True)

