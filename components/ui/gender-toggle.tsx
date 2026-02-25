"use client";

import { cn } from "@/lib/utils";
import { UserRound } from "lucide-react";
import { useState } from "react";

export type Gender = "male" | "female";

interface GenderToggleProps {
  value?: Gender | null;
  onChange?: (value: Gender) => void;
}

type GenderIcon = typeof UserRound;

const FemaleIcon: GenderIcon = UserRound;
const MaleIcon: GenderIcon = UserRound;

const options: { value: Gender; label: string; icon: GenderIcon }[] = [
  { value: "female", label: "여성", icon: FemaleIcon },
  { value: "male", label: "남성", icon: MaleIcon }
];

export function GenderToggle({ value, onChange }: GenderToggleProps) {
  const [internal, setInternal] = useState<Gender | null>(value ?? null);
  const selected = value ?? internal;

  const handleSelect = (v: Gender) => {
    setInternal(v);
    onChange?.(v);
  };

  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-surface-soft/60 p-1 shadow-soft">
      {options.map((opt) => {
        const Icon = opt.icon;
        const isActive = selected === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => handleSelect(opt.value)}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-all",
              isActive
                ? "bg-white text-black shadow-sm"
                : "text-accent-soft hover:bg-white/5"
            )}
          >
            <Icon className="h-4 w-4" />
            <span>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}

