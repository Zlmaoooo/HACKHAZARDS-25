import FluvioClient from '@fluvio/client';

const fluvioClient = new FluvioClient({
  // Replace these with your actual configuration details from Fluvio
  cluster: 'YOUR_CLUSTER_URL',
  apiKey: 'YOUR_API_KEY',
});

export default fluvioClient;