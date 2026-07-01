import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform, AnimatePresence, useMotionValue } from "framer-motion";
import {
  Github, Linkedin, Mail, ArrowDown, ArrowUpRight, Download, ExternalLink,
  Code2, Server, Database, Cloud, Boxes, Cpu, Sparkles, Shield, Zap, Network,
  Trophy, GraduationCap, Briefcase, Send, ArrowUp, X, Coffee, Crown, ShoppingBag,
  Layers, GitBranch, Container, Workflow,
} from "lucide-react";
import vishnuBw from "@/assets/vishnu-bw.jpeg?url";
import vishnuColor from "@/assets/vishnu-color.jpeg?url";

/* ---------- DATA ---------- */
const ROLES = ["Java Developer", "Spring Boot Engineer", "Microservices Architect", "React Developer", "Cloud Native Builder", "Backend Engineer"];

const SKILLS: { category: string; icon: any; gradient: string; items: string[] }[] = [
  { category: "Languages", icon: Code2, gradient: "from-sky-400 to-blue-600", items: ["Java", "JavaScript", "TypeScript"] },
  { category: "Backend", icon: Server, gradient: "from-fuchsia-400 to-pink-600", items: ["Spring Boot", "Spring Security", "Spring Cloud", "Eureka", "API Gateway", "OpenFeign", "Node.js"] },
  { category: "Frontend", icon: Sparkles, gradient: "from-cyan-400 to-sky-600", items: ["React.js", "Next.js", "Tailwind CSS", "Redux"] },
  { category: "Cloud & DevOps", icon: Cloud, gradient: "from-violet-400 to-purple-600", items: ["Docker", "Kubernetes", "CI/CD", "Cloud Native"] },
  { category: "Databases", icon: Database, gradient: "from-emerald-400 to-teal-600", items: ["MySQL", "MongoDB", "Redis"] },
  { category: "Messaging & APIs", icon: Network, gradient: "from-pink-400 to-rose-600", items: ["RabbitMQ", "WebSockets", "REST", "Firebase", "Razorpay"] },
  { category: "AI", icon: Sparkles, gradient: "from-orange-400 to-amber-600", items: ["Gemini API", "LLM Integration"] },
  { category: "Concepts", icon: Cpu, gradient: "from-indigo-400 to-violet-600", items: ["Microservices", "System Design", "RBAC", "JWT", "OAuth2", "Clean Architecture"] },
];

const MARQUEE_ITEMS = ["Spring Boot", "Microservices", "Kubernetes", "Docker", "React", "Java", "PostgreSQL", "WebSockets", "Redis", "System Design", "Cloud Native", "REST APIs"];

const PROJECTS = [
  {
    title: "Coffee Shop Queue Management",
    tag: "Real-time scheduling",
    year: "Feb 2026",
    icon: Coffee,
    accent: "from-amber-500/30 via-rose-500/20 to-purple-500/20",
    stack: ["React", "TypeScript", "Spring Boot", "Spring Security", "MySQL", "Recharts"],
    summary: "Full-stack order platform with a queue simulation engine comparing SJF vs FIFO across parallel baristas.",
    problem: "FIFO scheduling created long waits and order abandonment during peak loads at multi-barista coffee shops.",
    solution: "Designed an arrival-time-aware SJF scheduler with JWT-secured REST APIs and a TypeScript dashboard surfacing live metrics.",
    features: ["JWT auth + RBAC", "SJF vs FIFO simulator", "3 parallel barista pipelines", "200–250 orders / run", "Recharts analytics", "SLA + revenue dashboards"],
    metrics: [{ k: "30%", v: "lower avg wait" }, { k: "50%", v: "less abandonment" }, { k: "250", v: "orders / run" }],
    github: "https://github.com/Vishnu12222344/CoffeeShopApplication",
  },
  {
    title: "IndiChess — Real-Time Chess",
    tag: "Low-latency multiplayer",
    year: "Jan 2026",
    icon: Crown,
    accent: "from-indigo-500/30 via-blue-500/20 to-cyan-500/20",
    stack: ["Spring Boot", "WebSockets", "Spring Security", "MySQL", "Docker", "Kubernetes", "React"],
    summary: "Low-latency game engine over WebSockets with strict move validation, deployed to Kubernetes.",
    problem: "Real-time multiplayer needs sub-100ms moves, conflict-free deploys, and bullet-proof state persistence.",
    solution: "Built a stateless Spring Boot engine with WebSocket sessions, containerized on K8s, with MySQL-backed transactional move history.",
    features: ["WebSocket move sync", "10+ concurrent matches", "Strict server-side validation", "K8s multi-app cluster", "Persistent player stats", "Fault-tolerant recovery"],
    metrics: [{ k: "10+", v: "concurrent matches" }, { k: "100+", v: "stored sessions" }, { k: "3+", v: "apps / cluster" }],
    github: "https://github.com/Vishnu12222344/IndiChess-MicroServices",
  },
  {
    title: "E-Commerce Platform",
    tag: "Multi-role marketplace",
    year: "Jul 2025",
    icon: ShoppingBag,
    accent: "from-emerald-500/30 via-cyan-500/20 to-blue-500/20",
    stack: ["React", "Spring Boot", "Spring Security", "MySQL", "Docker"],
    summary: "Multi-role marketplace with Buyers, Sellers, Admins — shipped in containers with a real-time order pipeline.",
    problem: "Marketplaces juggle three audiences with very different permissions and workflows under one product.",
    solution: "Enforced RBAC via Spring Security with isolated REST surfaces per role and a Docker-packaged deployment.",
    features: ["3-role RBAC", "Product + image upload", "Category filtering", "Wishlist", "Real-time stock validation", "Containerized rollout"],
    metrics: [{ k: "3", v: "user roles" }, { k: "6+", v: "core features" }, { k: "50%", v: "fewer deploy steps" }],
    github: "https://github.com/Vishnu12222344/E-commerce",
  },
];

