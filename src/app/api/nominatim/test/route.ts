import { NextResponse } from 'next/server';

// Test endpoint to verify the API structure is working
export async function GET() {
  try {
    // Return mock Nominatim-like response for testing
    const mockResponse = [
      {
        place_id: 123456,
        licence: "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
        osm_type: "relation",
        osm_id: 65606,
        boundingbox: ["51.2867601", "51.6918741", "-0.5103751", "0.3340155"],
        lat: "51.5073219",
        lon: "-0.1276474",
        display_name: "London, Greater London, England, United Kingdom",
        class: "place",
        type: "city",
        importance: 0.9654895765402,
        icon: "https://nominatim.openstreetmap.org/ui/mapicons/poi_place_city.p.20.png"
      }
    ];

    return NextResponse.json({
      status: 'success',
      message: 'Nominatim API proxy is working',
      sample_data: mockResponse,
      endpoints: {
        search: '/api/nominatim/search?q=London&format=json',
        reverse: '/api/nominatim/reverse?lat=51.5074&lon=-0.1278&format=json',
        lookup: '/api/nominatim/lookup?osm_ids=R65606&format=json'
      }
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('Test endpoint error:', error);
    return NextResponse.json(
      { error: 'Test endpoint failed' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}