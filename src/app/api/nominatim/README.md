# Nominatim API Proxy

This API proxy provides access to the OpenStreetMap Nominatim geocoding service through your Next.js application.

## Endpoints

### Test Endpoint
- **URL**: `/api/nominatim/test`
- **Method**: GET
- **Description**: Returns API status and sample data

### Search
- **URL**: `/api/nominatim/search`
- **Method**: GET, POST
- **Description**: Search for places by name or address
- **Example**: `/api/nominatim/search?q=London&format=json&limit=5`

### Reverse Geocoding
- **URL**: `/api/nominatim/reverse`
- **Method**: GET, POST
- **Description**: Find place information for given coordinates
- **Example**: `/api/nominatim/reverse?lat=51.5074&lon=-0.1278&format=json`

### Lookup
- **URL**: `/api/nominatim/lookup`
- **Method**: GET, POST
- **Description**: Look up address details for OSM objects
- **Example**: `/api/nominatim/lookup?osm_ids=R65606&format=json`

## Usage Examples

### JavaScript/TypeScript
```javascript
// Search for a place
const searchResponse = await fetch('/api/nominatim/search?q=Paris&format=json&limit=1');
const searchData = await searchResponse.json();

// Reverse geocoding
const reverseResponse = await fetch('/api/nominatim/reverse?lat=48.8566&lon=2.3522&format=json');
const reverseData = await reverseResponse.json();
```

### cURL
```bash
# Search
curl "http://localhost:3000/api/nominatim/search?q=Berlin&format=json&limit=3"

# Reverse geocoding
curl "http://localhost:3000/api/nominatim/reverse?lat=52.5200&lon=13.4050&format=json"
```

## Features

- ✅ Proxies all Nominatim endpoints
- ✅ Supports GET and POST methods
- ✅ CORS enabled for cross-origin requests
- ✅ Request timeout handling (15 seconds)
- ✅ Proper error handling and status codes
- ✅ User-Agent header for responsible usage

## Error Handling

The proxy handles various error scenarios:
- **408**: Request timeout (Nominatim service not responding)
- **502**: Failed to connect to Nominatim service
- **500**: Internal server error
- **4xx/5xx**: Passes through Nominatim API errors

## Rate Limiting

Please be respectful of the Nominatim service usage policy:
- Maximum 1 request per second
- No more than 1000 requests per day for heavy usage
- Always include a valid User-Agent header (automatically handled)

For more information, visit: https://operations.osmfoundation.org/policies/nominatim/