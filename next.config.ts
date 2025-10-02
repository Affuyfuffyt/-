import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
    // Note: `output: 'export'` is not compatible with Firebase integration.
    // We are removing it to enable server-side functionalities needed for Firebase.
};

export default nextConfig;
