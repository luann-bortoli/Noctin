from flask import Flask, request, jsonify
from flask_cors import CORS
from database import Session as DBSession
from model import Task

app = Flask(__name__)
CORS(app)

def getTasks():
    session = DBSession()
    tasks = session.query(Task).all()
    result = [task.toDict() for task in tasks]
    session.close()

    return jsonify(result)

def getTaskById(requestId):
    session = DBSession()
    task = session.query(Task).get(requestId)

    if not task:
        session.close()
        return jsonify({"error": "task não encontrada"})
    
    result = task.toDict()
    session.close()
    return jsonify(result)

@app.route("/tasks", methods=["GET"])
def routeGetTasks():
    return getTasks()

@app.route("/tasks", methods=["POST"])
def routePostTask():
    data = request.json

    session = DBSession()
    task = Task(
        title=data["title"],
        content=data["content"],
        priority=data["priority"]
    )
    session.add(task)
    session.commit()
    session.close()

    return jsonify({"message": "success"})

@app.route("/tasks/<int:requestId>", methods=["PUT"])
def routePutTask(requestId):
    data = request.json
    session = DBSession()

    task = session.query(Task).get(requestId)

    task.title = data.get("title", task.title)
    task.content = data.get("content", task.content)
    task.priority = data.get("priority", task.priority)

    session.commit()
    session.close()
    
    return jsonify({"message": "success"})

@app.route("/tasks/<int:requestId>", methods=["DELETE"])
def routeDeleteTask(requestId):
    session = DBSession()
    task = session.query(Task).get(requestId)

    if not task:
        session.close()
        return jsonify({"message": "task nao existe"})

    session.delete(task)
    session.commit()
    session.close()

    return jsonify({"message" : "success"})

if __name__ == "__main__":
    app.run(debug=True)