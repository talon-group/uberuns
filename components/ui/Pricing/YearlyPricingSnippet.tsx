'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import type { Tables } from '@/types_db';
import { getStripe } from '@/utils/stripe/client';
import { checkoutWithStripe } from '@/utils/stripe/server';
import { getErrorRedirect } from '@/utils/helpers';
import cn from 'classnames';
import { useRouter } from 'next/navigation';
import { Subscription } from '@supabase/supabase-js';

type Product = Tables<'products'>;
type Price = Tables<'prices'>;

interface PriceWithProduct extends Price {
  products: Product | null;
}

interface ProductWithPrices extends Product {
  prices: Price[];
}

interface Props {
  products: ProductWithPrices[];
  subscription: SubscriptionWithProduct | null;
}

interface SubscriptionWithProduct extends Subscription {
  prices: PriceWithProduct | null;
}

export default function YearlyBillingProducts({ products, subscription }: Props) {
  const [priceIdLoading, setPriceIdLoading] = useState<string | undefined>(undefined);
  const router = useRouter();

  const handleStripeCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);

    const { errorRedirect, sessionId } = await checkoutWithStripe(price);

    if (errorRedirect) {
      setPriceIdLoading(undefined);
      return router.push(errorRedirect);
    }

    if (!sessionId) {
      setPriceIdLoading(undefined);
      return router.push(
        getErrorRedirect(
          '/',
          'An unknown error occurred.',
          'Please try again later or contact a system administrator.'
        )
      );
    }

    const stripe = await getStripe();
    stripe?.redirectToCheckout({ sessionId });

    setPriceIdLoading(undefined);
  };

  const yearlyProducts = products.flatMap((product) =>
    product.prices.filter((price) => price.interval === 'year').map((price) => ({
      ...product,
      price,
    }))
  );

  if (yearlyProducts.length === 0) {
    return (
      <section className="bg-gray-100">
        <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
          <p className="text-4xl font-extrabold text-black sm:text-center sm:text-6xl">
            No yearly subscription plans found.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg">
      <div className="max-w-6xl px-4 py-4 mx-auto sm:py-8 sm:px-6 lg:px-8">
        <div className="mt-2 space-y-0 sm:mt-2 flex flex-wrap justify-center gap-2 lg:max-w-2xl lg:mx-auto xl:max-w-none xl:mx-0">
          {yearlyProducts.map(({ price, ...product }) => {
            const priceString = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: price.currency!,
              minimumFractionDigits: 0
            }).format((price.unit_amount || 0) / 100);

            return (
              <div
                key={product.id}
                className={cn(
                  'flex flex-col rounded-lg shadow-sm divide-y divide-zinc-600 bg-zinc-900',
                  {
                    'border border-pink-500': subscription
                      ? product.name === subscription?.prices?.products?.name
                      : product.name === 'Freelancer'
                  },
                  'flex-1',
                  'basis-1/3',
                  'max-w-xs'
                )}
              >
                <div className="p-6">
                  <h2 className="text-2xl font-semibold leading-6 text-red-800">
                    {product.name}
                  </h2>
                  <p className="mt-4 text-red-800">{product.description}</p>
                  <p className="mt-8">
                    <span className="text-5xl text-red-800 font-extrabold white">
                      {priceString}
                    </span>
                    <span className="text-base font-medium text-red-800">
                      /year
                    </span>
                  </p>
                  <Button
                    variant="slim"
                    type="button"
                    loading={priceIdLoading === price.id}
                    onClick={() => handleStripeCheckout(price)}
                    className="block w-full py-2 mt-8 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900"
                  >
                    {subscription ? 'Manage' : 'Subscribe'}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};