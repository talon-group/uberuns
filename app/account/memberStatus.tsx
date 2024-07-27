'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { type User } from '@supabase/supabase-js';
import AccountForm from './data/userData';
import UserDataDisplay from './data/dataDisplay';
import Card from '@/components/ui/Card';

export default function UserStatusChecker({ user, userEmail }: { user: User | null, userEmail: any }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [isOldUser, setIsOldUser] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const [userEmail, setUserEmail] = useState<string | undefined>(undefined);

//   useEffect(() => {
//     if (user) {
//       setUserEmail(user.email); // Fetching user's email from supabase auth
//     }
//   }, [user]);

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
      } catch (error: any) {
        console.error('Error checking user status:', error.message);
        setIsOldUser(false); // Treat as new user if there's an error
      } finally {
        setLoading(false);
      }
    };

    checkUserStatus();
  }, [userEmail, supabase]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
      <div className="form-widget space-y-6">
        {isOldUser ? (
          <>
            <AccountForm user={user} />
          </>
        ) : (
          <>
            <UserDataDisplay user={user} />
          </>
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
    <UserStatusChecker user={user} userEmail={''} />
  );
}
