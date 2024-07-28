'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { type User } from '@supabase/supabase-js';
import Button from '@/components/ui/Button';

export default function ExistingUserButton({ user }: { user: User | null }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  const handleExistingUserCheck = async () => {
    if (!user) return;

    setLoading(true);

    try {
      const { data: existingUserData, error } = await supabase
        .from('userdatas')
        .select('*')
        .eq('e_mail', user.email)
        .single();

      if (error || !existingUserData) {
        console.warn('No matching email found in userdatas table');
        return;
      }

      const { nachname, vorname, e_mail, adresse, plz, memberid, fanclub } = existingUserData;

      const { error: updateError } = await supabase
        .from('users')
        .update({
          full_name: `${vorname} ${nachname}`,
          email: e_mail,
          address: adresse,
          postal_code: plz,
          member_id: memberid,
          fanclub,
          userdatas: existingUserData.id, // Only update the userdatas id field
        })
        .eq('id', user.id);

      if (updateError) {
        throw updateError;
      }

      alert('User data imported successfully!');
    } catch (error: any) {
      console.error('Error importing user data:', error.message);
      alert('Error importing user data!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button variant="slim" onClick={handleExistingUserCheck} disabled={loading}>
      {loading ? 'Loading ...' : 'Existing users click here'}
    </Button>
  );
}