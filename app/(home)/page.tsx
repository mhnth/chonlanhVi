import { controller } from '@/lib/FController';

export default async function Home() {
  const text = await controller.getChap('ongtucloantinh', 22);

  const formattedText = text.replace(/\n/g, '<br>');

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mx-auto max-w-2xl">
        <div
          className="max-w-2xl leading-6 text-gray-300"
          dangerouslySetInnerHTML={{ __html: formattedText }}
        ></div>
      </div>
    </main>
  );
}
