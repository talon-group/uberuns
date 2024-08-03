import pandas as pd

# Load the CSV file
df = pd.read_csv('test.csv')

# Check the length of the values in the `bic` column
long_bic_values = df[df['bic'].str.len() > 11]

# Print any long BIC values
print("BIC values longer than 11 characters:")
print(long_bic_values)

# Truncate BIC values to 11 characters
df['bic'] = df['bic'].str.slice(0, 11)

# Save the updated CSV
df.to_csv('output_file.csv', index=False)

print("Updated CSV file with truncated BIC values has been saved as 'output_file.csv'.")