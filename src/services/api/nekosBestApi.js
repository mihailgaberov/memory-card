const NEKOS_BEST_API_URL = "https://nekos.best/api/v2/neko?amount=21";

export async function fetchNekosBestImages() {
  const response = await fetch(NEKOS_BEST_API_URL, {
    method: "GET",
    mode: "no-cors"
  });

  if (!response.ok) {
    throw new Error(`Nekos Best API error: ${response.status}`);
  }

  const result = await response.json();

  // Transform the response to match our expected format
  const transformedImages = result.results.map(item => ({
    id: item.url.split('/').pop().split('.')[0], // Extract UUID from URL
    image: {
      original: {
        url: item.url
      }
    },
    artist: {
      name: item.artist_name,
      href: item.artist_href
    },
    source: item.source_url
  }));

  return { images: transformedImages };
}
