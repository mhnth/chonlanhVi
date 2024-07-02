'use client';

import { createTag } from '@/lib/actions';
import Link from 'next/link';
import { useState } from 'react';

export default function CreateTagPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const [loading, setLoading] = useState(false);

  const formAction = async (formData: FormData) => {
    setLoading(true);
    const res = await createTag(formData);

    if (!res) return;

    setLoading(false);
  };

  return (
    <div>
      <div className="mx-auto max-w-md p-6">
        <div className="flex justify-between">
          <h3 className="text-xl">Create Tag</h3>
          <Link href={'/admin'}>Back</Link>
        </div>
        <form action={formAction}>
          <label className="mt-3 flex flex-col gap-1">
            code
            <input
              name="code"
              type="number"
              className="auth-input"
              placeholder="722024"
              required
            />
          </label>
          <label className="mt-3 flex flex-col gap-1">
            nameVi
            <input
              name="nameVi"
              type="text"
              className="auth-input"
              placeholder="tag name vi"
              required
            />
          </label>
          <label className="flex flex-col gap-1">
            name
            <input
              name="name"
              type="text"
              className="auth-input"
              placeholder="tag name"
            />
          </label>
          <button
            type="submit"
            className="mt-6 w-full rounded-md bg-neutral-700 py-2 text-center hover:bg-neutral-500"
          >
            {loading ? 'Creating...' : 'Create'}
          </button>
        </form>
      </div>
    </div>
  );
}
