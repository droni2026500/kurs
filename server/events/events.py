import os
import flask
from flask_sqlalchemy import SQLAlchemy
import flask_praetorian
import flask_cors

app = flask.Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:postgres@94.228.120.254:5436/events"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
app.debug = True


class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.Text)
    title = db.Column(db.Text)
    dateEvent = db.Column(db.Text)
    location = db.Column(db.Text)
    subway = db.Column(db.Text)
    image = db.Column(db.Text)

    def __init__(self, description, title, dateEvent, location, subway, image):
        self.description = description
        self.title = title
        self.dateEvent = dateEvent
        self.location = location
        self.subway = subway
        self.image = image

    def __repr__(self):
        return f""


@app.route('/api/createEvent', methods=['POST'])
def create():
    req = flask.request.get_json(force=True)
    description = req.get('description', None)
    title = req.get('title', None)
    dateEvent = req.get('dateEvent', None)
    location = req.get('location', None)
    subway = req.get('subway', None)
    image = req.get('image', None)
    if title == "":
        return "Заполните поля", 500
    else:
        new_event = Event(description=description,title=title,dateEvent=dateEvent,location=location,subway=subway,image=image)
        db.session.add(new_event)
        db.session.commit()
        return "Успешно создано", 200
    return "кал"

@app.route('/api/getEvents', methods=['GET'])
def getEvents():
    events = Event.query.all()
    results=[{"description":ev.description,"title":ev.title,"dateEvent":ev.dateEvent,"location":ev.location,"subway":ev.subway, "image":ev.image}for ev in events]
    return {"events": results}
    
  
  
# Run the example
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
