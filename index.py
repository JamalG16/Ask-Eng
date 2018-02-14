from flask import Flask, request, send_from_directory
from flask_sqlalchemy import SQLAlchemy
import os



# Create instance of flask application
app = Flask(__name__, template_folder='static/build',static_folder='static/build')
app.config.from_pyfile('config.py')

@app.route('/', defaults={'path': ''}, methods=['GET','POST'])
@app.route('/<path:path>', methods=['GET','POST'])
def index(path):
    return send_from_directory('static/build', 'index.html')

# Create db
db = SQLAlchemy(app)

# import api's
from application.api.users import users
from application.api.qa import qa


# Attach api to app
app.register_blueprint(users)
app.register_blueprint(qa)


