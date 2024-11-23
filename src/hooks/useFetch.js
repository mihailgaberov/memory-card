import { useState, useEffect } from "react";

export default function useFetch() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        "https://api.nekosia.cat/api/v1/images/catgril?count=21&additionalTags=white-hair,uniform&blacklistedTags=short-hair,sad,maid&width=300"
      );
      
      if (!response.ok) {
        setError("Failed to fetch data");
        return;
      }
      
      const result = await response.json();
      
      // Validate and filter out any invalid images
      if (!result.images || !Array.isArray(result.images)) {
        setError('Invalid response format');
        return;
      }

      const validImages = result.images.filter(item => item?.image?.original?.url);
      
      if (validImages.length === 0) {
        setError('No valid images received');
        return;
      }

      setData({ ...result, images: validImages });
    } catch (err) {
      setError(err.message || 'An error occurred');
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
