// import { UserProfile } from '@prisma/client';

// import prisma from '@/lib/prisma';

// export async function retrieveUserProfileFromDatabaseByEmail(
//     email: UserProfile['email'],
// ) {
//     return await prisma.userProfile.findUnique({ where: { email } });
// }
import prisma from '@/lib/prisma';
import { enhance } from "@zenstackhq/runtime";
import { stackServerApp } from "@/stack";

export async function getUserDb() {
  const stackAuthUser = await stackServerApp.getUser();
  const currentTeam = stackAuthUser?.selectedTeam;

  // by default StackAuth's team members have "admin" or "member" role
  const perm =
    currentTeam && (await stackAuthUser.getPermission(currentTeam, "admin"));

  const user = stackAuthUser
    ? {
        userId: stackAuthUser.id,
        currentTeamId: stackAuthUser.selectedTeam?.id,
        currentTeamRole: perm ? "admin" : "member",
      }
    : undefined; // anonymous
  return enhance(prisma, { user });
}