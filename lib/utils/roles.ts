"use server";
import { Roles } from '@/types/globals'
import { auth } from '@clerk/nextjs/server'

export const checkRole = (role: Roles) => {
  const { sessionClaims } = auth()
  if (!sessionClaims?.metadata || !sessionClaims?.metadata.role) {
    return 'student' === role;
  }

  if (sessionClaims?.metadata.role === 'admin') {
    return true;
  }

  return sessionClaims?.metadata.role === role;
}
