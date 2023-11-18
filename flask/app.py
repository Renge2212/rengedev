from flask import Flask, render_template, request
from flask_cors import CORS
# from typing import Optional
from controllers import api

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/test')
def test():
    return "test"

@app.route('/api/login')
def login_verify():
    id = request.args.get('id')
    password = request.args.get('password')
    print(f"login request: {request}")
    res = api.login(id, password)
    return {"verify": res}

@app.route('/api/getLoginData')
def get_login_data():
    res = api.get_Login_data()
    return res


if __name__ == '__main__':
    app.run()
