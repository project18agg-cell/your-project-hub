interface UpcurvLogoProps {
  size?: number;
  className?: string;
  color?: string;
}

export const UpcurvLogo = ({ size = 32, className, color = '#F9423A' }: UpcurvLogoProps) => {
  const r = size * 0.15;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="100" height="100" rx={r / size * 100} fill={color} />
      <rect x="20" y="18" width="22" height="48" rx="2" fill="white" />
      <rect x="58" y="18" width="22" height="48" rx="2" fill="white" />
      <rect x="20" y="58" width="60" height="18" rx="2" fill="white" />
      <rect x="58" y="80" width="22" height="4" rx="1" fill="white" opacity="0.4" />
    </svg>
  );
};
