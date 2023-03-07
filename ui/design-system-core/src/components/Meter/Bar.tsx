import React, { PropsWithChildren } from 'react';
import Stack from '../Stack';
import { tw, apply } from '@twind/core';
import { getColorClasses } from '../../utils/getColorClasses';
import { MeterProps } from './types';

const Bar: React.FC<PropsWithChildren<MeterProps & { direction?: 'horizontal' | 'vertical' }>> = ({
  size,
  thickness,
  value,
  children,
  max = 100,
  progressBg,
  background,
  direction = 'horizontal',
}) => {
  const progressStyle = getColorClasses(progressBg || 'text-black');
  const backgroundStyle = getColorClasses(background || 'text-grey8');
  const capOffset = 0;
  const mid = thickness / 2;
  const start = direction === 'horizontal' ? capOffset : (max * (size - 2 * capOffset)) / max;
  const delta = (value * (size - 2 * capOffset)) / max;
  const d =
    direction === 'horizontal'
      ? `M ${start},${mid} L ${start + delta},${mid}`
      : `M ${mid},${start} L ${mid},${start - delta}`;
  const backgroundPath =
    direction === 'horizontal'
      ? `M ${capOffset},${mid} L ${size - capOffset},${mid}`
      : `M ${mid},${capOffset} L ${mid},${size - capOffset}`;

  return (
    <Stack justify="center" align="center" className={tw(apply`inline-flex overflow-hidden]`)}>
      <svg
        viewBox={
          direction === 'horizontal' ? `0 0 ${size} ${thickness}` : `0 0 ${thickness} ${size}`
        }
        preserveAspectRatio="none"
        width={direction === 'horizontal' ? size : thickness}
        height={direction === 'horizontal' ? thickness : size}
      >
        <path
          className={tw(apply(backgroundStyle))}
          strokeWidth={thickness}
          stroke="currentColor"
          fill="transparent"
          strokeLinecap="square"
          d={backgroundPath}
        />
        <path
          className={tw(apply(progressStyle))}
          strokeWidth={direction === 'horizontal' ? thickness : size}
          stroke="currentColor"
          fill="transparent"
          strokeLinecap="butt"
          d={d}
        />
      </svg>
      <div className="absolute"> {children} </div>
    </Stack>
  );
};

export default Bar;