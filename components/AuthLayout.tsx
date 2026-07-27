interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export default function AuthLayout({
  title,
  subtitle,
  children,
}: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center px-4 relative overflow-hidden">

      {/* Watermark (replace with your logo later) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 text-8xl font-bold text-blue-900 select-none">
        STC
      </div>

      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-8">

        <div className="text-center mb-8">

          {/* Replace STC with your logo later */}
          <div className="w-20 h-20 rounded-full bg-blue-900 text-white flex items-center justify-center mx-auto text-2xl font-bold">
            STC
          </div>

          <h1 className="text-3xl font-bold text-blue-900 mt-5">
            {title}
          </h1>

          <p className="text-gray-500 mt-2">
            {subtitle}
          </p>

        </div>

        {children}

      </div>

    </main>
  );
}