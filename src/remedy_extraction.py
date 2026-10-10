import pandas as pd
import re

input_path = "data/processed/normalized_home_remedies.csv"

df = pd.read_csv(input_path)

print("Dataset loaded successfully!")
print("Shape:", df.shape)


plant_parts = [
    "root",
    "roots",
    "bark",
    "leaf",
    "leaves",
    "flower",
    "flowers",
    "fruit",
    "fruits",
    "seed",
    "seeds",
    "rhizome",
    "stem",
    "juice",
    "oil"
]


preparation_methods = [
    "powder",
    "paste",
    "decoction",
    "juice",
    "boiled",
    "boil",
    "crushed",
    "ground",
    "grinded",
    "fried",
    "roasted",
    "filtered",
    "mixed",
    "applied",
    "rubbed"
]


def extract_terms(text, vocabulary):

    text = str(text).lower()

    found = []

    for term in vocabulary:

        pattern = (
            r"(?<![a-z])"
            + re.escape(term)
            + r"(?![a-z])"
        )

        if re.search(pattern, text):

            found.append(term)

    return ", ".join(dict.fromkeys(found))


df["plant_parts"] = df["remedy_text"].apply(
    lambda x: extract_terms(x, plant_parts)
)

df["preparation_methods"] = df["remedy_text"].apply(
    lambda x: extract_terms(x, preparation_methods)
)


print("\n" + "=" * 80)
print("PLANT PART + PREPARATION EXTRACTION")
print("=" * 80)


for _, row in df.head(15).iterrows():

    print("\n" + "-" * 80)

    print("REMEDY ID:", row["remedy_id"])
    print("CONDITION:", row["normalized_condition"])

    print("\nREMEDY:")
    print(row["remedy_text"])

    print("\nPLANT PARTS:")
    print(row["plant_parts"])

    print("\nPREPARATION:")
    print(row["preparation_methods"])


output_path = (
    "data/processed/"
    "final_extracted_home_remedies.csv"
)

df.to_csv(
    output_path,
    index=False,
    encoding="utf-8"
)


print("\n" + "=" * 80)
print("Remedy extraction completed!")

print("\nNew columns:")
print([
    "plant_parts",
    "preparation_methods"
])

print("\nSaved at:")
print(output_path)