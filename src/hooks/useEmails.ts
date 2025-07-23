import { useState } from 'react';

export interface Email {
  id: string;
  from: string;
  subject: string;
  body: string;
  isRead: boolean;
  timestamp: Date;
  isSpam: boolean;
}

const mockEmails: Email[] = [
  {
    id: '1',
    from: 'alice@example.com',
    subject: 'Welcome!',
    body: 'Thanks for signing up to our service.',
    isRead: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    isSpam: false,
  },
  {
    id: '2',
    from: 'bob@spam.com',
    subject: 'You won a million dollars!',
    body: 'Click here to claim your prize.',
    isRead: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    isSpam: true,
  },
];

export function useEmails() {
  const [emails, setEmails] = useState<Email[]>(mockEmails);
  // You can add more logic here for real apps
  return { emails, setEmails };
}