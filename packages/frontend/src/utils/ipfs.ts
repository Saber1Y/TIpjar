"use server";

/**
 * IPFS Service for uploading files to IPFS via ThirdWeb Storage
 * This service uses the ThirdWeb Storage SDK for simplified IPFS interactions
 */

import { upload, download, resolveScheme } from "thirdweb/storage";
import { createThirdwebClient } from "thirdweb";

const client = createThirdwebClient({
    clientId: process.env.THIRDWEB_CLIENT_ID as string,
    secretKey: process.env.THIRDWEB_SECRET_KEY as string,
});

/**
 * Uploads a file to IPFS via ThirdWeb Storage
 * @param file The file to upload
 * @returns The CID of the uploaded file
 */

export async function uploadToIPFS(file: File): Promise<string> {
    try {
        // Upload file to IPFS using ThirdWeb Storage
        const uris = await upload({
            client,
            files: [file],
        });

        // The URI is in the format "ipfs://CID"
        // Extract the CID from the URI by removing the "ipfs://" prefix
        const cid = uris.replace("ipfs://", "");

        return cid;
    } catch (error) {
        console.error("Error uploading to IPFS via ThirdWeb:", error);
        throw error;
    }
}

/**
 * Uploads metadata object to IPFS via ThirdWeb Storage
 * @param metadata The metadata object to upload
 * @returns The CID of the uploaded metadata
 */

export async function uploadMetadataToIPFS(
    metadata: Record<string, unknown>,
): Promise<string> {
    try {
        // Upload metadata directly using ThirdWeb Storage
        const uris = await upload({
            client,
            files: [
                {
                    ...metadata,
                },
            ],
        });

        // Extract the CID from the URI
        const cid = uris.replace("ipfs://", "");

        return cid;
    } catch (error) {
        console.error("Error uploading metadata to IPFS via ThirdWeb:", error);
        throw error;
    }
}

/**
 * Builds an IPFS gateway URL for a given CID
 * @param cid The CID to build a URL for
 * @returns The IPFS gateway URL
 */
export async function getIpfsUrl(cid: string): Promise<string> {
    // Use ThirdWeb's gateway to resolve the IPFS content
    return resolveScheme({
        client,
        uri: `ipfs://${cid}`,
    });
}

export async function downloadFromIPFS(uri: string): Promise<string> {
    const response = await download({
        client,
        uri,
    });
    return response.text();
}
