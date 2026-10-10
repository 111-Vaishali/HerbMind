import faiss
import pickle
from sentence_transformers import SentenceTransformer

INDEX_PATH = "data/processed/remedies.faiss"
METADATA_PATH = "data/processed/remedy_metadata.pkl"

print("Loading FAISS index...")

index = faiss.read_index(
    INDEX_PATH
)

with open(
    METADATA_PATH,
    "rb"
) as file:

    df = pickle.load(file)

model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)

print("Search system ready!")


def search(query, top_k=5):

    query_embedding = model.encode(
        [query],
        normalize_embeddings=True
    )

    scores, indices = index.search(
        query_embedding,
        top_k
    )

    results = []

    for score, index_id in zip(
        scores[0],
        indices[0]
    ):

        row = df.iloc[index_id]

        results.append({
            "id": int(row["remedy_id"]),
            "condition": row["normalized_condition"],
            "ingredients": row["ingredients"],
            "remedy": row["remedy_text"],
            "score": round(
                float(score),
                4
            )
        })

    return results


while True:

    query = input(
        "\nSearch remedy "
        "(type exit): "
    )

    if query.lower() == "exit":
        break

    results = search(query)

    print("\nTop Results:")

    for rank, result in enumerate(
        results,
        start=1
    ):

        print("\n" + "-" * 70)

        print("Rank:", rank)
        print("ID:", result["id"])
        print("Condition:", result["condition"])
        print("Ingredients:", result["ingredients"])
        print("Similarity:", result["score"])
        print("Remedy:", result["remedy"])