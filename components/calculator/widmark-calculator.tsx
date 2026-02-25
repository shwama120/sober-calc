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

// 단순화를 위한 주종별 1단위(잔/캔/잔)당 알코올 양(g) 추정값
const SOJU_GRAMS_PER_SHOT = 8; // 소주 1잔(약 50mL, 16도 내외)
const BEER_GRAMS_PER_GLASS = 18; // 맥주 500mL 한 잔(4.5도 내외)
const WINE_GRAMS_PER_GLASS = 12; // 와인 120mL 한 잔(12도 내외)
const WHISKY_GRAMS_PER_SHOT = 14; // 위스키 45mL 한 잔(40도 내외)
const STANDARD_DRINK_GRAMS = 10; // 기타 표준잔 1잔 기준

const BETA = 0.015; // 시간당 감소량 (g/dL)
const LEGAL_LIMIT = 0.03; // 한국 도로교통법 혈중 알코올 농도 기준(예시)

function calculateWidmark(
  weightKg: number,
  gender: Gender,
  totalGrams: number
): Result | null {
  if (!weightKg || !totalGrams || weightKg <= 0 || totalGrams <= 0) {
    return null;
  }

  const r = gender === "male" ? 0.68 : 0.55;
  const bac0 = (totalGrams / (weightKg * r)) / 10; // g/dL

  const hoursToZero = Math.max(0, bac0 / BETA);
  const totalMinutes = Math.round(hoursToZero * 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return { hours, minutes, bac: bac0 };
}

function getStatus(bac: number) {
  if (bac >= 0.08) {
    return {
      level: "danger",
      title: "운전 절대 불가",
      description:
        "혈중 알코올 농도가 법적 처벌 수준으로 추정됩니다. 신체·인지 기능이 크게 떨어져 있으며, 운전은 물론 중요한 의사결정도 피하는 것이 안전합니다.",
      badge: "고위험"
    };
  }

  if (bac >= LEGAL_LIMIT) {
    return {
      level: "warning",
      title: "운전 금지 · 휴식 필요",
      description:
        "법적 기준(0.03%)을 초과한 상태로 추정됩니다. 운전은 절대 금지이며, 충분한 휴식과 시간 경과가 필요합니다.",
      badge: "주의"
    };
  }

  if (bac > 0) {
    return {
      level: "caution",
      title: "주의 단계 · 대중교통 권장",
      description:
        "법적 기준 이하는 아닐 수 있지만, 개인에 따라 반응 속도와 집중력이 떨어질 수 있는 구간입니다. 가능하면 대중교통이나 대리를 이용하세요.",
      badge: "주의"
    };
  }

  return {
    level: "info",
    title: "이론상 알코올 분해 완료",
    description:
      "위드마크 공식 기준으로는 체내 알코올이 거의 분해된 상태로 추정됩니다. 다만 숙취, 피로감 등은 여전히 남아 있을 수 있습니다.",
    badge: "참고"
  };
}

export function WidmarkCalculator() {
  const [gender, setGender] = useState<Gender>("male");
  const [weight, setWeight] = useState<string>("");
  const [sojuShots, setSojuShots] = useState<string>("");
  const [beerGlasses, setBeerGlasses] = useState<string>("");
  const [wineGlasses, setWineGlasses] = useState<string>("");
  const [whiskyShots, setWhiskyShots] = useState<string>("");
  const [standardDrinks, setStandardDrinks] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);

  const numericWeight = Number(weight.replace(",", "."));
  const numericSoju = Number(sojuShots.replace(",", ".")) || 0;
  const numericBeer = Number(beerGlasses.replace(",", ".")) || 0;
  const numericWine = Number(wineGlasses.replace(",", ".")) || 0;
  const numericWhisky = Number(whiskyShots.replace(",", ".")) || 0;
  const numericStandard = Number(standardDrinks.replace(",", ".")) || 0;

  const totalGrams = useMemo(() => {
    const gramsFromSoju = numericSoju * SOJU_GRAMS_PER_SHOT;
    const gramsFromBeer = numericBeer * BEER_GRAMS_PER_GLASS;
    const gramsFromWine = numericWine * WINE_GRAMS_PER_GLASS;
    const gramsFromWhisky = numericWhisky * WHISKY_GRAMS_PER_SHOT;
    const gramsFromStandard = numericStandard * STANDARD_DRINK_GRAMS;

    return (
      gramsFromSoju +
      gramsFromBeer +
      gramsFromWine +
      gramsFromWhisky +
      gramsFromStandard
    );
  }, [numericSoju, numericBeer, numericWine, numericWhisky, numericStandard]);

  const result = useMemo(
    () => calculateWidmark(numericWeight || 0, gender, totalGrams),
    [numericWeight, gender, totalGrams]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const hasError =
    submitted && (!numericWeight || numericWeight <= 0 || totalGrams <= 0);

  const status = result ? getStatus(result.bac) : null;

  const legalTime =
    result && result.bac > LEGAL_LIMIT
      ? Math.max(0, (result.bac - LEGAL_LIMIT) / BETA)
      : 0;
  const legalMinutes = Math.round(legalTime * 60);
  const legalHoursPart = Math.floor(legalMinutes / 60);
  const legalMinutesPart = legalMinutes % 60;

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 md:flex-row">
      <section className="flex-1 space-y-4">
        <div className="rounded-2xl bg-surface-soft/90 p-5 shadow-soft ring-1 ring-white/10">
          <header className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-400">
                Soolkkae · 숙취 해소 계산기
              </p>
              <h1 className="mt-2 text-xl font-semibold text-white md:text-2xl">
                혈중 알코올 농도 & 해소 시간
              </h1>
              <p className="mt-1 text-sm text-gray-400">
                성별, 몸무게, 마신 술의{" "}
                <span className="font-medium text-gray-200">
                  종류와 양
                </span>
                을 기반으로 위드마크 공식으로 혈중 알코올 농도와{" "}
                <span className="font-medium text-gray-200">
                  해소에 필요한 최소 시간
                </span>
                을 추정합니다.
              </p>
            </div>
            <div className="hidden rounded-full bg-red-900/25 px-3 py-1 text-[11px] font-medium text-red-200 ring-1 ring-red-500/40 md:inline-flex">
              음주운전 NO
            </div>
          </header>

          <form
            onSubmit={handleSubmit}
            className="mt-5 space-y-4 text-sm text-gray-100"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-300">
                  성별
                </label>
                <div className="inline-flex rounded-full bg-black/40 p-1 ring-1 ring-white/10">
                  <button
                    type="button"
                    onClick={() => setGender("male")}
                    className={`px-4 py-2 text-[13px] font-medium transition md:text-xs ${
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
                    className={`px-4 py-2 text-[13px] font-medium transition md:text-xs ${
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
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-gray-300">
                  마신 술의 종류와 양
                </label>
                <span className="text-[11px] text-gray-500">
                  빈 칸은 0으로 취급됩니다.
                </span>
              </div>

              <div className="overflow-hidden rounded-xl border border-white/10 bg-black/40 text-xs">
                <div className="grid grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1.3fr)] border-b border-white/10 bg-white/[0.03] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                  <div>주종</div>
                  <div className="text-right">개수</div>
                  <div className="text-right">1개당 알코올 양(대략)</div>
                </div>

                <div className="divide-y divide-white/10">
                  <div className="grid grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1.3fr)] items-center px-3 py-2">
                    <div className="text-sm text-gray-100">소주</div>
                    <div className="text-right">
                      <input
                        type="number"
                        min={0}
                        step="0.5"
                        value={sojuShots}
                        onChange={(e) => setSojuShots(e.target.value)}
                        className="h-8 w-20 rounded-md border border-white/10 bg-black/50 px-2 text-right text-xs text-white outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                        placeholder="0"
                      />
                    </div>
                    <div className="text-right text-[11px] text-gray-400">
                      1잔(약 50mL) ≈ {SOJU_GRAMS_PER_SHOT}g
                    </div>
                  </div>

                  <div className="grid grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1.3fr)] items-center px-3 py-2">
                    <div className="text-sm text-gray-100">맥주</div>
                    <div className="text-right">
                      <input
                        type="number"
                        min={0}
                        step="0.5"
                        value={beerGlasses}
                        onChange={(e) => setBeerGlasses(e.target.value)}
                        className="h-8 w-20 rounded-md border border-white/10 bg-black/50 px-2 text-right text-xs text-white outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                        placeholder="0"
                      />
                    </div>
                    <div className="text-right text-[11px] text-gray-400">
                      500mL 한 잔 ≈ {BEER_GRAMS_PER_GLASS}g
                    </div>
                  </div>

                  <div className="grid grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1.3fr)] items-center px-3 py-2">
                    <div className="text-sm text-gray-100">와인</div>
                    <div className="text-right">
                      <input
                        type="number"
                        min={0}
                        step="0.5"
                        value={wineGlasses}
                        onChange={(e) => setWineGlasses(e.target.value)}
                        className="h-8 w-20 rounded-md border border-white/10 bg-black/50 px-2 text-right text-xs text-white outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                        placeholder="0"
                      />
                    </div>
                    <div className="text-right text-[11px] text-gray-400">
                      1잔(약 120mL) ≈ {WINE_GRAMS_PER_GLASS}g
                    </div>
                  </div>

                  <div className="grid grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1.3fr)] items-center px-3 py-2">
                    <div className="text-sm text-gray-100">위스키/양주</div>
                    <div className="text-right">
                      <input
                        type="number"
                        min={0}
                        step="0.5"
                        value={whiskyShots}
                        onChange={(e) => setWhiskyShots(e.target.value)}
                        className="h-8 w-20 rounded-md border border-white/10 bg-black/50 px-2 text-right text-xs text-white outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                        placeholder="0"
                      />
                    </div>
                    <div className="text-right text-[11px] text-gray-400">
                      1잔(약 45mL) ≈ {WHISKY_GRAMS_PER_SHOT}g
                    </div>
                  </div>

                  <div className="grid grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1.3fr)] items-center px-3 py-2">
                    <div className="text-sm text-gray-100">기타(표준잔)</div>
                    <div className="text-right">
                      <input
                        type="number"
                        min={0}
                        step="0.5"
                        value={standardDrinks}
                        onChange={(e) => setStandardDrinks(e.target.value)}
                        className="h-8 w-20 rounded-md border border-white/10 bg-black/50 px-2 text-right text-xs text-white outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                        placeholder="0"
                      />
                    </div>
                    <div className="text-right text-[11px] text-gray-400">
                      표준잔 1잔 ≈ {STANDARD_DRINK_GRAMS}g
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-1 text-[11px] text-gray-500">
                위 수치는 일반적인 주종의 도수와 잔 크기를 단순화한{" "}
                <span className="font-medium text-gray-300">예시 값</span>
                입니다. 실제 알코올 양과 해소 시간은 사람마다 크게 달라질 수
                있습니다.
              </p>
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-400 px-4 py-3 text-sm font-semibold text-black shadow-lg shadow-emerald-500/30 transition hover:from-emerald-400 hover:to-teal-300 md:text-sm"
              >
                <ShieldCheck className="h-4 w-4" />
                <span>혈중 알코올 농도 & 해소 시간 계산하기</span>
              </button>
            </div>

            {hasError && (
              <div className="mt-2 flex items-start gap-2 rounded-lg bg-red-950/40 px-3 py-2 text-xs text-red-100 ring-1 ring-red-500/40">
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
                <p>
                  몸무게와 마신 술의 양을 모두 올바르게 입력해 주세요. 이
                  계산기는 참고용 도구이며, 실제 음주 상태나 운전 가능 여부를
                  보장하지 않습니다.
                </p>
              </div>
            )}
          </form>
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

              {status && (
                <div className="mt-3 rounded-xl bg-black/40 p-4 ring-1 ring-white/10">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {status.level === "danger" || status.level === "warning" ? (
                        <AlertTriangle className="h-4 w-4 text-red-400" />
                      ) : (
                        <ShieldCheck className="h-4 w-4 text-emerald-300" />
                      )}
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                        현재 상태(추정)
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        status.level === "danger"
                          ? "bg-red-900/60 text-red-100 ring-1 ring-red-500/60"
                          : status.level === "warning"
                          ? "bg-amber-900/50 text-amber-100 ring-1 ring-amber-500/60"
                          : "bg-emerald-900/40 text-emerald-100 ring-1 ring-emerald-500/50"
                      }`}
                    >
                      {status.badge}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-white">
                    {status.title}
                  </p>
                  <p className="mt-1 text-[11px] leading-relaxed text-gray-400">
                    {status.description}
                  </p>
                  {legalTime > 0 && (
                    <p className="mt-2 text-[11px] text-gray-400">
                      법적 기준인{" "}
                      <span className="font-semibold">0.03% 이하</span>까지
                      도달하려면 최소{" "}
                      <span className="font-semibold text-emerald-200">
                        {legalHoursPart}시간 {legalMinutesPart}분 이상
                      </span>
                      의 추가 시간이 더 필요하다고 추정됩니다.
                    </p>
                  )}
                </div>
              )}

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

