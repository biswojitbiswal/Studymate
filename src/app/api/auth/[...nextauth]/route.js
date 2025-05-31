import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import {User} from '@/model/user.model.js'
import {connectDB} from '@/lib/db.js'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        skipPasswordCheck: { label: 'Skip Password Check', type: 'text' }, // For auto-login after verification
      },
      async authorize(credentials) {
        try {
          await connectDB()
          
          if (!credentials?.email) {
            throw new Error('Email is required')
          }

          const user = await User.findOne({ email: credentials.email }).select('+password')
          
          if (!user) {
            throw new Error('No user found with this email')
          }

          // Auto-login after email verification (skip password check)
          if (credentials.skipPasswordCheck === 'true') {
            // Only allow auto-login if user is verified
            if (!user.isVerified) {
              throw new Error('Email not verified')
            }
            
            return {
              id: user._id.toString(),
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              isVerified: user.isVerified,
              role: user.role,
            }
          }

          // Regular login flow - require password
          if (!credentials.password) {
            throw new Error('Password is required')
          }
          
          // Check if user is verified
          if (!user.isVerified) {
            throw new Error('Please verify your email first')
          }
          
          const isValidPassword = await bcrypt.compare(credentials.password, user.password)
          
          if (!isValidPassword) {
            throw new Error('Invalid password')
          }
          
          // Return user object
          return {
            id: user._id.toString(),
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            isVerified: user.isVerified,
            role: user.role,
          }
          
        } catch (error) {
          console.error('Auth error:', error)
          throw new Error(error.message)
        }
      }
    })
  ],
  
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.firstName = user.firstName
        token.lastName = user.lastName
        token.isVerified = user.isVerified
        token.role = user.role
      }
      return token
    },
    
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
        session.user.email = token.email
        session.user.firstName = token.firstName
        session.user.lastName = token.lastName
        session.user.isVerified = token.isVerified
        session.user.role = token.role
      }
      return session
    },
  },
  
  pages: {
    signIn: '/signin',
    error: '/signin',
  },
  
  session: {
    strategy: 'jwt',
  },
  
  secret: process.env.NEXT_AUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }