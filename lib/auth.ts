import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { getCurrentSession } from "@/lib/session";

export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  profileImageUrl: string | null;
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const session = await getCurrentSession();

  if (!session) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.userId,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      role: true,
      status: true,
      profileImageUrl: true,
    },
  });

  if (!user) {
    return null;
  }

  if (
    user.status === "SUSPENDED" ||
    user.status === "BLOCKED"
  ) {
    return null;
  }

  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    role: user.role,
    status: user.status,
    profileImageUrl: user.profileImageUrl,
  };
}

export async function requireAuth(): Promise<AuthUser> {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}

export async function requireRole(
  allowedRoles: string[]
): Promise<AuthUser> {
  const user = await requireAuth();

  if (!allowedRoles.includes(user.role)) {
    redirect("/dashboard");
  }

  return user;
}