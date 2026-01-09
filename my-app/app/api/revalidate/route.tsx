import { revalidateDestination } from '@/app/actions/search.actions';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json(
        { success: false, error: 'Slug não fornecido' },
        { status: 400 }
      );
    }

    const result = await revalidateDestination(slug);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.redirect(new URL(`/search/${slug}`, request.url));
  } catch (error) {
    console.error('Erro na revalidação:', error);
    return NextResponse.json(
      { success: false, error: 'Erro interno' },
      { status: 500 }
    );
  }
}
