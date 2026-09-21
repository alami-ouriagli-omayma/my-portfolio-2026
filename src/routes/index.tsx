import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowUpRight,
  Download,
  Github,
  Linkedin,
  Mail,
  Sparkles as SparklesIcon,
} from "lucide-react";

import portrait from "@/assets/avatar agent.png";
import { SparkleAccents, SparkleField } from "@/components/Sparkles";

import {
  certifications,
  cv,
  engagement,
  links,
  projects,
  skills,
  t,
  type Lang,
} from "@/content/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Omayma Alami Ouriagli - Etudiante Ingénieure & Développeuse Full-Stack" },
      {
        name: "description",
        content:
          "Portfolio d'Omayma Alami Ouriagli, étudiante ingénieure en Génie Informatique & IA : projets en computer vision, cybersécurité adaptative, full-stack et impact social.",
      },
      {
        property: "og:title",
        content: "Omayma Alami Ouriagli — Ingénieure IA & Développeuse Full-Stack",
      },
      {
        property: "og:description",
        content:
          "Projets IA, computer vision, cybersécurité et développement full-stack — le portfolio d'Omayma Alami Ouriagli.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const navKeys = [
  ["about", "#about"],
  ["projects", "#projects"],
  ["skills", "#skills"],
  ["cv", "#cv"],
  ["certifications", "#certifications"],
  ["engagement", "#engagement"],
  ["contact", "#contact"],
] as const;

function Index() {
  const [lang, setLang] = useState<Lang>("fr");

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Ambient glow + constellation sparkles */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -left-40 top-[-10%] h-[36rem] w-[36rem] animate-float-slow rounded-full bg-accent/20 blur-[140px]" />
        <div className="absolute -right-32 top-[40%] h-[32rem] w-[32rem] animate-float-slow rounded-full bg-primary/18 blur-[150px] [animation-delay:-6s]" />
        <SparkleField density={110} />
      </div>

      <Header lang={lang} setLang={setLang} />

      <main>
        <Hero lang={lang} />
        <Projects lang={lang} />
        <Skills lang={lang} />
        <Resume lang={lang} />
        <Credentials lang={lang} />
        <Engagement lang={lang} />
        <Contact lang={lang} />
      </main>

      <footer className="border-t border-border/60 py-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Omayma Alami Ouriagli ·{" "}
        {lang === "fr" ? "Conçu avec soin" : "Crafted with care"}
      </footer>
    </div>
  );
}

