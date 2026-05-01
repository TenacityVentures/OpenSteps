import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'OpenSteps',
    short_name: 'OpenSteps',
    description: 'Community-verified guides for government processes in Sierra Leone and beyond.',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#f7f3eb',
    theme_color: '#1a6b43',
    categories: ['government', 'education', 'utilities'],
    icons: [
      {
        src: '/logo-icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/logo-mark.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
    ],
  };
}
