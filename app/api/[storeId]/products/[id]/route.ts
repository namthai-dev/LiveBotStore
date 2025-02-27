import { NextResponse } from 'next/server';
import { getProductById } from '@/features/product/db';

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const { id } = await params;
  try {
    if (!id) {
      return new NextResponse('Product id is required', { status: 400 });
    }

    const product = await getProductById(id);

    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
