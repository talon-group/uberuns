import pandas as pd

# Load the CSV file with comma delimiter
df = pd.read_csv('test.csv', delimiter=',', on_bad_lines='warn')

# Print column names to check for any extra spaces or discrepancies
print("Column names:", df.columns)

# Normalize column names by stripping extra spaces
df.columns = df.columns.str.strip()

# Convert the email field to lowercase
if 'e_mail' in df.columns:
    df['e_mail'] = df['e_mail'].str.lower()
else:
    print("Column 'e_mail' not found in the DataFrame.")

# Convert the date format for `geb_datum` and `eintrittsdatum` columns
df['geb_datum'] = pd.to_datetime(df['geb_datum'], errors='coerce').dt.strftime('%Y-%m-%d')
df['eintrittsdatum'] = pd.to_datetime(df['eintrittsdatum'], errors='coerce').dt.strftime('%Y-%m-%d')

# Save the updated CSV
df.to_csv('output_file.csv', index=False)
