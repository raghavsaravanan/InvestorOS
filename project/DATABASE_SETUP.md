# Database Setup Instructions

## Supabase Table Creation

To set up the user profiles table in your Supabase project, run the SQL commands from `supabase-schema.sql` in your Supabase SQL editor.

### Steps:

1. **Open Supabase Dashboard**
   - Go to your Supabase project dashboard
   - Navigate to the SQL Editor

2. **Run the Schema**
   - Copy and paste the contents of `supabase-schema.sql`
   - Execute the SQL commands

3. **Verify Setup**
   - Check that the `user_profiles` table was created
   - Verify that Row Level Security (RLS) policies are enabled
   - Test that the trigger for automatic profile creation works

### What the Schema Creates:

- **`user_profiles` table**: Stores all onboarding questionnaire answers
- **Row Level Security**: Ensures users can only access their own data
- **Automatic Profile Creation**: Creates a profile record when a new user signs up
- **Data Validation**: Ensures data integrity with CHECK constraints

### Key Features:

- **Automatic Profile Creation**: When a user signs up, a profile record is automatically created
- **Secure Access**: Users can only view/edit their own profile data
- **Data Validation**: Database-level constraints ensure data integrity
- **Flexible Schema**: Supports all onboarding questionnaire fields

### Testing the Setup:

1. Create a new user account
2. Check that a profile record is automatically created in `user_profiles`
3. Complete the onboarding questionnaire
4. Verify that the profile data is saved correctly
5. Check that the Profile page displays the saved data
