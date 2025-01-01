import { NextResponse, type NextRequest } from 'next/server';
import { verifyAccess, type ApiData } from '@vercel/flags';

export async function GET(request: NextRequest) {
  const access = await verifyAccess(request.headers.get('Authorization'));
  console.log('access', access);
  if (!access) return NextResponse.json(null, { status: 401 });

  return NextResponse.json<ApiData>({
    definitions: {
      showFunController: {
        description: 'Controls visibility of the Fun Controller component',
        //origin: 'https://example.com/#fun-controller', //
        options: [
          { value: false, label: 'Hidden' },
          { value: true, label: 'Visible' },
        ],
      },
    },
  });
}
