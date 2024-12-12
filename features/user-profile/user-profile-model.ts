import { UserProfile } from '@prisma/client';

import prisma from '@/lib/prisma';

export async function retrieveUserProfileFromDatabaseByEmail(
  email: UserProfile['email'],
) {
  return await prisma.userProfile.findUnique({ where: { email } });
}
