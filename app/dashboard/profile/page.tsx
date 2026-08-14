"use client";

import { ChangeEvent, useEffect, useState } from "react";
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
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [uploadError, setUploadError] = useState("");

  useEffect(() => {
    async function loadProfile() {
      try {
        const response = await fetch("/api/user/me");
        const data = await response.json();

        if (data.success) {
          setUser({
            firstName: data.user.firstName,
            lastName: data.user.lastName,
            email: data.user.email,
            phone: data.user.phone || "",
            role: data.user.role,
            profileImageUrl: data.user.profileImageUrl || null,
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  async function handleImageUpload(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setUploadMessage("");
    setUploadError("");

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

      const data = await response.json();

      if (!response.ok || !data.success) {
        setUploadError(
          data.message || "Unable to upload image."
        );
        return;
      }

      setUser((currentUser) =>
        currentUser
          ? {
              ...currentUser,
              profileImageUrl: data.imageUrl,
            }
          : currentUser
      );

      setUploadMessage("Profile image uploaded successfully.");
    } catch (error) {
      console.error(error);
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

  return (
    <DashboardLayout title="My Profile">
      <div className="max-w-2xl rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex items-center gap-5">
          <div>
            {user.profileImageUrl ? (
              <img
                src={user.profileImageUrl}
                alt={`${user.firstName} ${user.lastName}`}
                className="h-24 w-24 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-3xl font-bold text-blue-800">
                {user.firstName.charAt(0)}
                {user.lastName.charAt(0)}
              </div>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              {user.firstName} {user.lastName}
            </h2>

            <p className="text-sm uppercase text-slate-500">
              {user.role}
            </p>

            <label className="mt-3 inline-block cursor-pointer rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800">
              {uploading
                ? "Uploading..."
                : "Change Profile Image"}

              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
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

        <div className="mt-8 space-y-4">
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
            <p className="mt-1 text-slate-800">
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
        </div>
      </div>
    </DashboardLayout>
  );
}