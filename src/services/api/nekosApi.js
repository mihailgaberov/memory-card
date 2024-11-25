const NEKOS_API_URL = "https://api.nekosapi.com/v3/images/random?limit=21&rating=safe";

export async function fetchNekosImages() {
  const response = await fetch(NEKOS_API_URL, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`Nekos API error: ${response.status}`);
  }

  const result = await response.json();

  // Transform the response to match our expected format
  const transformedImages = result.items.map(item => ({
    id: item.id,
    image: {
      original: {
        url: item.image_url
      }
    }
  }));

  return { images: transformedImages };
}
