import { NextResponse } from 'next/server';
import { getBillboardById } from '@/features/billboard/db';

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const { id } = await params;
  try {
    if (!id) {
      return new NextResponse('Billboard id is required', { status: 400 });
    }

    const billboard = await getBillboardById(id);

    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARD_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
