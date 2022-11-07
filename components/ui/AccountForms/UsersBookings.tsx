'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';

interface BusTour {
  id: number;
  location: string;
  date: string;
}

interface Booking {
  id: number;
  seat_number: number;
  created_at: string;
  bus_tour_id: number;
  busTour?: BusTour; // Use optional chaining
}

export default function UserBookings() {
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [busTours, setBusTours] = useState<BusTour[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    const fetchUserAndData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);

        if (user) {
          // Fetch bookings and bus tours data
          await Promise.all([
            fetchBookings(user.id),
            fetchBusTours()
          ]);
        }
      } catch (error: any) {
        console.error('Error fetching user and data:', error.message);
        setError('Error fetching data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    const fetchBookings = async (userId: string) => {
      try {
        const { data, error } = await supabase
          .from('bookings')
          .select('id, seat_number, created_at, bus_tour_id')
          .eq('user_id', userId);

        if (error) throw error;

        const bookingsWithBusTours = data.map((booking: Booking) => ({
          ...booking,
          busTour: busTours.find(tour => tour.id === booking.bus_tour_id) // Match bus tour by ID
        }));

        setBookings(bookingsWithBusTours);
      } catch (error: any) {
        console.error('Error fetching bookings:', error.message);
        setError('Error fetching bookings. Please try again later.');
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
        setError('Error fetching bus tours. Please try again later.');
      }
    };

    fetchUserAndData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Your Bookings</h2>
      {bookings.length === 0 ? (
        <p>You have not made any bookings yet.</p>
      ) : (
        <ul className="space-y-4">
          {bookings.map(booking => (
            <li key={booking.id} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-semibold">{booking.busTour?.location || 'No location'}</h3>
                <p className="text-gray-600 text-sm">{booking.busTour ? new Date(booking.busTour.date).toLocaleDateString() : 'No date'}</p>
              </div>
              <div className="flex items-center justify-between text-gray-800">
                <p>Seat Number: {booking.seat_number}</p>
                <p className="text-gray-500 text-sm">Booked on: {new Date(booking.created_at).toLocaleDateString()}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
