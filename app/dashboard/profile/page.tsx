"use client";

import {
  ChangeEvent,
  useEffect,
  useState,
} from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  profileImageUrl: string | null;
}

export default function ProfilePage() {
  const [user, setUser] =
    useState<UserProfile | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [uploading, setUploading] =
    useState(false);

  const [uploadMessage, setUploadMessage] =
    useState("");

  const [uploadError, setUploadError] =
    useState("");

  useEffect(() => {
    let mounted = true;

    async function loadProfile() {
      try {
        const response = await fetch(
          "/api/user/me",
          {
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (
          mounted &&
          response.ok &&
          data.success &&
          data.user
        ) {
          setUser({
            firstName:
              data.user.firstName,
            lastName:
              data.user.lastName,
            email:
              data.user.email,
            phone:
              data.user.phone || "",
            role:
              data.user.role,
            profileImageUrl:
              data.user.profileImageUrl ||
              null,
          });
        }
      } catch (error) {
        console.error(
          "Profile loading error:",
          error
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadProfile();

    return () => {
      mounted = false;
    };
  }, []);

  async function handleImageUpload(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    setUploadMessage("");
    setUploadError("");

    /*
     * Client-side validation before sending to R2.
     */

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    const maxFileSize =
      5 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      setUploadError(
        "Only JPG, PNG and WebP images are allowed."
      );

      event.target.value = "";
      return;
    }

    if (file.size > maxFileSize) {
      setUploadError(
        "Profile image must be 5MB or smaller."
      );

      event.target.value = "";
      return;
    }

    const formData = new FormData();

    formData.append("file", file);

    try {
      setUploading(true);

      const response = await fetch(
        "/api/user/profile-image",
        {
          method: "POST",
          body: formData,
        }
      );

      const data =
        await response.json();

      if (
        !response.ok ||
        !data.success ||
        !data.imageUrl
      ) {
        setUploadError(
          data.message ||
            "Unable to upload profile image."
        );

        return;
      }

      /*
       * Update the profile page immediately.
       */

      setUser((currentUser) =>
        currentUser
          ? {
              ...currentUser,
              profileImageUrl:
                data.imageUrl,
            }
          : currentUser
      );

      setUploadMessage(
        "Profile image uploaded successfully."
      );

      /*
       * Notify other client components that the user's
       * profile image has changed.
       *
       * LoginButton and DashboardHeader can listen for this
       * event and refresh their displayed image.
       */

      window.dispatchEvent(
        new CustomEvent(
          "profile-image-updated",
          {
            detail: {
              imageUrl:
                data.imageUrl,
            },
          }
        )
      );
    } catch (error) {
      console.error(
        "Profile image upload error:",
        error
      );

      setUploadError(
        "Something went wrong while uploading the image."
      );
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  if (loading) {
    return (
      <DashboardLayout title="My Profile">
        <p className="text-slate-500">
          Loading profile...
        </p>
      </DashboardLayout>
    );
  }

  if (!user) {
    return (
      <DashboardLayout title="My Profile">
        <p className="text-red-600">
          Unable to load profile.
        </p>
      </DashboardLayout>
    );
  }

  const initials =
    `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
      .toUpperCase();

  return (
    <DashboardLayout title="My Profile">
      <div className="max-w-2xl rounded-2xl bg-white p-6 shadow-sm">
        {/* PROFILE HEADER */}

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="shrink-0">
            {user.profileImageUrl ? (
              <img
                src={user.profileImageUrl}
                alt={`${user.firstName} ${user.lastName}`}
                className="h-24 w-24 rounded-full object-cover ring-4 ring-blue-50"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-3xl font-bold text-blue-800 ring-4 ring-blue-50">
                {initials}
              </div>
            )}
          </div>

          <div className="min-w-0">
            <h2 className="text-2xl font-bold text-slate-900">
              {user.firstName}{" "}
              {user.lastName}
            </h2>

            <p className="text-sm uppercase text-slate-500">
              {user.role}
            </p>

            <label
              className={`mt-3 inline-flex cursor-pointer items-center justify-center rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-800 ${
                uploading
                  ? "pointer-events-none opacity-60"
                  : ""
              }`}
            >
              {uploading
                ? "Uploading..."
                : user.profileImageUrl
                  ? "Change Profile Image"
                  : "Upload Profile Image"}

              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={
                  handleImageUpload
                }
                disabled={uploading}
                className="hidden"
              />
            </label>

            {uploadMessage && (
              <p className="mt-2 text-sm text-green-600">
                {uploadMessage}
              </p>
            )}

            {uploadError && (
              <p className="mt-2 text-sm text-red-600">
                {uploadError}
              </p>
            )}
          </div>
        </div>

        {/* ACCOUNT INFORMATION */}

        <div className="mt-8 space-y-5">
          <div>
            <p className="text-xs font-semibold uppercase text-slate-400">
              First Name
            </p>

            <p className="mt-1 text-slate-800">
              {user.firstName}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase text-slate-400">
              Last Name
            </p>

            <p className="mt-1 text-slate-800">
              {user.lastName}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase text-slate-400">
              Email
            </p>

            <p className="mt-1 break-all text-slate-800">
              {user.email}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase text-slate-400">
              Phone
            </p>

            <p className="mt-1 text-slate-800">
              {user.phone}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase text-slate-400">
              Account Role
            </p>

            <p className="mt-1 text-slate-800">
              {user.role}
            </p>
          </div>
        </div>

        {/* IMAGE NOTE */}

        <div className="mt-8 rounded-xl bg-slate-50 p-4">
          <p className="text-sm leading-6 text-slate-600">
            Your profile image is stored securely in
            Cloudflare R2 and is used across your
            dashboard and public navigation.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}