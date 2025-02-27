import { NextResponse } from 'next/server';
import { getSizeById } from '@/features/size/db';

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const { id } = await params;
  try {
    if (!id) {
      return new NextResponse('Size id is required', { status: 400 });
    }

    const size = await getSizeById(id);

    return NextResponse.json(size);
  } catch (error) {
    console.log('[SIZE_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
