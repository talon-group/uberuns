import { redirect } from 'next/navigation';
import Pricing from '@/components/ui/Pricing/Pricing';
import { createClient } from '@/utils/supabase/server';
import {
  getProducts,
  getSubscription,
  getUser
} from '@/utils/supabase/queries';
import HomeContent from './homeContent';
import CallToActionGrid from './signin/cta';
import NewsletterPosts from './newsletter/NewsComponent';
import ShortNewsletterPosts from './newsletter/ShortenedNewsComp';

// Define the type for user data
interface UserData {
  id: string;
  onboarding: boolean | null;
  terms: boolean | null;
}

export default async function PricingPage() {
  const supabase = createClient();

  // Fetch user, products, and subscription data
  const [user, products, subscription] = await Promise.all([
    getUser(supabase),
    getProducts(supabase),
    getSubscription(supabase)
  ]);

  if (user) {
    // Fetch user data with proper error handling
    const { data: userData, error: userError } = await supabase
    .from('users')
    .select('onboarding, terms')
    .eq('id', user.id)
    .single() as { data: UserData; error: any };
  

    if (userError) {
      console.error('Error fetching user data:', userError);
      return;
    }

    // Ensure userData is correctly typed
    if (userData && (userData.onboarding !== true || userData.terms !== true)) {
      // Redirect to /account if onboarding or terms are not true
      redirect('/account');
      return;
    }
  }

  return (
    <>
      <Pricing
        user={user}
        products={products ?? []}
        subscription={subscription}
      />
      {!user && <CallToActionGrid />}
      <ShortNewsletterPosts />
      {/* <HomeContent /> */}
    </>
  );
}
