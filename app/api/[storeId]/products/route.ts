import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getStoreByRefId } from '@/features/store/db';

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get('categoryId') || undefined;
  const colorId = searchParams.get('colorId') || undefined;
  const sizeId = searchParams.get('sizeId') || undefined;
  const isFeatured = searchParams.get('isFeatured');

  const { storeId } = await params;
  try {
    if (!storeId) {
      return new NextResponse('Store id is required', { status: 400 });
    }

    const store = await getStoreByRefId(storeId);

    const products = await prisma.product.findMany({
      where: {
        storeId: store?.id,
        categoryId,
        colorId,
        sizeId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        images: true,
        category: true,
        color: true,
        size: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log('[PRODUCTS_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
