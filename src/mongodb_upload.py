import pandas as pd
import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

if not MONGO_URI:
    raise ValueError("MONGO_URI is missing from the .env file")

client = MongoClient(MONGO_URI)
DATA_PATH = (
    "data/processed/"
    "remedy_knowledge_base.csv"
)
df = pd.read_csv(DATA_PATH)
db = client["dadi_maa_nuskhe"]

collection = db["remedies"]

records = df.to_dict(
    orient="records"
)

collection.delete_many({})

collection.insert_many(
    records
)

print(
    "Inserted records:",
    len(records)
)

print(
    "MongoDB database ready!"
)


