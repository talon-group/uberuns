import pandas as pd

# Load the CSV file with semicolon delimiter
df = pd.read_csv('test.csv', delimiter=';', on_bad_lines='warn')

# Convert the date format for `geb_datum` and `eintrittsdatum` columns
df['geb_datum'] = pd.to_datetime(df['geb_datum'], format='%d.%m.%Y').dt.strftime('%Y-%m-%d')
df['geb_datum'] = pd.to_datetime(df['geb_datum'], format='%d.%m.%Y').dt.strftime('%Y-%m-%d')

# Save the updated CSV
df.to_csv('output_file.csv', index=False, sep=';')
