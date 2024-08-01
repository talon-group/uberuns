"use client";

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

const topics = [
  // "tour",
  // "account help",
  // "general enquiry",
  "Tour",
  "spieltag Mitgliedschaft",
  "Generelle Frage"
];

export default function ContactForm() {
  const supabase = createClient();
  const router = useRouter();
  const [topic, setTopic] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    const userId = user?.id;

    if (!topic || !body) {
      setError('Please select a topic and provide a message.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase
        .from('contacts')
        .insert([{ topic, user: userId, body }]);

      if (error) {
        throw error;
      }

      alert('Message sent successfully!');
      router.push('/account');
    } catch (error: any) {
      console.error('Error sending message:', error.message);
      setError('Error sending message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Send a Message</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="topic" className="block text-sm font-medium mb-1">Topic</label>
          <select
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select a topic</option>
            {topics.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="body" className="block text-sm font-medium mb-1">Message</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={4}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <Button
          variant="slim"
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white"
        >
          {loading ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
    </div>
  );
}