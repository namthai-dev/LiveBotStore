import { NextResponse } from 'next/server';
import { getCategoryById } from '@/features/category/db';

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const { id } = await params;
  try {
    if (!id) {
      return new NextResponse('Category id is required', { status: 400 });
    }

    const category = await getCategoryById(id);

    return NextResponse.json(category);
  } catch (error) {
    console.log('[CATEGORY_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