const HIGHLIGHTS = [
  { icon: Server, title: "Spring Boot", desc: "Production REST APIs, layered architecture, validation, exception handling." },
  { icon: Container, title: "Docker", desc: "Reproducible builds, multi-stage images, slim runtime containers." },
  { icon: Boxes, title: "Kubernetes", desc: "Deployments, services, NodePort, zero-downtime rollouts." },
  { icon: Workflow, title: "Microservices", desc: "Eureka, API Gateway, Config Server, OpenFeign." },
  { icon: Zap, title: "REST APIs", desc: "Versioned, documented, idempotent endpoints." },
  { icon: Shield, title: "Auth", desc: "JWT, OAuth2, role-based access control." },
  { icon: Cloud, title: "Cloud Native", desc: "Stateless services, externalized config, env-agnostic deploys." },
  { icon: Network, title: "WebSockets", desc: "Low-latency bi-directional channels for live UX." },
  { icon: Layers, title: "System Design", desc: "Trade-off thinking across consistency, latency, scale." },
];

const CERTS = [
  { title: "Java Full Stack", issuer: "Cipher Schools", date: "Jul 2025" },
  { title: "Cloud Computing", issuer: "NPTEL — IIT Kharagpur", date: "Oct 2024" },
  { title: "Mastering DSA in C++", issuer: "Cipher Schools", date: "Jul 2024" },
  { title: "Server-side JS with Node.js", issuer: "NIIT — Coursera", date: "Apr 2023" },
];

/* ---------- PRIMITIVES ---------- */

