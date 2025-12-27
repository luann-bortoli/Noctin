from database import db, Base
from model import Task

Base.metadata.create_all(db)

print("Banco criado com sucesso")