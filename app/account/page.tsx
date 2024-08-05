import CustomerPortalForm from '@/components/ui/AccountForms/CustomerPortalForm';
import EmailForm from '@/components/ui/AccountForms/EmailForm';
import SignUpForCoach from '@/components/ui/AccountForms/SignUpForCoach';
import YearlyBillingProducts from '@/components/ui/Pricing/YearlyPricingSnippet';
import UserStatusChecker from './memberStatus';
import { redirect } from 'next/navigation';
 
import { createClient } from '@/utils/supabase/server';
import { getUserDetails, getSubscription, getUser, getProducts } from '@/utils/supabase/queries';
import PaymentsForm from './onboarding/paymentForm';
import ContactFormTwo from '@/components/ui/AccountForms/Contact';

export default async function Account() {
  const supabase = createClient();
  const [user, userDetails, subscription, products] = await Promise.all([
    getUser(supabase),
    getUserDetails(supabase),
    getSubscription(supabase),
    getProducts(supabase)
  ]);

  if (!user) {
    return redirect('/signin');
  };

  // Convert `user.email` to `string | null`
  const userEmail: string | null = user.email ?? null;

  return (
    <div
        style={{ backgroundImage: "url('https://github.com/talon-group/uberuns/blob/3d6f3d6a3f731bb1308cf5fa1977480e0b3a1c71/public/bg.jpeg?raw=true')" }}
      >
    <section className="mb-32 bg-white">
      <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 sm:pt-24 lg:px-8">
        <div className="sm:align-center sm:flex sm:flex-col">
          <h1 className="text-4xl font-extrabold text-black sm:text-center sm:text-6xl">
            Mitgliedsbereich
          </h1>
          <p className="max-w-2xl m-auto mt-5 text-xl text-gray-700 sm:text-center sm:text-2xl">
            Verwalte hier Deine Daten oder melde dich für Touren an.
          </p>
        </div>
      </div>
      <div className="p-4">
      <ContactFormTwo subscription={subscription} />
        <SignUpForCoach />
        <EmailForm userEmail={user.email} />
      </div>
      <UserStatusChecker user={user} userEmail={userEmail} />
      <PaymentsForm user={user} />
    </section>
    </div>
  );
};