import pandas as pd

# Load the CSV file
df = pd.read_csv('output_file.csv')

# Identify duplicate email addresses
duplicates = df[df.duplicated('e_mail', keep=False)]

if not duplicates.empty:
    print("Duplicate email addresses found:")
    print(duplicates)
else:
    print("No duplicate email addresses found.")
