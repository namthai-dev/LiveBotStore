import { NextResponse } from 'next/server';
import { getBillboardsByStoreId } from '@/features/billboard/action';

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  const { storeId } = await params;
  try {
    if (!storeId) {
      return new NextResponse('Store id is required', { status: 400 });
    }

    const billboards = await getBillboardsByStoreId(storeId);

    return NextResponse.json(billboards);
  } catch (error) {
    console.log('[BILLBOARDS_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
