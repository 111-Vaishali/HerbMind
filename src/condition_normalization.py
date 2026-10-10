import pandas as pd
import re

input_path = "data/processed/ingredient_extracted_home_remedies.csv"

df = pd.read_csv(input_path)

print("Dataset loaded successfully!")
print("Shape:", df.shape)


def normalize_condition(condition):

    condition = str(condition).lower().strip()

    # Common spelling variations
    condition = condition.replace("diarrhoea", "diarrhea")
    condition = condition.replace("anaemia", "anemia")

    # Remove unnecessary punctuation
    condition = re.sub(r"\s+", " ", condition)
    condition = condition.strip()

    return condition


df["normalized_condition"] = df["condition"].apply(
    normalize_condition
)


print("\n" + "=" * 80)
print("CONDITION NORMALIZATION")
print("=" * 80)

for _, row in df.head(20).iterrows():

    print("\n" + "-" * 80)
    print("Original :", row["condition"])
    print("Normalized:", row["normalized_condition"])


output_path = (
    "data/processed/"
    "normalized_home_remedies.csv"
)

df.to_csv(
    output_path,
    index=False,
    encoding="utf-8"
)

print("\n" + "=" * 80)
print("Condition normalization completed!")
print("Final shape:", df.shape)

print("\nSaved at:")
print(output_path)