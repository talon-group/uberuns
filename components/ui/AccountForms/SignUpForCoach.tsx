'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { createStripePortal } from '@/utils/stripe/server';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import ContactForm from '@/app/account/contactForm';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';
import { Tables } from '@/types_db';

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

interface Props {
  subscription: SubscriptionWithPriceAndProduct | null;
}

export default function SignUpForCoach({ subscription }: Props) {
  const router = useRouter();
  const currentPath = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [subscribed, setSubscribed] = useState<boolean | null>(null);
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

  const handleStripePortalRequest = async () => {
    setIsSubmitting(true);
    const redirectUrl = await createStripePortal(currentPath);
    setIsSubmitting(false);
    return router.push(redirectUrl);
  };

  const handleOpenContactForm = () => {
    setIsContactFormOpen(true);
  };

  const handleCloseContactForm = () => {
    setIsContactFormOpen(false);
  };

  return (
    <>
      <Card
        title="Melde dich für eine Tour an."
        description="Derzeit sind noch keine Trainer verfügbar"
        footer={
          <div className="flex flex-col items-start justify-between text-white sm:flex-row sm:items-center">
            <p className="pb-4 sm:pb-0"></p>
            {!subscribed && (
              <p className="text-red-500">
                Sie können sich erst dann für eine Veranstaltung anmelden, wenn Ihr Abonnement bestätigt wurde.
              </p>
            )}
            <Button
              variant="slim"
              onClick={handleStripePortalRequest}
              loading={isSubmitting}
              disabled={!subscribed}
            >
              registrieren
            </Button>
          </div>
        }
      >
        <></>
      </Card>
      <Card
        title="Kontaktiere uns"
        description="Du hast eine Frage? Füll das Formular aus und wir melden uns bei dir."
        footer={
          <div className="flex flex-col items-start justify-between text-white sm:flex-row sm:items-center">
            <p className="pb-4 sm:pb-0"></p>
            <Button
              variant="slim"
              onClick={handleOpenContactForm}
              loading={isSubmitting}
            >
              Kontakt Formular
            </Button>
          </div>
        }
      >
        <></>
      </Card>

      {isContactFormOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleCloseContactForm}
        >
          <div
            className="bg-white p-8 rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <ContactForm />
            <Button
              variant="slim"
              onClick={handleCloseContactForm}
              className="mt-4"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
