/** @type {import('next').NextConfig} */
const nextConfig = {
    
    env : {
        BASE : 'http://localhost:3000',

        NEXTAUTH_SECRET : "OqZ6cqpNwYckRYRv0fKwWC8z7fBc/IKLOQ9+BXZtISE=",

        GOOGLE_ID : '1019398541068-qn6gkv101e0lds370aiu3npkm798fchu.apps.googleusercontent.com',
        GOOGLE_SECRET : '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',
    },
    images : {
        remotePatterns : [
            {
                hostname : "**",
            }
        ]
    }
};

export default nextConfig;