function Header({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/60 backdrop-blur-xl">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4">
        <a href="#top" className="flex min-w-0 items-center gap-2">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl gradient-surface text-sm font-bold text-accent-foreground">
            OA
          </span>
          <span className="truncate font-display text-sm font-semibold tracking-tight sm:text-base">
            Omayma Alami Ouriagli
          </span>
        </a>
        <div className="flex items-center gap-4">
          <nav className="hidden items-center gap-5 text-sm text-muted-foreground lg:flex">
            {navKeys.map(([key, href]) => (
              <a
                key={key}
                href={href}
                className="transition-colors hover:text-foreground"
              >
                {t.nav[key][lang]}
              </a>
            ))}
          </nav>
          <div className="flex shrink-0 items-center rounded-full border border-border p-0.5 text-xs">
            {(["fr", "en"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`rounded-full px-3 py-1 uppercase transition-colors ${
                  lang === l
                    ? "gradient-surface text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

function SectionTitle({ index, title }: { index: string; title: string }) {
  return (
    <div className="mb-10 flex items-end gap-4">
      <span className="font-display text-sm text-primary">{index}</span>
      <h2 className="max-w-2xl text-balance text-3xl font-bold sm:text-4xl">
        <span className="gradient-text">{title}</span>
      </h2>
    </div>
  );
}

function Hero({ lang }: { lang: Lang }) {
  return (
    <section id="top" className="relative">
      <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-20 sm:pt-28">
        <div className="relative">
          <SparkleAccents />
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:gap-10">
            {/* Circular portrait, left of the name */}
            <div className="relative shrink-0">
              <div
                aria-hidden="true"
                className="absolute -inset-4 rounded-full bg-primary/30 blur-[50px]"
              />
              <div className="relative grid h-36 w-36 place-items-end overflow-hidden rounded-full border border-foreground/50 bg-foreground/8 shadow-[var(--shadow-portrait)] ring-2 ring-primary/70 sm:h-44 sm:w-44">
                <img
                  src={portrait}
                  alt="Portrait d'Omayma Alami Ouriagli"
                  width={352}
                  height={352}
                  className="h-[94%] w-[94%] object-contain object-bottom brightness-90"
                />
              </div>
            </div>
            <div>
              <p className="mb-5 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-accent">
                <SparklesIcon className="h-3.5 w-3.5" />
                {t.hero.kicker[lang]}
              </p>
              <h1 className="max-w-4xl animate-rise text-balance font-name text-5xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl">
                <span className="shimmer-text">Omayma</span>{" "}
                <span className="text-foreground">Alami Ouriagli</span>
              </h1>
            </div>
          </div>
          <p className="mt-8 max-w-2xl text-lg text-accent">{t.hero.role[lang]}</p>
          <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            {t.hero.intro[lang]}
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full gradient-surface px-6 py-3 text-sm font-semibold text-accent-foreground shadow-[var(--shadow-glow)] transition-transform hover:-translate-y-0.5"
            >
              {t.hero.ctaProjects[lang]}
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href={links.cv}
              target="_blank"
              rel="noreferrer"
              download
              className="inline-flex items-center gap-2 rounded-full glass glass-hover px-6 py-3 text-sm font-semibold"
            >
              <Download className="h-4 w-4" />
              {t.cta.downloadCv[lang]}
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full glass glass-hover px-6 py-3 text-sm font-semibold"
            >
              {t.hero.ctaContact[lang]}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}


function Projects({ lang }: { lang: Lang }) {
  return (
    <section id="projects" className="section-pad">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle index="01" title={t.sections.projects[lang]} />
        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((p, i) => (
            <article
              key={p.title}
              className={`relative flex flex-col rounded-3xl glass glass-hover p-7 ${
                i === 0 ? "md:col-span-2" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="text-2xl font-bold">{p.title}</h3>
                  <p className="mt-1 text-sm text-accent">{p.tagline[lang]}</p>
                </div>
                <span className="shrink-0 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                  {p.year}
                </span>
              </div>
              <p className="mt-4 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground">
                {p.description[lang]}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <li
                    key={s}
                    className="rounded-full bg-secondary/60 px-3 py-1 text-xs text-accent"
                  >
                    {s}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-foreground underline-offset-4 hover:underline"
                  >
                    {t.cta.visit[lang]}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
                {p.linkedinPost && (
                  <a
                    href={p.linkedinPost}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline"
                  >
                    <Linkedin className="h-4 w-4" />
                    {t.cta.visitLinkedin[lang]}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills({ lang }: { lang: Lang }) {
  return (
    <section id="skills" className="section-pad">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle index="02" title={t.sections.skills[lang]} />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {skills.map((s) => (
            <div
              key={s.name}
              className="flex flex-col items-center gap-2 rounded-2xl glass glass-hover px-3 py-5"
            >
              <img
                src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${s.icon}.svg`}
                alt={s.name}
                loading="lazy"
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <span className="text-center text-xs text-muted-foreground">{s.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Resume({ lang }: { lang: Lang }) {
  return (
    <section id="cv" className="section-pad">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle index="03" title={t.sections.cv[lang]} />
        <div className="grid gap-5 lg:grid-cols-3">
          {cv.map((block) => (
            <div key={block.section.en} className="rounded-3xl glass glass-hover p-7">
              <h3 className="text-lg font-bold text-accent">{block.section[lang]}</h3>
              <ul className="mt-5 space-y-5">
                {block.items.map((item) => (
                  <li key={item.title.en} className="border-l border-border pl-4">
                    <p className="font-semibold">{item.title[lang]}</p>
                    {item.meta && (
                      <p className="mt-0.5 text-xs text-primary">{item.meta}</p>
                    )}
                    {item.body && (
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {item.body[lang]}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={links.cv}
            target="_blank"
            rel="noreferrer"
            download
            className="inline-flex items-center gap-2 rounded-full gradient-surface px-6 py-3 text-sm font-semibold text-accent-foreground shadow-[var(--shadow-glow)] transition-transform hover:-translate-y-0.5"
          >
            <Download className="h-4 w-4" />
            {t.cta.downloadCv[lang]}
          </a>
          <a
            href={links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full glass glass-hover px-6 py-3 text-sm font-semibold"
          >
            <Linkedin className="h-4 w-4" />
            {lang === "fr" ? "Voir mon profil complet" : "See my full profile"}
          </a>
        </div>

      </div>
    </section>
  );
}

function Credentials({ lang }: { lang: Lang }) {
  return (
    <section id="certifications" className="section-pad">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle index="04" title={t.sections.certifications[lang]} />
        <div className="grid gap-5 md:grid-cols-2">
          {certifications.map((group) => (
            <div key={group.group.en} className="rounded-3xl glass p-7">
              <h3 className="text-lg font-bold text-accent">{group.group[lang]}</h3>
              <ul className="mt-5 space-y-3">
                {group.items.map((item) => (
                  <li
                    key={item.title}
                    className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border border-border/60 px-4 py-3 transition-colors hover:border-primary"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{item.title}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{item.issuer}</p>
                    </div>
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="shrink-0 text-xs font-semibold text-primary hover:text-accent"
                        aria-label={item.title}
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Engagement({ lang }: { lang: Lang }) {
  return (
    <section id="engagement" className="section-pad">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle index="05" title={t.sections.engagement[lang]} />
        <div className="space-y-4">
          {engagement.map((e) => (
            <article
              key={e.title.en}
              className="grid gap-3 rounded-3xl glass glass-hover p-7 md:grid-cols-[14rem_minmax(0,1fr)]"
            >
              <div>
                <h3 className="text-lg font-bold">{e.title[lang]}</h3>
                <p className="mt-1 text-xs uppercase tracking-widest text-primary">
                  {e.period}
                </p>
              </div>
              <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                {e.body[lang]}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact({ lang }: { lang: Lang }) {
  return (
    <section id="about" className="section-pad">
      <div id="contact" className="mx-auto max-w-6xl px-5">
        <div className="relative overflow-hidden rounded-[2rem] glass p-10 text-center sm:p-16">
          <SparkleAccents />
          <h2 className="text-balance text-3xl font-bold sm:text-5xl">
            <span className="gradient-text">{t.cta.contactTitle[lang]}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
            {t.cta.contactBody[lang]}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={links.email}
              className="inline-flex items-center gap-2 rounded-full gradient-surface px-6 py-3 text-sm font-semibold text-accent-foreground shadow-[var(--shadow-glow)] transition-transform hover:-translate-y-0.5"
            >
              <Mail className="h-4 w-4" />
              Email
            </a>
            <a
              href={links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full glass glass-hover px-6 py-3 text-sm font-semibold"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
            <a
              href={links.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full glass glass-hover px-6 py-3 text-sm font-semibold"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
