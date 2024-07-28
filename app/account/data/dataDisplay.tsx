// UserDataDisplay.tsx
'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { type User } from '@supabase/supabase-js';
import Card from '@/components/ui/Card';

export default function UserDataDisplay({ user }: { user: User | null }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      setLoading(true);

      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching user data:', error);
          return;
        }

        setUserData(data);
      } catch (error: any) {
        console.error('Error fetching user data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!userData) {
    return <p>No user data found</p>;
  }

  return (
    <Card title="Your Profile">
      <div className="form-widget space-y-6">
        <div className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="text"
              value={userData.e_mail}
              disabled
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="fullname" className="text-sm font-medium text-gray-700">Full Name</label>
            <input
              id="fullname"
              name="fullname"
              type="text"
              value={userData.full_name || ''}
              disabled
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="memberid" className="text-sm font-medium text-gray-700">Member ID</label>
            <input
              id="memberid"
              name="memberid"
              type="text"
              value={userData.memberid || ''}
              disabled
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="fanclub" className="text-sm font-medium text-gray-700">Fanclub</label>
            <input
              id="fanclub"
              name="fanclub"
              type="text"
              value={userData.fanclub || ''}
              disabled
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="nachname" className="text-sm font-medium text-gray-700">Nachname</label>
            <input
              id="nachname"
              name="nachname"
              type="text"
              value={userData.nachname || ''}
              disabled
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="vorname" className="text-sm font-medium text-gray-700">Vorname</label>
            <input
              id="vorname"
              name="vorname"
              type="text"
              value={userData.vorname || ''}
              disabled
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="adresse" className="text-sm font-medium text-gray-700">Adresse</label>
            <input
              id="adresse"
              name="adresse"
              type="text"
              value={userData.adresse || ''}
              disabled
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="plz" className="text-sm font-medium text-gray-700">PLZ</label>
            <input
              id="plz"
              name="plz"
              type="text"
              value={userData.plz || ''}
              disabled
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}

export async function UserDataDisplayAsPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <UserDataDisplay user={user} />
  );
}
