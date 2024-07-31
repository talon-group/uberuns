import Pricing from '@/components/ui/Pricing/Pricing';
import { createClient } from '@/utils/supabase/server';
import {
  getProducts,
  getSubscription,
  getUser
} from '@/utils/supabase/queries';
import HomeContent from './homeContent';
import CallToActionGrid from './signin/cta';

export default async function PricingPage() {
  const supabase = createClient();
  const [user, products, subscription] = await Promise.all([
    getUser(supabase),
    getProducts(supabase),
    getSubscription(supabase)
  ]);

  return (
    <>
      <Pricing
        user={user}
        products={products ?? []}
        subscription={subscription}
      />
      <CallToActionGrid />
      {/* <HomeContent /> */}
    </>
  );
}
