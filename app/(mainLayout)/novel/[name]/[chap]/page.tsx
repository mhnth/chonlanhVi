import { controller } from '@/lib/FController';
import { NReader } from './n-reader';
import { translate } from '@/lib/translate_api';
import { TransOption } from '@/lib/constants';
import { Metadata, ResolvingMetadata } from 'next';
import prisma from '@/lib/prismadb';

type Props = {
  params: { name: string; chap: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const getNovelInfo = async (slug: string) => {
  return await prisma?.novel.findUnique({
    where: { slug: slug },
    select: {
      nameVi: true,
      cover: true,
      slug: true,
    },
  });
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { name, chap } = params;

  const novel = await getNovelInfo(name);

  return {
    title: novel?.nameVi,
    openGraph: {
      images: [novel?.cover || ''],
    },
  };
}

export default async function ChapPage({ params, searchParams }: Props) {
  const { name, chap } = params;

  const mt = searchParams.mt;
  const transMode =
    mt === 'baidu'
      ? TransOption.Baidu
      : mt === 'stv'
        ? TransOption.STV
        : mt === 'gg'
          ? TransOption.Google
          : mt === 'bing'
            ? TransOption.Bing
            : mt === 'tt'
              ? TransOption.TIKTOK
              : TransOption.Baidu;

  const text = await controller.getChap(name, +chap - 1);

  const [translatedText, novel] = await Promise.all([
    await translate(text.trim(), transMode),
    await getNovelInfo(name),
  ]);

  if (!translatedText) return <div>Err Translate</div>;

  const formattedText = translatedText.replace(/\n/g, `<p/>`);

  return (
    <div className="mx-auto max-w-2xl">
      <NReader
        translatedText={formattedText}
        title={novel!.nameVi}
        slug={novel!.slug}
      />
    </div>
  );
}
