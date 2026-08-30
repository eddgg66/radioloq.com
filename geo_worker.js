// Cloudflare Worker — returns visitor's country code for language auto-detection.
// Deploy as a separate Worker, route: radioloq.com/api/geo
export default {
  async fetch(request) {
    const country = request.cf?.country || 'XX';
    return new Response(JSON.stringify({ country }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://radioloq.com',
        'Cache-Control': 'no-store',
      },
    });
  },
};
