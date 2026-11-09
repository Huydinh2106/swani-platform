import Svg, { Circle, Ellipse, Line, Path, Rect } from 'react-native-svg';
import type { Category, GarmentColor } from '@/contracts/catalog';
import { garmentPalette } from '@/theme';

// Minh họa vector tự tạo, dùng offline. Thay bằng ảnh có quyền sử dụng khi hoàn thiện.
export function ProductArtwork({ category, color }: { category: Category; color: GarmentColor }) {
  const palette = garmentPalette[color];
  const shirt = category === 'shirt' || category === 'jacket';
  return (
    <Svg width="100%" height="100%" viewBox="0 0 240 280" accessible={false}>
      <Rect width={240} height={280} fill={palette.backdrop} />
      <Circle cx={195} cy={45} r={80} fill={palette.fabric} opacity={0.08} />
      <Ellipse cx={120} cy={249} rx={64} ry={8} fill={palette.seam} opacity={0.1} />
      {category === 'pants' ? (
        <>
          <Path
            d="M76 47h88l10 185-43 3-12-125-10 125-43-3Z"
            fill={palette.fabric}
            stroke={palette.seam}
            strokeWidth={1.5}
          />
          <Path
            d="M76 60h88M119 61v49M84 66q0 28-15 30m86-30q0 28 13 30"
            stroke={palette.seam}
            opacity={0.5}
            fill="none"
          />
          <Circle cx={120} cy={54} r={2} fill={palette.seam} />
        </>
      ) : (
        <>
          <Path
            d={
              shirt
                ? 'M88 48 58 59 29 124l33 15 15-29-5 122h96l-5-122 15 29 33-15-29-65-30-11Z'
                : 'M89 48 60 57 29 105l32 23 16-21-3 125h92l-3-125 16 21 32-23-31-48-29-9Z'
            }
            fill={palette.fabric}
            stroke={palette.seam}
            strokeWidth={1.5}
            strokeLinejoin="round"
          />
          {shirt ? (
            <>
              <Path
                d="m89 48 14 34 17-15 17 15 14-34-31 13Z"
                fill={palette.backdrop}
                stroke={palette.seam}
              />
              <Line x1={120} y1={68} x2={120} y2={232} stroke={palette.seam} opacity={0.6} />
              {[91, 115, 139, 163, 187, 211].map((y) => (
                <Circle key={y} cx={125} cy={y} r={1.5} fill={palette.seam} />
              ))}
              <Path d="M137 99h19v23h-19Z" stroke={palette.seam} fill="none" opacity={0.5} />
            </>
          ) : (
            <Path d="M89 48q31 40 62 0" stroke={palette.seam} strokeWidth={5} fill="none" />
          )}
          <Path
            d="M86 216h69M87 118l-4 81m71-56 3 61"
            stroke={palette.seam}
            opacity={0.2}
            fill="none"
          />
        </>
      )}
    </Svg>
  );
}
