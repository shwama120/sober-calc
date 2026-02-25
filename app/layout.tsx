import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Soolkkae - 숙취 해소 계산기",
  description:
    "성별, 몸무게, 마신 술의 종류와 양으로 혈중 알코올 농도와 해소 시간을 추정하는 숙취 해소 계산기"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2928942109825268"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className="min-h-screen bg-background text-white">
        <div className="flex min-h-screen flex-col items-center justify-center px-4 py-8">
          {children}
        </div>
      </body>
    </html>
  );
}

