import { NextResponse } from 'next/server';
import { getColorsByStoreId } from '@/features/color/action';

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  const { storeId } = await params;
  try {
    if (!storeId) {
      return new NextResponse('Store id is required', { status: 400 });
    }

    const colors = await getColorsByStoreId(storeId);

    return NextResponse.json(colors);
  } catch (error) {
    console.log('[COLORS_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
