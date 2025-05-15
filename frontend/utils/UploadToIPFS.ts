import axios from 'axios';

// Enhanced version with better error handling and retry mechanism
export const UploadToIPFS = async (data: object, retries = 2) => {
  let attempt = 0;
  
  while (attempt <= retries) {
    try {
      // Add timestamp to data to ensure uniqueness
      const dataWithTimestamp = {
        ...data,
        _timestamp: Date.now()
      };
      
      console.log(`Attempting to upload to IPFS (attempt ${attempt + 1}/${retries + 1})...`);
      
      const res = await axios.post(
        'https://api.pinata.cloud/pinning/pinJSONToIPFS',
        dataWithTimestamp,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
          },
          timeout: 30000, // 30 second timeout
        }
      );
      
      if (!res.data.IpfsHash) {
        throw new Error('IPFS hash not returned from Pinata');
      }
      
      console.log(`✅ Successfully uploaded to IPFS with hash: ${res.data.IpfsHash}`);
      return res.data.IpfsHash;
    } catch (err) {
      attempt++;
      console.error(`❌ Pinata upload error (attempt ${attempt}/${retries + 1}):`, err);
      
      if (attempt > retries) {
        console.error('All retry attempts failed');
        throw new Error(
          err.response?.data?.error || 
          err.message || 
          'Upload to IPFS failed'
        );
      }
      
      // Wait before retrying (exponential backoff)
      const delay = Math.min(1000 * Math.pow(2, attempt), 10000);
      console.log(`Retrying in ${delay/1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};