import { TransOption, languages_baidu, languages_google } from './constants';

async function translateBing(
  originalString: String,
  from: String = 'cn',
  to: String = 'vi',
) {
  let trans_doc;
  let auth_res = await fetch('https://edge.microsoft.com/translate/auth');
  if (auth_res.ok) {
    let accessToken = await auth_res.text();
    const url1 = `https://api.cognitive.microsofttranslator.com/translate?from=${from}&to=${to}&api-version=3.0&textType=html&includeSentenceLength=true`;
    const settings = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([
        {
          Text: originalString,
        },
      ]),
    };
    let doc2 = await fetch(url1, settings);
    if (doc2.ok) {
      let doc2a = await doc2.json();
      trans_doc = doc2a[0].translations[0].text;
    }
  }

  return trans_doc;
}

function getAllTranslationsGoogle(data: any) {
  return data[0].map((item: any) => item[0]);
}
export async function translateGoogle(
  originalString: string,
  from: String = 'auto',
  to: String = 'vi',
) {
  const res = await fetch(
    `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${to}&dt=t&q=${originalString}`,
    {
      method: 'POST',
    },
  );
  setTimeout(() => {}, 1000);
  const data = await res.json();
  const translations = getAllTranslationsGoogle(data);

  return translations.join('\n');
}

async function translateGpt(
  originalString: string,
  from: string = 'auto',
  to: string = 'vi',
) {
  const res = await fetch(`/api/translate/gpt`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: from,
      to: to || 'vietnamese',
      text: originalString,
    }),
  });
  const data = await res.json();
  return data.translated_text;
}

export async function translateBaidu(
  originalString: string,
  from: string = 'zh',
  to: string = 'vi',
) {
  //@ts-ignore
  to = languages_baidu[languages_google[to]] || to;
  let a = await fetch(
    'https://cors.moldich.eu.org/?q=https://fanyi.baidu.com/ait/text/translate',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: originalString,
        from,
        to,
        reference: '',
        corpusIds: [],
        qcSettings: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
        domain: 'common',
      }),
    },
  );
  let e = await a.text();
  return getTranslatingJson(e.split('\n'))
    .data.list.map((t: any) => t.dst)
    .join('\n');
}

function getTranslatingJson(t: string[]) {
  for (let n = 0; n < t.length; n++)
    if (
      t[n].includes('event: message') &&
      t[n + 1].includes('event":"Translating"')
    ) {
      let a = JSON.parse(t[n + 1].replace('data: ', ''));
      return a;
    }
  return null;
}

async function translateSTV(originalString: string) {
  const formData = new URLSearchParams();
  formData.append('ajax', 'trans');
  formData.append('content', originalString);

  try {
    const response = await fetch('https://sangtacviet.vip/trans/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.text();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

async function translateGptChivi(originalString: string) {
  const res = await fetch(`/api/translate/gpt_chivi`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: originalString,
    }),
  });
  const data = await res.text();
  return data;
}

export async function translate(
  originalString: string,
  from: string = 'zh',
  to: string = 'vi',
  option: TransOption,
): Promise<string | undefined> {
  switch (option) {
    case TransOption.Bing:
      return translateBing(originalString, from, to);
    case TransOption.Baidu:
      return translateBaidu(originalString, from, to);
    case TransOption.Gpt:
      return translateGpt(originalString, from, to);
    case TransOption.Google:
      return translateGoogle(originalString, from, to);
    case TransOption.STV:
      return translateSTV(originalString);
    case TransOption.GPT_CHIVI:
      return translateGptChivi(originalString);
    default:
      throw new Error('Unsupported translation service');
  }
}
