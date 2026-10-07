import Link from 'next/link';

export default function SiteLogo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2"
      aria-label="352_IDN - Beranda"
    >
      <span className="text-2xl font-extrabold tracking-tight">
        <span className="text-primary">352</span>
        <span className="text-dark">_IDN</span>
      </span>
    </Link>
  );
}
