import pandas as pd

df = pd.read_csv("data/processed/cleaned_home_remedies.csv")

for i, row in df.head(10).iterrows():
    print("\n" + "=" * 80)
    print("REMEDY ID:", row["remedy_id"])
    print("INGREDIENT / PLANT:", row["ingredient_or_plant"])
    print("CONDITION:", row["condition"])
    print("REMEDY:")
    print(row["remedy_text"])