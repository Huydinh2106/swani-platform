import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { colors, size } from '@/theme';

const paths = {
  home: 'M3 10 12 3l9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z',
  search: 'm16.5 16.5 4 4',
  heart:
    'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z',
  pin: 'M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z',
  user: 'M4 21v-2a8 8 0 0 1 16 0v2',
  arrow: 'M5 12h14m-6-6 6 6-6 6',
  back: 'M19 12H5m6-6-6 6 6 6',
  chevron: 'm9 5 7 7-7 7',
  sliders: 'M4 7h16M4 17h16M9 4v6m6 4v6',
  check: 'm5 12 4 4L19 6',
  grid: '',
  share: 'M12 16V3m-5 5 5-5 5 5M5 13v7h14v-7',
  close: 'm6 6 12 12M6 18 18 6',
  bag: 'M5 7h14l1 14H4ZM9 8V6a3 3 0 0 1 6 0v2',
} as const;
export type IconName = keyof typeof paths;
export function Icon({
  name,
  color = colors.ink,
  size: dimension = size.icon,
  filled = false,
}: {
  name: IconName;
  color?: string;
  size?: number;
  filled?: boolean;
}) {
  return (
    <Svg
      width={dimension}
      height={dimension}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      accessible={false}
    >
      {paths[name] ? (
        <Path d={paths[name]} fill={filled && name === 'heart' ? color : 'none'} />
      ) : null}
      {name === 'search' ? <Circle cx={10.5} cy={10.5} r={7} /> : null}
      {name === 'pin' ? <Circle cx={12} cy={10} r={2.5} /> : null}
      {name === 'user' ? <Circle cx={12} cy={6} r={4} /> : null}
      {name === 'grid'
        ? [3, 14].flatMap((x) =>
            [3, 14].map((y) => <Rect key={`${x}-${y}`} x={x} y={y} width={7} height={7} rx={1} />),
          )
        : null}
    </Svg>
  );
}
