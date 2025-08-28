import { NextRequest, NextResponse } from 'next/server';

const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org';

export async function GET(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  try {
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    
    // Await the params Promise
    const resolvedParams = await params;
    
    // Build the path from the dynamic segments
    const nominatimPath = resolvedParams.path ? `/${resolvedParams.path.join('/')}` : '/search';
    const nominatimUrl = `${NOMINATIM_BASE_URL}${nominatimPath}${queryString ? `?${queryString}` : ''}`;
    
    console.log('Proxying to:', nominatimUrl);
    const response = await fetch(nominatimUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Chromium/1.0 n8n-template-listing/1.0',
        'Accept': 'application/json',
        'Referrer': 'https://n8n.io/',
      },
      // Add timeout to prevent hanging
      signal: AbortSignal.timeout(15000),
    });
    
    if (!response.ok) {
      return NextResponse.json(
        { error: `Nominatim API error: ${response.status} ${response.statusText}` },
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
    
    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json(
        { error: 'Request timeout - Nominatim service is not responding' },
        { status: 408 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to connect to Nominatim service' },
      { status: 502 }
    );
  }
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  try {
    const body = await request.text();
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    
    // Await the params Promise
    const resolvedParams = await params;
    
    // Build the path from the dynamic segments
    const nominatimPath = resolvedParams.path ? `/${resolvedParams.path.join('/')}` : '/search';
    const nominatimUrl = `${NOMINATIM_BASE_URL}${nominatimPath}${queryString ? `?${queryString}` : ''}`;
    
    console.log('Proxying POST to:', nominatimUrl);
    
    const response = await fetch(nominatimUrl, {
      method: 'POST',
      headers: {
        'User-Agent': 'n8n-template-listing/1.0',
        'Content-Type': request.headers.get('content-type') || 'application/json',
        'Accept': 'application/json',
      },
      body,
      signal: AbortSignal.timeout(15000),
    });
    
    if (!response.ok) {
      return NextResponse.json(
        { error: `Nominatim API error: ${response.status} ${response.statusText}` },
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
    
    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json(
        { error: 'Request timeout - Nominatim service is not responding' },
        { status: 408 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to connect to Nominatim service' },
      { status: 502 }
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