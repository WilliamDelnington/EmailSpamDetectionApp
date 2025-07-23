import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface ForgotPasswordProps {
  onSendReset: (email: string) => Promise<void>;
  error?: string;
  success?: string;
}

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onSendReset, error, success }) => {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await onSendReset(email);
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-900 text-center">Forgot Password</h2>
        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded text-sm text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded text-sm text-center">
            {success}
          </div>
        )}
        <div>
          <label className="block text-gray-700 mb-1" htmlFor="email">Email</label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className=""
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          disabled={submitting}
        >
          {submitting ? 'Sending...' : 'Send Reset Link'}
        </Button>
      </form>
    </div>
  );
}; 