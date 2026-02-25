import { WidmarkCalculator } from "@/components/calculator/widmark-calculator";
import { HangoverSeoContent } from "@/components/seo/hangover-seo-content";
import { AlertTriangle } from "lucide-react";

export const metadata = {
  title: "전국민 숙취 해소 계산기",
  description: "위드마크 공식을 이용한 알코올 분해 시간 추정 계산기"
};

export default function HangoverCalculatorPage() {
  return (
    <main className="w-full">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 pb-16">
        <div className="flex flex-col gap-3 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900/60 p-5 shadow-soft ring-1 ring-white/10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="inline-flex items-center gap-1 rounded-full bg-black/40 px-3 py-1 text-[11px] font-medium text-emerald-200 ring-1 ring-emerald-500/40">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                전국민 숙취 해소 캠페인
              </p>
              <h1 className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-3xl">
                전국민 숙취 해소 계산기
              </h1>
              <p className="mt-1 text-sm text-gray-300">
                오늘 마신 술이 내 몸에서 완전히 분해되기까지{" "}
                <span className="font-semibold">대략 얼마나 걸리는지</span>{" "}
                위드마크 공식을 바탕으로 추정합니다.
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-red-900/25 px-4 py-2 text-xs text-red-100 ring-1 ring-red-500/40">
              <AlertTriangle className="h-4 w-4" />
              <div>
                <p className="font-semibold">음주운전 절대 금지</p>
                <p className="text-[11px]">
                  계산 결과와 상관없이, 술을 한 잔이라도 마셨다면{" "}
                  <span className="underline decoration-red-300">
                    운전대를 잡지 마세요.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <WidmarkCalculator />

        <HangoverSeoContent />
      </div>
    </main>
  );
}

