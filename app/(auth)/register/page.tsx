'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const handleSubmit = async (formData: FormData) => {
    console.log('form data', formData);

    const res = await fetch('api/auth/register', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();

    if (!data.err) window.location.replace('/');
  };
  return (
    <div>
      <div className="mx-auto mt-8 max-w-md p-6">
        <div className="w-max text-xl">Registration</div>
        <form action={handleSubmit} className="mt-6">
          <label className="flex flex-col gap-1">
            Email
            <input name="email" type="email" className="auth-input" required />
          </label>
          <label className="mt-3 flex flex-col gap-1">
            Password
            <input
              name="password"
              type="password"
              className="auth-input"
              required
            />
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
          <button
            type="submit"
            className="mt-8 w-full rounded-sm bg-gradient-to-r from-blue-400 to-blue-600 py-2 text-center hover:to-blue-400"
          >
            Create Account
          </button>
          <div className="mt-4 text-center font-light text-gray-300">
            or{' '}
            <Link href={'/login'} className="font-normal text-blue-500">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
