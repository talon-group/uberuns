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
  }

  // Convert `user.email` to `string | null`
  const userEmail: string | null = user.email ?? null;

  // Calculate user's age based on `geb_datum`
  const calculateAge = (birthdate: string) => {
    const birthDate = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const userAge = userDetails?.geb_datum ? calculateAge(userDetails.geb_datum) : null;

  return (
    <section className="mb-32 bg-white">
      <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 sm:pt-24 lg:px-8">
        <div className="sm:align-center sm:flex sm:flex-col">
          <h1 className="text-4xl font-extrabold text-black sm:text-center sm:text-6xl">
            Konto
          </h1>
          <p className="max-w-2xl m-auto mt-5 text-xl text-gray-700 sm:text-center sm:text-2xl">
            Verwalten Sie hier Ihr Konto und Ihre Benutzerdaten
          </p>
        </div>
      </div>
      <div className="p-4">
        <EmailForm userEmail={user.email} />
        {/* {subscription && (
          <CustomerPortalForm subscription={subscription} />
        )} */}
        {/* {!subscription && (
          <YearlyBillingProducts products={products ?? []} subscription={subscription} />
        )} */}
        {/* {userAge !== null && userAge >= 18 && (
          <SignUpForCoach subscription={subscription} />
        )} */}
        <SignUpForCoach />
        <ContactFormTwo subscription={subscription} />
      </div>
      <UserStatusChecker user={user} userEmail={userEmail} />
      <PaymentsForm user={user} />
    </section>
  );
};