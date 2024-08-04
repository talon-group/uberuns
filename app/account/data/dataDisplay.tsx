'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { type User } from '@supabase/supabase-js';
import Card from '@/components/ui/Card';

// Define an interface for the form data
interface FormData {
  full_name: string;
  memberid: string;
  fanclub: string; 
  nachname: string;
  vorname: string;
  adresse: string;
  telefon: string;
  geb_datum: string;
  plz: string;
  land: string;
  ort: string;
}

export default function UserDataDisplay({ user }: { user: User | null }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const [formData, setFormData] = useState<FormData>({
    full_name: '',
    memberid: '',
    geb_datum: '',
    fanclub: '',
    nachname: '',
    vorname: '',
    adresse: '',
    telefon: '',
    plz: '',
    ort: '',
    land: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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
        setFormData({
          full_name: data.full_name || '',
          memberid: data.memberid || '',
          fanclub: data.fanclub || '',
          nachname: data.nachname || '',
          vorname: data.vorname || '',
          adresse: data.adresse || '',
          geb_datum: data.geb_datum || '',
          telefon: data.telefon || '',
          ort: data.ort || '',
          plz: data.plz || '',
          land: data.land || '',
        });
      } catch (error: any) {
        console.error('Error fetching user data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    // Validate required fields
    const requiredFields: (keyof FormData)[] = ['vorname', 'nachname', 'adresse', 'plz', 'ort', 'geb_datum'];
    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0) {
      setError(`Bitte füllen Sie die folgenden Felder aus: ${missingFields.join(', ')}`);
      setIsSubmitting(false);
      return;
    };

    try {
      // Ensure memberid is either a valid number or null if empty
      const updatedData = {
        ...formData,
        memberid: formData.memberid ? parseInt(formData.memberid, 10) : null,
      };

      const { error } = await supabase
        .from('users')
        .update(updatedData)
        .eq('id', user?.id); 

      if (error) {
        throw error;
      }

      setSuccessMessage('User data updated successfully!');
    } catch (error: any) {
      setError('Error updating user data!');
      console.error('Error updating user data:', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const isOver18 = formData.geb_datum ? calculateAge(formData.geb_datum) >= 18 : false;

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Card title="Deine Daten">
      <div className="form-widget space-y-6">
        {successMessage && <p className="text-green-600">{successMessage}</p>}
        {error && <p className="text-red-600">{error}</p>}
        <h1 className="text-xl font-extrabold text-black sm:text-center sm:text-xl">
            {/* Welcome to your Nordkurve account! Please fill in your information */}
          </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Mitgliedsnummer</label>
            <input
              id="MemberId"
              type="MemberId"
              value="3795"
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed"
              readOnly
            />
          </div> */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">E-Mail</label>
            <input
              id="email"
              type="text"
              value={user?.email || ''}
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed"
              readOnly
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="fanclub" className="text-sm font-medium text-gray-700">Fanclub</label>
            <input
              id="fanclub"
              name="fanclub"
              type="text"
              value={formData.fanclub}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="vorname" className="text-sm font-medium text-gray-700">Vorname *</label>
            <input
              id="vorname"
              name="vorname"
              type="text"
              value={formData.vorname}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="nachname" className="text-sm font-medium text-gray-700">Nachname *</label>
            <input
              id="nachname"
              name="nachname"
              type="text"
              value={formData.nachname}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="geb_datum" className="text-sm font-medium text-gray-700">Geb Datum *</label>
            <input
              id="geb_datum"
              name="geb_datum"
              type="date"
              value={formData.geb_datum}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="adresse" className="text-sm font-medium text-gray-700">Adresse *</label>
            <input
              id="adresse"
              name="adresse"
              type="text"
              value={formData.adresse}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="plz" className="text-sm font-medium text-gray-700">PLZ *</label>
            <input
              id="plz"
              name="plz"
              type="text"
              value={formData.plz}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="ort" className="text-sm font-medium text-gray-700">City *</label>
            <input
              id="ort"
              name="ort"
              type="text"
              value={formData.ort}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="land" className="text-sm font-medium text-gray-700">Land *</label>
            <input
              id="land"
              name="land"
              type="text"
              value={formData.land}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="telefon" className="text-sm font-medium text-gray-700">Telefon</label>
            <input
              id="telefon"
              name="telefon"
              type="text"
              value={formData.telefon}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 px-4 py-2 bg-red-800 text-white rounded-md shadow-sm hover:bg-red-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Updating...' : 'Daten absenden'}
          </button>
        </form>
        <div className="mt-4">
          {/* <p className="text-sm font-medium text-gray-700">
            {isOver18 ? 'Over 18' : 'Under 18'}
          </p> */}
        </div>
      </div>
    </Card>
  );
};

export async function UserDataDisplayAsPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <UserDataDisplay user={user} />
  );
};
