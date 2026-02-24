"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { UploadCloud, ImageIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface PhotoUploadCardProps {
  onImageChange?: (file: File | null, previewUrl: string | null) => void;
}

export function PhotoUploadCard({ onImageChange }: PhotoUploadCardProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = useCallback(
    (file: File | null) => {
      if (!file) {
        setPreview(null);
        onImageChange?.(null, null);
        return;
      }

      const url = URL.createObjectURL(file);
      setPreview(url);
      onImageChange?.(file, url);
    },
    [onImageChange]
  );

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    handleFile(file);
  };

  const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0] ?? null;
    handleFile(file);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-surface p-[1px] shadow-soft">
      <div className="flex h-full flex-col gap-4 rounded-2xl bg-gradient-to-b from-surface-soft/80 to-surface-soft/40 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent-soft">
              STEP 1
            </p>
            <p className="mt-1 text-sm font-semibold text-white">
              얼굴 정면 사진 업로드
            </p>
          </div>
          {preview && (
            <button
              type="button"
              aria-label="사진 제거"
              onClick={() => handleFile(null)}
              className="rounded-full border border-white/10 bg-black/30 p-1.5 text-accent-soft backdrop-blur-sm transition hover:border-white/30 hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <label
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setDragOver(false);
          }}
          onDrop={onDrop}
          className={cn(
            "group relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-white/15 bg-black/20 px-4 py-6 text-center transition hover:border-white/35 hover:bg-black/30",
            dragOver && "border-white/50 bg-black/40"
          )}
        >
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onInputChange}
          />
          {preview ? (
            <div className="relative h-52 w-full overflow-hidden rounded-lg border border-white/10 bg-black/40">
              <Image
                src={preview}
                alt="업로드한 얼굴 사진"
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/[0.03] text-accent-soft ring-1 ring-white/10">
                <UploadCloud className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">
                  얼굴 정면이 잘 보이는 사진을 올려주세요
                </p>
                <p className="text-[11px] text-accent-soft">
                  드래그 앤 드롭 또는 클릭 후 선택 (JPG, PNG)
                </p>
              </div>
            </>
          )}
        </label>

        {!preview && (
          <div className="flex items-center gap-2 rounded-lg bg-black/30 px-3 py-2 text-[11px] text-accent-soft">
            <ImageIcon className="h-3.5 w-3.5" />
            <p>
              얼굴이 정면을 보고 있고,{" "}
              <span className="text-white">머리카락이 너무 가리지 않은</span>{" "}
              사진일수록 결과가 더 자연스러워요.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

