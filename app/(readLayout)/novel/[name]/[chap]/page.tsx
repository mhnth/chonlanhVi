import { controller } from '@/lib/FController';
import { NReader } from './n-reader';
import { TransOption } from '@/lib/types';
import { translate } from '@/lib/translate_api';

export default async function Home({
  params,
  searchParams,
}: {
  params: { name: string; chap: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
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
            : TransOption.Baidu;

  const text = await controller.getChap(name, +chap - 1);

  const translatedText = await translate(text, 'zh', 'vi', transMode);

  if (!translatedText) return <div>Err Translate</div>;

  const formattedText = translatedText.replace(/\n/g, '<br>');

  return (
    <div className="mx-auto max-w-2xl">
      <NReader text={formattedText} />
    </div>
  );
}
