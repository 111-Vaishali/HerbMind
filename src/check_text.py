import pandas as pd
import re

df = pd.read_csv("data/processed/cleaned_home_remedies.csv")

for i, text in enumerate(df["remedy_text"]):

    # Find words containing unusually long lowercase sequences
    # and print the remedy for manual inspection.
    if re.search(r"[a-z]{12,}", text.lower()):
        print("\n" + "=" * 80)
        print("REMEDY ID:", df.iloc[i]["remedy_id"])
        print(text)