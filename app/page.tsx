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
import HeroSection from './signin/hero';

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
    if (userData && (userData.terms !== true)) {
      // Redirect to /account if onboarding or terms are not true
      redirect('/account');
      return;
    }
  }

  return (
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('https://github.com/talon-group/uberuns/blob/3d6f3d6a3f731bb1308cf5fa1977480e0b3a1c71/public/bg.jpeg?raw=true')" }}
      ></div>
      <div className="relative z-10">
        {!user && <CallToActionGrid />}
        <ShortNewsletterPosts />
      </div>
    </div>
  );
};