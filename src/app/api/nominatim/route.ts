import { NextRequest, NextResponse } from 'next/server';

const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org';

export async function GET(request: NextRequest) {
  try {
    const { searchParams, pathname } = new URL(request.url);
    const queryString = searchParams.toString();
    
    // Extract the path after /api/nominatim
    const nominatimPath = pathname.replace('/api/nominatim', '') || '/search';
    const nominatimUrl = `${NOMINATIM_BASE_URL}${nominatimPath}${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(nominatimUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'n8n-template-listing/1.0',
        'Accept': 'application/json',
      },
      // Add timeout to prevent hanging
      signal: AbortSignal.timeout(10000),
    });
    
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch from Nominatim' },
        { status: response.status }
      );
    }
    
    const data = await response.json();
    
    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('Nominatim proxy error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    
    const nominatimUrl = `${NOMINATIM_BASE_URL}${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(nominatimUrl, {
      method: 'POST',
      headers: {
        'User-Agent': 'n8n-template-listing/1.0',
        'Content-Type': request.headers.get('content-type') || 'application/json',
        'Accept': 'application/json',
      },
      body,
    });
    
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch from Nominatim' },
        { status: response.status }
      );
    }
    
    const data = await response.json();
    
    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('Nominatim proxy error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}