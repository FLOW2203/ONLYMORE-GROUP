export default function LogoInfinity({ className = "", size = 40 }: { className?: string; size?: number }) {
  return (
    <img
      src="/logo_onlymore_1024.png"
      alt="ONLYMORE Group"
      width={size}
      height={size}
      className={className}
      style={{ objectFit: "contain", borderRadius: "4px" }}
    />
  );
}
