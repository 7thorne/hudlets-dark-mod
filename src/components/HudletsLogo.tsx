interface Props {
  size?: number;
  className?: string;
}

export function HudletsLogo({ size = 32, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* corner brackets */}
      <path d="M2 10V2h8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
      <path d="M30 10V2h-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
      <path d="M2 22v8h8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
      <path d="M30 22v8h-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
      {/* center pixel */}
      <rect x="13" y="13" width="6" height="6" fill="currentColor" />
    </svg>
  );
}
