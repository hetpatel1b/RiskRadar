import React from 'react';

interface MetricChartProps {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
}

export const MetricChart: React.FC<MetricChartProps> = ({
  data,
  color = '#00E5FF',
  width = 120,
  height = 36,
}) => {
  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  // Build points for SVG path
  const points = data
    .map((val, idx) => {
      const x = (idx / (data.length - 1)) * (width - 6) + 3;
      const y = height - 4 - ((val - min) / range) * (height - 10);
      return `${x},${y}`;
    })
    .join(' ');

  // Gradient area path
  const firstPoint = points.split(' ')[0];
  const lastPoint = points.split(' ')[points.split(' ').length - 1];
  const lastX = lastPoint.split(',')[0];
  const firstX = firstPoint.split(',')[0];
  const areaPath = `M ${firstPoint} L ${points.split(' ').slice(1).join(' ')} L ${lastX},${height} L ${firstX},${height} Z`;

  const gradientId = `spark-grad-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <svg width={width} height={height} className="overflow-visible pointer-events-none">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0.0" />
        </linearGradient>
      </defs>

      {/* Area fill */}
      <path d={areaPath} fill={`url(#${gradientId})`} />

      {/* Line */}
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />

      {/* Endpoint dot */}
      {lastPoint && (
        <circle
          cx={parseFloat(lastX)}
          cy={parseFloat(lastPoint.split(',')[1])}
          r="2.5"
          fill={color}
          stroke="#070A0F"
          strokeWidth="1.5"
        />
      )}
    </svg>
  );
};
