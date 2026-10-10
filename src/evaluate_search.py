import faiss
import pickle
import numpy as np
from sentence_transformers import SentenceTransformer


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


test_queries = [

    {
        "query": "home remedy for indigestion",
        "condition": "indigestion"
    },

    {
        "query": "natural remedy for headache",
        "condition": "headache"
    },

    {
        "query": "something for fever",
        "condition": "fever"
    },

    {
        "query": "remedy for cough",
        "condition": "cough"
    },

    {
        "query": "help for constipation",
        "condition": "constipation"
    }
]


def search(query, k=5):

    embedding = model.encode(
        [query],
        normalize_embeddings=True
    )

    scores, indices = index.search(
        embedding,
        k
    )

    return indices[0]


precision_scores = []
reciprocal_ranks = []


for item in test_queries:

    results = search(
        item["query"],
        5
    )

    relevant = 0
    first_relevant_rank = None

    for rank, idx in enumerate(
        results,
        start=1
    ):

        condition = str(
            df.iloc[idx]["normalized_condition"]
        )

        if item["condition"] in condition:

            relevant += 1

            if first_relevant_rank is None:
                first_relevant_rank = rank

    precision = relevant / 5

    if first_relevant_rank:
        reciprocal_rank = (
            1 / first_relevant_rank
        )
    else:
        reciprocal_rank = 0

    precision_scores.append(
        precision
    )

    reciprocal_ranks.append(
        reciprocal_rank
    )

    print("\nQuery:", item["query"])
    print("Expected:", item["condition"])
    print("Precision@5:", precision)
    print("RR:", reciprocal_rank)


print("\n" + "=" * 60)

print(
    "Mean Precision@5:",
    round(
        np.mean(precision_scores),
        4
    )
)

print(
    "MRR:",
    round(
        np.mean(reciprocal_ranks),
        4
    )
)