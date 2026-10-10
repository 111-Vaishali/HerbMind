import pandas as pd
import numpy as np
import faiss
import pickle
from sentence_transformers import SentenceTransformer

DATA_PATH = "data/processed/remedy_knowledge_base.csv"

df = pd.read_csv(DATA_PATH)

print("Dataset loaded:", df.shape)

print("\nLoading model...")

model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)

print("Creating embeddings...")

embeddings = model.encode(
    df["search_text"].tolist(),
    normalize_embeddings=True,
    show_progress_bar=True
)

embeddings = np.array(
    embeddings,
    dtype="float32"
)

print("Embedding shape:", embeddings.shape)

dimension = embeddings.shape[1]

index = faiss.IndexFlatIP(dimension)

index.add(embeddings)

print("\nFAISS index created!")
print("Number of vectors:", index.ntotal)

faiss.write_index(
    index,
    "data/processed/remedies.faiss"
)

with open(
    "data/processed/remedy_metadata.pkl",
    "wb"
) as file:

    pickle.dump(
        df,
        file
    )

print("\nFAISS index saved successfully!")