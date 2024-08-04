'use client';

import Button from '@/components/ui/Button';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signUp } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import Card from '@/components/ui/Card';
import { getAuthTypes, getRedirectMethod } from '@/utils/auth-helpers/settings';

const SignUpPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [allowEmail, setAllowEmail] = useState(false);
  const [redirectMethod, setRedirectMethod] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const fetchSettings = async () => {
      const authTypes = await getAuthTypes();
      const redirectMethod = await getRedirectMethod();
      setAllowEmail(authTypes.allowEmail);
      setRedirectMethod(redirectMethod);
    };

    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setIsSubmitting(true); // Disable the button while the request is being handled
    await handleRequest(e, signUp, router, '/account'); // Add '/account' as the redirection path after sign up
    setIsSubmitting(false);
  };

  return (
    <div className="flex justify-center height-screen-helper">
      <div className="flex flex-col justify-between max-w-lg p-3 m-auto w-80 ">
        <div className="flex justify-center pb-12 ">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx8pafgqap2SM8xEJ7AHE8xRdRfJr4ssfhfQ&s"
            width="64px"
            height="64px"
            alt="Logo"
          />
        </div>
        <Card title="Sign Up">
          <div className="my-8">
            <form
              noValidate={true}
              className="mb-4"
              onSubmit={handleSubmit}
            >
              <div className="grid gap-2">
                <p className="bg-gray-200">
                  Bitte gib deine bei uns hinterlegte E-Mail Adresse an und erstelle dir ein individuelles Passwort, welches du künftig für den Mitgliederbereich benötigst.
                </p>
                <div className="grid gap-1">
                  <label htmlFor="email">E-Mail</label>
                  <input
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    name="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    className="w-full p-3 rounded-md bg-red-800"
                  />
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    placeholder="Password"
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    className="w-full p-3 rounded-md bg-red-800"
                  />
                </div>
                <Button
                  variant="slim"
                  type="submit"
                  className="mt-1"
                  loading={isSubmitting}
                >
                  Sign up
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SignUpPage;
