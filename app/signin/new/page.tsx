// signup.tsx
'use client';

import Button from '@/components/ui/Button';
import React from 'react';
import Link from 'next/link';
import { signUp } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Card from '@/components/ui/Card';
import { getAuthTypes, getRedirectMethod } from '@/utils/auth-helpers/settings';

// Define prop type with allowEmail boolean
interface SignUpProps {
  allowEmail: boolean;
  redirectMethod: string;
};

export default function SignUpPage({ allowEmail, redirectMethod }: SignUpProps) {
  const router = redirectMethod === 'client' ? useRouter() : null;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true); // Disable the button while the request is being handled
    await handleRequest(e, signUp, router);
    setIsSubmitting(false);
  };

  return (
    <div className="flex justify-center height-screen-helper">
      <div className="flex flex-col justify-between max-w-lg p-3 m-auto w-80 ">
        <div className="flex justify-center pb-12 ">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx8pafgqap2SM8xEJ7AHE8xRdRfJr4ssfhfQ&s" width="64px" height="64px" />
        </div>
        <Card title="Sign Up">
          <div className="my-8">
            <form
              noValidate={true}
              className="mb-4"
              onSubmit={(e) => handleSubmit(e)}
            >
              <div className="grid gap-2">
                {/* <p className='bg-gray-200'>Use the email that you used when signing up for the Nordkurve under the old system. Create a new password here to use with that email</p> */}
                <div className="grid gap-1">
                  <label htmlFor="email">Email</label>
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