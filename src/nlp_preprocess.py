import pandas as pd
import spacy
import os


# --------------------------------------------------
# 1. LOAD CLEANED DATASET
# --------------------------------------------------

input_path = "data/processed/cleaned_home_remedies.csv"

df = pd.read_csv(input_path)

print("Dataset loaded successfully!")
print("Shape:", df.shape)


# --------------------------------------------------
# 2. LOAD SPACY MODEL
# --------------------------------------------------

print("\nLoading spaCy model...")

nlp = spacy.load("en_core_web_sm")

print("spaCy model loaded!")


# --------------------------------------------------
# 3. TOKENIZATION + LEMMATIZATION
# --------------------------------------------------

def process_text(text):

    doc = nlp(str(text))

    tokens = []
    lemmas = []

    for token in doc:

        # Ignore punctuation
        if token.is_punct:
            continue

        # Keep the original token
        tokens.append(token.text)

        # Lemmatized form
        lemmas.append(token.lemma_.lower())

    return tokens, lemmas


# --------------------------------------------------
# 4. APPLY NLP PROCESSING
# --------------------------------------------------

print("\nProcessing remedy text...")

df["tokens"] = ""
df["lemmas"] = ""

for index, row in df.iterrows():

    tokens, lemmas = process_text(
        row["remedy_text"]
    )

    df.at[index, "tokens"] = " ".join(tokens)
    df.at[index, "lemmas"] = " ".join(lemmas)


# --------------------------------------------------
# 5. CREATE NLP PROCESSED FOLDER
# --------------------------------------------------

os.makedirs(
    "data/processed",
    exist_ok=True
)


# --------------------------------------------------
# 6. SAVE NLP DATASET
# --------------------------------------------------

output_path = "data/processed/nlp_home_remedies.csv"

df.to_csv(
    output_path,
    index=False,
    encoding="utf-8"
)


# --------------------------------------------------
# 7. DISPLAY SAMPLE RESULTS
# --------------------------------------------------

print("\n" + "=" * 80)
print("NLP PROCESSING COMPLETED")
print("=" * 80)

for _, row in df.head(5).iterrows():

    print("\n" + "-" * 80)

    print("REMEDY ID:", row["remedy_id"])

    print("ORIGINAL:")
    print(row["remedy_text"])

    print("\nTOKENS:")
    print(row["tokens"])

    print("\nLEMMAS:")
    print(row["lemmas"])


# --------------------------------------------------
# 8. FINAL INFORMATION
# --------------------------------------------------

print("\n" + "=" * 80)

print("Final shape:", df.shape)

print("\nColumns:")
print(df.columns.tolist())

print("\nSaved at:")
print(output_path)