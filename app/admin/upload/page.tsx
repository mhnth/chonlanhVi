'use client';

import { createNovel } from '@/lib/actions';
import { NovelUpload } from '@/lib/types';
import Link from 'next/link';
import { ChangeEvent, FormEvent, useState } from 'react';

export default function UploadPage() {
  const [formState, setFormState] = useState({
    slug: '',
    point: '',
    cover: '',
    nameVi: '',
    name: '',
    tags: '',
    descVi: '',
    desc: '',
    parts: '',
    chapTitlesVi: '',
    chapTitles: '',
    authorVi: '',
    author: '',
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string>('');

  const parseParts = (str: string) => {
    if (str.includes(',')) {
      return str.split(';').map((part) => part.split(',').map(Number));
    } else {
      const end = Number(str);
      return Array.from({ length: Math.ceil(end / 20) }, (_, i) => [
        i * 20,
        Math.min(i * 20 + 19, end - 1),
      ]);
    }
  };

  const parseToArr = (str: string) => {
    return str.split(',').map((item) => item.replace(/"/g, '').trim());
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const parsedForm = {
      ...formState,
      parts: parseParts(formState.parts),
      tags: parseToArr(formState.tags).map(Number) as any,
      chapTitlesVi: parseToArr(formState.chapTitlesVi),
      chapTitles: parseToArr(formState.chapTitles),
    };

    const res = await createNovel(parsedForm as any);

    if (!res) setMsg('Fail to create novel metadata');

    setLoading(false);
  };

  return (
    <div>
      <div className="mx-auto max-w-md p-6">
        <div className="flex justify-between">
          <h3 className="text-xl">Upload Book</h3>
          <Link href={'/admin'}>Back</Link>
        </div>
        <form action="" onSubmit={handleSubmit}>
          <label className="mt-3 flex flex-col gap-1">
            Slug
            <input
              onChange={handleInputChange}
              name="slug"
              type="text"
              className="auth-input"
              placeholder="novel-name"
              required
            />
          </label>
          <label className="mt-3 flex flex-col gap-1">
            Point
            <input
              onChange={handleInputChange}
              name="point"
              type="text"
              className="auth-input"
              placeholder="repo-name"
              required
            />
          </label>
          <label className="flex flex-col gap-1">
            Cover
            <input
              onChange={handleInputChange}
              name="cover"
              type="text"
              className="auth-input"
              placeholder="pixai.art"
            />
          </label>
          <label className="flex flex-col gap-1">
            Name Vi
            <input
              onChange={handleInputChange}
              name="nameVi"
              type="text"
              className="auth-input"
              placeholder="name display"
              required
            />
          </label>
          <label className="flex flex-col gap-1">
            Original Name
            <input
              onChange={handleInputChange}
              name="name"
              type="text"
              className="auth-input"
              placeholder="楓 かれん"
            />
          </label>{' '}
          <label className="flex flex-col gap-1">
            Author Vi
            <input
              onChange={handleInputChange}
              name="authorVi"
              type="text"
              className="auth-input"
              placeholder="author vi"
            />
          </label>{' '}
          <label className="flex flex-col gap-1">
            author
            <input
              onChange={handleInputChange}
              name="author"
              type="text"
              className="auth-input"
              placeholder="author"
            />
          </label>
          <label className="flex flex-col gap-1">
            Tags
            <input
              onChange={handleInputChange}
              name="tags"
              type="text"
              className="auth-input"
              placeholder="code, split by ,"
            />
          </label>
          <label className="flex flex-col gap-1">
            Desc Vi
            <textarea
              onChange={handleInputChange}
              name="descVi"
              className="auth-input"
              placeholder="description display"
            />
          </label>
          <label className="flex flex-col gap-1">
            Desc
            <textarea
              onChange={handleInputChange}
              name="desc"
              className="auth-input"
              placeholder="description"
            />
          </label>
          <label className="flex flex-col gap-1">
            Parts
            <input
              onChange={handleInputChange}
              name="parts"
              type="text"
              className="auth-input"
              placeholder="1, 10; 11, 20"
            />
          </label>
          <label className="flex flex-col gap-1">
            Chapter titles Vi
            <textarea
              onChange={handleInputChange}
              name="chapTitlesVi"
              className="auth-input"
              placeholder="split by ,"
            />
          </label>
          <label className="flex flex-col gap-1">
            Chapter title
            <textarea
              onChange={handleInputChange}
              name="chapTitles"
              className="auth-input"
              placeholder="split by ,"
            />
          </label>
          <button
            type="submit"
            className="mt-6 w-full rounded-md bg-neutral-700 py-2 text-center hover:bg-neutral-500"
          >
            Upload
          </button>
        </form>
        {msg && (
          <div className="mt-6 border border-red-400 p-4 text-red-500">
            {msg}
          </div>
        )}
      </div>
    </div>
  );
}
