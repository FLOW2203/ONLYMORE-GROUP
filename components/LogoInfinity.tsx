export default function LogoInfinity({ className = "", size = 40 }: { className?: string; size?: number }) {
  return (
    <img
      src="/logo%20onlymore%20HD.png"
      alt="ONLYMORE Group"
      width={size}
      height={size}
      className={className}
      style={{ objectFit: "contain" }}
    />
  );
}
