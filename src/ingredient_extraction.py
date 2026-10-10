import pandas as pd
import re


# --------------------------------------------------
# 1. LOAD DATASET
# --------------------------------------------------

input_path = "data/processed/extracted_home_remedies.csv"

df = pd.read_csv(input_path)

print("Dataset loaded successfully!")
print("Shape:", df.shape)


# --------------------------------------------------
# 2. INGREDIENT LIST
# --------------------------------------------------

ingredient_words = [
    "mustard oil",
    "sesame oil",
    "black salt",
    "rock salt",
    "aloe vera",

    "ginger",
    "jaggery",
    "honey",
    "sugar",
    "water",
    "milk",
    "lemon",
    "lime",
    "pepper",
    "turmeric",
    "cumin",
    "jeera",
    "ghee",
    "oil",
    "garlic",
    "clove",
    "cardamom",
    "cinnamon",
    "dalchini",
    "fennel",
    "ajwain",
    "fenugreek",
    "basil",
    "tulsi",
    "neem"
]


# --------------------------------------------------
# 3. NORMALIZATION
# --------------------------------------------------

normalization = {
    "jeera": "cumin",
    "dalchini": "cinnamon",
    "tulsi": "tulsi",
    "basil": "basil"
}


# --------------------------------------------------
# 4. EXTRACT INGREDIENTS FROM TEXT
# --------------------------------------------------

def extract_text_ingredients(text):

    text = str(text).lower()

    found = []

    # Check longer names first
    sorted_ingredients = sorted(
        ingredient_words,
        key=len,
        reverse=True
    )

    for ingredient in sorted_ingredients:

        pattern = (
            r"(?<![a-z])"
            + re.escape(ingredient)
            + r"(?![a-z])"
        )

        if re.search(
            pattern,
            text,
            flags=re.IGNORECASE
        ):

            normalized = normalization.get(
                ingredient,
                ingredient
            )

            found.append(normalized)

    return found


# --------------------------------------------------
# 5. NORMALIZE PRIMARY INGREDIENT
# --------------------------------------------------

def normalize_primary_ingredient(text):

    if pd.isna(text):
        return ""

    text = str(text).strip()

    # Get first alphabetic word
    match = re.match(
        r"([A-Za-z]+)",
        text
    )

    if not match:
        return ""

    common_name = match.group(1).lower()

    return normalization.get(
        common_name,
        common_name
    )


# --------------------------------------------------
# 6. COMBINE INGREDIENTS
# --------------------------------------------------

def extract_all_ingredients(
    remedy_text,
    primary_ingredient
):

    ingredients = []

    # Extract from remedy text
    ingredients.extend(
        extract_text_ingredients(
            remedy_text
        )
    )

    # Add primary ingredient
    primary = normalize_primary_ingredient(
        primary_ingredient
    )

    if primary:
        ingredients.append(primary)

    # Remove duplicates
    ingredients = list(
        dict.fromkeys(ingredients)
    )

    return ", ".join(ingredients)


# --------------------------------------------------
# 7. APPLY EXTRACTION
# --------------------------------------------------

print("\nExtracting and normalizing ingredients...")

df["ingredients"] = df.apply(
    lambda row: extract_all_ingredients(
        row["remedy_text"],
        row["ingredient_or_plant"]
    ),
    axis=1
)


# --------------------------------------------------
# 8. DISPLAY RESULTS
# --------------------------------------------------

print("\n" + "=" * 80)
print("IMPROVED INGREDIENT EXTRACTION")
print("=" * 80)

for _, row in df.head(15).iterrows():

    print("\n" + "-" * 80)

    print("REMEDY ID:", row["remedy_id"])
    print("CONDITION:", row["condition"])

    print("\nREMEDY:")
    print(row["remedy_text"])

    print("\nINGREDIENTS:")
    print(row["ingredients"])


# --------------------------------------------------
# 9. SAVE
# --------------------------------------------------

output_path = (
    "data/processed/"
    "ingredient_extracted_home_remedies.csv"
)

df.to_csv(
    output_path,
    index=False,
    encoding="utf-8"
)


# --------------------------------------------------
# 10. DONE
# --------------------------------------------------

print("\n" + "=" * 80)

print("Ingredient extraction completed!")

print("Final shape:", df.shape)

print("\nSaved at:")
print(output_path)