import Link from 'next/link';

export default function AdminPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div>
      <div className="mx-auto max-w-md p-6">
        <div className="flex justify-between">
          <h3 className="text-xl">Admin Panel</h3>
          <Link className="border-b border-gray-300 pb-2" href={'/'}>
            Back
          </Link>
        </div>
        <hr className="my-4" />
        <div className="mb-8 flex gap-4">
          <Link className="px" href={'admin/upload'}>
            Upload Book
          </Link>
          <Link href={'admin/edit'}>Edit Book</Link>
          <Link className="" href={'/admin/tag'}>
            Create Tag
          </Link>
        </div>
      </div>
    </div>
  );
}
