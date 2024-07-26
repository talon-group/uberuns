import pandas as pd

# Load your CSV file into a DataFrame
df = pd.read_csv('ext.csv')

# Print out the column headers to verify the exact names
print(df.columns)

# Check if 'geb_datum' exists in the DataFrame columns
if 'geb_datum' in df.columns:
    # Convert all date formats to 'YYYY-MM-DD'
    df['geb_datum'] = pd.to_datetime(df['geb_datum'], errors='coerce').dt.strftime('%Y-%m-%d')

    # Save the updated DataFrame back to a CSV file
    df.to_csv('path_to_updated_csv_file.csv', index=False)
else:
    print("Column 'geb_datum' not found in the DataFrame. Check your CSV file structure.")
