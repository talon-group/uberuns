"use client"

import ExistingUserButton from '../data/existingUserButton';
import UserDataDisplay from '../data/dataDisplay';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { type User } from '@supabase/supabase-js';

export default function AccountPage() {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    fetchUser();
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Account Page</h1>
      <ExistingUserButton user={user} />
      <UserDataDisplay user={user} />
    </div>
  );
}
