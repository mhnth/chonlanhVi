import { controller } from '@/lib/FController';
import { Tabs } from './tabs';
import Link from 'next/link';

export default async function Page({
  params,
  searchParams,
}: {
  params: { name: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const slug = params.name;

  const novel = await controller.getNovel(slug);

  if (!novel) return <div>Not Found this Novel</div>;

  return (
    <>
      <div className="novel-info-bg w-full md:pt-3">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-3 py-4 md:flex-row md:items-start">
          <img
            src={novel.cover!}
            alt={novel.nameVi!}
            className="mx-auto h-44 w-32 rounded-md object-cover shadow-sm shadow-slate-100 md:mx-0"
          />
          <div className="gap-1 space-y-3 p-2">
            <h3 className="text-xl capitalize">{novel.nameVi}</h3>{' '}
            <div className="mt-2 text-sm">
              <span className="mr-2">Original:</span>
              <span className="font-light text-gray-200">{`${novel.name}`}</span>
            </div>
            <div className="text-sm">
              <span className="mr-2">Author:</span>
              <span className="font-light text-gray-200">{`${novel.authorVi + ' / ' + novel.author}`}</span>
            </div>
            <div className="mt-3 flex gap-2 px-3">
              <span className="grow rounded-md bg-gray-700 py-2 text-center">
                Save
              </span>
              <Link
                href={`/novel/${slug}/1`}
                className="grow rounded-md bg-gradient-to-r from-blue-400 to-blue-600 py-2 text-center"
              >
                Read
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-5xl">
        <Tabs
          desc={novel.descVi}
          parts={novel.parts}
          chapTitles={novel.chapTitlesVi}
          slug={slug}
        />
      </div>
    </>
  );
}
