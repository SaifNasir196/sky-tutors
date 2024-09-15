export {}

export type Roles = 'admin' | 'tutor' | 'student'

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles
    }
  }
}