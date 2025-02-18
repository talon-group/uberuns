'use client';

import { useCallback, useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { type User } from '@supabase/supabase-js';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function AccountForm({ user }: { user: User | null }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState<string | null>(null);
  const [memberId, setMemberId] = useState<string>('');
  const [userDatas, setUserDatas] = useState<any>(null);
  const [userMemberId, setUserMemberId] = useState<any>('');
  const [userEmail, setUserEmail] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setUserEmail(user.email); // Fetching user's email from supabase auth
    }
  }, [user]);

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);
      console.log("Fetching profile data for user ID:", user?.id);
      console.log("Fetching profile data for user email:", userEmail);

      if (!userEmail) { 
        console.warn("User email is undefined, cannot fetch userdatas");
        return;
      }

      // Try to fetch profile data from the users table
      const { data, error, status } = await supabase
        .from('users')
        .select(`full_name, userdatas`)
        .eq('id', user?.id)
        .single();

      if (error && status !== 406) {
        console.error(error);
        throw error;
      }

      if (data) {
        setFullname(data.full_name);

        if (data.userdatas) {
          // If userdatas is found, fetch from userdatas table
          console.log("Userdatas ID found, fetching userdatas");
          const { data: fetchedUserDatas, error: userDatasError } = await supabase
            .from('userdatas')
            .select('*')
            .eq('id', data.userdatas)
            .single();

          if (fetchedUserDatas) {
            setUserDatas(fetchedUserDatas);
            if (fetchedUserDatas.memberid != null) {
              setMemberId(fetchedUserDatas.memberid.toString());
            }
          } else {
            console.warn("Userdatas ID is invalid, fetching userdatas by email:", userEmail);
            const { data: fetchedUserDatasByEmail, error: userDatasByEmailError } = await supabase
              .from('userdatas')
              .select('*')
              .eq('e_mail', userEmail)
              .single();

            if (fetchedUserDatasByEmail) {
              setUserDatas(fetchedUserDatasByEmail);

              // Update the user row with userdatas id
              const { error: updateError } = await supabase
                .from('users')
                .update({ userdatas: fetchedUserDatasByEmail.id })
                .eq('id', user?.id);

              if (updateError) {
                throw updateError;
              };

              if (fetchedUserDatasByEmail.memberid != null) {
                setMemberId(fetchedUserDatasByEmail.memberid.toString());
              };
            } else {
              console.warn("No matching email found in userdatas table");
              setUserDatas(null);
            };
          };
        } else {
          // No userdatas ID found, fetch data by email from userdatas table
          console.log("No userdatas ID, fetching userdatas by email:", userEmail);
          const { data: fetchedUserDatasByEmail, error: userDatasByEmailError } = await supabase
            .from('userdatas')
            .select('*')
            .eq('e_mail', userEmail)
            .single();

          if (fetchedUserDatasByEmail) {
            setUserDatas(fetchedUserDatasByEmail);

            // Update the user row with userdatas id
            const { error: updateError } = await supabase
              .from('users')
              .update({ userdatas: fetchedUserDatasByEmail.id })
              .eq('id', user?.id);

            if (updateError) {
              throw updateError;
            }

            if (fetchedUserDatasByEmail.memberid != null) {
              setMemberId(fetchedUserDatasByEmail.memberid.toString());
            }
          } else {
            console.warn("No matching email found in userdatas table");
            setUserDatas(null);
          }
        }
      }
    } catch (error: any) {
      console.error('Error loading user data:', error.message);
    } finally {
      setLoading(false);
    }
  }, [user, userEmail, supabase]);

  useEffect(() => {
    if (userEmail) {
      getProfile();
    }
  }, [userEmail, getProfile]);

  async function updateProfile() {
    try {
      setLoading(true);
      setError(null);
      setSuccessMessage(null);

      if (!userDatas) {
        // Ensure required fields are not empty if creating a new record
        if (!memberId || !userEmail) {
          setError('Please fill in the required fields.');
          return;
        }
      }

      if (userDatas) {
        // Update userdatas table if userDatas is loaded
        const { id, ...userDatasWithoutId } = userDatas;
 
        const { error: userDatasError } = await supabase
          .from('userdatas')
          .update(userDatasWithoutId)
          .eq('id', id);

        if (userDatasError) {
          throw userDatasError;
        }
      } else {
        // Create new userdatas record if userDatas is not loaded
        const { error: createUserDatasError } = await supabase
          .from('userdatas')
          .insert({
            e_mail: userEmail,
            memberid: memberId ? parseInt(memberId) : null,
            fanclub: '',
            nachname: '',
            vorname: '',
            adresse: '',
            geb_datum: '',
            plz: '',
          })
          .single();

        if (createUserDatasError) {
          throw createUserDatasError;
        }

        // Fetch the newly created userdatas record
        const { data: newUserDatas, error: fetchUserDatasError } = await supabase
          .from('userdatas')
          .select('*')
          .eq('e_mail', userEmail)
          .single();

        if (fetchUserDatasError) {
          throw fetchUserDatasError;
        }

        setUserDatas(newUserDatas || {});
        setMemberId(newUserDatas?.memberid?.toString() || '');
      }

      // Update users table
      const { error: userError } = await supabase
        .from('users')
        .update({
          full_name: fullname,
          userdatas: userDatas?.id || memberId ? parseInt(memberId) : null,
        })
        .eq('id', user?.id);

      if (userError) {
        throw userError;
      }

      setSuccessMessage('Profile updated successfully!');
    } catch (error: any) {
      setError('Error updating profile!');
      console.error('Error updating profile:', error.message);
    } finally {
      setLoading(false);
    };
  };

  async function generateMemberId() {
    try {
      setLoading(true);

      const { data: highestMemberIdData, error: highestMemberIdError } = await supabase
        .from('userdatas')
        .select('memberid')
        .order('memberid', { ascending: false })
        .limit(1)
        .single();

      if (highestMemberIdError) {
        throw highestMemberIdError;
      }

      const newMemberId = highestMemberIdData ? highestMemberIdData.memberid + 1 : 1;

      const { error: updateMemberIdError } = await supabase
        .from('userdatas')
        .update({ memberid: newMemberId })
        .eq('id', userDatas?.id);

      if (updateMemberIdError) {
        throw updateMemberIdError;
      };

      setMemberId(newMemberId.toString());
      setSuccessMessage('New Member ID generated successfully!');
    } catch (error: any) {
      setError('Error generating member ID!');
      console.error('Error generating member ID:', error.message);
    } finally {
      setLoading(false);
    };
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDatas((prevUserDatas: any) => ({
      ...prevUserDatas,
      [name]: value,
    }));
  };

  return (
    <Card
      title="Deine Daten"
      footer={
        <Button
          variant="slim"
          onClick={updateProfile}
          disabled={loading}
          loading={loading}
        >
          {loading ? 'Loading ...' : 'Daten aktualisieren'}
        </Button>
      }
    >
      <div className="form-widget space-y-6 py-3">
        {error && <div className="text-red-500">{error}</div>}
        {successMessage && <div className="text-green-500">{successMessage}</div>}
        <div className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">E-Mail</label>
            <input
              id="email"
              type="text"
              value={user?.email}
              disabled 
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="memberid" className="text-sm font-medium text-gray-700">Member ID</label>
            <input
              id="memberid"
              name="memberid"
              type="text"
              value={memberId}
              readOnly
              onChange={(e) => setMemberId(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 bg-gray-100"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="fanclub" className="text-sm font-medium text-gray-700">Fanclub</label>
            <input
              id="fanclub"
              name="fanclub"
              type="text"
              value={userDatas?.fanclub || ''}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="nachname" className="text-sm font-medium text-gray-700">Nachname *</label>
            <input
              id="nachname"
              name="nachname"
              type="text"
              value={userDatas?.nachname || ''}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="vorname" className="text-sm font-medium text-gray-700">Vorname *</label>
            <input
              id="vorname"
              name="vorname"
              type="text"
              value={userDatas?.vorname || ''}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div className="flex flex-col">
  <label htmlFor="geb_datum" className="text-sm font-medium text-gray-700">Geb Datum *</label>
  <input
    id="geb_datum"
    name="geb_datum"
    type="date"
    value={userDatas?.geb_datum ? new Date(userDatas.geb_datum).toISOString().split('T')[0] : ''}
    onChange={handleInputChange}
    className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
  />
</div>

          <div className="flex flex-col">
            <label htmlFor="adresse" className="text-sm font-medium text-gray-700">Adresse *</label>
            <input
              id="adresse"
              name="adresse"
              type="text"
              value={userDatas?.adresse || ''}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="plz" className="text-sm font-medium text-gray-700">PLZ *</label>
            <input
              id="plz"
              name="plz"
              type="text"
              value={userDatas?.plz || ''}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="ort" className="text-sm font-medium text-gray-700">Ort/City *</label>
            <input
              id="ort"
              name="ort"
              type="text"
              value={userDatas?.ort || ''}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="ort" className="text-sm font-medium text-gray-700">Land *</label>
            <input
              id="land"
              name="land"
              type="text"
              value={userDatas?.land || ''}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export async function AccountFormAsPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <AccountForm user={user} />
  );
};

