import { NextResponse } from 'next/server';
import { getCategoriesByStoreId } from '@/features/category/action';

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  const { storeId } = await params;
  try {
    if (!storeId) {
      return new NextResponse('Store id is required', { status: 400 });
    }

    const categories = await getCategoriesByStoreId(storeId);

    return NextResponse.json(categories);
  } catch (error) {
    console.log('[CATEGORIES_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
