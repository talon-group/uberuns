'use client';

import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { updateEmail } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface EmailFormProps {
  userEmail: string | undefined;
}

const EmailForm: React.FC<EmailFormProps> = ({ userEmail }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    setIsSubmitting(true);
    const newEmail = e.currentTarget.newEmail.value;

    // Check if the new email is the same as the old email
    if (newEmail === userEmail) {
      setErrorMessage('New email cannot be the same as the current email.');
      setIsSubmitting(false);
      return;
    }

    try {
      await handleRequest(e, updateEmail, router, 'POST');
      setErrorMessage(null); // Clear any previous error messages
    } catch (error) {
      setErrorMessage('An error occurred while updating the email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card
      title="Your Email"
      description="Please enter the email address you want to use to login."
      footer={
        <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
          <p className="pb-4 sm:pb-0 text-white">
            We will email you to verify the change.
          </p>
          <Button
            variant="slim"
            type="submit"
            form="emailForm"
            loading={isSubmitting}
          >
            Update Email
          </Button>
        </div>
      }
    >
      <div className="mt-8 mb-4 text-xl font-semibold">
        <form id="emailForm" onSubmit={handleSubmit}>
          <input
            type="email"
            name="newEmail"
            className="w-1/2 p-3 rounded-md bg-red-800"
            defaultValue={userEmail ?? ''}
            placeholder="Your email"
            maxLength={64}
            required
          />
          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        </form>
      </div>
    </Card>
  );
};

export default EmailForm;