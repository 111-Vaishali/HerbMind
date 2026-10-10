import pandas as pd
import re


# --------------------------------------------------
# 1. LOAD NLP DATASET
# --------------------------------------------------

input_path = "data/processed/nlp_home_remedies.csv"

df = pd.read_csv(input_path)

print("Dataset loaded successfully!")
print("Shape:", df.shape)


# --------------------------------------------------
# 2. EXTRACT QUANTITIES
# --------------------------------------------------

def extract_quantities(text):

    patterns = [

        # Numeric quantities
        r"\b\d+(?:\.\d+)?(?:-\d+(?:\.\d+)?)?"
        r"\s*(?:mg|gm|g|kg|ml|l|litre|liter)\b",

        # Traditional/non-numeric quantities
        r"\ba\s+pinch\b",
        r"\ba\s+piece\b",
        r"\ba\s+handful\b",
        r"\ba\s+spoonful\b",
        r"\bfew\s+drops\b",
        r"\bfew\s+pieces\b"
    ]

    quantities = []

    for pattern in patterns:

        matches = re.findall(
            pattern,
            text,
            flags=re.IGNORECASE
        )

        quantities.extend(matches)

    # Remove duplicates while preserving order
    quantities = list(dict.fromkeys(quantities))

    return ", ".join(quantities)
# --------------------------------------------------
# 3. EXTRACT FREQUENCY
# --------------------------------------------------

def extract_frequency(text):

    patterns = [
        r"\b(?:once|twice|thrice)\s+(?:a|per)?\s*(?:day|daily)\b",
        r"\b\d+\s+times\s+(?:a|per)\s+day\b",
        r"\bevery\s+\d+\s+(?:hour|hours|day|days)\b"
    ]

    frequencies = []

    for pattern in patterns:

        matches = re.findall(
            pattern,
            text,
            flags=re.IGNORECASE
        )

        frequencies.extend(matches)

    frequencies = list(dict.fromkeys(frequencies))

    return ", ".join(frequencies)


# --------------------------------------------------
# 4. EXTRACT TIMING
# --------------------------------------------------

def extract_timing(text):

    patterns = [
        r"\bbefore\s+(?:meal|meals|food)\b",
        r"\bafter\s+(?:meal|meals|food)\b",
        r"\bwith\s+(?:water|milk|honey|sugar)\b",
        r"\bon\s+(?:empty\s+)?stomach\b"
    ]

    timings = []

    for pattern in patterns:

        matches = re.findall(
            pattern,
            text,
            flags=re.IGNORECASE
        )

        timings.extend(matches)

    timings = list(dict.fromkeys(timings))

    return ", ".join(timings)


# --------------------------------------------------
# 5. APPLY EXTRACTION
# --------------------------------------------------

print("\nExtracting entities...")

df["quantity"] = df["remedy_text"].apply(
    extract_quantities
)

df["frequency"] = df["remedy_text"].apply(
    extract_frequency
)

df["timing"] = df["remedy_text"].apply(
    extract_timing
)


# --------------------------------------------------
# 6. DISPLAY RESULTS
# --------------------------------------------------

print("\n" + "=" * 80)
print("ENTITY EXTRACTION RESULTS")
print("=" * 80)


for _, row in df.head(10).iterrows():

    print("\n" + "-" * 80)

    print("REMEDY ID:", row["remedy_id"])
    print("CONDITION:", row["condition"])

    print("REMEDY:")
    print(row["remedy_text"])

    print("\nQUANTITY:")
    print(row["quantity"])

    print("FREQUENCY:")
    print(row["frequency"])

    print("TIMING:")
    print(row["timing"])


# --------------------------------------------------
# 7. SAVE UPDATED DATASET
# --------------------------------------------------

output_path = "data/processed/extracted_home_remedies.csv"

df.to_csv(
    output_path,
    index=False,
    encoding="utf-8"
)


# --------------------------------------------------
# 8. FINAL OUTPUT
# --------------------------------------------------

print("\n" + "=" * 80)

print("Entity extraction completed!")

print("Final shape:", df.shape)

print("\nNew columns:")
print([
    "quantity",
    "frequency",
    "timing"
])

print("\nSaved at:")
print(output_path)