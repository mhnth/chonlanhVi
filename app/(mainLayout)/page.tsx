import { controller } from '@/lib/FController';
import { truncateStr } from '@/lib/utils';
import Link from 'next/link';

export default async function Home() {
  const novels = await controller.getNovels();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="mx-auto mt-6 w-full max-w-7xl">
        <h1 className="mb-3 ml-4 inline-block">Novel List</h1>

        {novels ? (
          <div className="flex flex-wrap p-3">
            {novels.map((n, i) => {
              return (
                <div
                  key={i}
                  className="flex w-max max-w-32 flex-col items-center justify-center rounded-md"
                >
                  <Link
                    title={n.nameVi}
                    href={`/novel/${n.slug}`}
                    className="flex h-52 flex-col items-center rounded-md py-2 hover:bg-gray-500"
                  >
                    <img
                      src={n.cover!}
                      alt={n.nameVi!}
                      className="h-36 w-28 rounded-md object-cover shadow-sm shadow-gray-50"
                    />
                    <div className="mt-2 px-2 text-sm font-light capitalize text-gray-300">
                      {truncateStr(n.nameVi, 30)}
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <div>Not found Any Novel</div>
        )}
      </div>
    </main>
  );
}
