'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';

export default function TermsPage() {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleAcceptTerms = async () => {
    setLoading(true);
    try {
      // Fetch the current user
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError) {
        throw authError;
      }

      if (!user || !user.id) {
        throw new Error('User is not signed in or user ID is undefined');
      }

      // Update the terms acceptance status
      const { error: updateError } = await supabase
        .from('users')
        .update({ terms: true })
        .eq('id', user.id);

      if (updateError) {
        throw updateError;
      };

      // Redirect to /account
      router.push('/account');
    } catch (error: any) {
      console.error('Error updating terms status:', error.message);
      setErrorMessage('Error updating terms status.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5">
      <p>Terms and conditions (please read and approve)</p>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <Button
        variant="slim"
        onClick={handleAcceptTerms}
        disabled={loading}
      >
        {loading ? 'Loading ...' : 'Accept and Proceed'}
      </Button>
    </div>
  );
};