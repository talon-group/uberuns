-- Add only the missing fields to the users table
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'address') THEN
        ALTER TABLE public.users ADD COLUMN address text NULL;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'fanclub') THEN
        ALTER TABLE public.users ADD COLUMN fanclub text NULL;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'alter') THEN
        ALTER TABLE public.users ADD COLUMN alter integer NULL;
    END IF;
END $$;

-- Drop the existing memberid column
ALTER TABLE public.users
DROP COLUMN IF EXISTS memberid;

-- Create a new memberid column that references userdatas.id
ALTER TABLE public.users
ADD COLUMN memberid bigint REFERENCES public.userdatas(id);

-- Update users table to set memberid based on userdatas.id
UPDATE public.users
SET memberid = ud.id
FROM public.userdatas ud
WHERE public.users.e_mail = ud.e_mail;
