"use client";

import {
  Bell,
  CheckCircle2,
  LockKeyhole,
  LogOut,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { FormEvent, useState } from "react";

import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default function SettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");

  async function handleChangePassword(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setPasswordMessage("");
    setPasswordError("");

    if (newPassword.length < 8) {
      setPasswordError(
        "New password must be at least 8 characters long."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    try {
      setChangingPassword(true);

      const response = await fetch(
        "/api/user/change-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
            confirmPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setPasswordError(
          data.message || "Unable to change password."
        );
        return;
      }

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setPasswordMessage(
        "Password changed successfully. You will be redirected to the login page."
      );

      setTimeout(() => {
        window.location.href = "/login";
      }, 1800);
    } catch (error) {
      console.error(
        "Change password request error:",
        error
      );

      setPasswordError(
        "Something went wrong while changing your password."
      );
    } finally {
      setChangingPassword(false);
    }
  }

  return (
    <DashboardLayout title="Settings">
      <div className="mx-auto max-w-4xl space-y-6">
        <section className="overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-sm">
          <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 px-6 py-7 text-white md:px-8">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                <ShieldCheck size={25} />
              </div>

              <div>
                <h2 className="text-2xl font-bold">
                  Account Settings
                </h2>

                <p className="mt-1 text-sm text-blue-100">
                  Manage your account security and preferences.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 p-6 md:grid-cols-3 md:p-8">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <UserRound className="text-blue-700" size={22} />

              <h3 className="mt-4 font-bold text-slate-900">
                Profile
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Update your personal information and profile image.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <LockKeyhole className="text-blue-700" size={22} />

              <h3 className="mt-4 font-bold text-slate-900">
                Security
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Change your password and protect your account.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <Bell className="text-blue-700" size={22} />

              <h3 className="mt-4 font-bold text-slate-900">
                Notifications
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Notification preferences will be available here.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="mb-6 flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
              <LockKeyhole size={21} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Change Password
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Use a password of at least 8 characters. Changing your
                password will sign you out of all active sessions.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleChangePassword}
            className="max-w-2xl space-y-5"
          >
            <div>
              <label
                htmlFor="currentPassword"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Current Password
              </label>

              <input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(event) =>
                  setCurrentPassword(event.target.value)
                }
                autoComplete="current-password"
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                placeholder="Enter your current password"
              />
            </div>

            <div>
              <label
                htmlFor="newPassword"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                New Password
              </label>

              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(event) =>
                  setNewPassword(event.target.value)
                }
                autoComplete="new-password"
                required
                minLength={8}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                placeholder="Enter your new password"
              />

              <p className="mt-2 text-xs text-slate-400">
                Minimum 8 characters.
              </p>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Confirm New Password
              </label>

              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(event.target.value)
                }
                autoComplete="new-password"
                required
                minLength={8}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                placeholder="Confirm your new password"
              />
            </div>

            {passwordError && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
                {passwordError}
              </div>
            )}

            {passwordMessage && (
              <div className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-700">
                <CheckCircle2
                  size={20}
                  className="mt-0.5 shrink-0"
                />

                <span>{passwordMessage}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={changingPassword}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <LockKeyhole size={18} />

              {changingPassword
                ? "Changing Password..."
                : "Change Password"}
            </button>
          </form>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
              <LogOut size={21} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Session Security
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Changing your password automatically invalidates all
                active sessions on your account.
              </p>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}