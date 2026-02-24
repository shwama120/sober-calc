"use client";

import { useState } from "react";
import { Scissors, Sparkles } from "lucide-react";
import { Gender, GenderToggle } from "@/components/ui/gender-toggle";
import { PhotoUploadCard } from "@/components/upload/photo-upload-card";

export default function HomePage() {
  const [gender, setGender] = useState<Gender | null>(null);
  const [hasPhoto, setHasPhoto] = useState(false);

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-8">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-surface-soft/80 px-3 py-1 text-[11px] font-medium text-accent-soft ring-1 ring-white/10">
            <Sparkles className="h-3.5 w-3.5 text-white" />
            <span>미용실 가기 전, 나에게 가장 잘 어울리는 헤어스타일 찾기</span>
          </div>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-white md:text-3xl">
            My Vibe Studio
          </h1>
          <p className="mt-2 text-sm text-accent-soft md:text-[15px]">
            AI가 얼굴은 그대로 유지한 채, 다양한 헤어스타일만 자연스럽게
            바꿔 보여주는 가상 체험 서비스입니다.
          </p>
        </div>
        <div className="flex flex-col items-end gap-3">
          <GenderToggle value={gender ?? undefined} onChange={setGender} />
          <p className="text-[11px] text-accent-soft">
            성별 선택에 따라 추천 헤어스타일이 달라집니다.
          </p>
        </div>
      </header>

      <section className="grid gap-5 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.1fr)]">
        <PhotoUploadCard
          onImageChange={(file) => {
            setHasPhoto(!!file);
          }}
        />

        <div className="relative overflow-hidden rounded-2xl bg-surface p-[1px] shadow-soft">
          <div className="flex h-full flex-col rounded-2xl bg-gradient-to-b from-surface-soft/80 to-surface-soft/40 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent-soft">
                  STEP 2
                </p>
                <p className="mt-1 text-sm font-semibold text-white">
                  헤어스타일 추천 프리뷰
                </p>
              </div>
              <div className="inline-flex items-center gap-1 rounded-full bg-black/40 px-3 py-1 text-[11px] text-accent-soft ring-1 ring-white/10">
                <Scissors className="h-3.5 w-3.5" />
                <span>AI 헤어 체인지</span>
              </div>
            </div>

            <div className="mt-4 flex flex-1 items-center justify-center rounded-xl border border-dashed border-white/15 bg-black/20 px-4 py-6 text-center">
              {!gender ? (
                <p className="text-sm text-accent-soft">
                  먼저{" "}
                  <span className="font-medium text-white">성별을 선택</span>한
                  뒤, 얼굴 정면 사진을 업로드하면
                  <br />
                  내 얼굴은 그대로, 헤어스타일만 바뀐 결과를 볼 수 있어요.
                </p>
              ) : !hasPhoto ? (
                <p className="text-sm text-accent-soft">
                  {gender === "female"
                    ? "여성"
                    : "남성"}{" "}
                  헤어스타일 기반으로 준비 중입니다.
                  <br />
                  사진을 업로드하면 나에게 어울리는 스타일을 제안해 드릴게요.
                </p>
              ) : (
                <p className="text-sm text-accent-soft">
                  사진 업로드까지 완료되었습니다.
                  <br />
                  다음 단계에서 선택한 성별에 맞는 다양한 헤어스타일 리스트와
                  Before/After 비교 슬라이더가 나타날 예정입니다.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

