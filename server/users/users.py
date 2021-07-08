import os
import flask
from flask_sqlalchemy import SQLAlchemy
import flask_praetorian
import flask_cors

app = flask.Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:postgres@94.228.120.254:5435/users"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
app.debug = True


class User(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.Text, unique=True)
    password = db.Column(db.Text)
    roles = db.Column(db.Text)

    def __init__(self, username, password, roles):
        self.username = username
        self.password = password
        self.roles = roles

    def __repr__(self):
        return f""


with app.app_context():
    db.create_all()
    if db.session.query(User).filter_by(username='admin').count() < 1:
        db.session.add(User(
          username='admin',
          password='123',
          roles='admin'
            ))
    db.session.commit()


  
@app.route('/api/authorization', methods=['POST'])
def login():
    req = flask.request.get_json(force=True)
    username = req.get('userName', None)
    password = req.get('password', None)
    if db.session.query(User).filter_by(username=username).first():
        if db.session.query(User).filter_by(password=password).first():
            role1 = User.query.filter_by(username = username).first()
            return role1.roles, 200
        return "Неверный логин/пароль", 401
    return "Неверный логин/пароль", 401
    
@app.route('/api/registration', methods=['POST'])
def registration():
    req = flask.request.get_json(force=True)
    username_user = req.get('userName', None)
    password_user = req.get('password', None)
    with app.app_context():
        if db.session.query(User).filter_by(username=username_user).count() < 1:
            new_user = User(username=username_user,password=password_user,roles='users')
            db.session.add(new_user)
            db.session.commit()
        else:
            return "Такой пользователь уже есть", 401
    return "Успешная регистрация", 200

  
# Run the example
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