function Section({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative mx-auto w-full max-w-7xl px-6 py-28 md:px-10 md:py-36 ${className}`}>
      {children}
    </section>
  );
}

function SectionHeader({ kicker, title, sub }: { kicker: string; title: React.ReactNode; sub?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mb-16 max-w-3xl"
    >
      <div className="mb-4 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
        <span className="size-1.5 rounded-full bg-gradient-to-r from-brand-blue to-brand-purple" />
        {kicker}
      </div>
      <h2 className="text-4xl font-semibold leading-[1.05] md:text-6xl">{title}</h2>
      {sub && <p className="mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">{sub}</p>}
    </motion.div>
  );
}

function MagneticButton({
  children, href, variant = "primary", onClick, download,
}: { children: React.ReactNode; href?: string; variant?: "primary" | "ghost"; onClick?: () => void; download?: boolean }) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  function onMove(e: React.MouseEvent) {
    const r = (ref.current as HTMLElement)?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.25);
  }
  function reset() { x.set(0); y.set(0); }

  const cls = variant === "primary"
    ? "relative overflow-hidden rounded-full px-6 py-3 text-sm font-medium text-white shadow-[0_10px_40px_-10px_rgba(139,92,246,0.6)]"
    : "rounded-full px-6 py-3 text-sm font-medium glass hover:bg-white/10 transition-colors";

  const inner = (
    <motion.span style={{ x: sx, y: sy }} className="inline-flex items-center gap-2">
      {children}
    </motion.span>
  );

  const bg = variant === "primary" && (
    <span className="absolute inset-0 -z-10 animate-gradient-x" style={{ background: "linear-gradient(90deg,#3B82F6,#8B5CF6,#06B6D4,#8B5CF6,#3B82F6)" }} />
  );

  if (href) {
    return (
      <motion.a ref={ref as any} href={href} download={download} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
        onMouseMove={onMove} onMouseLeave={reset} className={cls}>
        {bg}{inner}
      </motion.a>
    );
  }
  return (
    <motion.button ref={ref as any} onClick={onClick} onMouseMove={onMove} onMouseLeave={reset} className={cls}>
      {bg}{inner}
    </motion.button>
  );
}

/* ---------- BACKGROUND ---------- */
function Background() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    function onMove(e: MouseEvent) {
      el!.style.setProperty("--mx", `${e.clientX}px`);
      el!.style.setProperty("--my", `${e.clientY}px`);
    }
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return (
    <div ref={ref} className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute -top-40 left-1/4 size-[520px] rounded-full blur-3xl animate-aurora" style={{ background: "radial-gradient(circle, rgba(59,130,246,0.35), transparent 70%)" }} />
      <div className="absolute top-1/3 right-0 size-[480px] rounded-full blur-3xl animate-aurora" style={{ background: "radial-gradient(circle, rgba(139,92,246,0.30), transparent 70%)", animationDelay: "-4s" }} />
      <div className="absolute bottom-0 left-1/3 size-[600px] rounded-full blur-3xl animate-aurora" style={{ background: "radial-gradient(circle, rgba(6,182,212,0.22), transparent 70%)", animationDelay: "-8s" }} />
      <div
        className="absolute inset-0 opacity-70 transition-opacity"
        style={{
          background:
            "radial-gradient(600px circle at var(--mx,50%) var(--my,50%), rgba(139,92,246,0.10), transparent 40%)",
        }}
      />
      {/* noise */}
      <div className="absolute inset-0 opacity-[0.035] mix-blend-overlay" style={{
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.9'/></svg>\")",
      }} />
    </div>
  );
}

/* ---------- CUSTOM CURSOR ---------- */
function Cursor() {
  const x = useMotionValue(-100); const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40 });
  const sy = useSpring(y, { stiffness: 500, damping: 40 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    function move(e: PointerEvent) { x.set(e.clientX); y.set(e.clientY); }
    function over(e: Event) {
      const t = e.target as HTMLElement;
      setHover(!!t.closest("a,button,[data-cursor='hover']"));
    }
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    return () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerover", over); };
  }, [x, y]);

  return (
    <>
      <motion.div style={{ x: sx, y: sy }} className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block">
        <motion.div animate={{ scale: hover ? 1.8 : 1, opacity: hover ? 0.4 : 1 }} className="-translate-x-1/2 -translate-y-1/2 size-3 rounded-full bg-white mix-blend-difference" />
      </motion.div>
      <motion.div style={{ x, y }} className="pointer-events-none fixed left-0 top-0 z-[99] hidden md:block">
        <motion.div animate={{ scale: hover ? 0.6 : 1 }} className="-translate-x-1/2 -translate-y-1/2 size-10 rounded-full border border-white/30" />
      </motion.div>
    </>
  );
}

/* ---------- NAV ---------- */
function Nav() {
  const items = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }}
      className="fixed inset-x-0 top-4 z-50 mx-auto flex w-[min(960px,calc(100%-2rem))] items-center justify-between rounded-full glass-strong px-4 py-2.5">
      <a href="#top" className="flex items-center gap-2 px-2">
        <span className="block size-8 overflow-hidden rounded-full ring-1 ring-white/15"><img src={vishnuBw} alt="Vishnu Pratapani" className="h-full w-full object-cover" loading="eager" decoding="async" /></span>
        <span className="hidden text-sm font-medium md:inline">Vishnu Pratapani</span>
      </a>
      <nav className="hidden items-center gap-1 md:flex">
        {items.map(i => (
          <a key={i.href} href={i.href} className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground">
            {i.label}
          </a>
        ))}
      </nav>
      <a href="#contact" className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium hover:bg-white/20">Let&apos;s talk</a>
    </motion.header>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI(v => (v + 1) % ROLES.length), 2200); return () => clearInterval(t); }, []);
  const name = "Vishnu Pratapani";

  return (
    <Section id="top" className="!pt-40 md:!pt-44">
      <div className="relative">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs">
          <span className="relative grid size-2 place-items-center">
            <span className="absolute inset-0 rounded-full bg-emerald-400" style={{ animation: "pulse-ring 1.6s ease-out infinite" }} />
            <span className="size-2 rounded-full bg-emerald-400" />
          </span>
          Available for Software Engineer roles
        </motion.div>

        <h1 className="text-[clamp(2.6rem,9vw,7.5rem)] font-semibold leading-[0.95]">
          {name.split("").map((c, idx) => (
            <motion.span key={idx} initial={{ y: "110%", opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.05 * idx, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block whitespace-pre">
              {c === " " ? "\u00A0" : c}
            </motion.span>
          ))}
        </h1>

        <div className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-2 text-2xl md:text-4xl">
          <span className="text-muted-foreground">I&apos;m a</span>
          <span className="relative inline-flex h-[1.3em] min-w-[260px] overflow-hidden md:min-w-[420px]">
            <AnimatePresence mode="wait">
              <motion.span key={ROLES[i]} initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }} transition={{ duration: 0.5, ease: [0.22,1,0.36,1] }}
                className="text-gradient font-semibold">
                {ROLES[i]}
              </motion.span>
            </AnimatePresence>
          </span>
        </div>

        <p className="mt-8 max-w-2xl text-base text-muted-foreground md:text-lg">
          Full-Stack Java developer shipping cloud-native systems with Spring Boot, React, Docker & Kubernetes.
          I care about clean architecture, low-latency APIs, and interfaces that feel inevitable.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <MagneticButton href="#projects">View Projects <ArrowUpRight className="size-4" /></MagneticButton>
          <MagneticButton href="https://drive.google.com/file/d/1wJ4XWHjeJ9RUaX_Ar9-mW9tgSscalcck/view?usp=sharing" variant="ghost" download><Download className="size-4" /> Resume</MagneticButton>
          <MagneticButton href="#contact" variant="ghost">Contact me</MagneticButton>
        </div>

        <div className="mt-10 flex items-center gap-3 text-muted-foreground">
          <a aria-label="Github" href="https://github.com/Vishnu12222344" target="_blank" rel="noreferrer" className="grid size-10 place-items-center rounded-full glass hover:text-foreground"><Github className="size-4" /></a>
          <a aria-label="LinkedIn" href="https://linkedin.com/in/pratapanivishnu" target="_blank" rel="noreferrer" className="grid size-10 place-items-center rounded-full glass hover:text-foreground"><Linkedin className="size-4" /></a>
          <a aria-label="Email" href="mailto:pratapanivishnu@gmail.com" className="grid size-10 place-items-center rounded-full glass hover:text-foreground"><Mail className="size-4" /></a>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
          className="absolute -right-2 bottom-2 hidden flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground md:flex">
          Scroll
          <motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity }}><ArrowDown className="size-4" /></motion.span>
        </motion.div>
      </div>
    </Section>
  );
}

/* ---------- ABOUT + COUNTERS ---------- */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const start = performance.now();
        const dur = 1400;
        function tick(t: number) {
          const p = Math.min(1, (t - start) / dur);
          setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        io.disconnect();
      }
    }, { threshold: 0.4 });
    io.observe(el); return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{v}{suffix}</span>;
}

function About() {
  return (
    <Section id="about">
      <SectionHeader kicker="About" title={<>Engineer by craft, <span className="text-gradient">builder by heart.</span></>} />
      <div className="grid gap-12 md:grid-cols-[1fr_1.2fr] md:items-start">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="relative aspect-[4/5] overflow-hidden rounded-3xl gradient-border">
          <img src={vishnuColor} alt="Vishnu Pratapani" className="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6">
            <p className="font-display text-2xl">Vishnu Pratapani</p>
            <p className="text-sm text-muted-foreground">Software Engineer · India</p>
          </div>
        </motion.div>

        <div>
          <p className="text-lg leading-relaxed text-muted-foreground">
            I&apos;m a Full-Stack Java developer with hands-on experience designing microservices,
            real-time platforms and cloud-native systems. From <span className="text-foreground">REST API design</span> and
            <span className="text-foreground"> JWT-based authentication</span> to <span className="text-foreground">containerized deployments</span> on Kubernetes,
            I build software that scales — and stays maintainable.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Currently an Academic Trainee at <span className="text-foreground">HCLTech</span>, shipping production Spring Boot services and applying
            cloud-native principles in a cross-functional team.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { k: 3, s: "+", l: "Major projects" },
              { k: 15, s: "+", l: "Technologies" },
              { k: 17, s: "/50", l: "HCL Hackathon" },
              { k: 4, s: "", l: "Certifications" },
            ].map((c, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                className="rounded-2xl glass p-5">
                <div className="text-3xl font-semibold text-gradient md:text-4xl"><Counter to={c.k} suffix={c.s} /></div>
                <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{c.l}</div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 space-y-4">
            {[
              { y: "2026", t: "HCLTech — Academic Trainee", d: "Shipping Spring Boot microservices on Kubernetes." },
              { y: "2026", t: "Coffee Shop Queue Engine", d: "SJF scheduler cutting wait time by 30%." },
              { y: "2026", t: "IndiChess launched", d: "Real-time WebSocket chess platform on K8s." },
              { y: "2022–26", t: "B.Tech CSE — LPU", d: "Computer Science & Engineering." },
            ].map((it, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex gap-4">
                <div className="relative flex flex-col items-center">
                  <div className="size-3 rounded-full bg-gradient-to-br from-brand-blue to-brand-purple shadow-[0_0_12px_rgba(139,92,246,0.7)]" />
                  {i < 3 && <div className="mt-1 h-full w-px bg-gradient-to-b from-white/20 to-transparent" />}
                </div>
                <div className="pb-3">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{it.y}</div>
                  <div className="font-medium">{it.t}</div>
                  <div className="text-sm text-muted-foreground">{it.d}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------- MARQUEE ---------- */
function Marquee() {
  const row = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="relative overflow-hidden border-y border-white/5 bg-white/[0.02] py-8">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-background to-transparent" />
      <motion.div
        className="flex w-max items-center gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {row.map((t, i) => (
          <div key={i} className="flex items-center gap-12">
            <span className="font-display text-4xl font-semibold text-white/15 transition-colors hover:text-white/60 md:text-6xl">{t}</span>
            <Sparkles className="size-6 text-brand-purple/60 md:size-8" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ---------- SKILLS ---------- */
const SKILL_COLORS: Record<string, string> = {
  Java: "#F59E0B", JavaScript: "#FACC15", TypeScript: "#3B82F6",
  "Spring Boot": "#22C55E", "Spring Security": "#22C55E", "Spring Cloud": "#22C55E",
  Eureka: "#14B8A6", "API Gateway": "#8B5CF6", OpenFeign: "#EC4899", "Node.js": "#22C55E",
  "React.js": "#06B6D4", "Next.js": "#F8FAFC", "Tailwind CSS": "#38BDF8", Redux: "#8B5CF6",
  Docker: "#3B82F6", Kubernetes: "#3B82F6", "CI/CD": "#3B82F6", "Cloud Native": "#3B82F6",
  MySQL: "#F97316", MongoDB: "#22C55E", Redis: "#EF4444",
  RabbitMQ: "#F97316", WebSockets: "#8B5CF6", REST: "#3B82F6", Firebase: "#F97316", Razorpay: "#3B82F6",
  "Gemini API": "#3B82F6", "LLM Integration": "#A855F7",
  Microservices: "#3B82F6", "System Design": "#8B5CF6", RBAC: "#22C55E", JWT: "#EC4899", OAuth2: "#3B82F6", "Clean Architecture": "#8B5CF6",
};

function Skills() {
  return (
    <Section id="skills">
      <SectionHeader kicker="Skills" title={<>A toolkit built for <span className="text-gradient">production.</span></>}
        sub="Languages, backend frameworks, frontends, and the cloud glue that ties them together." />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {SKILLS.map((cat, i) => {
          const Icon = cat.icon;
          return (
            <motion.div key={cat.category} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl glass p-6 transition-shadow hover:shadow-[0_30px_80px_-30px_rgba(139,92,246,0.5)]">
              <div className="absolute -right-12 -top-12 size-40 rounded-full bg-gradient-to-br from-brand-blue/20 to-brand-purple/20 blur-2xl opacity-0 transition-opacity group-hover:opacity-100" />
              <div className={`grid size-12 place-items-center rounded-xl bg-gradient-to-br ${cat.gradient} shadow-[0_8px_30px_-8px_rgba(139,92,246,0.5)]`}>
                <Icon className="size-6 text-white" />
              </div>
              <h3 className="mt-6 font-display text-xl">{cat.category}</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {cat.items.map((name, j) => {
                  const color = SKILL_COLORS[name] || "#94A3B8";
                  return (
                    <motion.span
                      key={name}
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 + j * 0.04, duration: 0.4 }}
                      whileHover={{ y: -2, scale: 1.05 }}
                      style={{ "--skill-color": color } as React.CSSProperties}
                      className="cursor-default rounded-full border border-[var(--skill-color)]/25 bg-[var(--skill-color)]/10 px-3 py-1.5 text-xs font-medium text-[var(--skill-color)] transition-all hover:animate-blink-glow hover:border-[var(--skill-color)]/60 hover:bg-[var(--skill-color)]/20 hover:shadow-[0_0_20px_-4px_var(--skill-color)]"
                    >
                      {name}
                    </motion.span>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

/* ---------- EXPERIENCE ---------- */
function Experience() {
  const items = [
    {
      role: "Academic Trainee", company: "HCLTech", time: "Dec 2025 — Present",
      bullets: [
        "Built 3+ Spring Boot microservices with REST APIs, collaborating cross-functionally to enable independent deployment.",
        "Containerized 3+ backend services with Docker and deployed to Kubernetes — pods, deployments, NodePort, zero-downtime rollouts.",
        "Applied cloud-native principles (stateless services, externalized config, env-agnostic deploys), cutting setup time by 30%.",
      ],
    },
  ];
  return (
    <Section id="experience">
      <SectionHeader kicker="Experience" title={<>Where I&apos;m <span className="text-gradient">shipping.</span></>} />
      <div className="relative">
        <div className="absolute left-4 top-2 h-full w-px bg-gradient-to-b from-brand-blue/60 via-brand-purple/40 to-transparent md:left-1/2" />
        {items.map((it, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="relative grid gap-6 pl-12 md:grid-cols-2 md:pl-0">
            <div className="absolute left-2.5 top-2 size-3 rounded-full bg-gradient-to-br from-brand-blue to-brand-purple shadow-[0_0_18px_rgba(139,92,246,0.8)] md:left-[calc(50%-6px)]" />
            <div className="md:pr-12 md:text-right">
              <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs"><Briefcase className="size-3" /> {it.time}</div>
              <h3 className="mt-3 font-display text-2xl">{it.role}</h3>
              <p className="text-muted-foreground">{it.company}</p>
            </div>
            <div className="md:pl-12">
              <div className="rounded-2xl glass p-6">
                <ul className="space-y-3">
                  {it.bullets.map((b, j) => (
                    <motion.li key={j} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: j * 0.12 }}
                      className="flex gap-3 text-sm text-muted-foreground">
                      <span className="mt-1.5 inline-block size-1.5 shrink-0 rounded-full bg-gradient-to-r from-brand-blue to-brand-purple" />
                      {b}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- PROJECTS ---------- */
function ProjectCard({ p, onOpen, index }: { p: typeof PROJECTS[number]; onOpen: () => void; index: number }) {
  const Icon = p.icon;
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0); const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 180, damping: 18 });
  const sy = useSpring(ry, { stiffness: 180, damping: 18 });

  function onMove(e: React.MouseEvent) {
    const r = ref.current!.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 10); rx.set(-py * 10);
  }
  function reset() { rx.set(0); ry.set(0); }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: index * 0.05 }}
      onMouseMove={onMove} onMouseLeave={reset}
      style={{ rotateX: sx, rotateY: sy, transformPerspective: 1000 }}
      className="group relative overflow-hidden rounded-3xl gradient-border p-px"
    >
      <div className="relative rounded-[calc(theme(borderRadius.3xl)-1px)] bg-card/80 p-7 md:p-10">
        <div className={`pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br ${p.accent} opacity-60`} />
        <div className="absolute inset-0 grid-bg opacity-30" />

        <div className="relative grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-center">
          <div>
            <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <span>{p.year}</span> · <span>{p.tag}</span>
            </div>
            <h3 className="text-3xl font-semibold md:text-5xl">{p.title}</h3>
            <p className="mt-4 max-w-md text-muted-foreground">{p.summary}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {p.stack.map(t => (
                <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs">{t}</span>
              ))}
            </div>

            <div className="mt-7 grid grid-cols-3 gap-3">
              {p.metrics.map(m => (
                <div key={m.v} className="rounded-xl bg-white/5 p-3">
                  <div className="text-xl font-semibold text-gradient md:text-2xl">{m.k}</div>
                  <div className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">{m.v}</div>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <button onClick={onOpen} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black hover:bg-white/90">
                Case study <ArrowUpRight className="size-4" />
              </button>
              <a href={p.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm hover:bg-white/10">
                <Github className="size-4" /> Code
              </a>
              <a
  href="https://coffeeshopapplication-frontend.onrender.com"
  target="_blank"
  rel="noreferrer"
  className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm hover:bg-white/10"
>
  <ExternalLink className="size-4" />
  Live
</a>
            </div>
          </div>

          {/* Mock visual */}
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]">
              <div className="absolute inset-0 grid-bg opacity-30" />
              <div className="absolute left-3 top-3 flex gap-1.5">
                <span className="size-2.5 rounded-full bg-red-400/80" />
                <span className="size-2.5 rounded-full bg-yellow-400/80" />
                <span className="size-2.5 rounded-full bg-green-400/80" />
              </div>
              <div className="absolute inset-0 grid place-items-center">
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="rounded-2xl bg-gradient-to-br from-brand-blue/30 via-brand-purple/30 to-brand-cyan/30 p-8 backdrop-blur-xl">
                  <Icon className="size-20 text-white/90" />
                </motion.div>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-950 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2">
                {p.metrics.map(m => (
                  <div key={m.v} className="rounded-lg border border-white/10 bg-white/5 p-2 backdrop-blur">
                    <div className="text-sm font-semibold text-white">{m.k}</div>
                    <div className="text-[9px] text-white/60">{m.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Projects({ onOpen }: { onOpen: (p: typeof PROJECTS[number]) => void }) {
  return (
    <Section id="projects">
      <SectionHeader kicker="Featured Work" title={<>Selected <span className="text-gradient">projects.</span></>}
        sub="Production-grade systems where backend rigor meets a polished frontend." />
      <div className="space-y-8">
        {PROJECTS.map((p, i) => <ProjectCard key={p.title} p={p} index={i} onOpen={() => onOpen(p)} />)}
      </div>
    </Section>
  );
}

function ProjectModal({ p, onClose }: { p: typeof PROJECTS[number] | null; onClose: () => void }) {
  useEffect(() => {
    if (!p) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [p]);
  return (
    <AnimatePresence>
      {p && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] grid place-items-center bg-black/70 p-4 backdrop-blur-lg" onClick={onClose}>
          <motion.div initial={{ y: 40, opacity: 0, scale: 0.96 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 20, opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.22,1,0.36,1] }}
            onClick={e => e.stopPropagation()}
            className="relative max-h-[88vh] w-full max-w-4xl overflow-y-auto rounded-3xl glass-strong p-8 md:p-10">
            <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-white/10 hover:bg-white/20"><X className="size-4" /></button>
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{p.year} · {p.tag}</div>
            <h3 className="mt-2 text-3xl font-semibold md:text-4xl">{p.title}</h3>
            <p className="mt-3 text-muted-foreground">{p.summary}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {p.stack.map(t => <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs">{t}</span>)}
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div><h4 className="mb-2 text-sm uppercase tracking-wider text-muted-foreground">Problem</h4><p>{p.problem}</p></div>
              <div><h4 className="mb-2 text-sm uppercase tracking-wider text-muted-foreground">Solution</h4><p>{p.solution}</p></div>
            </div>

            <div className="mt-8">
              <h4 className="mb-3 text-sm uppercase tracking-wider text-muted-foreground">Key features</h4>
              <ul className="grid gap-2 md:grid-cols-2">
                {p.features.map(f => (
                  <li key={f} className="flex gap-2 rounded-xl bg-white/5 p-3 text-sm">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gradient-to-r from-brand-blue to-brand-purple" /> {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <h4 className="mb-3 text-sm uppercase tracking-wider text-muted-foreground">Results</h4>
              <div className="grid grid-cols-3 gap-3">
                {p.metrics.map(m => (
                  <div key={m.v} className="rounded-xl bg-white/5 p-4">
                    <div className="text-2xl font-semibold text-gradient md:text-3xl">{m.k}</div>
                    <div className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">{m.v}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <a href={p.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black">
                <Github className="size-4" /> View code
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------- HIGHLIGHTS ---------- */
function Highlights() {
  return (
    <Section id="highlights">
      <SectionHeader kicker="Engineering Highlights" title={<>The stack I <span className="text-gradient">reach for.</span></>} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {HIGHLIGHTS.map((h, i) => {
          const Icon = h.icon;
          return (
            <motion.div key={h.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-2xl glass p-6">
              <div className="absolute -right-10 -top-10 size-32 rounded-full bg-gradient-to-br from-brand-blue/30 to-brand-purple/30 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
              <div className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-brand-blue/20 via-brand-purple/20 to-brand-cyan/20">
                <Icon className="size-5" />
              </div>
              <h3 className="mt-4 font-display text-lg">{h.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{h.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

/* ---------- ACHIEVEMENTS + CERTS ---------- */
function Achievements() {
  return (
    <Section id="achievements">
      <SectionHeader kicker="Achievements & Education" title={<>Milestones along the <span className="text-gradient">way.</span></>} />
      <div className="grid gap-6 md:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl gradient-border p-8">
          <div className="absolute -right-10 -top-10 size-48 rounded-full bg-gradient-to-br from-amber-400/30 to-rose-500/20 blur-3xl" />
          <motion.div animate={{ y: [0, -8, 0], rotate: [0, 3, 0] }} transition={{ duration: 5, repeat: Infinity }}
            className="grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-amber-400 to-rose-500 shadow-[0_0_40px_-5px_rgba(251,146,60,0.6)]">
            <Trophy className="size-8 text-white" />
          </motion.div>
          <h3 className="mt-5 font-display text-2xl">HCLTech Hiring Hackathon</h3>
          <p className="mt-1 text-sm uppercase tracking-wider text-muted-foreground">Top 17 of 50 · Mar 2026</p>
          <p className="mt-4 text-muted-foreground">
            Earned an internship offer by placing in the top 17 of 50 candidates in the final-round technical assessment —
            demonstrating problem-solving, leadership and engineering chops under pressure.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
          className="rounded-3xl glass p-8">
          <div className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-brand-blue/30 to-brand-purple/30"><GraduationCap className="size-6" /></div>
          <h3 className="mt-4 font-display text-2xl">Lovely Professional University</h3>
          <p className="text-muted-foreground">B.Tech, Computer Science & Engineering · 2022 – 2026</p>
          <div className="mt-4 space-y-2 text-sm text-muted-foreground">
            <p>Viswasai Junior College — MPC (86%)</p>
            <p>Prasanna Bharathi High School — Matriculation (87%)</p>
          </div>
        </motion.div>
      </div>

      <h3 className="mt-16 mb-6 font-display text-2xl">Certifications</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CERTS.map((c, i) => (
          <motion.div key={c.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden rounded-2xl glass p-5">
            <div className="absolute -inset-px -z-10 rounded-2xl bg-gradient-to-br from-brand-blue/0 via-brand-purple/0 to-brand-cyan/0 opacity-0 transition-opacity group-hover:opacity-100 group-hover:from-brand-blue/40 group-hover:via-brand-purple/40 group-hover:to-brand-cyan/40" />
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
              <GitBranch className="size-3" /> {c.date}
            </div>
            <h4 className="mt-2 font-medium">{c.title}</h4>
            <p className="text-sm text-muted-foreground">{c.issuer}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- CONTACT ---------- */
function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <Section id="contact">
      <SectionHeader kicker="Contact" title={<>Let&apos;s build something <span className="text-gradient">remarkable.</span></>}
        sub="Open to Software Engineer, Backend, and Full-Stack opportunities." />
      <div className="grid gap-10 md:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          <a href="mailto:pratapanivishnu@gmail.com" className="block rounded-2xl glass p-5 transition hover:bg-white/10">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Email</div>
            <div className="mt-1 font-medium">pratapanivishnu@gmail.com</div>
          </a>
          <a href="https://linkedin.com/in/pratapanivishnu" target="_blank" rel="noreferrer" className="block rounded-2xl glass p-5 transition hover:bg-white/10">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">LinkedIn</div>
            <div className="mt-1 font-medium">/in/pratapanivishnu</div>
          </a>
          <a href="https://github.com/Vishnu12222344" target="_blank" rel="noreferrer" className="block rounded-2xl glass p-5 transition hover:bg-white/10">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Github</div>
            <div className="mt-1 font-medium">@Vishnu12222344</div>
          </a>
          <div className="rounded-2xl glass p-5">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Phone</div>
            <div className="mt-1 font-medium">+91 6300515068</div>
          </div>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 3000); }}
          className="relative overflow-hidden rounded-3xl gradient-border p-px">
          <div className="rounded-[calc(theme(borderRadius.3xl)-1px)] bg-card/70 p-8">
            <div className="grid gap-5 md:grid-cols-2">
              <FloatingInput label="Name" id="name" />
              <FloatingInput label="Email" id="email" type="email" />
            </div>
            <div className="mt-5"><FloatingInput label="Subject" id="subject" /></div>
            <div className="mt-5"><FloatingInput label="Message" id="message" textarea /></div>
            <div className="mt-7 flex items-center justify-between">
              <p className="text-xs text-muted-foreground">I usually reply within 24h.</p>
              <button type="submit" className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-medium text-white">
                <span className="absolute inset-0 -z-10 animate-gradient-x" style={{ background: "linear-gradient(90deg,#3B82F6,#8B5CF6,#06B6D4,#8B5CF6)" }} />
                {sent ? "Sent!" : "Send message"}
                <Send className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </Section>
  );
}

function FloatingInput({ label, id, type = "text", textarea = false }: { label: string; id: string; type?: string; textarea?: boolean }) {
  const [v, setV] = useState("");
  const active = v.length > 0;
  const common = "peer w-full rounded-xl border border-white/10 bg-white/5 px-4 pb-2 pt-6 text-sm text-foreground outline-none transition focus:border-brand-purple/60 focus:bg-white/[0.07]";
  return (
    <div className="relative">
      {textarea ? (
        <textarea id={id} value={v} onChange={e => setV(e.target.value)} rows={5} className={common} />
      ) : (
        <input id={id} type={type} value={v} onChange={e => setV(e.target.value)} className={common} />
      )}
      <label htmlFor={id} className={`pointer-events-none absolute left-4 origin-left transition-all ${active ? "top-1.5 scale-75 text-muted-foreground" : "top-1/2 -translate-y-1/2 text-muted-foreground/70"} peer-focus:top-1.5 peer-focus:translate-y-0 peer-focus:scale-75`}>
        {label}
      </label>
    </div>
  );
}

/* ---------- FOOTER ---------- */
function Footer() {
  return (
    <footer className="relative mt-16 border-t border-white/5">
      <div className="absolute inset-x-0 -top-px h-px animate-gradient-x" style={{ background: "linear-gradient(90deg, transparent, #3B82F6, #8B5CF6, #06B6D4, transparent)" }} />
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row md:px-10">
        <div className="text-sm text-muted-foreground">© {new Date().getFullYear()} Vishnu Pratapani · Crafted with care.</div>
        <div className="flex items-center gap-2">
          <a aria-label="Github" href="https://github.com/Vishnu12222344" target="_blank" rel="noreferrer" className="grid size-9 place-items-center rounded-full glass hover:bg-white/10"><Github className="size-4" /></a>
          <a aria-label="LinkedIn" href="https://linkedin.com/in/pratapanivishnu" target="_blank" rel="noreferrer" className="grid size-9 place-items-center rounded-full glass hover:bg-white/10"><Linkedin className="size-4" /></a>
          <a aria-label="Email" href="mailto:pratapanivishnu@gmail.com" className="grid size-9 place-items-center rounded-full glass hover:bg-white/10"><Mail className="size-4" /></a>
        </div>
        <a href="#top" className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm hover:bg-white/10">
          Back to top <ArrowUp className="size-4" />
        </a>
      </div>
    </footer>
  );
}

/* ---------- PROGRESS BAR ---------- */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const w = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <motion.div style={{ width: w }} className="fixed left-0 top-0 z-[60] h-[2px] bg-gradient-to-r from-brand-blue via-brand-purple to-brand-cyan" />
  );
}

/* ---------- PAGE ---------- */
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vishnu Pratapani — Software Engineer" },
      { name: "description", content: "Full-Stack Java Developer building cloud-native systems with Spring Boot, React, Docker & Kubernetes." },
      { property: "og:title", content: "Vishnu Pratapani — Software Engineer" },
      { property: "og:description", content: "Selected work, engineering highlights, and contact for Vishnu Pratapani." },
    ],
  }),
  component: Index,
});

function Index() {
  const [modal, setModal] = useState<typeof PROJECTS[number] | null>(null);
  return (
    <div className="relative">
      <Background />
      <Cursor />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Marquee />
        <Experience />
        <Projects onOpen={setModal} />
        <Highlights />
        <Achievements />
        <Contact />
      </main>
      <Footer />
      <ProjectModal p={modal} onClose={() => setModal(null)} />
    </div>
  );
}
