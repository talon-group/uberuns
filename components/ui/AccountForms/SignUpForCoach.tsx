'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { createStripePortal } from '@/utils/stripe/server';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';
import { Tables } from '@/types_db';
import UserBookings from './UsersBookings';

type Subscription = Tables<'subscriptions'>;
type Price = Tables<'prices'>;
type Product = Tables<'products'>;

type SubscriptionWithPriceAndProduct = Subscription & {
  prices:
    | (Price & {
        products: Product | null;
      })
    | null;
};

type BusTour = {
  id: number;
  location: string;
  date: string;
  price: number;
  seats: number;
};

interface Props {
  subscription: SubscriptionWithPriceAndProduct | null;
}

export default function SignUpForCoach() {
  const router = useRouter();
  const currentPath = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [subscribed, setSubscribed] = useState<boolean | null>(null);
  const [busTours, setBusTours] = useState<BusTour[]>([]);
  const [selectedTour, setSelectedTour] = useState<string>('');
  const [guestMemberIds, setGuestMemberIds] = useState<string>('');
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        fetchPaymentStatus(user.id);
      }
    };
    fetchUser();
    fetchBusTours();
  }, []);

  const fetchPaymentStatus = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('payments')
        .select('subscribed')
        .eq('user', userId)
        .single();

      if (error && error.code !== 'PGRST100') throw error; // Ignore not found error

      if (data) {
        setSubscribed(data.subscribed ?? null);
      } else {
        setSubscribed(null);
      }
    } catch (error: any) {
      console.error('Error fetching payment status:', error.message);
    }
  };

  const fetchBusTours = async () => {
    try {
      const { data, error } = await supabase
        .from('busTours')
        .select('*');
      
      if (error) throw error;

      setBusTours(data);
    } catch (error: any) {
      console.error('Error fetching bus tours:', error.message);
    }
  };

  const handleStripePortalRequest = async () => {
    setIsSubmitting(true);
    const redirectUrl = await createStripePortal(currentPath);
    setIsSubmitting(false);
    return router.push(redirectUrl);
  };

  const handleBooking = async () => {
    if (!selectedTour || !user) {
      alert('Please select a tour');
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: paymentData, error: paymentError } = await supabase
        .from('payments')
        .select('id')
        .eq('user', user.id)
        .single();
      
      if (paymentError) throw paymentError;

      const guestIds = guestMemberIds.split(',').map(id => parseInt(id.trim(), 10)).filter(id => !isNaN(id));
      const seatNumber = guestIds.length + 1; // Including the user

      const { error: bookingError } = await supabase
        .from('bookings')
        .insert({
          user_id: user.id,
          bus_tour_id: parseInt(selectedTour, 10),
          seat_number: seatNumber,
          payment_id: paymentData.id,
          friends: guestIds,
        });

      if (bookingError) throw bookingError;

      alert('Buchung erfolgreich');
    } catch (error: any) {
      console.error('Sie müssen Mitglied sein, um eine Tour buchen zu können: ', error.message);
      alert('Sie müssen Mitglied sein, um eine Tour buchen zu können');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Card
        title="Melde dich für eine Tour an."
        description="Derzeit sind noch keine Touren verfügbar"
        footer={
          <div className="flex flex-col items-start justify-between text-white sm:flex-row sm:items-center">
            <p className="pb-4 sm:pb-0"></p>
            {!subscribed && (
              <p className="text-red-500">
                Du Kannst dich erst dann für eine Tour anmelden, wenn deine Mitgliedschaft freigeschaltet wurde
              </p>
            )}
            {/* <Button
              variant="slim"
              onClick={handleStripePortalRequest}
              loading={isSubmitting}
              disabled={!subscribed}
            >
              registrieren
            </Button> */}
          </div>
        }
      >
        {subscribed && (
          <form onSubmit={e => { e.preventDefault(); handleBooking(); }}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tour">
                Wählen Sie Tour
              </label>
              <select
                id="tour"
                value={selectedTour}
                onChange={e => setSelectedTour(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Keine Tour ausgewählt</option>
                {busTours.map(tour => (
                  <option key={tour.id} value={tour.id}>
                    {tour.location} - {new Date(tour.date).toLocaleDateString()}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="guests">
                Gastmitglieds-IDs (durch Kommas getrennt)
              </label>
              <input
                type="text"
                id="guests"
                value={guestMemberIds}
                onChange={e => setGuestMemberIds(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex items-center justify-between">
              <Button
                type="submit"
                variant="slim"
                className='bg-red-800 text-red-800'
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                Melden Sie sich für die Tour an
              </Button>
            </div>
          </form>
        )}
      </Card>
      {/* <Card
        title="Ihre Reisen"
        description="Sehen Sie sich hier die Reisen und den Status an"
        footer={<div className="flex flex-col items-start justify-between text-white sm:flex-row sm:items-center">
          <p className="pb-4 sm:pb-0"></p>
        </div>}>
        <UserBookings />
      </Card> */}
    </>
  );
};