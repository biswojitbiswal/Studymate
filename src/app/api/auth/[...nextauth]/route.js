import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import {User} from '@/model/user.model.js' // your existing user model
import {connectDB} from '@/lib/db.js' // your existing db connection

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          await connectDB()
          
          // Find user by email
          const user = await User.findOne({ email: credentials.email })
          
          if (!user) {
            throw new Error('No user found with this email')
          }
          
          // Check if user is verified (adjust based on your schema)
          if (!user.isVerified) {
            throw new Error('Please verify your email first')
          }
          
          // Verify password
          const isValidPassword = await bcrypt.compare(credentials.password, user.password)
          
          if (!isValidPassword) {
            throw new Error('Invalid password')
          }
          
          // Return user object
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name, // adjust based on your schema
          }
          
        } catch (error) {
          console.error('Auth error:', error)
          throw new Error(error.message)
        }
      }
    })
  ],
  
  pages: {
    signIn: '/signin', // your custom signin page
  },
  
  session: {
    strategy: 'jwt',
  },
  
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    
    async session({ session, token }) {
      session.user.id = token.id
      return session
    },
  },
  
  secret: process.env.NEXT_AUTH_SECRET,
})

export { handler as GET, handler as POST }