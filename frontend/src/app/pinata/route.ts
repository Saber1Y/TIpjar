// app/api/pinata/route.ts (Server-side route handler)
import { NextResponse } from 'next/server';
import PinataSDK from '@pinata/sdk';

const pinata = new PinataSDK({
  pinataApiKey: process.env.PINATA_API_KEY,
  pinataSecretApiKey: process.env.PINATA_SECRET_API_KEY
});

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validate input data
    if (!data || typeof data !== 'object') {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    // Add timestamp for uniqueness
    const dataWithTimestamp = {
      ...data,
      _timestamp: Date.now()
    };

    // Pin to IPFS
    const result = await pinata.pinJSONToIPFS(dataWithTimestamp);
    
    if (!result.IpfsHash) {
      throw new Error('No IPFS hash returned');
    }

    return NextResponse.json({ ipfsHash: result.IpfsHash });
    
  } catch (error: any) {
    console.error('Pinata upload error:', error);
    return NextResponse.json(
      { error: error.message || 'IPFS upload failed' },
      { status: 500 }
    );
  }
}