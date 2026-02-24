import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Vibe Studio",
  description: "AI 기반 헤어스타일 가상 체험 서비스"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-background text-white">
        <div className="flex min-h-screen flex-col items-center justify-center px-4 py-8">
          {children}
        </div>
      </body>
    </html>
  );
}

