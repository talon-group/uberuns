'use client';

import Button from '@/components/ui/Button';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { createStripePortal } from '@/utils/stripe/server';
import Link from 'next/link';
import Card from '@/components/ui/Card';
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
        title="Contact us"
        description="If you need help with your account, get in touch"
        footer={
            <div className="flex flex-col items-start justify-between text-white sm:flex-row sm:items-center">
            <p className="pb-4 sm:pb-0"></p>
            <Link href="mailto:wuppi@nk12.de"><Button
                variant="slim"
                onClick={handleStripePortalRequest}
                loading={isSubmitting}
            >
                Contact form
            </Button></Link>
            </div>
        }
        >
            <></>
        </Card>
    </>
  );
}
