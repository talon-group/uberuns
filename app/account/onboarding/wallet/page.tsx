"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import PaymentsForm from "../paymentForm";
import { User } from "@supabase/supabase-js";

export default function WalletPageForNewUser() {
    const supabase = createClient();
    const router = useRouter();

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserAndCheckTerms = async () => {
            try {
                const { data: authData, error: authError } = await supabase.auth.getUser();
                if (authError) throw authError;
                
                if (!authData.user || !authData.user.id) {
                    router.push('/signin');
                    return;
                }

                const { data: userData, error: userError } = await supabase
                    .from('users')
                    .select('terms')
                    .eq('id', authData.user.id)
                    .single();

                if (userError) throw userError;

                setUser(authData.user);

                if (userData?.terms) {
                    setLoading(false);
                } else {
                    router.push('/account');
                }
            } catch (error: any) {
                console.error('Error fetching user data:', error.message);
                setError('Error fetching user data. Please try again later.');
                router.push('/signin');
            }
        };

        fetchUserAndCheckTerms();
    }, [router, supabase]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    // return user && <PaymentsForm user={user} />;
    return (
        <div className="p-5 bg-gray-100 min-h-screen flex flex-col items-center">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl w-full">
                <h1 className="text-2xl font-bold mb-4">Geben Sie hier Ihre Zahlungsinformationen ein</h1>
                <PaymentsForm user={user} />
            </div>
        </div>
    );
};