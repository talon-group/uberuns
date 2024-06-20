'use client';

import { useCallback, useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { type User } from '@supabase/supabase-js';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import AccountForm from './userData';
import UserDataDisplay from './dataDisplay';
import SecondUserDataDisplay from './secondaryDataDisplay';
import { useRouter } from 'next/navigation';
import SecondUserDataDisplayAccount from './accountDataSecondary';
 
export default function ExistingUserButton({ user }: { user: User | null }) {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState<string | undefined>(undefined);
  const [userData, setUserData] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setUserEmail(user.email);
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

      // First, check userdatas table
      const { data: userDataFromUserdatas, error: userDataErrorFromUserdatas } = await supabase
        .from('userdatas')
        .select('*')
        .eq('e_mail', userEmail)
        .single();

      if (userDataErrorFromUserdatas && userDataErrorFromUserdatas.code !== 'PGRST116') { // Ignore 'not found' errors
        console.error('Error fetching user data from userdatas:', userDataErrorFromUserdatas);
        throw userDataErrorFromUserdatas;
      }

      let userData = userDataFromUserdatas;

      if (!userData) {
        // If no data found in userdatas, check the users table
        const { data: userDataFromUsers, error: userDataErrorFromUsers } = await supabase
          .from('users')
          .select('*')
          .eq('e_mail', userEmail)
          .single();

        if (userDataErrorFromUsers && userDataErrorFromUsers.code !== 'PGRST116') { // Ignore 'not found' errors
          console.error('Error fetching user data from users:', userDataErrorFromUsers);
          throw userDataErrorFromUsers;
        }

        userData = userDataFromUsers;
      }

      if (userData) {
        setUserData(userData);
        console.log('User data fetched successfully:', userData);

        // Determine new member ID
        let newMemberId = userData.id;

        if (!userData.memberid) {
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

        const { error: updateUserError } = await supabase
          .from('users')
          .update({
            full_name: userData.full_name,
            memberid: newMemberId,
            userdatas: userData.id
          })
          .eq('id', user.id);

        if (updateUserError) {
          console.error('Error updating user data:', updateUserError);
          throw updateUserError;
        }
      } else {
        console.warn('No matching user data found for email:', userEmail);
        setUserData(null);
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

      console.log('Updating onboarding status for user ID:', user.id);

      const { error: updateError } = await supabase
        .from('users')
        .update({ onboarding: true })
        .eq('id', user.id);

      if (updateError) {
        console.error('Error updating onboarding status:', updateError.message);
        alert('Error updating onboarding status.');
        throw updateError;
      }

      router.push('/account/onboarding/terms');
    } catch (error: any) {
      console.error('Error updating onboarding status:', error.message);
      alert('Error updating onboarding status.');
    } finally {
      setLoading(false);
    }
  };

  // Determine if required fields are filled
  const hasRequiredData = userData &&
    userData.vorname &&
    userData.nachname &&
    userData.adresse &&
    userData.city &&
    userData.ort &&
    userData.plz;

  if (userData === null && errorMessage) {
    return (
      <div>
        <SecondUserDataDisplay user={user} />
        {/* <Button
          variant="slim"
          onClick={handleNextStep}
          disabled={loading}
          className='bg-red-800'
        >
          {loading ? 'Loading ...' : 'Next Step'}
        </Button> */}
      </div>
    );
  }

  if (userData) {
    return (
      <div className='p-10'>
        <SecondUserDataDisplayAccount user={user} />
        {hasRequiredData && (
          <Button
            variant="slim"
            onClick={handleNextStep}
            disabled={loading}
            className='bg-red-800'
          >
            {loading ? 'Loading ...' : 'Next Step'}
          </Button>
        )}
      </div>
    );
  };

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
};