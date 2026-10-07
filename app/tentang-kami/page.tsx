import type { Metadata } from 'next';
import { constructMetadata } from '@/app/src/lib/seo';
import {
  TbTrophy,
  TbFlame,
  TbTarget,
  TbWorld,
  TbShieldCheck,
} from 'react-icons/tb';
import { FaRegNewspaper } from 'react-icons/fa6';

export const metadata: Metadata = constructMetadata({
  title: 'Tentang Kami',
  description:
    'Profil, fokus editorial, dan topik liputan portal berita sepak bola 352_IDN.',
  slug: 'tentang',
});

const COVERAGE_TOPICS = [
  {
    title: 'Timnas Indonesia',
    desc: 'Kualifikasi Piala Dunia, laga persahabatan, hingga Piala AFF.',
    icon: TbTrophy,
    badge: 'Prioritas Utama',
  },
  {
    title: 'Liga 1 Indonesia',
    desc: 'Berita klub, dinamika transfer pemain, dan update klasemen.',
    icon: TbFlame,
    badge: 'Lokal',
  },
  {
    title: 'Liga Inggris',
    desc: 'Ulasan taktik Premier League, Piala FA, dan Carabao Cup.',
    icon: FaRegNewspaper,
    badge: 'Eropa',
  },
  {
    title: 'Liga Champions',
    desc: 'Analisis fase grup, drama babak gugur, hingga laga final.',
    icon: TbTarget,
    badge: 'Eropa',
  },
  {
    title: 'Sepak Bola Internasional',
    desc: 'Sorotan Piala Dunia, Euro, Copa America, dan rumor transfer.',
    icon: TbWorld,
    badge: 'Global',
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[var(--container-max)] px-4 py-12 lg:py-16">
      {/* 1. HERO SECTION */}
      <section className="mb-14 text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-surface-2 text-text-secondary mb-4 border border-border">
          <TbShieldCheck className="w-3.5 h-3.5" /> Profil Redaksi
        </span>
        <h1 className="text-4xl sm:text-5xl font-boldtext-text tracking-tight mb-6">
          Membawa Sepak Bola Lebih Dekat Dengan Anda
        </h1>
        <p className="text-lg text-text-secondary leading-relaxed">
          <strong className="text-text font-semibold">352_IDN</strong> adalah
          portal berita sepak bola Indonesia yang menyajikan wawasan terkini,
          analisis taktik mendalam, dan liputan komprehensif dari dalam maupun
          luar negeri.
        </p>
      </section>

      {/* 2. FOKUS EDITORIAL CARD */}
      <section className="mb-14 p-8 sm:p-10 rounded-2xl bg-surface border border-border shadow-card relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-surface-2 rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-2xl font-boldtext-text mb-3">Fokus Editorial</h2>
          <p className="text-text-secondary leading-relaxed">
            Kami berkomitmen menyajikan konten olahraga yang independen, cepat,
            dan akurat. Mengupas cerita di balik lapangan hijau dengan
            integritas jurnalistik serta sudut pandang taktis yang tajam.
          </p>
        </div>
      </section>

      {/* 3. TOPIK LIPUTAN (BENTO GRID) */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-boldtext-text">Topik Liputan</h2>
            <p className="text-sm text-text-muted mt-1">
              Fokus kanal berita yang kami sajikan secara berkala
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {COVERAGE_TOPICS.map((topic, idx) => {
            const Icon = topic.icon;
            return (
              <div
                key={idx}
                className="group p-6 rounded-xl bg-bg border border-border hover:border-text-secondary transition-all duration-200 shadow-card flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-surface-2 flex items-center justify-center text-text">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-surface text-text-muted">
                      {topic.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-text group-hover:text-primary transition-colors">
                    {topic.title}
                  </h3>
                  <p className="text-sm text-text-secondary mt-2 leading-relaxed">
                    {topic.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
