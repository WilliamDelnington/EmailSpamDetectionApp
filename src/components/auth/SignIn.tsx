import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router';

interface SignInProps {
  onSignIn: (email: string, password: string) => void;
  error?: string;
}

export const SignIn: React.FC<SignInProps> = ({ onSignIn, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await onSignIn(email, password);
    setSubmitting(false);
    if (!error) navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-900 text-center">Sign In</h2>
        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded text-sm text-center">
            {error}
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
        <div>
          <label className="block text-gray-700 mb-1" htmlFor="password">Password</label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className=""
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          disabled={submitting}
        >
          {submitting ? 'Signing In...' : 'Sign In'}
        </Button>
      </form>
    </div>
  );
};
