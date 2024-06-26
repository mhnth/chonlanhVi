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
}

export const controller = new FController();
