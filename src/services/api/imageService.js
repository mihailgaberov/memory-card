import { fetchNekosiaImages } from './nekosiaApi';
import { fetchNekosImages } from './nekosApi';

export async function fetchImages() {
  try {
    // Try primary API first
    return await fetchNekosiaImages();
  } catch (error) {
    console.warn('Primary API failed, trying fallback:', error);
    
    try {
      // Try fallback API
      return await fetchNekosImages();
    } catch (fallbackError) {
      console.error('Fallback API also failed:', fallbackError);
      throw new Error('All image APIs failed');
    }
  }
}
