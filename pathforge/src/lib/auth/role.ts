import { CURRENT_USER_ID } from '@/lib/constants';

export type UserRole = 'reader' | 'author' | 'admin';

/**
 * Phase 1: returns 'admin' for the constant local user.
 * Phase 3: replace body with NextAuth session lookup. Signature stays the same.
 */
export async function getCurrentUserRole(): Promise<UserRole> {
  return 'admin';
}

export async function getCurrentUserId(): Promise<string> {
  return CURRENT_USER_ID;
}

export async function requireAuthorOrAdmin(): Promise<void> {
  const role = await getCurrentUserRole();
  if (role !== 'author' && role !== 'admin') {
    throw new Error('Unauthorized: author or admin required');
  }
}

export async function requireAdmin(): Promise<void> {
  const role = await getCurrentUserRole();
  if (role !== 'admin') {
    throw new Error('Unauthorized: admin required');
  }
}
