interface AdSlotProps {
  slotName: string;
  orientation?: "horizontal" | "vertical";
}

export function AdSlot({ slotName, orientation = "horizontal" }: AdSlotProps) {
  const isVertical = orientation === "vertical";

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-dashed border-white/12 bg-black/20 text-xs text-gray-400 ${
        isVertical ? "h-64 w-full" : "h-24 w-full"
      } flex items-center justify-center`}
    >
      {/* 실제 서비스에서는 이 영역에 AdSense 스크립트/ins 태그 삽입 */}
      <div className="text-center leading-relaxed">
        <p className="font-medium text-gray-300">광고 영역 ({slotName})</p>
        <p className="mt-1 text-[11px] text-gray-500">
          Google AdSense 코드가 들어갈 자리입니다.
        </p>
      </div>
    </div>
  );
}

