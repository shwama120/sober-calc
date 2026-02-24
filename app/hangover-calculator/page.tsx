import { WidmarkCalculator } from "@/components/calculator/widmark-calculator";
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

        <article
          aria-label="위드마크 공식과 음주 운전 관련 의학·법률 정보"
          className="space-y-10 rounded-2xl bg-surface-soft/90 p-6 shadow-soft ring-1 ring-white/10"
        >
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white md:text-xl">
              위드마크(Widmark) 공식이란?
            </h2>
            <p className="text-sm leading-relaxed text-gray-300">
              위드마크 공식은 체내에 흡수된 알코올의 양과 신체 조건(체중, 성별
              등)을 이용해{" "}
              <span className="font-semibold">
                혈중 알코올 농도(BAC, Blood Alcohol Concentration)
              </span>
              를 추정하는 경험적 공식입니다. 스웨덴의 의학자 에릭 위드마크가
              제안했으며, 현재까지도 전 세계적으로 법의학·교통의학 분야에서
              널리 사용되고 있습니다.
            </p>
            <p className="text-sm leading-relaxed text-gray-300">
              일반적인 형태는 다음과 같습니다.
            </p>
            <div className="rounded-xl bg-black/50 px-4 py-3 text-sm text-gray-100 ring-1 ring-white/10">
              <p className="font-mono">
                BAC ={" "}
                <span className="font-semibold">
                  (섭취한 알코올 양 A) / (체중 W × 체수분 분포율 r)
                </span>
              </p>
              <p className="mt-2 text-[11px] text-gray-400">
                A: 체내에 흡수된 순수 알코올 양(g), W: 체중(kg), r: Widmark
                계수(남성 약 0.68, 여성 약 0.55)
              </p>
            </div>
            <p className="text-sm leading-relaxed text-gray-300">
              본 계산기는 위드마크 공식과 평균적인 분해 속도(시간당 약 0.015
              g/dL 감소)를 이용해{" "}
              <span className="font-semibold">
                이론상 &quot;완전히 분해되기까지 필요한 최소 시간&quot;
              </span>
              을 추정합니다. 하지만 개인별 간 기능, 음주 속도, 수면 상태,
              복용 약물, 질환 유무 등에 따라 실제 수치는 크게 달라질 수
              있습니다.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-white md:text-xl">
              주종별 알코올 분해 시간 비교 (예시)
            </h2>
            <p className="text-sm leading-relaxed text-gray-300">
              아래 표는 체중 70kg 성인 기준으로, 각 주종별로 &quot;대략&quot;
              어느 정도 시간이 필요할 수 있는지를 보여주는{" "}
              <span className="font-semibold">예시 시뮬레이션</span>입니다.
              실제 상황과는 차이가 있을 수 있으며,{" "}
              <span className="font-semibold text-emerald-300">
                어느 경우에도 음주 후 바로 운전은 절대 안전하지 않습니다.
              </span>
            </p>
            <div className="overflow-hidden rounded-xl border border-white/10 bg-black/40">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead className="bg-white/5 text-xs uppercase tracking-[0.15em] text-gray-400">
                  <tr>
                    <th className="px-4 py-3">주종</th>
                    <th className="px-4 py-3">예시 음주량</th>
                    <th className="px-4 py-3">추정 순수 알코올량</th>
                    <th className="px-4 py-3">완전 분해까지 최소 시간*</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-white/5">
                    <td className="px-4 py-3 text-gray-100">소주(16도)</td>
                    <td className="px-4 py-3 text-gray-200">
                      1병 (360mL) 기준
                    </td>
                    <td className="px-4 py-3 text-gray-200">
                      약 46g (표준잔 4~5잔)
                    </td>
                    <td className="px-4 py-3 text-emerald-200">
                      약 9~11시간 이상
                    </td>
                  </tr>
                  <tr className="border-t border-white/5 bg-white/[0.02]">
                    <td className="px-4 py-3 text-gray-100">맥주(4.5도)</td>
                    <td className="px-4 py-3 text-gray-200">
                      500mL 2잔 기준
                    </td>
                    <td className="px-4 py-3 text-gray-200">
                      약 36g (표준잔 3~4잔)
                    </td>
                    <td className="px-4 py-3 text-emerald-200">
                      약 7~9시간 이상
                    </td>
                  </tr>
                  <tr className="border-t border-white/5">
                    <td className="px-4 py-3 text-gray-100">와인(12도)</td>
                    <td className="px-4 py-3 text-gray-200">
                      한 병의 절반(375mL) 기준
                    </td>
                    <td className="px-4 py-3 text-gray-200">
                      약 36g (표준잔 3~4잔)
                    </td>
                    <td className="px-4 py-3 text-emerald-200">
                      약 7~9시간 이상
                    </td>
                  </tr>
                  <tr className="border-t border-white/5 bg-white/[0.02]">
                    <td className="px-4 py-3 text-gray-100">위스키(40도)</td>
                    <td className="px-4 py-3 text-gray-200">
                      잔 3잔(각 45mL) 기준
                    </td>
                    <td className="px-4 py-3 text-gray-200">
                      약 43g (표준잔 4~5잔)
                    </td>
                    <td className="px-4 py-3 text-emerald-200">
                      약 9~11시간 이상
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-gray-500">
              * 위 수치는 평균적인 분해 속도와 주류의 도수·용량을 단순화하여
              계산한 추정치일 뿐이며, 개인에 따라 실제 시간은 훨씬 길어질 수
              있습니다.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white md:text-xl">
              중요한 경고 및 면책 조항(Disclaimer)
            </h2>
            <div className="space-y-2 rounded-xl bg-red-950/40 p-4 text-sm text-red-50 ring-1 ring-red-500/50">
              <p className="font-semibold">
                이 사이트의 모든 결과는 &quot;참고용&quot; 정보이며, 어떤 경우에도
                음주운전의 근거가 될 수 없습니다.
              </p>
              <ul className="list-disc space-y-1 pl-5 text-[13px]">
                <li>
                  본 계산기는 위드마크 공식과 평균값을 기반으로 한{" "}
                  <span className="font-semibold">
                    이론적 추정 도구일 뿐
                  </span>
                  입니다.
                </li>
                <li>
                  사용자 개개인의 간 기능, 질환, 약물 복용, 수면 상태, 체지방률
                  등에 따라{" "}
                  <span className="font-semibold">
                    실제 혈중 알코올 농도와 분해 시간은 전혀 다를 수 있습니다.
                  </span>
                </li>
                <li>
                  사이트 운영자는 본 계산기의 사용으로 인해 발생하는{" "}
                  <span className="font-semibold">
                    어떠한 법적·의학적 결과에 대해서도 책임을 지지 않습니다.
                  </span>
                </li>
                <li>
                  <span className="font-semibold">
                    한 잔만 마셨더라도, 피곤하거나 컨디션이 좋지 않다면 절대
                    운전하지 마세요.
                  </span>
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-white md:text-xl">
              한국 음주운전 처벌 기준(요약)
            </h2>
            <p className="text-sm leading-relaxed text-gray-300">
              아래 내용은 일반적으로 알려진{" "}
              <span className="font-semibold">
                음주운전 혈중 알코올 농도 기준과 처벌 수위
              </span>
              를 요약한 것으로, 실제 적용 기준은 시기별 법 개정 및 개별 사건에
              따라 달라질 수 있습니다. 최신 정보는 반드시{" "}
              <span className="font-semibold">
                도로교통법, 경찰청·법무부·도로교통공단 등 공식 자료
              </span>
              를 통해 확인하시기 바랍니다.
            </p>
            <div className="overflow-hidden rounded-xl border border-white/10 bg-black/40">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead className="bg-white/5 text-xs uppercase tracking-[0.15em] text-gray-400">
                  <tr>
                    <th className="px-4 py-3">혈중 알코올 농도(BAC)</th>
                    <th className="px-4 py-3">구분</th>
                    <th className="px-4 py-3">예상 처벌 수준(예시)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-white/5">
                    <td className="px-4 py-3 text-gray-100">
                      0.03% 이상 ~ 0.08% 미만
                    </td>
                    <td className="px-4 py-3 text-gray-200">면허 정지 수준</td>
                    <td className="px-4 py-3 text-gray-200 text-[13px]">
                      벌금 및 운전면허 정지, 전과 기록 가능. 초보·직업 운전자는
                      실제 생활에 큰 제약 발생.
                    </td>
                  </tr>
                  <tr className="border-t border-white/5 bg-white/[0.02]">
                    <td className="px-4 py-3 text-gray-100">
                      0.08% 이상 ~ 0.2% 미만
                    </td>
                    <td className="px-4 py-3 text-gray-200">면허 취소 수준</td>
                    <td className="px-4 py-3 text-gray-200 text-[13px]">
                      면허 취소, 고액 벌금 및 징역형 가능. 사고 발생 시 형량
                      대폭 가중.
                    </td>
                  </tr>
                  <tr className="border-t border-white/5">
                    <td className="px-4 py-3 text-gray-100">0.2% 이상</td>
                    <td className="px-4 py-3 text-gray-200">
                      중대한 범죄 수준
                    </td>
                    <td className="px-4 py-3 text-gray-200 text-[13px]">
                      장기 징역형 가능, 반복 위반 시 실형 선고 가능성이 매우
                      높음. 사고 시 사망사고로 간주될 수 있음.
                    </td>
                  </tr>
                  <tr className="border-t border-white/5 bg-white/[0.02]">
                    <td className="px-4 py-3 text-gray-100">
                      음주측정 불응 등
                    </td>
                    <td className="px-4 py-3 text-gray-200">
                      별도 엄격 처벌 대상
                    </td>
                    <td className="px-4 py-3 text-gray-200 text-[13px]">
                      측정 불응 자체가 중대한 위반으로 간주되며, 별도의 엄격한
                      처벌이 적용될 수 있음.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-gray-500">
              위 표는 이해를 돕기 위한 요약 예시로,{" "}
              <span className="font-semibold">
                최신 도로교통법 및 판례와 차이가 있을 수 있습니다.
              </span>{" "}
              구체적인 법적 책임과 처벌 수위는 법원 판단과 개별 사안에 따라
              달라집니다.
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}

