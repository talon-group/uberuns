'use client';

import { useCallback, useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { type User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function SecondUserDataDisplayAccount({ user }: { user: User | null }) {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState<string | null>(null);
  const [memberId, setMemberId] = useState<string>('');
  const [userDatas, setUserDatas] = useState<any>(null);
  const [userEmail, setUserEmail] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setUserEmail(user.email);
    }
  }, [user]);

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      if (!userEmail) { 
        console.warn("User email is undefined, cannot fetch userdatas");
        return;
      }

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
            const { data: fetchedUserDatasByEmail, error: userDatasByEmailError } = await supabase
              .from('userdatas')
              .select('*')
              .eq('e_mail', userEmail)
              .single();

            if (fetchedUserDatasByEmail) {
              setUserDatas(fetchedUserDatasByEmail);

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
        } else {
          const { data: fetchedUserDatasByEmail, error: userDatasByEmailError } = await supabase
            .from('userdatas')
            .select('*')
            .eq('e_mail', userEmail)
            .single();

          if (fetchedUserDatasByEmail) {
            setUserDatas(fetchedUserDatasByEmail);

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
        if (!memberId || !userEmail) {
          setError('Please fill in the required fields.');
          return;
        }
      }

      if (userDatas) {
        const { id, ...userDatasWithoutId } = userDatas;

        const { error: userDatasError } = await supabase
          .from('userdatas')
          .update(userDatasWithoutId)
          .eq('id', id);

        if (userDatasError) {
          throw userDatasError;
        }
      } else {
        const { error: createUserDatasError } = await supabase
          .from('userdatas')
          .insert({
            e_mail: userEmail,
            memberid: memberId ? parseInt(memberId) : null,
            fanclub: '',
            nachname: '',
            vorname: '',
            adresse: '',
            plz: '',
            land: '',
            geb_datum: '',
          })
          .single();

        if (createUserDatasError) {
          throw createUserDatasError;
        }

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
    }
  }

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
      }

      setMemberId(newMemberId.toString());
      setSuccessMessage('New Member ID generated successfully!');
    } catch (error: any) {
      setError('Error generating member ID!');
      console.error('Error generating member ID:', error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDatas((prevUserDatas: any) => ({
      ...prevUserDatas,
      [name]: value,
    }));
  };

  return (
    <Card
      title="Dein Profil"
      footer={
        <>
          <Button
            variant="slim"
            onClick={updateProfile}
            disabled={loading}
            loading={loading}
          >
            {loading ? 'Loading ...' : 'Update'}
          </Button>
          <Button
            variant="slim"
            onClick={() => router.push('/account/onboarding/terms')}
            disabled={loading}
            className="ml-4"
          >
            Next Step
          </Button>
        </>
      }
    >
      <div className="form-widget space-y-6">
        {error && <div className="text-red-500">{error}</div>}
        {successMessage && <div className="text-green-500">{successMessage}</div>}
        <div className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="text"
              value={user?.email}
              disabled 
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed"
            />
          </div>
          {/* <div className="flex flex-col">
            <label htmlFor="memberid" className="text-sm font-medium text-gray-700">Member ID</label>
            <input
              id="memberid"
              name="memberid"
              type="text"
              value={memberId || ''}
              onChange={(e) => setMemberId(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
            />
            <Button
              variant="slim"
              onClick={generateMemberId}
              disabled={loading}
              loading={loading}
              className="mt-2"
            >
              Generate New Member ID
            </Button>
          </div> */}
          {userDatas && (
            <>
                <div className="flex flex-col">
                    <label htmlFor="nachname" className="text-sm font-medium text-gray-700">Member ID *</label>
                    <input
                        id="memberid"
                        name="memberid"
                        type="text"
                        value={userDatas.id || ''}
                        readOnly
                        className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 bg-gray-100"
                    />
              </div>
              <div className="flex flex-col">
                <label htmlFor="nachname" className="text-sm font-medium text-gray-700">Nachname *</label>
                <input
                  id="nachname"
                  name="nachname"
                  type="text"
                  value={userDatas.nachname || ''}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="vorname" className="text-sm font-medium text-gray-700">Vorname *</label>
                <input
                  id="vorname"
                  name="vorname"
                  type="text"
                  value={userDatas.vorname || ''}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="geb_datum" className="text-sm font-medium text-gray-700">Geb Datum *</label>
                <input
                  id="geb_datum"
                  name="geb_datum"
                  type="date"
                  value={userDatas.geb_datum || ''}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="adresse" className="text-sm font-medium text-gray-700">Adresse *</label>
                <input
                  id="adresse"
                  name="adresse"
                  type="text"
                  value={userDatas.adresse || ''}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="plz" className="text-sm font-medium text-gray-700">PLZ *</label>
                <input
                  id="plz"
                  name="plz"
                  type="text"
                  value={userDatas.plz || ''}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="ort" className="text-sm font-medium text-gray-700">Ort/city *</label>
                <input
                  id="ort"
                  name="ort"
                  type="text"
                  value={userDatas.ort || ''}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="plz" className="text-sm font-medium text-gray-700">Land *</label>
                <input
                  id="land"
                  name="land"
                  type="text"
                  value={userDatas.land || ''}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </Card>
  );
};