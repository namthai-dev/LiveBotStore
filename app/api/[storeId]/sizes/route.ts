import { NextResponse } from 'next/server';
import { getSizesByStoreId } from '@/features/size/action';

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  const { storeId } = await params;
  try {
    if (!storeId) {
      return new NextResponse('Store id is required', { status: 400 });
    }

    const sizes = await getSizesByStoreId(storeId);

    return NextResponse.json(sizes);
  } catch (error) {
    console.log('[SIZES_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
