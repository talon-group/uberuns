'use client';

import { useCallback, useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { type User } from '@supabase/supabase-js';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function ExistingUserButton({ user }: { user: User | null }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState<string | undefined>(undefined);
  const [userDatas, setUserDatas] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setUserEmail(user.email); // Fetching user's email from supabase auth
    }
  }, [user]);

  const fetchUserData = useCallback(async () => {
    if (!user || !userEmail) {
      console.warn("User is not signed in or email is undefined");
      return;
    }

    try {
      setLoading(true);
      console.log("Fetching user data for email:", userEmail);

      // Fetch user data from userdatas table by email
      const { data, error, status } = await supabase
        .from('userdatas')
        .select('*')
        .eq('e_mail', userEmail)
        .single();

      if (error && status !== 406) {
        console.error('Error fetching user data:', error);
        throw error;
      }

      if (data) {
        setUserDatas(data);
        console.log('User data fetched successfully:', data);
      } else {
        console.warn('No matching user data found for email:', userEmail);
        setErrorMessage('No user data found for this email.');
      }
    } catch (error: any) {
      console.error('Error loading user data:', error.message);
      setErrorMessage('Error loading user data!');
    } finally {
      setLoading(false);
    }
  }, [user, userEmail, supabase]);

  useEffect(() => {
    if (userEmail) {
      fetchUserData();
    }
  }, [userEmail, fetchUserData]);

  return (
    <Card title="Existing User Data">
      <div className="form-widget space-y-6">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {userDatas ? (
              <pre>{JSON.stringify(userDatas, null, 2)}</pre>
            ) : (
              <p>{errorMessage || 'No user data available'}</p>
            )}
            <Button
              variant="slim"
              onClick={fetchUserData}
              disabled={loading}
            >
              {loading ? 'Loading ...' : 'Fetch Data'}
            </Button>
          </>
        )}
      </div>
    </Card>
  );
}

export async function ExistingUserButtonAsPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <ExistingUserButton user={user} />
  );
}
