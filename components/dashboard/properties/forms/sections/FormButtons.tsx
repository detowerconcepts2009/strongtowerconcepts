"use client";

interface FormButtonsProps {

  loading: boolean;

}

export default function FormButtons({

  loading,

}: FormButtonsProps) {

  return (

    <div className="flex justify-end gap-4 border-t border-slate-200 pt-8">

      <button
        type="button"
        className="rounded-xl border border-slate-300 px-6 py-3 font-medium hover:bg-slate-100"
      >
        Save Draft
      </button>

      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-blue-900 px-8 py-3 font-medium text-white hover:bg-blue-800 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Continue"}
      </button>

    </div>

  );

}