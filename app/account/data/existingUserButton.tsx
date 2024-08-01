'use client';

import { useCallback, useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { type User } from '@supabase/supabase-js';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import AccountForm from './userData';
import UserDataDisplay from './dataDisplay';
import { useRouter } from 'next/navigation'; // Import useRouter

export default function ExistingUserButton({ user }: { user: User | null }) {
  const supabase = createClient();
  const router = useRouter(); // Initialize useRouter
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

        // Determine new member ID
        let newMemberId = data.id; // Default to old member ID if it exists

        if (!data.memberid) {
          // Generate new member ID for new users
          const { data: highestMemberIdData, error: highestMemberIdError } = await supabase
            .from('users')
            .select('memberid')
            .order('memberid', { ascending: false })
            .limit(1)
            .single();

          if (highestMemberIdError) {
            throw highestMemberIdError;
          }

          newMemberId = (highestMemberIdData ? highestMemberIdData.memberid : 0) + 1;
        }

        console.log('Setting new member ID:', newMemberId);

        // Update the user entry in users table
        const { error: updateUserError } = await supabase
          .from('users')
          .update({
            full_name: data.full_name,
            memberid: newMemberId,
            userdatas: data.id
          })
          .eq('id', user.id);

        if (updateUserError) {
          console.error('Error updating user data:', updateUserError);
          throw updateUserError;
        }
      } else {
        console.warn('No matching user data found for email:', userEmail);
        setUserDatas(null); // Ensure no user data is displayed
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

  const handleNextStep = async () => {
    if (!user || !user.id) {
      console.warn("User is not signed in or user ID is undefined");
      return;
    }

    try {
      setLoading(true);

      // Update the onboarding status
      const { error } = await supabase
        .from('users')
        .update({ onboarding: true })
        .eq('id', user.id);

      if (error) {
        throw error;
      }

      // Redirect to the onboarding terms page
      router.push('/account/onboarding/terms');
    } catch (error: any) {
      console.error('Error updating onboarding status:', error.message);
      alert('Error updating onboarding status.');
    } finally {
      setLoading(false);
    };
  };

  // If no user data is found and there's an error, return null
  if (userDatas === null && errorMessage) {
    return (
      <div>
        <UserDataDisplay user={user} /> 
        <Button
          variant="slim"
          onClick={handleNextStep}
          disabled={loading}
          className='bg-red-800'
        >
          {loading ? 'Loading ...' : 'Next Step'}
        </Button>
      </div>
    );
  };

  // If user data is available, render AccountForm
  if (userDatas) {
    return (
      <div className='p-10'>
        <AccountForm user={user} />
        <Button
          variant="slim"
          onClick={handleNextStep}
          disabled={loading}
          className='bg-red-800'
        >
          {loading ? 'Loading ...' : 'Next Step'}
        </Button>
      </div>
    );
  };

  // Render existing UI when loading or showing no data message
  return (
    <Card title="Existing User Data">
      <div className="form-widget space-y-6">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <p>{errorMessage || 'No user data available'}</p>
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