import pandas as pd

# Load the CSV file
df = pd.read_csv('output_file.csv', dtype={'memberid': str})

# Remove the ".0" suffix from the `memberid` column
df['memberid'] = df['memberid'].str.replace(r'\.0$', '', regex=True)

# Convert the memberid column to integers, replacing NaN values with a placeholder (e.g., -1 or a default value)
df['memberid'] = pd.to_numeric(df['memberid'], errors='coerce').fillna(-1).astype(int)

# Save the updated CSV
df.to_csv('output_file.csv', index=False)

print("Updated CSV file has been saved as 'output_file.csv'.")
