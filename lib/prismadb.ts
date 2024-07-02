import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();

// Middleware để tạo `code` mặc định cho `tag`
client.$use(async (params, next) => {
  if (params.model === 'tag' && params.action === 'create') {
    // Lấy giá trị code cao nhất hiện tại
    const highestCodeTag = await client.tag.findFirst({
      orderBy: {
        code: 'desc',
      },
    });

    const newCode = highestCodeTag ? highestCodeTag.code + 1 : 1; // Tạo giá trị code mới

    params.args.data.code = newCode; // Gán giá trị code mới vào dữ liệu
  }

  return next(params);
});

export default client;

if (process.env.NODE_ENV !== 'production') globalThis.prisma = client;
