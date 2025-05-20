// components/UploadToIPFS.tsx (Client-side component with retry logic)
'use client';

import { useState } from 'react';

export const useIPFSUpload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadToIPFS = async (data: object, maxRetries = 3) => {
    setIsLoading(true);
    setError(null);
    
    let attempt = 0;
    
    while (attempt <= maxRetries) {
      try {
        const response = await fetch('/api/pinata', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result.ipfsHash;
        
      } catch (err: any) {
        attempt++;
        
        if (attempt > maxRetries) {
          setError(err.message || 'Upload failed after retries');
          throw err;
        }
        
        // Exponential backoff
        await new Promise(resolve => 
          setTimeout(resolve, Math.min(1000 * 2 ** attempt, 10000))
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  return { uploadToIPFS, isLoading, error };
};