import { createClient } from "@/utils/supabase/server";
import { getUserDetails, getSubscription, getUser } from '@/utils/supabase/queries';
import NewsletterPosts from "./NewsComponent";
import { redirect } from 'next/navigation';

export default async function IndexPage() {
  const supabase = createClient();
  const [user, userDetails, subscription] = await Promise.all([
    getUser(supabase),
    getUserDetails(supabase),
    getSubscription(supabase)
  ]);

  if (!user) {
    redirect('/signin');
  }

  return <NewsletterPosts />;
};
