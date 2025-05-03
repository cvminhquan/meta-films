// src/app/auth/layout.tsx
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <main className="min-h-screen flex items-center justify-center">
          <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
