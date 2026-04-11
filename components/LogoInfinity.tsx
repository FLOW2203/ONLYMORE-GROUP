export default function LogoInfinity({ className = "", size = 40 }: { className?: string; size?: number }) {
  const h = size;
  const w = size * 2;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 200"
      width={w}
      height={h}
      className={className}
      aria-label="ONLYMORE Group"
      role="img"
    >
      <defs>
        <linearGradient id="om-teal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#33D4E0" />
          <stop offset="50%" stopColor="#00B4D8" />
          <stop offset="100%" stopColor="#007A8C" />
        </linearGradient>
        <linearGradient id="om-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E2C36A" />
          <stop offset="50%" stopColor="#C9A84C" />
          <stop offset="100%" stopColor="#9A7B30" />
        </linearGradient>
      </defs>

      {/* Right loop BACK half (behind left at crossing) */}
      <path
        d="M200,100 C200,56 244,22 286,22 C338,22 374,58 374,100 C374,142 338,178 286,178 C244,178 200,144 200,100"
        fill="none"
        stroke="url(#om-gold)"
        strokeWidth="30"
        strokeLinecap="round"
        strokeDasharray="0 248 500"
      />

      {/* Left loop FULL (on top at crossing) */}
      <path
        d="M200,100 C200,56 156,22 114,22 C62,22 26,58 26,100 C26,142 62,178 114,178 C156,178 200,144 200,100"
        fill="none"
        stroke="url(#om-teal)"
        strokeWidth="30"
        strokeLinecap="round"
      />

      {/* Right loop FRONT half (on top, outer arc) */}
      <path
        d="M200,100 C200,56 244,22 286,22 C338,22 374,58 374,100 C374,142 338,178 286,178 C244,178 200,144 200,100"
        fill="none"
        stroke="url(#om-gold)"
        strokeWidth="30"
        strokeLinecap="round"
        strokeDasharray="248 500"
      />
    </svg>
  );
}
