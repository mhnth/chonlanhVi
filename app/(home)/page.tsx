import { controller } from '@/lib/FController';
import Link from 'next/link';

export default async function Home() {
  const novels = await controller.getNovels();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="mx-auto mt-6 w-full max-w-7xl">
        <h1 className="mb-3 ml-4 inline-block">Novel List</h1>
        {novels ? (
          novels.map((n, i) => {
            return (
              <div key={i} className="w-max rounded-md">
                <Link
                  href={`/novel/${n.slug}`}
                  className="flex h-52 flex-col items-center rounded-md p-2 hover:bg-gray-500"
                >
                  <img
                    src={n.cover!}
                    alt={n.nameVi!}
                    className="h-36 w-28 rounded-md object-cover shadow-sm shadow-gray-50"
                  />
                  <span className="mt-2 text-sm font-semibold capitalize text-gray-300">
                    {n.nameVi}
                  </span>
                </Link>
              </div>
            );
          })
        ) : (
          <div>Not found Any Novel</div>
        )}
      </div>
    </main>
  );
}
