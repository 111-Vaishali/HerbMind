import pandas as pd
from sentence_transformers import SentenceTransformer
import numpy as np

DATA_PATH = (
    "data/processed/"
    "remedy_knowledge_base.csv"
)

df = pd.read_csv(DATA_PATH)

print("Dataset loaded successfully!")
print("Records:", len(df))


print("\nLoading Sentence Transformer model...")

model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)

print("Model loaded!")


print("\nCreating embeddings...")

embeddings = model.encode(
    df["search_text"].tolist(),
    normalize_embeddings=True,
    show_progress_bar=True
)

print("Embeddings created!")
print("Embedding shape:", embeddings.shape)


def search_remedies(query, top_k=5):

    query_embedding = model.encode(
        [query],
        normalize_embeddings=True
    )[0]

    scores = np.dot(
        embeddings,
        query_embedding
    )

    top_indices = np.argsort(
        scores
    )[::-1][:top_k]

    results = []

    for index in top_indices:

        results.append({
            "remedy_id": df.iloc[index]["remedy_id"],
            "condition": df.iloc[index]["normalized_condition"],
            "ingredients": df.iloc[index]["ingredients"],
            "remedy": df.iloc[index]["remedy_text"],
            "score": round(
                float(scores[index]),
                4
            )
        })

    return results


print("\n" + "=" * 80)
print("SEMANTIC REMEDY SEARCH")
print("=" * 80)


while True:

    query = input(
        "\nEnter your query "
        "(type 'exit' to stop): "
    )

    if query.lower() == "exit":
        break

    results = search_remedies(query)

    print("\nTop matching remedies:")

    for i, result in enumerate(results, 1):

        print("\n" + "-" * 70)

        print("Rank:", i)
        print("Remedy ID:", result["remedy_id"])
        print("Condition:", result["condition"])
        print("Ingredients:", result["ingredients"])
        print("Score:", result["score"])
        print("Remedy:", result["remedy"])