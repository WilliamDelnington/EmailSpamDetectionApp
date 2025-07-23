import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useAuth } from '../../hooks/useAuth';

export const UpdateProfile: React.FC = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const { user, profileUpdate, emailUpdate, passwordUpdate, error } = useAuth()

  async function onUpdate({ displayName, email, password }: {displayName: string; email: string, password: string}) {
    if (displayName && user && displayName !== user.displayName) {
      await profileUpdate(displayName)
    }

    if (email && user && email !== user.email) {
      await emailUpdate(email)
    }

    if (password) {
      await passwordUpdate(password)
    }

    if (error !== "") setSuccess("Successfully update profile")
    else setSuccess("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    await onUpdate({ displayName, email, password });
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-900 text-center">Update Profile</h2>
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
          <label className="block text-gray-700 mb-1" htmlFor="displayName">Display Name</label>
          <Input
            id="displayName"
            type="text"
            value={displayName}
            onChange={e => setDisplayName(e.target.value)}
            className=""
          />
        </div>
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
          <label className="block text-gray-700 mb-1" htmlFor="password">New Password</label>
          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className=""
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          disabled={submitting}
        >
          {submitting ? 'Updating...' : 'Update Profile'}
        </Button>
      </form>
    </div>
  );
}; 