import { useState, useEffect } from "react";

export default function useFetch() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    console.info("Fetching data.");
    
    try {
      const response = await fetch(
        "https://api.nekosia.cat/api/v1/images/catgril?count=21&additionalTags=white-hair,uniform&blacklistedTags=short-hair,sad,maid&width=300"
      );
      
      if (!response.ok) throw new Error("Failed to fetch data");
      
      const result = await response.json();
      
      // Validate and filter out any invalid images
      if (!result.images || !Array.isArray(result.images)) {
        throw new Error('Invalid response format');
      }

      const validImages = result.images.filter(item => item?.image?.original?.url);
      
      if (validImages.length === 0) {
        throw new Error('No valid images received');
      }

      setData({ ...result, images: validImages });
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
    fetchData,
  };
}
