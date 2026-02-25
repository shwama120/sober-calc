"use client";

import { WidmarkCalculator } from "@/components/calculator/widmark-calculator";
import { HangoverSeoContent } from "@/components/seo/hangover-seo-content";
import { AlertTriangle } from "lucide-react";

export default function HomePage() {
  return (
    <main className="w-full">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 pb-16">
        <header className="mt-2 flex flex-col gap-4 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900/60 p-5 shadow-soft ring-1 ring-white/10 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="inline-flex items-center gap-1 rounded-full bg-black/40 px-3 py-1 text-[11px] font-medium text-emerald-200 ring-1 ring-emerald-500/40">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
              Soolkkae · 숙취 해소 도우미
            </p>
            <h1 className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-3xl">
              숙취 해소용 혈중 알코올 계산기
            </h1>
            <p className="mt-2 text-sm text-gray-300 md:text-[15px]">
              오늘 마신{" "}
              <span className="font-semibold">
                술의 종류와 양, 내 몸 상태(성별·몸무게)
              </span>
              를 기반으로 위드마크 공식으로 혈중 알코올 농도와{" "}
              <span className="font-semibold">해소까지 필요한 최소 시간</span>을
              추정해 드립니다.
            </p>
          </div>
          <div className="flex items-start gap-2 rounded-xl bg-red-900/25 px-4 py-3 text-xs text-red-100 ring-1 ring-red-500/40">
            <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
            <div>
              <p className="font-semibold">중요 안내</p>
              <p className="mt-1 text-[11px] leading-relaxed">
                이 계산기는 참고용 도구일 뿐입니다.{" "}
                <span className="font-semibold">
                  결과와 상관없이 &quot;술을 한 잔이라도 마셨다면&quot; 절대
                  운전하지 마세요.
                </span>
              </p>
            </div>
          </div>
        </header>

        <WidmarkCalculator />

        <HangoverSeoContent />
      </div>
    </main>
  );
}

