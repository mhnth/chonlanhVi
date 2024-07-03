import { controller } from '@/lib/FController';
import { NReader } from './n-reader';
import { translate } from '@/lib/translate_api';
import { TransOption } from '@/lib/constants';
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { name: string; chap: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { name, chap } = params;

  const novel = await prisma?.novel.findUnique({
    where: { slug: name },
    select: {
      nameVi: true,
      cover: true,
    },
  });

  return {
    title: novel?.nameVi,
    openGraph: {
      images: [
        novel?.cover ||
          'https://media.discordapp.net/attachments/1255712706426572881/1257560285145993247/0398dc865b5d430b44ca220c29dad39a.png?ex=66858288&is=66843108&hm=282d94f81e3088fa7c973514353bb17ae59a92d132955723619c010e64257c38&=&format=webp&quality=lossless&width=466&height=466',
      ],
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

  const translatedText = await translate(text, transMode);

  if (!translatedText) return <div>Err Translate</div>;

  const formattedText = translatedText.replace(/\n/g, '<br>');

  return (
    <div className="mx-auto max-w-2xl">
      <NReader translatedText={formattedText} />
    </div>
  );
}
