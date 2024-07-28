-- Add only the missing fields to the users table
ALTER TABLE public.users
ADD COLUMN address text NULL,
ADD COLUMN telefon text NULL,
ADD COLUMN fanclub text NULL,
ADD COLUMN alter integer NULL;

-- Update the existing memberid column to reference userdatas.id
ALTER TABLE public.users
DROP COLUMN memberid;

-- Create new field for memberid which takes the value from userdatas.id
ALTER TABLE public.users
ADD COLUMN memberid bigint REFERENCES public.userdatas(id);

-- Update users table to set memberid based on userdatas.id
UPDATE public.users
SET memberid = ud.id
FROM public.userdatas ud
WHERE public.users.e_mail = ud.e_mail;
