from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import faiss
import pickle
from sentence_transformers import SentenceTransformer
import pandas as pd

import json
from pathlib import Path
from datetime import datetime, timezone
from uuid import uuid4
from pydantic import BaseModel, Field
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
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
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


class RemedySubmission(BaseModel):
    contributor: str = Field(default="", max_length=80)
    condition: str = Field(min_length=2, max_length=120)
    ingredients: str = Field(min_length=2, max_length=500)
    remedy: str = Field(min_length=10, max_length=3000)


SUBMISSIONS_FILE = Path("data/submissions/pending_remedies.json")


@app.post("/remedies", status_code=201)
def submit_remedy(submission: RemedySubmission):
    # Store contributions separately from the searchable, approved dataset.
    SUBMISSIONS_FILE.parent.mkdir(parents=True, exist_ok=True)

    if SUBMISSIONS_FILE.exists():
        try:
            submissions = json.loads(
                SUBMISSIONS_FILE.read_text(encoding="utf-8")
            )
            if not isinstance(submissions, list):
                submissions = []
        except (json.JSONDecodeError, OSError):
            submissions = []
    else:
        submissions = []

    new_remedy = {
        "submission_id": str(uuid4()),
        "contributor": submission.contributor.strip() or "Anonymous",
        "condition": submission.condition.strip(),
        "ingredients": submission.ingredients.strip(),
        "remedy": submission.remedy.strip(),
        "status": "pending",
        "submitted_at": datetime.now(timezone.utc).isoformat(),
    }

    submissions.append(new_remedy)

    SUBMISSIONS_FILE.write_text(
        json.dumps(submissions, indent=2, ensure_ascii=False),
        encoding="utf-8",
    )

    return {
        "message": "Remedy submitted for review.",
        "submission_id": new_remedy["submission_id"],
        "status": "pending",
    }


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
    