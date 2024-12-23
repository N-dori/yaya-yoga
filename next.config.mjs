
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
            
          },
          {
            protocol: 'https',
            hostname: 'robohash.org',
            
          },
          {
            protocol: 'https',
            hostname: 'yayayoga.s3.eu-north-1.amazonaws.com',
            pathname: '/**', // Allow all paths
            
          },
        ],
      },
      
};


export default  nextConfig;
