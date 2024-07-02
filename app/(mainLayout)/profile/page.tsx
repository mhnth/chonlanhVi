'use client';

import { Logout } from '@/lib/actions';
import { useFormStatus } from 'react-dom';

function LogoutButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="mt-5 w-full rounded-md bg-neutral-700 py-2 text-center"
    >
      Log Out
    </button>
  );
}

export default function ProfilePage() {
  return (
    <div>
      <div className="mx-auto max-w-md p-4 px-12">
        <h3 className="mb-3 text-xl font-semibold">Your Profile</h3>
        <hr />
        <form action="" className="mt-4">
          <label className="flex flex-col gap-1">
            Img
            <input name="email" type="file" className="" required />
          </label>
          <label className="flex flex-col gap-1">
            Email
            <input name="email" type="email" className="auth-input" required />
          </label>
          <label className="mt-3 flex flex-col gap-1">
            Username
            <input
              name="username"
              type="text"
              className="auth-input"
              required
            />
          </label>
          <label className="mt-3 flex flex-col gap-1">
            New Password?
            <input
              name="password"
              type="password"
              className="auth-input"
              required
            />
          </label>
          <button
            type="submit"
            className="mt-8 w-full rounded-sm bg-gradient-to-r from-blue-400 to-blue-600 py-2 text-center hover:to-blue-400"
          >
            Update
          </button>
        </form>
        or
        <form action={Logout}>
          <LogoutButton />
        </form>
      </div>
    </div>
  );
}
