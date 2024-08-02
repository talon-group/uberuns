'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';

interface PaymentsFormProps {
  user: User | null;
}

export default function PaymentsForm({ user }: PaymentsFormProps) {
  const [iban, setIban] = useState<string>('');
  const [subscribed, setSubscribed] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    if (user) {
      fetchPaymentStatus();
    }
  }, [user]);

  const fetchPaymentStatus = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('payments')
        .select('iban, subscribed')
        .eq('user', user.id)
        .single();

      if (error && error.code !== 'PGRST100') throw error; // Ignore not found error

      if (data) {
        setIban(data.iban ?? '');
        setSubscribed(data.subscribed ?? null);
      } else {
        // No record found, so reset state
        setIban('');
        setSubscribed(null);
      }
    } catch (error: any) {
      console.error('Error fetching payment status:', error.message);
      setError('Error fetching payment status.');
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    if (!user) return;

    try {
      // Upsert will insert a new row if it doesn't exist or update it if it does
      const { error } = await supabase
        .from('payments')
        .upsert({
          user: user.id,
          iban,
          subscribed,
        }, { onConflict: 'user' }); // Correct usage of 'onConflict'

      if (error) throw error;

      // Refresh Abonnementstatus
      fetchPaymentStatus();
    } catch (error: any) {
      console.error('Error updating IBAN:', error.message);
      setError('Error updating IBAN.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      title="Zahlungsinformationen"
      description="Aktualisieren Sie Ihre IBAN und überprüfen Sie Ihren Abonnementstatus"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="iban" className="text-sm font-medium text-gray-700">
            IBAN
          </label>
          <input
            type="text"
            id="iban"
            value={iban}
            onChange={(e) => setIban(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex justify-between items-center">
          <Button
            type="submit"
            variant="slim"
            loading={loading}
          >
            {loading ? 'Saving...' : 'speichern'}
          </Button>
          <p className={`text-lg font-semibold ${subscribed ? 'text-green-600' : 'text-red-600'}`}>
            Abonnementstatus: {subscribed === null ? 'Nicht abonniert' : subscribed ? 'Subscribed' : 'Nicht abonniert'}
          </p>
        </div>
      </form>
    </Card>
  );
}
