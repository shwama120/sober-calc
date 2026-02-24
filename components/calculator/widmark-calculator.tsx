"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, Droplets, ShieldCheck } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

type Gender = "male" | "female";

interface Result {
  hours: number;
  minutes: number;
  bac: number;
}

function calculateWidmark(
  weightKg: number,
  gender: Gender,
  standardDrinks: number
): Result | null {
  if (!weightKg || !standardDrinks || weightKg <= 0 || standardDrinks <= 0) {
    return null;
  }

  const grams = standardDrinks * 10; // 1표준잔 ≈ 10g 알코올(가정)
  const r = gender === "male" ? 0.68 : 0.55;
  const bac0 = (grams / (weightKg * r)) / 10; // g/dL
  const beta = 0.015; // 시간당 감소량 (g/dL)

  const hoursToZero = Math.max(0, bac0 / beta);
  const totalMinutes = Math.round(hoursToZero * 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return { hours, minutes, bac: bac0 };
}

export function WidmarkCalculator() {
  const [gender, setGender] = useState<Gender>("male");
  const [weight, setWeight] = useState<string>("");
  const [drinks, setDrinks] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);

  const numericWeight = Number(weight.replace(",", "."));
  const numericDrinks = Number(drinks.replace(",", "."));

  const result = useMemo(
    () =>
      calculateWidmark(
        numericWeight || 0,
        gender,
        numericDrinks || 0
      ),
    [numericWeight, numericDrinks, gender]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const hasError =
    submitted &&
    (!numericWeight ||
      !numericDrinks ||
      numericWeight <= 0 ||
      numericDrinks <= 0);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 md:flex-row">
      <section className="flex-1 space-y-4">
        <div className="rounded-2xl bg-surface-soft/90 p-5 shadow-soft ring-1 ring-white/10">
          <header className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-400">
                전국민 숙취 해소 계산기
              </p>
              <h1 className="mt-2 text-xl font-semibold text-white md:text-2xl">
                알코올 분해 예상 시간 계산
              </h1>
              <p className="mt-1 text-sm text-gray-400">
                위드마크 공식을 기반으로 혈중 알코올 농도와 분해에 필요한
                시간을 추정합니다.{" "}
                <span className="font-medium text-gray-200">
                  결과와 상관없이 절대 음주운전을 하지 마세요.
                </span>
              </p>
            </div>
            <div className="hidden rounded-full bg-red-900/25 px-3 py-1 text-[11px] font-medium text-red-200 ring-1 ring-red-500/40 md:inline-flex">
              음주운전 NO
            </div>
          </header>

          <form
            onSubmit={handleSubmit}
            className="mt-5 grid gap-4 md:grid-cols-2"
          >
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-300">
                성별
              </label>
              <div className="inline-flex rounded-full bg-black/40 p-1 ring-1 ring-white/10">
                <button
                  type="button"
                  onClick={() => setGender("male")}
                  className={`px-4 py-1.5 text-xs font-medium transition ${
                    gender === "male"
                      ? "rounded-full bg-white text-black shadow"
                      : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  남성
                </button>
                <button
                  type="button"
                  onClick={() => setGender("female")}
                  className={`px-4 py-1.5 text-xs font-medium transition ${
                    gender === "female"
                      ? "rounded-full bg-white text-black shadow"
                      : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  여성
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center justify-between text-xs font-medium text-gray-300">
                몸무게
                <span className="text-[11px] font-normal text-gray-500">
                  kg 단위로 입력
                </span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  min={1}
                  step="0.1"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="h-10 w-full rounded-lg border border-white/10 bg-black/40 px-3 pr-10 text-sm text-white outline-none ring-offset-0 transition focus:border-white/40 focus:ring-1 focus:ring-white/40"
                  placeholder="예: 70"
                />
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-gray-500">
                  kg
                </span>
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="flex items-center justify-between text-xs font-medium text-gray-300">
                마신 술의 양
                <span className="text-[11px] font-normal text-gray-500">
                  소주 한 잔(또는 맥주 한 캔) ≈ 1잔으로 가정
                </span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  min={0}
                  step="0.5"
                  value={drinks}
                  onChange={(e) => setDrinks(e.target.value)}
                  className="h-10 w-full rounded-lg border border-white/10 bg-black/40 px-3 pr-10 text-sm text-white outline-none ring-offset-0 transition focus:border-white/40 focus:ring-1 focus:ring-white/40"
                  placeholder="예: 5 (잔)"
                />
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-gray-500">
                  잔
                </span>
              </div>
              <p className="mt-1 text-[11px] text-gray-500">
                실제 알코올 도수, 마시는 속도, 체질 등에 따라{" "}
                <span className="font-medium text-gray-300">
                  결과는 참고용일 뿐입니다.
                </span>
              </p>
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-400 px-4 py-2.5 text-sm font-semibold text-black shadow-lg shadow-emerald-500/30 transition hover:from-emerald-400 hover:to-teal-300"
              >
                <ShieldCheck className="h-4 w-4" />
                <span>알코올 분해 예상 시간 계산하기</span>
              </button>
            </div>
          </form>

        {hasError && (
          <div className="mt-4 flex items-start gap-2 rounded-lg bg-red-950/40 px-3 py-2 text-xs text-red-100 ring-1 ring-red-500/40">
            <AlertTriangle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
            <p>
              몸무게와 마신 술의 양을 모두 올바르게 입력해 주세요. 이 계산기는
              참고용 도구이며, 실제 음주 상태나 운전 가능 여부를 보장하지
              않습니다.
            </p>
          </div>
        )}
        </div>

        <div className="mt-3">
          <AdSlot slotName="본문 하단 배너" orientation="horizontal" />
        </div>
      </section>

      <aside className="flex w-full flex-col gap-4 md:w-72">
        <div className="rounded-2xl bg-surface-soft/90 p-4 shadow-soft ring-1 ring-white/10">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-gray-400">
            <Droplets className="h-4 w-4 text-emerald-300" />
            <span>추정 결과</span>
          </div>

          {!submitted || !result ? (
            <p className="mt-4 text-sm text-gray-400">
              왼쪽에 정보를 입력하고 계산하기를 누르면,{" "}
              <span className="font-medium text-gray-200">
                현재 혈중 알코올 농도와 분해에 필요한 대략적인 시간
              </span>
              을 보여드립니다.
            </p>
          ) : (
            <>
              <div className="mt-4 rounded-xl bg-black/40 p-4 ring-1 ring-white/10">
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400">
                  예상 혈중 알코올 농도(BAC)
                </p>
                <p className="mt-1 text-2xl font-semibold text-white">
                  {result.bac.toFixed(3)}{" "}
                  <span className="text-sm text-gray-400">g/dL</span>
                </p>
                <p className="mt-2 text-[11px] text-gray-500">
                  위드마크 공식과 평균적인 분해 속도를 사용한{" "}
                  <span className="font-medium text-gray-300">
                    이론상 최대치
                  </span>{" "}
                  기준입니다.
                </p>
              </div>

              <div className="mt-3 rounded-xl bg-black/30 p-4 ring-1 ring-emerald-500/25">
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-emerald-300">
                  완전 분해까지 최소 소요 시간
                </p>
                <p className="mt-2 text-xl font-semibold text-emerald-200">
                  {result.hours}시간 {result.minutes}분 이상
                </p>
                <p className="mt-2 text-[11px] text-gray-400">
                  평균적으로 혈중 알코올 농도는 시간당 약 0.015 g/dL씩
                  감소한다고 가정했습니다.{" "}
                  <span className="font-medium text-gray-200">
                    숙면, 식사, 컨디션 등에 따라 실제 시간은 더 길어질 수
                    있습니다.
                  </span>
                </p>
              </div>

              <div className="mt-3 rounded-lg bg-red-950/40 px-3 py-2 text-[11px] text-red-100 ring-1 ring-red-500/40">
                <p className="font-semibold">주의</p>
                <p className="mt-1">
                  이 계산기는 법적 효력이나 의료적 진단을 제공하지 않습니다.
                  <br />
                  <span className="font-semibold">
                    어떤 경우에도 &quot;조금 괜찮아진 것 같다&quot;는 느낌만으로
                    운전하지 마세요.
                  </span>
                </p>
              </div>
            </>
          )}
        </div>

        <AdSlot slotName="우측 사이드바 직사각형" orientation="vertical" />
      </aside>
    </div>
  );
}

