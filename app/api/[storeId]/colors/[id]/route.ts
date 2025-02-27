import { NextResponse } from 'next/server';
import { getColorById } from '@/features/color/db';

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const { id } = await params;
  try {
    if (!id) {
      return new NextResponse('Color id is required', { status: 400 });
    }

    const color = await getColorById(id);

    return NextResponse.json(color);
  } catch (error) {
    console.log('[COLOR_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
