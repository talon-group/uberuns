import pandas as pd

# Load the CSV file
df = pd.read_csv('output_file.csv')

# Filter out rows where 'e_mail' is null
non_null_emails = df.dropna(subset=['e_mail'])

# Check for duplicate email addresses among non-null entries
duplicates = non_null_emails[non_null_emails.duplicated('e_mail', keep=False)]

# Print duplicate email addresses
print("Duplicate email addresses found:")
print(duplicates)

# Remove duplicate rows based on the 'e_mail' column, keeping the first occurrence among non-null emails
non_null_emails = non_null_emails.drop_duplicates(subset='e_mail', keep='first')

# Combine the non-null and null email DataFrames back together
result_df = pd.concat([non_null_emails, df[df['e_mail'].isnull()]])

# Save the updated CSV without duplicates
result_df.to_csv('output_file.csv', index=False)

print("Updated CSV file with duplicates removed has been saved as 'output_file.csv'.")
