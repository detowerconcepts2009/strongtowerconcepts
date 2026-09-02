"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface CurrentUser {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  profileImageUrl: string | null;
}

interface UserResponse {
  success: boolean;
  user?: CurrentUser;
}

interface ProfileImageUpdatedEvent
  extends CustomEvent<{
    imageUrl: string;
  }> {}

export default function LoginButton() {
  const [user, setUser] =
    useState<CurrentUser | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadCurrentUser() {
      try {
        const response = await fetch(
          "/api/user/me",
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          if (mounted) {
            setUser(null);
          }

          return;
        }

        const data: UserResponse =
          await response.json();

        if (
          mounted &&
          data.success &&
          data.user
        ) {
          setUser(data.user);
        } else if (mounted) {
          setUser(null);
        }
      } catch (error) {
        console.error(
          "Unable to load current user:",
          error
        );

        if (mounted) {
          setUser(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadCurrentUser();

    function handleProfileImageUpdated(
      event: ProfileImageUpdatedEvent
    ) {
      if (!mounted) {
        return;
      }

      setUser((currentUser) =>
        currentUser
          ? {
              ...currentUser,
              profileImageUrl:
                event.detail.imageUrl,
            }
          : currentUser
      );
    }

    window.addEventListener(
      "profile-image-updated",
      handleProfileImageUpdated as EventListener
    );

    return () => {
      mounted = false;

      window.removeEventListener(
        "profile-image-updated",
        handleProfileImageUpdated as EventListener
      );
    };
  }, []);

  /*
   * Keep the button area stable while authentication
   * status is being checked.
   */

  if (loading) {
    return (
      <div
        className="
          inline-flex
          h-11
          min-w-[100px]
          items-center
          justify-center
          rounded-full
          border-2
          border-yellow-500
          bg-transparent
          px-6
          py-2.5
        "
      >
        <span className="text-sm font-semibold text-blue-900">
          Loading...
        </span>
      </div>
    );
  }

  /*
   * NOT LOGGED IN
   */

  if (!user) {
    return (
      <Link
        href="/login"
        className="
          inline-flex
          items-center
          justify-center
          rounded-full
          border-2
          border-yellow-500
          bg-transparent
          px-6
          py-2.5
          text-sm
          font-semibold
          text-blue-900
          transition-all
          duration-300
          hover:bg-yellow-500
          hover:text-white
          hover:shadow-lg
        "
      >
        Sign In
      </Link>
    );
  }

  /*
   * LOGGED IN
   */

  const initials =
    `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
      .toUpperCase();

  return (
    <Link
      href="/dashboard"
      className="
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-full
        border-2
        border-yellow-500
        bg-transparent
        px-5
        py-2.5
        text-sm
        font-semibold
        text-blue-900
        transition-all
        duration-300
        hover:bg-yellow-500
        hover:text-white
        hover:shadow-lg
      "
      title={`Signed in as ${user.fullName}`}
    >
      {user.profileImageUrl ? (
        <img
          src={user.profileImageUrl}
          alt={user.fullName}
          className="h-8 w-8 rounded-full object-cover"
        />
      ) : (
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-900 text-xs font-bold text-white">
          {initials}
        </span>
      )}

      <span className="max-w-[120px] truncate">
        {user.firstName}
      </span>
    </Link>
  );
}