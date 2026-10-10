import pandas as pd

input_path = (
    "data/processed/"
    "final_extracted_home_remedies.csv"
)

df = pd.read_csv(input_path)

print("Dataset loaded successfully!")
print("Shape:", df.shape)


# Create searchable text
df["search_text"] = (
    df["normalized_condition"].fillna("") + " " +
    df["ingredients"].fillna("") + " " +
    df["plant_parts"].fillna("") + " " +
    df["preparation_methods"].fillna("") + " " +
    df["remedy_text"].fillna("")
)


# Select final columns
final_columns = [
    "remedy_id",
    "normalized_condition",
    "ingredients",
    "quantity",
    "frequency",
    "timing",
    "plant_parts",
    "preparation_methods",
    "remedy_text",
    "source",
    "evidence_status",
    "safety_note",
    "search_text"
]

df = df[final_columns]


output_path = (
    "data/processed/"
    "remedy_knowledge_base.csv"
)

df.to_csv(
    output_path,
    index=False,
    encoding="utf-8"
)


print("\n" + "=" * 80)
print("KNOWLEDGE BASE CREATED")
print("=" * 80)

print("\nShape:", df.shape)

print("\nColumns:")
for column in df.columns:
    print("-", column)

print("\nExample record:")

print(df.iloc[0].to_string())

print("\nSaved at:")
print(output_path)