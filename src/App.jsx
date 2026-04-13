import { useState, useEffect, useRef } from 'react';
import {
  Menu,
  X,
  Award,
  Users,
  ShieldCheck,
  Headphones,
  Monitor,
  UtensilsCrossed,
  Ship,
  CheckCircle,
  Truck,
  PackageCheck,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Scroll-reveal hook                                                 */
/* ------------------------------------------------------------------ */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

function Reveal({ children, className = '', delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Logo                                                               */
/* ------------------------------------------------------------------ */
function Logo({ light = false }) {
  return (
    <a href="#" className="flex items-center gap-3 group">
      <div
        className={`w-11 h-11 rounded-full flex items-center justify-center text-lg font-display font-bold tracking-tight border-2 transition-colors duration-300 ${
          light
            ? 'border-gold-premium/60 text-white group-hover:border-gold-premium'
            : 'border-navy-corp text-navy-corp group-hover:border-gold-premium'
        }`}
      >
        CP
      </div>
      <div className="leading-tight">
        <span
          className={`font-display text-lg font-bold tracking-wide ${
            light ? 'text-white' : 'text-navy-corp'
          }`}
        >
          Holding Group
        </span>
        <span
          className={`block text-[10px] tracking-[0.25em] uppercase ${
            light ? 'text-platinum-light/80' : 'text-gray-400'
          }`}
        >
          LLC
        </span>
      </div>
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  Section heading helper                                             */
/* ------------------------------------------------------------------ */
function SectionHeading({ children, sub }) {
  return (
    <div className="text-center mb-14">
      <h2 className="font-display text-3xl md:text-4xl text-navy-corp font-bold">
        {children}
      </h2>
      <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-gold-premium" />
      {sub && <p className="mt-4 text-gray-500 max-w-xl mx-auto">{sub}</p>}
    </div>
  );
}

/* ================================================================== */
/*  APP                                                                */
/* ================================================================== */
export default function App() {
  /* ---- state ---- */
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({
    empresa: '',
    contacto: '',
    email: '',
    telefono: '',
    division: '',
    mensaje: '',
  });

  /* ---- scroll shadow ---- */
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  /* ---- form handler ---- */
  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // UI-only
  };

  const navLinks = [
    { label: 'Divisiones', href: '#divisiones' },
    { label: 'Proceso', href: '#proceso' },
    { label: 'Clientes', href: '#clientes' },
    { label: 'Contacto', href: '#contacto' },
  ];

  /* ================================================================ */
  return (
    <div className="font-body text-gray-700 antialiased">
      {/* ============================================================ */}
      {/* NAVIGATION                                                    */}
      {/* ============================================================ */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 bg-white transition-shadow duration-300 ${
          scrolled ? 'shadow-md' : 'shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[72px]">
          <Logo />

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-gray-600 hover:text-navy-corp transition-colors duration-200 tracking-wide"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contacto"
              className="ml-2 px-5 py-2 text-sm font-semibold border-2 border-gold-premium text-navy-corp rounded hover:bg-gold-premium hover:text-white transition-all duration-300"
            >
              Contactar Ejecutivo
            </a>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden p-2 text-navy-corp"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 bg-white ${
            menuOpen ? 'max-h-80 border-t border-gray-100' : 'max-h-0'
          }`}
        >
          <div className="px-6 py-4 space-y-4">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="block text-gray-600 hover:text-navy-corp font-medium"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={() => setMenuOpen(false)}
              className="inline-block mt-2 px-5 py-2 text-sm font-semibold border-2 border-gold-premium text-navy-corp rounded hover:bg-gold-premium hover:text-white transition-all duration-300"
            >
              Contactar Ejecutivo
            </a>
          </div>
        </div>
      </nav>

      {/* ============================================================ */}
      {/* HERO SPLIT-SCREEN                                             */}
      {/* ============================================================ */}
      <header className="relative h-screen flex" id="inicio">
        {/* Left - Tech */}
        <div className="hidden md:block w-1/2 relative bg-navy-corp overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[8s] ease-out hover:scale-105"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&q=80')",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, rgba(0,59,92,0.88) 0%, rgba(0,59,92,0.7) 100%)',
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.05] bg-repeat"
            style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Crect width='60' height='60' fill='none' stroke='white' stroke-width='.5'/%3E%3C/svg%3E\")",
            }}
          />
        </div>

        {/* Right - Food */}
        <div className="hidden md:block w-1/2 relative bg-green-food overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[8s] ease-out hover:scale-105"
            style={{
              backgroundImage: "url('/img1.webp')",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, rgba(46,125,50,0.85) 0%, rgba(46,125,50,0.65) 100%)',
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.05] bg-repeat"
            style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='1' fill='white'/%3E%3C/svg%3E\")",
            }}
          />
        </div>

        {/* Mobile fallback bg */}
        <div
          className="md:hidden absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(0,59,92,0.9) 0%, rgba(46,125,50,0.85) 100%)',
          }}
        />

        {/* Center overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
          <p className="text-gold-premium font-display italic text-sm md:text-base tracking-widest mb-6">
            Dos mundos, una visión de excelencia
          </p>
          <h1 className="font-display text-4xl md:text-6xl text-white font-bold leading-tight max-w-4xl">
            Soluciones Integrales
            <br className="hidden sm:block" /> para su Negocio
          </h1>
          <p className="mt-6 text-white/80 text-base md:text-lg max-w-2xl leading-relaxed">
            Tecnología de punta y excelencia gastronómica, importadas para su empresa.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a
              href="#divisiones"
              className="px-8 py-3.5 bg-navy-corp text-white text-sm font-semibold rounded hover:bg-navy-corp/90 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <Monitor size={18} />
              División Tech
            </a>
            <a
              href="#divisiones"
              className="px-8 py-3.5 bg-green-food text-white text-sm font-semibold rounded hover:bg-green-food/90 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <UtensilsCrossed size={18} />
              División Food
            </a>
          </div>
        </div>

        {/* Divider line center (desktop) */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10 z-0" />
      </header>

      {/* ============================================================ */}
      {/* TRUST BAR                                                     */}
      {/* ============================================================ */}
      <section id="clientes" className="bg-white border-y border-gray-100 py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
              {[
                { icon: Award, number: '15+', label: 'Años de Experiencia' },
                { icon: Users, number: '500+', label: 'Clientes Satisfechos' },
                { icon: ShieldCheck, number: 'FDA/USDA', label: 'Certificaciones' },
                { icon: Headphones, number: '24/7', label: 'Soporte Técnico' },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-3">
                  <item.icon
                    size={28}
                    className="text-gold-premium"
                    strokeWidth={1.5}
                  />
                  <span className="font-display text-4xl font-bold text-gold-premium">
                    {item.number}
                  </span>
                  <span className="text-sm text-gray-600">{item.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* DIVISIONS                                                     */}
      {/* ============================================================ */}
      <section id="divisiones" className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading sub="Dos verticales de negocio diseñadas para impulsar su empresa.">
              Nuestras Divisiones
            </SectionHeading>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Tech Card */}
            <Reveal delay={0.1}>
              <div className="group rounded-lg border border-gray-100 border-l-4 border-l-navy-corp bg-gradient-to-br from-navy-corp/5 to-white p-8 lg:p-10 transition-all duration-500 hover:shadow-lg hover:shadow-gold-premium/10 hover:-translate-y-1">
                <div className="w-14 h-14 rounded-lg bg-navy-corp/10 flex items-center justify-center mb-6">
                  <Monitor size={28} className="text-navy-corp" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-2xl font-bold text-navy-corp mb-3">
                  CP Tech Solutions
                </h3>
                <p className="text-gray-500 mb-6 leading-relaxed">
                  Equipamiento informático empresarial de clase mundial.
                </p>
                <ul className="space-y-3">
                  {[
                    'Hardware Empresarial',
                    'Networking & Infraestructura',
                    'Soporte Técnico Integral',
                    'Soluciones Cloud',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-gray-600">
                      <ChevronRight
                        size={16}
                        className="text-navy-corp flex-shrink-0"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Food Card */}
            <Reveal delay={0.2}>
              <div className="group rounded-lg border border-gray-100 border-l-4 border-l-green-food bg-gradient-to-br from-green-food/5 to-white p-8 lg:p-10 transition-all duration-500 hover:shadow-lg hover:shadow-gold-premium/10 hover:-translate-y-1">
                <div className="w-14 h-14 rounded-lg bg-green-food/10 flex items-center justify-center mb-6">
                  <UtensilsCrossed
                    size={28}
                    className="text-green-food"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="font-display text-2xl font-bold text-green-food mb-3">
                  CP Gourmet Imports
                </h3>
                <p className="text-gray-500 mb-6 leading-relaxed">
                  Traemos los sabores del mundo a su mesa.
                </p>
                <ul className="space-y-3">
                  {[
                    'Importación Directa Europa',
                    'Distribución Nacional',
                    'Cadena de Frío Garantizada',
                    'Certificación FDA/USDA',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-gray-600">
                      <ChevronRight
                        size={16}
                        className="text-green-food flex-shrink-0"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FACILITIES GALLERY                                            */}
      {/* ============================================================ */}
      <section id="instalaciones" className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading sub="Centros logísticos propios en Miami y operaciones internacionales con controles FDA certificados.">
              Nuestras Instalaciones
            </SectionHeading>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Featured large card */}
            <Reveal delay={0.1}>
              <div className="group relative rounded-lg overflow-hidden shadow-sm h-full min-h-[440px]">
                <img
                  src="/img1.webp"
                  alt="Centro de distribución CP Holding"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(0,59,92,0.1) 40%, rgba(0,59,92,0.92) 100%)',
                  }}
                />
                <div className="relative z-10 flex flex-col justify-end h-full p-8">
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold-premium mb-3">
                    División Food
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-white leading-tight mb-2">
                    Bodega Refrigerada Miami
                  </h3>
                  <p className="text-sm text-white/80 max-w-md">
                    5,000 m² de almacenamiento con cadena de frío continua y
                    trazabilidad FDA completa.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Right column */}
            <div className="grid grid-cols-1 gap-6">
              <Reveal delay={0.2}>
                <div className="group relative rounded-lg overflow-hidden shadow-sm h-[210px]">
                  <img
                    src="/img2.jpg"
                    alt="Consolidación de carga"
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(46,125,50,0.1) 40%, rgba(46,125,50,0.9) 100%)',
                    }}
                  />
                  <div className="relative z-10 flex flex-col justify-end h-full p-6">
                    <h3 className="font-display text-xl font-bold text-white mb-1">
                      Consolidación de Carga
                    </h3>
                    <p className="text-sm text-white/80">
                      Importación directa, sin intermediarios.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="group relative rounded-lg overflow-hidden shadow-sm h-[210px]">
                  <img
                    src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80"
                    alt="Data center tech"
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(0,59,92,0.15) 30%, rgba(0,59,92,0.92) 100%)',
                    }}
                  />
                  <div className="relative z-10 flex flex-col justify-end h-full p-6">
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold-premium mb-1">
                      División Tech
                    </span>
                    <h3 className="font-display text-xl font-bold text-white">
                      Infraestructura Empresarial
                    </h3>
                    <p className="text-sm text-white/80">
                      Hardware Tier 1 certificado para misión crítica.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Bottom thin strip with img3 */}
          <Reveal delay={0.2}>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  src: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=900&q=80',
                  title: 'Cadena de Frío',
                  desc: 'Trazabilidad end-to-end.',
                },
                {
                  src: '/img3.png',
                  title: 'Distribución Mayorista',
                  desc: 'Hardware y accesorios corporativos.',
                },
                {
                  src: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=900&q=80',
                  title: 'Importación Premium',
                  desc: 'Gastronomía y tecnología mundial.',
                },
              ].map((card, i) => (
                <Reveal key={card.title} delay={0.1 + i * 0.1}>
                  <div className="group relative rounded-lg overflow-hidden shadow-sm h-[180px]">
                    <img
                      src={card.src}
                      alt={card.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.85) 100%)',
                      }}
                    />
                    <div className="relative z-10 flex flex-col justify-end h-full p-5">
                      <h4 className="font-display text-lg font-bold text-white">
                        {card.title}
                      </h4>
                      <p className="text-xs text-white/80">{card.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* PROCESS TIMELINE                                              */}
      {/* ============================================================ */}
      <section id="proceso" className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading sub="Desde la selección de proveedores hasta la entrega final.">
              Nuestro Proceso
            </SectionHeading>
          </Reveal>

          <div className="relative">
            {/* Connecting line (desktop) */}
            <div className="hidden md:block absolute top-[52px] left-[10%] right-[10%] h-0.5 bg-gold-premium/30" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 relative">
              {[
                {
                  icon: Ship,
                  step: 1,
                  title: 'Importación',
                  desc: 'Selección directa de proveedores internacionales',
                },
                {
                  icon: CheckCircle,
                  step: 2,
                  title: 'Control de Calidad',
                  desc: 'Inspección rigurosa bajo estándares FDA',
                },
                {
                  icon: Truck,
                  step: 3,
                  title: 'Logística',
                  desc: 'Red de distribución propia nacional',
                },
                {
                  icon: PackageCheck,
                  step: 4,
                  title: 'Entrega',
                  desc: 'Hasta la puerta de su empresa',
                },
              ].map((item, i) => (
                <Reveal key={item.step} delay={i * 0.12}>
                  <div className="flex flex-col items-center text-center relative">
                    {/* Step number circle */}
                    <div className="w-[104px] h-[104px] rounded-full bg-white border-2 border-gold-premium/40 flex flex-col items-center justify-center mb-5 shadow-sm relative z-10">
                      <item.icon
                        size={28}
                        className="text-navy-corp mb-1"
                        strokeWidth={1.5}
                      />
                      <span className="text-[11px] font-bold text-gold-premium tracking-wider uppercase">
                        Paso {item.step}
                      </span>
                    </div>
                    <h4 className="font-display text-lg font-bold text-navy-corp mb-2">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-500 leading-relaxed max-w-[220px]">
                      {item.desc}
                    </p>

                    {/* Vertical connector (mobile) */}
                    {i < 3 && (
                      <div className="md:hidden w-0.5 h-8 bg-gold-premium/30 mt-6" />
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* CONTACT FORM                                                  */}
      {/* ============================================================ */}
      <section id="contacto" className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading sub="Cuéntenos sobre su proyecto. Un ejecutivo se comunicará con usted en menos de 24 horas.">
              Contacte a Nuestro Equipo Ejecutivo
            </SectionHeading>
          </Reveal>

          <Reveal delay={0.15}>
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 md:p-12 space-y-8"
            >
              <div className="grid md:grid-cols-2 gap-8">
                {/* Nombre de Empresa */}
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Nombre de Empresa
                  </label>
                  <input
                    type="text"
                    name="empresa"
                    value={form.empresa}
                    onChange={handleChange}
                    className="w-full border-0 border-b-2 border-gray-200 px-0 py-2 text-gray-800 placeholder-gray-300 focus:border-navy-corp focus:ring-0 outline-none transition-colors duration-300 bg-transparent"
                    placeholder="Su empresa"
                  />
                </div>

                {/* Persona de Contacto */}
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Persona de Contacto
                  </label>
                  <input
                    type="text"
                    name="contacto"
                    value={form.contacto}
                    onChange={handleChange}
                    className="w-full border-0 border-b-2 border-gray-200 px-0 py-2 text-gray-800 placeholder-gray-300 focus:border-navy-corp focus:ring-0 outline-none transition-colors duration-300 bg-transparent"
                    placeholder="Nombre completo"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Email Corporativo
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border-0 border-b-2 border-gray-200 px-0 py-2 text-gray-800 placeholder-gray-300 focus:border-navy-corp focus:ring-0 outline-none transition-colors duration-300 bg-transparent"
                    placeholder="correo@empresa.com"
                  />
                </div>

                {/* Teléfono */}
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={form.telefono}
                    onChange={handleChange}
                    className="w-full border-0 border-b-2 border-gray-200 px-0 py-2 text-gray-800 placeholder-gray-300 focus:border-navy-corp focus:ring-0 outline-none transition-colors duration-300 bg-transparent"
                    placeholder="+1 (000) 000-0000"
                  />
                </div>
              </div>

              {/* División */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  División de Interés
                </label>
                <select
                  name="division"
                  value={form.division}
                  onChange={handleChange}
                  className="w-full border-0 border-b-2 border-gray-200 px-0 py-2 text-gray-800 focus:border-navy-corp focus:ring-0 outline-none transition-colors duration-300 bg-transparent appearance-none cursor-pointer"
                >
                  <option value="">Seleccione una opción</option>
                  <option value="tech">Tecnología</option>
                  <option value="food">Alimentos</option>
                  <option value="both">Ambas Divisiones</option>
                </select>
              </div>

              {/* Mensaje */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Mensaje
                </label>
                <textarea
                  name="mensaje"
                  value={form.mensaje}
                  onChange={handleChange}
                  rows={4}
                  className="w-full border-0 border-b-2 border-gray-200 px-0 py-2 text-gray-800 placeholder-gray-300 focus:border-navy-corp focus:ring-0 outline-none transition-colors duration-300 bg-transparent resize-none"
                  placeholder="Describa brevemente sus necesidades..."
                />
              </div>

              <button
                type="submit"
                className="w-full md:w-auto px-10 py-3.5 bg-navy-corp text-white font-semibold text-sm rounded hover:bg-gold-premium transition-colors duration-300 flex items-center justify-center gap-2 group"
              >
                Enviar Solicitud
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FOOTER                                                        */}
      {/* ============================================================ */}
      <footer className="bg-navy-corp text-white">
        {/* Gold accent line */}
        <div className="h-1 bg-gold-premium" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Column 1 - Company */}
            <div>
              <Logo light />
              <p className="mt-5 text-sm text-white/60 leading-relaxed">
                Desde 2009, construyendo puentes comerciales entre proveedores
                internacionales y empresas latinoamericanas. Tecnología y
                gastronomía de clase mundial.
              </p>
            </div>

            {/* Column 2 - Links */}
            <div>
              <h4 className="font-display text-sm font-bold uppercase tracking-widest text-gold-premium mb-6">
                Enlaces
              </h4>
              <ul className="space-y-3">
                {[
                  { label: 'Divisiones', href: '#divisiones' },
                  { label: 'Certificaciones', href: '#clientes' },
                  { label: 'Proceso', href: '#proceso' },
                  { label: 'Contacto', href: '#contacto' },
                ].map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-sm text-white/60 hover:text-gold-premium transition-colors duration-200"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 - Contact */}
            <div>
              <h4 className="font-display text-sm font-bold uppercase tracking-widest text-gold-premium mb-6">
                Contacto
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-sm text-white/60">
                  <MapPin size={16} className="flex-shrink-0 mt-0.5 text-gold-premium/70" />
                  1234 Corporate Blvd, Suite 500
                  <br />
                  Miami, FL 33131
                </li>
                <li className="flex items-center gap-3 text-sm text-white/60">
                  <Phone size={16} className="flex-shrink-0 text-gold-premium/70" />
                  +1 (305) 000-0000
                </li>
                <li className="flex items-center gap-3 text-sm text-white/60">
                  <Mail size={16} className="flex-shrink-0 text-gold-premium/70" />
                  info@cpholdinggroupllc.com
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/40">
              &copy; 2024 CP Holding Group LLC. All rights reserved.
            </p>
            <p className="text-xs text-white/30 italic font-display">
              Dos mundos, una visión de excelencia
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
