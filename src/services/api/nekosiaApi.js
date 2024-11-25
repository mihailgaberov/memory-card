const NEKOSIA_API_URL = "https://api.nekosia.cat/api/v1/images/catgril";

export async function fetchNekosiaImages() {
  const response = await fetch(
    `${NEKOSIA_API_URL}?count=21&additionalTags=white-hair,uniform&blacklistedTags=short-hair,sad,maid&width=300`
  );

  if (!response.ok) {
    throw new Error(`Nekosia API error: ${response.status}`);
  }

  const result = await response.json();

  if (!result.images || !Array.isArray(result.images)) {
    throw new Error('Invalid response format from Nekosia API');
  }

  const validImages = result.images.filter(item => item?.image?.original?.url);

  if (validImages.length === 0) {
    throw new Error('No valid images received from Nekosia API');
  }

  return { ...result, images: validImages };
}
