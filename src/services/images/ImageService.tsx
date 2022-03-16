import axios from "axios";
import { useEffect, useState } from "react";

export function useImageSearch(){
  const [labels, setLabels] = useState<string[]>([]);
  const [images, setImages] = useState([]);

  const fetchData = async () => {
    const result = await axios.get('/images', { 
      params: { 
        objects: labels.length > 0 ? labels?.reduce((f, s) => `${f},${s}`) : null
      }
    });

    setImages(result.data.images);
  };

  useEffect(() => {
    fetchData();
  }, [labels]);

  return [setLabels, images];
}