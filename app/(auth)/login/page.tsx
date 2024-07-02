'use client';

import { useAuth } from '@/components/auth-context';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Page() {
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();

    if (data.error) {
      setErrorMsg(data.error);
    } else {
      router.push('/');
    }
  };
  return (
    <div>
      <div className="mx-auto mt-8 max-w-md p-6">
        <div className="w-max text-xl">Log in</div>
        <form action={handleSubmit} className="mt-6">
          <label className="flex flex-col gap-1">
            Email
            <input name="email" type="email" className="auth-input" required />
          </label>
          <label htmlFor="" className="mt-3 flex flex-col gap-1">
            Password
            <input
              name="password"
              type="password"
              className="auth-input"
              required
            />
          </label>
          <Link
            href={'/'}
            className="my-3 block text-right font-light text-gray-300 hover:text-gray-50"
          >
            Forgot Password?
          </Link>
          <button
            type="submit"
            className="hover:bg-grad w-full rounded-sm bg-gradient-to-r from-blue-400 to-blue-600 py-2 text-center hover:to-blue-400"
          >
            Login
          </button>

          <div className="mt-4 text-center font-light text-gray-300">
            or{' '}
            <Link href={'/register'} className="font-normal text-blue-500">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
