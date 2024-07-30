-- Remove the foreign key constraint from `memberid`
ALTER TABLE public.users
DROP CONSTRAINT IF EXISTS users_userdatas_fkey;

-- Alter `memberid` to not be a foreign key
ALTER TABLE public.users
DROP CONSTRAINT IF EXISTS users_memberid_fkey;
