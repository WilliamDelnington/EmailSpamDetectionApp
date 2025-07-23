import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { EmailList } from './EmailList';
import { ComposeModal } from './ComposeModal';
import { useEmails } from '../hooks/useEmails';
import type { Email } from '../hooks/useEmails';

export default function PageMain() {
    const { emails, setEmails } = useEmails();
  const [currentView, setCurrentView] = useState<'inbox' | 'spam'>('inbox');
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

  const inboxEmails = emails.filter((e) => !e.isSpam);
  const spamEmails = emails.filter((e) => e.isSpam);

  const handleViewChange = (view: 'inbox' | 'spam') => {
    setCurrentView(view);
    setSelectedEmail(null);
  };

  const handleComposeClick = () => setIsComposeOpen(true);
  const handleCloseCompose = () => setIsComposeOpen(false);

  const handleSend = (emailData: { to: string; subject: string; body: string }) => {
    const newEmail: Email = {
      id: Date.now().toString(),
      from: 'you@example.com',
      subject: emailData.subject,
      body: emailData.body,
      isRead: true,
      timestamp: new Date(),
      isSpam: false,
    };
    setEmails((prev) => [newEmail, ...prev]);
  };

  const handleEmailClick = (email: Email) => {
    setSelectedEmail(email);
    setEmails((prev) => prev.map((e) => e.id === email.id ? { ...e, isRead: true } : e));
  };

  const handleMarkAsSpam = (id: string) => {
    setEmails((prev) => prev.map((e) => e.id === id ? { ...e, isSpam: true } : e));
    setSelectedEmail(null);
  };

  const handleMarkAsNotSpam = (id: string) => {
    setEmails((prev) => prev.map((e) => e.id === id ? { ...e, isSpam: false } : e));
    setSelectedEmail(null);
  };

  const handleDelete = (id: string) => {
    setEmails((prev) => prev.filter((e) => e.id !== id));
    setSelectedEmail(null);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        currentView={currentView}
        onViewChange={handleViewChange}
        onComposeClick={handleComposeClick}
        inboxCount={inboxEmails.length}
        spamCount={spamEmails.length}
      />
      <main className="flex-1 flex flex-col">
        <EmailList
          emails={currentView === 'inbox' ? inboxEmails : spamEmails}
          currentView={currentView}
          onEmailClick={handleEmailClick}
          onMarkAsSpam={handleMarkAsSpam}
          onMarkAsNotSpam={handleMarkAsNotSpam}
          onDelete={handleDelete}
        />
      </main>
      <ComposeModal
        isOpen={isComposeOpen}
        onClose={handleCloseCompose}
        onSend={handleSend}
      />
    </div>
  );
}
