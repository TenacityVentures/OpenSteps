import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/**',
      },
    ],
  },
  // Transpile workspace packages (they ship TypeScript source directly)
  transpilePackages: ['@opensteps/types', '@opensteps/supabase', '@opensteps/constants'],
};

export default nextConfig;
