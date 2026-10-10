import pandas as pd
import re
import os


# --------------------------------------------------
# 1. LOAD DATASET
# --------------------------------------------------

input_path = "data/raw/Home_Remedies.csv"

df = pd.read_csv(input_path)

print("Original shape:", df.shape)


# --------------------------------------------------
# 2. SELECT USEFUL COLUMNS
# --------------------------------------------------

df = df[
    [
        "Name of Item",
        "Health Issue",
        "Home Remedy"
    ]
].copy()


# --------------------------------------------------
# 3. RENAME COLUMNS
# --------------------------------------------------

df.rename(
    columns={
        "Name of Item": "ingredient_or_plant",
        "Health Issue": "condition",
        "Home Remedy": "remedy_text"
    },
    inplace=True
)


# --------------------------------------------------
# 4. REMOVE COMPLETELY EMPTY ROWS
# --------------------------------------------------

df.dropna(
    subset=["condition", "remedy_text"],
    how="all",
    inplace=True
)


# --------------------------------------------------
# 5. FILL MISSING VALUES
# --------------------------------------------------

text_columns = [
    "ingredient_or_plant",
    "condition",
    "remedy_text"
]

for column in text_columns:
    df[column] = df[column].fillna("").astype(str)


# --------------------------------------------------
# 6. CLEAN EXTRA SPACES
# --------------------------------------------------

def clean_text(text):
    text = re.sub(r"\s+", " ", text)
    return text.strip()


for column in text_columns:
    df[column] = df[column].apply(clean_text)


# --------------------------------------------------
# 7. FIX COMMON OCR SPACING PROBLEMS
# --------------------------------------------------

def fix_ocr_spacing(text):

    # Fix OCR-spaced words
    text = re.sub(r"m\s*ou\s*th", "mouth", text, flags=re.IGNORECASE)
    text = re.sub(r"so\s*m\s*etim\s*e", "sometime", text, flags=re.IGNORECASE)
    text = re.sub(r"b\s*efo\s*re", "before", text, flags=re.IGNORECASE)

    # Fix accidentally joined words
    text = re.sub(r"powder\s*with", "powder with", text, flags=re.IGNORECASE)
    text = re.sub(r"before\s*food", "before food", text, flags=re.IGNORECASE)
    text = re.sub(r"water\s*thrice", "water thrice", text, flags=re.IGNORECASE)

    return text

df["remedy_text"] = df["remedy_text"].apply(fix_ocr_spacing)


# --------------------------------------------------
# 8. NORMALIZE CONDITION NAMES
# --------------------------------------------------

df["condition"] = (
    df["condition"]
    .str.lower()
    .str.strip()
)


# --------------------------------------------------
# 9. REMOVE DUPLICATES
# --------------------------------------------------

before_duplicates = len(df)

df.drop_duplicates(
    subset=[
        "ingredient_or_plant",
        "condition",
        "remedy_text"
    ],
    inplace=True
)

after_duplicates = len(df)

print(
    "Duplicate rows removed:",
    before_duplicates - after_duplicates
)


# --------------------------------------------------
# 10. REMOVE EMPTY REMEDIES
# --------------------------------------------------

df = df[
    df["remedy_text"].str.len() > 0
].copy()


# --------------------------------------------------
# 11. CREATE REMEDY ID
# --------------------------------------------------

df.insert(
    0,
    "remedy_id",
    range(1, len(df) + 1)
)


# --------------------------------------------------
# 12. ADD SOURCE
# --------------------------------------------------

df["source"] = "Kaggle - Home Remedies"


# --------------------------------------------------
# 13. ADD EVIDENCE STATUS
# --------------------------------------------------

df["evidence_status"] = "Traditional-use information"


# --------------------------------------------------
# 14. ADD SAFETY NOTE
# --------------------------------------------------

df["safety_note"] = (
    "Traditional home-remedy information only. "
    "Not medical advice. Consult a qualified healthcare "
    "professional for diagnosis or treatment."
)


# --------------------------------------------------
# 15. CREATE PROCESSED FOLDER
# --------------------------------------------------

os.makedirs(
    "data/processed",
    exist_ok=True
)


# --------------------------------------------------
# 16. SAVE PROCESSED DATA
# --------------------------------------------------

output_path = "data/processed/cleaned_home_remedies.csv"

df.to_csv(
    output_path,
    index=False,
    encoding="utf-8"
)


# --------------------------------------------------
# 17. DISPLAY RESULTS
# --------------------------------------------------

print("\nPreprocessing completed!")

print("Final shape:", df.shape)

print("\nFinal columns:")
print(df.columns.tolist())

print("\nFirst 5 cleaned remedies:")

for _, row in df.head(5).iterrows():

    print("\n" + "=" * 70)

    print("ID:", row["remedy_id"])
    print("Ingredient:", row["ingredient_or_plant"])
    print("Condition:", row["condition"])
    print("Remedy:", row["remedy_text"])


print("\nProcessed file saved at:")
print(output_path)