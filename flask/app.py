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
    return api.get_Login_data()

@app.route('/api/checkAccountExist')
def check_account_exist():
    id = request.args.get('id')
    return {"exist": api.check_account_exist(id)}

@app.route('/api/createAccount')
def create_account():
    print(f"login request: {request}")
    id = request.args.get('id')
    password = request.args.get('password')
    api.create_account(id, password)
    return ('', 204)

@app.errorhandler(404)
def not_found(e):
    return render_template('index.html')


if __name__ == '__main__':
    app.run()
