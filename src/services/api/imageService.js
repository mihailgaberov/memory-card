import { fetchNekosiaImages } from "./nekosiaApi";
import { fetchNekosImages } from "./nekosApi";
import { fetchNekosBestImages } from "./nekosBestApi";

export async function fetchImages() {
  try {
    // Try primary API first
    return await fetchNekosiaImages();
  } catch (error) {
    console.warn("Primary API failed, trying fallback:", error);

    // Try first fallback API
    try {
      return await fetchNekosBestImages();
    } catch (fallbackError) {
      console.warn("First fallback API failed, trying second fallback:", fallbackError);

      // Try second fallback API
      try {
        return await fetchNekosImages();
      } catch (secondFallbackError) {
        console.error("All image APIs failed:", secondFallbackError);
        throw new Error("All image APIs failed");
      }
    }
  }
}
