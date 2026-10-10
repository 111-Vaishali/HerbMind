from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import faiss
import pickle
from sentence_transformers import SentenceTransformer
import pandas as pd
app = FastAPI(
    title="Dadi Maa Ke Nuskhe API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
index = faiss.read_index(
    "data/processed/remedies.faiss"
)

with open(
    "data/processed/remedy_metadata.pkl",
    "rb"
) as file:

    df = pickle.load(file)


model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)


@app.get("/")
def home():

    return {
        "message":
        "Dadi Maa Ke Nuskhe API is running"
    }


@app.get("/search")
def search(
    query: str,
    top_k: int = 5
):

    embedding = model.encode(
        [query],
        normalize_embeddings=True
    )

    scores, indices = index.search(
        embedding,
        top_k
    )

    results = []

    for score, idx in zip(
        scores[0],
        indices[0]
    ):

        row = df.iloc[idx]

        results.append({
            "remedy_id": int(row["remedy_id"]),

            "condition": str(
                row["normalized_condition"]
            ) if not pd.isna(row["normalized_condition"]) else "",

            "ingredients": str(
                row["ingredients"]
            ) if not pd.isna(row["ingredients"]) else "",

            "quantity": str(
                row["quantity"]
            ) if not pd.isna(row["quantity"]) else "",

            "frequency": str(
                row["frequency"]
            ) if not pd.isna(row["frequency"]) else "",

            "timing": str(
                row["timing"]
            ) if not pd.isna(row["timing"]) else "",

            "plant_parts": str(
                row["plant_parts"]
            ) if not pd.isna(row["plant_parts"]) else "",

            "preparation": str(
                row["preparation_methods"]
            ) if not pd.isna(row["preparation_methods"]) else "",

            "remedy": str(
                row["remedy_text"]
            ) if not pd.isna(row["remedy_text"]) else "",

            "score": round(
                float(score),
                4
            ),

            "source": str(
                row["source"]
            ) if not pd.isna(row["source"]) else "",

            "safety_note": str(
                row["safety_note"]
            ) if not pd.isna(row["safety_note"]) else ""
        })

    return {
        "query": query,
        "results": results
    }
    