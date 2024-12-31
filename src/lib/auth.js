import NextAuth, { getServerSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            
            authorization: {
              
              params: {
                  redirect_uri : `${process.env.BASE}/api/auth/callback/google`, 
                  prompt: "consent",
                  access_type: "offline",
                  response_type: "code"
              }
            },
            async profile(profile, tokens) {
              console.log(profile, tokens);
            //   const res = await axios.post(`${process.env.API}/google-login`, profile);
  
              if (profile.sub){
                return {
                    id: profile.sub,
                    email : profile.email,
                    profile : profile.picture,
                    name : profile.name,
                }
              }
              return null;
            }
        }),
    ],
    callbacks : {
      async jwt({ token, user, trigger, session }){
        if (user){
          token.id = user.id;
          token.email = user.email;
          token.profile = user.profile;
          token.name = user.name; 
        }
        if (trigger === "update") {
          token = {...token, ...session.user}
          return token;
        };
        return token;
      },
      async session({session, token, user}){
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.profile = token.profile;
        return session;
      },
      async signIn({user}){
        if (user?.error != null){
          throw new Error(user?.error);
        }
        return true;
      },

    },
    secret : process.env.NEXTAUTH_SECRET
}  

const handler = NextAuth(authOptions);
const getSession = () => getServerSession(authOptions)

export {handler, getSession};