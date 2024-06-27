import prisma from '@/lib/prismadb';

class FController {
  private prefixUrl = process.env.PREFIX_URL;
  private githubToken = process.env.GITHUB_TOKEN;

  private fetchOptions = {
    method: 'GET',
    headers: new Headers({
      Authorization: `token ${this.githubToken}`,
      Accept: 'application/vnd.github.v3.raw',
    }),
  };

  async getChap(slug: string, index: number) {
    // const url = `https://api.github.com/repos/mhnth/noveltxt/contents/slug/index.txt`;
    const url = `${this.prefixUrl}${slug}/${index}.txt`
      .replace('/master', '')
      .replace('https://github.com', 'https://api.github.com/repos')
      .replace('/blob/', '/contents/');
    console.log('url', url);

    const res = await fetch(url, this.fetchOptions);
    const data = await res.text();

    return data;
  }

  async getNovels() {
    try {
      const novels = await prisma?.novel.findMany({
        select: {
          nameVi: true,
          cover: true,
          slug: true,
        },
      });

      return novels;
    } catch (error) {
      console.log('ERR fetch Novels:', error);

      return null;
    }
  }

  async getNovel(slug: string) {
    try {
      const novel = await prisma.novel.findUnique({
        where: {
          slug: slug,
        },
      });

      return novel;
    } catch (error) {
      console.log('Error get Novel:', error);

      return null;
    }
  }
}

export const controller = new FController();
