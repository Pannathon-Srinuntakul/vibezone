import { S3 } from "@aws-sdk/client-s3";

export const endpoint = "https://sgp1.digitaloceanspaces.com";

export const s3Client = new S3({
  endpoint: endpoint,
  region: "ap-southeast-1",
  credentials: {
    accessKeyId: process.env.SPACES_ACCESS_KEY,
    secretAccessKey: process.env.SPACES_SECRET_KEY,
  },
});

