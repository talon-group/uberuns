'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { type User } from '@supabase/supabase-js';
import AccountForm from './data/userData';
import UserDataDisplay from './data/dataDisplay';
import { useRouter } from 'next/navigation';

export default function UserStatusChecker({ user, userEmail }: { user: User | null, userEmail: any }) {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isOldUser, setIsOldUser] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const checkUserStatus = async () => {
      if (!userEmail) {
        setLoading(false);
        return;
      }

      try {
        // Check if user exists in userdatas table
        const { data, error } = await supabase
          .from('userdatas')
          .select('*')
          .eq('e_mail', userEmail)
          .single();

        if (error) {
          console.error('Error checking user status:', error);
          setIsOldUser(false); // Treat as new user if there's an error
        } else {
          setIsOldUser(!!data);
        }

        // Check onboarding and terms status in users table
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('onboarding, terms')
          .eq('id', user?.id)
          .single();

        if (userError) {
          console.error('Error fetching user data:', userError);
          return;
        }

        if (userData.onboarding === null || userData.onboarding === false) {
          router.push('/account/onboarding');
        } else if (userData.onboarding === true && (userData.terms === null || userData.terms === false)) {
          router.push('/account/onboarding/terms');
        }

      } catch (error: any) {
        console.error('Error checking user status:', error.message);
        setIsOldUser(false); // Treat as new user if there's an error
      } finally {
        setLoading(false);
      }
    };

    checkUserStatus();
  }, [userEmail, supabase, user, router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="form-widget space-y-6">
      {isOldUser ? (
        <AccountForm user={user} />
      ) : (
        <UserDataDisplay user={user} />
      )}
    </div>
  );
};

export async function UserStatusCheckerAsPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <UserStatusChecker user={user} userEmail={user?.email} />
  );
}
