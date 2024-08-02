'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { useRouter, usePathname } from 'next/navigation';
import { createStripePortal } from '@/utils/stripe/server';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import ContactForm from '@/app/account/contactForm';
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

  const subscriptionPrice =
    subscription &&
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: subscription?.prices?.currency!,
      minimumFractionDigits: 0
    }).format((subscription?.prices?.unit_amount || 0) / 100);

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
        title="Sign up for a coach"
        description="Currently no coaches available yet"
        footer={
          <div className="flex flex-col items-start justify-between text-white sm:flex-row sm:items-center">
            <p className="pb-4 sm:pb-0"></p>
            <Button
              variant="slim"
              onClick={handleStripePortalRequest}
              loading={isSubmitting}
              disabled
            >
              Register
            </Button>
          </div>
        }
      >
        <></>
      </Card>
      <Card
        title="Kontaktiere uns"
        description="Wenn Sie Hilfe mit Ihrem Konto benötigen, nehmen Sie Kontakt mit uns auf"
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
};