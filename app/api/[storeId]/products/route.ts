import { NextResponse } from 'next/server';
import { getProductsByStoreId } from '@/features/product/action';

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  const { storeId } = await params;
  try {
    if (!storeId) {
      return new NextResponse('Store id is required', { status: 400 });
    }

    const products = await getProductsByStoreId(storeId);

    return NextResponse.json(products);
  } catch (error) {
    console.log('[PRODUCTS_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
