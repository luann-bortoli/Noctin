from sqlalchemy import Column, String, Integer, Date
from datetime import date
from database import Base

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String)
    content = Column(String)
    priority = Column(Integer)
    created = Column(Date, default=date.today)

    def __init__(self, title, content, priority):
        self.title = title
        self.content = content
        self.priority = priority

    def toDict(self):
        return{
            "id": self.id,
            "title": self.title,
            "content": self.content,
            "priority": self.priority,
            "created": self.created.isoformat()
        }