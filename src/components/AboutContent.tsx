'use client';

import { useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { PageBanner } from '@/components/PageBanner';
import { SectionLabel } from '@/components/SectionLabel';
import { useQuote } from '@/components/QuoteContext';
import { IMGS, MANPOWER, WHY_CHOOSE_US } from '@/lib/data';

// ─── Motion helpers ────────────────────────────────────────────────────────────
function useStaggerGrid(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const grid = ref.current;
    if (!grid) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const children = Array.from(grid.children) as HTMLElement[];
    children.forEach(c => { c.style.opacity = '0'; c.style.transform = 'translateY(24px)'; c.style.filter = 'blur(3px)'; c.style.transition = 'none'; });
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      children.forEach((c, i) => {
        setTimeout(() => {
          c.style.transition = 'opacity 0.72s cubic-bezier(0.16,1,0.3,1), transform 0.72s cubic-bezier(0.16,1,0.3,1), filter 0.72s cubic-bezier(0.16,1,0.3,1)';
          c.style.opacity = '1'; c.style.transform = 'translateY(0)'; c.style.filter = 'blur(0px)';
        }, i * 85);
      });
      obs.disconnect();
    }, { threshold });
    obs.observe(grid);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

function useReveal(delay = 0, threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    el.style.opacity = '0'; el.style.transform = 'translateY(26px)'; el.style.filter = 'blur(4px)'; el.style.transition = 'none';
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setTimeout(() => {
        el.style.transition = 'opacity 0.78s cubic-bezier(0.16,1,0.3,1), transform 0.78s cubic-bezier(0.16,1,0.3,1), filter 0.78s cubic-bezier(0.16,1,0.3,1)';
        el.style.opacity = '1'; el.style.transform = 'translateY(0)'; el.style.filter = 'blur(0px)';
      }, delay);
      obs.disconnect();
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay, threshold]);
  return ref;
}

// ─── Static data ───────────────────────────────────────────────────────────────
// Four defining chapters — editorial, not a year-by-year chronicle
const HERITAGE_EN = [
  {
    era: '1997',
    chapter: 'Founded',
    body: 'Al Binaa Construction & Industry was established in Muscat in 1997 as a specialist contracting arm of the Al Khonji Group — one of Oman\'s most respected diversified business families. From the outset, the company was structured around a single principle: every phase of a project — structural, mechanical, electrical, and finishing — would be delivered by one team under one management, with no subcontracting of accountability. That decision, unusual for Oman\'s market at the time, meant clients received a single point of contact and a single standard of quality across the entire build. The first residential and civil contracts were delivered in Muscat, establishing the relationships with Oman\'s serious developers that would define the company\'s growth over the next decade.',
  },
  {
    era: '2003–12',
    chapter: 'Residential Authority',
    body: 'Through the 2000s, Al Binaa built its reputation on Oman\'s premium residential market — delivering over 300 villas and becoming the contractor that Muscat\'s serious developers called first. Major projects in this era included Al Qurm Terrace, Al Qurm Hills, and the Al Wadi Complex: 21 luxury townhouses in Al Khuwair, completed for a contract value of OMR 9.45M. Each project reinforced the company\'s core method — direct employment of all engineers and tradespeople, no agency labour, no accountability gaps. By the end of this decade, Al Binaa had developed a depth of in-house structural, MEP, and finishing expertise that positioned it for a step change in project scale. The pipeline that followed would demand it.',
  },
  {
    era: '2015–21',
    chapter: 'Landmark Scale',
    body: 'This era established Al Binaa as a contractor capable of delivering landmark-scale commercial and residential projects on schedule and on budget. Rimal I — 242 residential units in Bausher, Muscat — was completed on schedule at OMR 13.6M, with structural, MEP, and finishing all delivered by the same in-house team. OFFICE 1991, a 9-storey commercial tower in Al Khuwair, was handed over ahead of schedule at OMR 12.1M. In the hospitality sector, Al Binaa completed two full-scope hotel renovations for Oman Hotels: Best Western Sur Plaza Hotel in Sur and Al Wadi Hotel Sohar — a 110-room renovation delivered to international brand standards. By 2021, the company had demonstrated consistent delivery across every major construction category in Oman.',
  },
  {
    era: '2024–25',
    chapter: 'Active Pipeline',
    body: 'Al Binaa is currently executing six concurrent projects with a combined contract value exceeding OMR 22M — the largest active pipeline in the company\'s history. Rimal II, the follow-on to the completed Rimal I, delivers 148 residential units in Bausher at OMR 13M. Ibis Style Hotel Ruwi adds a 183-room new-build hotel in central Muscat at OMR 5.2M — the company\'s first ground-up hospitality project at international brand standard. Souq Al Hamidiyya brings 190 commercial units to Ruwi. The Edge, Al Khuwair Building, and Al Hail Building add further commercial capacity across Muscat\'s growth corridors. All six projects run under the same single-contract model that has defined Al Binaa since 1997.',
  },
];
const HERITAGE_AR = [
  {
    era: '1997',
    chapter: 'التأسيس',
    body: 'تأسست شركة البناء للمقاولات والصناعة في مسقط عام 1997 بوصفها ذراعاً متخصصة في المقاولات ضمن مجموعة الخنجي — إحدى العائلات التجارية العُمانية الأكثر مكانةً وتنوعاً. منذ البداية، قامت الشركة على مبدأ واحد: تسليم كل مرحلة من مراحل المشروع — الهيكل الإنشائي والميكانيكا والكهرباء والتشطيبات — بواسطة فريق واحد وإدارة واحدة، دون إسناد المسؤولية إلى مقاولين من الباطن. هذا القرار، الاستثنائي في سوق عُمان آنذاك، أعطى العملاء جهة اتصال واحدة ومعياراً موحداً للجودة عبر المشروع بأكمله. وقد سُلِّمت أولى العقود السكنية والمدنية في مسقط، مرسيةً علاقات مع كبار المطورين العُمانيين ستُحدد مسار نمو الشركة على مدى العقد التالي.',
  },
  {
    era: '2003–12',
    chapter: 'الهيمنة السكنية',
    body: 'على امتداد سنوات العقد الأول من الألفية الثالثة، رسّخت شركة البناء سمعتها في السوق السكني الراقي بعُمان، إذ أنجزت أكثر من 300 فيلا وأصبحت الاسم الذي يتصل به كبار مطوري مسقط أولاً. من أبرز مشاريع هذه الحقبة: القرم تيراس، وقرم هيلز، ومجمع الوادي الذي ضم 21 تاون هاوس فاخراً في الخوير بقيمة عقدية بلغت 9.45 مليون ريال عُماني. عزّز كل مشروع منهجية الشركة الثابتة: توظيف مباشر لجميع المهندسين والحرفيين، لا عمالة وكالات، لا ثغرات في المسؤولية. وبحلول نهاية هذا العقد، كانت الشركة قد طورت خبرة داخلية متعمقة في الأعمال الإنشائية والميكانيكية والكهربائية والتشطيبات، تهيأت بها لقفزة نوعية في حجم المشاريع.',
  },
  {
    era: '2015–21',
    chapter: 'مشاريع مميزة',
    body: 'رسّخت هذه الحقبة مكانة شركة البناء بوصفها مقاولاً قادراً على تسليم مشاريع بارزة الحجم في المواعيد المحددة وضمن الميزانيات المرصودة. ريمال 1 — 242 وحدة سكنية في بوشر، مسقط — سُلِّم في الموعد المحدد بقيمة 13.6 مليون ريال، مع تنفيذ الأعمال الإنشائية والميكانيكية والتشطيبات بالفريق الداخلي ذاته. OFFICE 1991، برج تجاري من 9 طوابق في الخوير، سُلِّم قبل الموعد المحدد بقيمة 12.1 مليون ريال. وفي قطاع الضيافة، أنجزت الشركة تجديدَين شاملَين لفنادق عُمان: فندق بيست ويسترن سور بلازا في سور، وفندق الوادي صحار — تجديد 110 غرفة وفق المعايير الدولية للعلامات التجارية الفندقية. بحلول عام 2021، أثبتت الشركة ثباتها التسليمي في جميع قطاعات البناء الرئيسية في عُمان.',
  },
  {
    era: '2024–25',
    chapter: 'المشاريع الجارية',
    body: 'تنفّذ شركة البناء حالياً ستة مشاريع متزامنة بقيمة عقدية إجمالية تتجاوز 22 مليون ريال عُماني — وهو أكبر مخزون مشاريع نشطة في تاريخ الشركة. ريمال 2، المشروع المتابع لريمال 1 المُنجَز، يضم 148 وحدة سكنية في بوشر بقيمة 13 مليون ريال. فندق إيبيس ستايل الرووي يضيف 183 غرفة فندقية جديدة في قلب مسقط بقيمة 5.2 مليون ريال — أول مشروع فندقي من الصفر بمعايير علامة تجارية دولية. سوق الحميدية يوفر 190 وحدة تجارية في الرووي. أما مشروعا ذا إيدج ومبنى الخوير ومبنى الحيل فيضيفان طاقة تجارية إضافية في ممرات النمو الرئيسية بمسقط. جميع المشاريع الستة تسير وفق نموذج العقد الواحد الذي ميّز شركة البناء منذ تأسيسها عام 1997.',
  },
];

const KEY_NUMBERS_EN = [
  { value: 'OMR 52M+', label: 'Total contract value delivered'   },
  { value: '28',       label: 'Years of uninterrupted delivery'  },
  { value: '20+',      label: 'Major projects completed'         },
  { value: '600+',     label: 'Field & professional team'        },
];
const KEY_NUMBERS_AR = [
  { value: 'OMR 52M+', label: 'إجمالي قيمة العقود المُنجزة'  },
  { value: '28',       label: 'عاماً من التسليم المتواصل'      },
  { value: '20+',      label: 'مشروعاً رئيسياً مكتملاً'        },
  { value: '600+',     label: 'فريق ميداني ومهني متكامل'       },
];

const CSR_PILLARS_EN = [
  { title: 'Zero Harm',       desc: 'Every site. Every day. Daily toolbox talks, mandatory PPE — no exceptions.'   },
  { title: 'Ethical Conduct', desc: 'Transparent contracts, prompt payment, honest reporting to all stakeholders.' },
  { title: 'Omanisation',     desc: 'Omani engineers and managers. Continuous investment in local talent.'         },
  { title: 'Worker Welfare',  desc: 'Compliant accommodation, fair wages — exceeding Omani Labour Law.'           },
  { title: 'Environment',     desc: 'Waste segregation, dust control, reduced carbon footprint on every site.'    },
  { title: 'Vision 2040',     desc: "Local procurement and employment — contributing to Oman's future."           },
];
const CSR_PILLARS_AR = [
  { title: 'صفر إصابات',       desc: 'كل موقع. كل يوم. اجتماعات أدوات يومية، معدات حماية شخصية إلزامية — لا استثناءات.' },
  { title: 'السلوك الأخلاقي',  desc: 'عقود شفافة ودفع سريع وتقارير صادقة لجميع أصحاب المصلحة.'                          },
  { title: 'التُعمنة',          desc: 'مهندسون ومديرون عُمانيون. استثمار مستمر في المواهب المحلية.'                        },
  { title: 'رفاهية العمال',     desc: 'سكن ملائم وأجور عادلة — تتجاوز متطلبات قانون العمل العُماني.'                      },
  { title: 'البيئة',            desc: 'فرز النفايات والسيطرة على الغبار وتقليل البصمة الكربونية في كل موقع.'              },
  { title: 'رؤية 2040',         desc: 'المشتريات والتوظيف المحلي — المساهمة في مستقبل عُمان.'                              },
];

export function AboutContent() {
  const { openQuote } = useQuote();
  const t             = useTranslations('about');
  const locale        = useLocale();
  const isRTL         = locale === 'ar';
  const totalManpower = MANPOWER.reduce((a, m) => a + m.qty, 0);

  const HERITAGE     = isRTL ? HERITAGE_AR     : HERITAGE_EN;
  const KEY_NUMBERS  = isRTL ? KEY_NUMBERS_AR  : KEY_NUMBERS_EN;
  const CSR_PILLARS  = isRTL ? CSR_PILLARS_AR  : CSR_PILLARS_EN;

  // Scroll-reveal refs
  const storyLeftRef    = useReveal(0,   0.1);
  const storyRightRef   = useReveal(120, 0.1);
  const manifestoRef    = useReveal(0,   0.08);
  const numbersRef      = useStaggerGrid(0.1);
  const whyHeadRef      = useReveal(0,   0.08);
  const whyListRef      = useStaggerGrid(0.04);
  const founderPhotoRef = useReveal(0,   0.08);
  const chairmanTextRef = useReveal(150, 0.08);
  const heritageRef     = useStaggerGrid(0.06);
  const csrGridRef      = useStaggerGrid(0.05);
  const teamRef         = useReveal(0,   0.1);
  const statsRef        = useStaggerGrid(0.1);

  return (
    <main>
      <PageBanner title={t('banner_title')} subtitle={t('banner_sub')} img={IMGS.commercial1} />

      {/* ── 1. STORY + MANIFESTO ─────────────────────────────────────────────── */}
      {/* Story narrative + mission pull-quote — replaces Story + Mission/Vision */}
      <section style={{ background: 'var(--section-bg)', padding: 'clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,4rem)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>

          {/* Two-column story grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start', marginBottom: 'clamp(3rem,5vw,6rem)' }} className="about-grid">
            <div ref={storyLeftRef}>
              <SectionLabel>{t('story_label')}</SectionLabel>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, color: 'var(--fg)', margin: '0 0 1.75rem', lineHeight: 1.1 }}>
                {t('story_heading').split('\n').map((line, i) => <span key={i}>{line}{i === 0 && <br />}</span>)}
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 15.5, color: 'var(--fg-muted)', lineHeight: 1.85, marginBottom: '1.5rem' }}>{t('story_p1')}</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 15.5, color: 'var(--fg-muted)', lineHeight: 1.85, marginBottom: '2.5rem' }}>{t('story_p2')}</p>
              <button onClick={openQuote}
                style={{ background: 'var(--red)', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: isRTL ? '0' : '0.14em', textTransform: isRTL ? 'none' : 'uppercase', fontWeight: 600, padding: '14px 32px', transition: 'opacity 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')} onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                {isRTL ? '← ابدأ مشروعك' : 'Start Your Project →'}
              </button>
            </div>
            <div ref={storyRightRef} style={{ display: 'grid', gridTemplateRows: '1fr auto', gap: '1rem' }}>
              <div style={{ position: 'relative' }}>
                <img src="/images/about-workers.jpg" alt="Al Binaa workers on reinforced concrete slab" loading="lazy" style={{ width: '100%', height: 420, objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', bottom: 0, insetInlineStart: 0, background: 'var(--red)', padding: '1.5rem 2rem' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.8rem', fontWeight: 700, color: '#fff', lineHeight: 1 }}>20+</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 10.5, letterSpacing: isRTL ? '0' : '0.12em', textTransform: isRTL ? 'none' : 'uppercase', color: 'rgba(255,255,255,0.8)', marginTop: 4 }}>
                    {isRTL ? 'مشروع مُسلَّم' : 'Projects Delivered'}
                  </div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <img src="/images/about-excavator.jpg" alt="Al Binaa earthworks" loading="lazy" style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }} />
                <img src="/images/about-scaffolding.jpg" alt="Al Binaa structure under construction" loading="lazy" style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block', objectPosition: 'top' }} />
              </div>
            </div>
          </div>

          {/* Manifesto pull-quote — mission statement as editorial full-width moment */}
          <div ref={manifestoRef} style={{ borderTop: '1px solid var(--border-color)', paddingTop: 'clamp(2.5rem,4vw,4rem)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem', alignItems: 'start' }} className="about-grid">
              <div style={{ paddingTop: '0.25rem' }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: isRTL ? '0' : '0.14em', textTransform: isRTL ? 'none' : 'uppercase', fontWeight: 600, color: 'var(--fg-muted)' }}>
                  {isRTL ? 'مهمتنا' : 'Our Mission'}
                </div>
              </div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.3rem,2.2vw,1.75rem)', fontWeight: 600, color: 'var(--fg)', lineHeight: 1.5, margin: 0, letterSpacing: '-0.01em' }}>
                {isRTL
                  ? 'إنجاز كل مرحلة في المشروع الإنشائي — هيكلاً وأنظمةً وتشطيباً — تحت إدارة واحدة متكاملة، دون إسناد أي تخصص إلى خارج الشركة، ودون تشتيت المسؤولية.'
                  : 'To deliver every phase of a construction project — structure, systems, and finishing — under a single management structure, so no discipline is outsourced and no accountability is shared.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. KEY NUMBERS STRIP ─────────────────────────────────────────────── */}
      <section style={{ background: 'var(--red)', padding: 'clamp(2.5rem,4vw,4rem) clamp(1.5rem,5vw,4rem)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div ref={numbersRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }} className="stats-grid">
            {KEY_NUMBERS.map((stat, i) => (
              <div key={i}
                style={{ padding: 'clamp(1.5rem,3vw,2.5rem) clamp(1.25rem,2.5vw,2rem)', borderInlineStart: i > 0 ? '1px solid rgba(255,255,255,0.2)' : 'none', transition: 'background 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.12)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,3.5vw,3rem)', fontWeight: 700, color: '#fff', lineHeight: 1, marginBottom: '0.6rem' }}>{stat.value}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: isRTL ? '0' : '0.1em', textTransform: isRTL ? 'none' : 'uppercase', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. WHY AL BINAA ──────────────────────────────────────────────────── */}
      {/* Moved before heritage — clients need the differentiators before the history */}
      <section style={{ background: 'var(--alt-bg)', padding: 'clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,4rem)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '5rem', alignItems: 'start' }} className="about-grid">
            <div ref={whyHeadRef} style={{ position: 'sticky', top: '6rem' }}>
              <SectionLabel>{isRTL ? 'لماذا البناء' : 'Why Al Binaa'}</SectionLabel>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,3.5vw,2.8rem)', fontWeight: 700, color: 'var(--fg)', margin: '0 0 1.5rem', lineHeight: 1.05 }}>
                {isRTL ? 'سبعة أسباب تجعل كبار المطورين يعودون إلينا' : 'Seven Reasons Serious Developers Come Back'}
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 14.5, color: 'var(--fg-muted)', lineHeight: 1.8 }}>
                {isRTL ? 'ثمانية وعشرون عاماً من الأدلة — لا وعوداً تسويقية.' : 'Twenty-eight years of evidence — not marketing promises.'}
              </p>
            </div>
            <div ref={whyListRef} style={{ display: 'flex', flexDirection: 'column', gap: '1.5px', background: 'var(--border-color)' }}>
              {WHY_CHOOSE_US.map((item, i) => (
                <div key={i}
                  style={{ background: 'var(--alt-bg)', padding: '1.75rem 2rem', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '1.5rem', alignItems: 'start', transition: 'background 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--section-bg)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--alt-bg)'; }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--red)', minWidth: 32, paddingTop: 2 }}>{item.num}</div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 700, letterSpacing: isRTL ? '0' : '0.08em', textTransform: isRTL ? 'none' : 'uppercase', color: 'var(--fg)', marginBottom: '0.4rem' }}>
                      {isRTL ? item.titleAr : item.title}
                    </div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--fg-muted)', lineHeight: 1.7, margin: 0 }}>
                      {isRTL ? item.descAr : item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. FOUNDER + CHAIRMAN'S STATEMENT ────────────────────────────────── */}
      <section style={{ background: '#6e0c10', padding: 'clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,4rem)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 'clamp(3rem,5vw,7rem)', alignItems: 'start' }} className="about-grid">

            {/* Portrait — sticky as you read the statement */}
            <div ref={founderPhotoRef} style={{ position: 'sticky', top: '5.5rem' }}>
              <div style={{ position: 'relative' }}>
                <img src="/images/qaboos-al-khonji.jpg" alt="Qaboos Al Khonji — Founder & Chairman" loading="lazy"
                  style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', objectPosition: 'center top', display: 'block', filter: 'grayscale(10%)' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2rem 1.5rem', background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, transparent 100%)' }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: isRTL ? '0' : '0.14em', textTransform: isRTL ? 'none' : 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: '0.4rem' }}>
                    {isRTL ? 'المؤسس والرئيس' : 'Founder & Chairman'}
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.1rem,1.8vw,1.35rem)', fontWeight: 700, color: '#f8f6f3', lineHeight: 1.1 }}>
                    {isRTL ? 'قابوس الخنجي' : 'Qaboos Al Khonji'}
                  </div>
                </div>
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'rgba(248,246,243,0.72)', lineHeight: 1.75, marginTop: '1.25rem', textAlign: isRTL ? 'right' : 'left' }}>
                {isRTL
                  ? 'أسّس شركة البناء عام 1997 تحت مظلة مجموعة الخنجي — ثمانية وعشرون عاماً من الملكية المباشرة والإشراف الشخصي على كل مشروع.'
                  : 'Founded Al Binaa in 1997 under the Al Khonji Group — twenty-eight years of direct ownership and hands-on oversight of every project.'}
              </p>
            </div>

            {/* Chairman's Statement */}
            <div ref={chairmanTextRef}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, letterSpacing: isRTL ? '0' : '0.14em', textTransform: isRTL ? 'none' : 'uppercase', fontWeight: 600, color: 'rgba(255,255,255,0.8)', marginBottom: '1.75rem' }}>
                {isRTL ? 'كلمة رئيس مجلس الإدارة' : "Chairman's Statement"}
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(4.5rem,9vw,7.5rem)', lineHeight: 0.65, color: 'rgba(255,255,255,0.25)', marginBottom: '1.5rem', userSelect: 'none', opacity: 0.85 }} aria-hidden="true">
                {isRTL ? '«' : '"'}
              </div>
              <blockquote style={{ margin: 0, padding: 0 }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(1rem,1.5vw,1.2rem)', fontWeight: 400, color: '#f8f6f3', lineHeight: 1.85, margin: '0 0 2rem' }}>
                  {isRTL
                    ? 'في البناء، لا نشيّد مبانيَ فحسب — بل نبني الثقة والقيمة والشراكات طويلة الأمد. التزامنا هو إنجاز كل مشروع بدقة هندسية وانضباط مالي وجودة لا تُساوم عليها.'
                    : 'At Al Binaa, we do not simply construct buildings — we build trust, value, and long-term partnerships. Our commitment is to deliver every project with engineering precision, financial discipline, and uncompromising quality.'}
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(15px,1.3vw,16px)', color: 'rgba(248,246,243,0.82)', lineHeight: 1.85, margin: '0 0 1.5rem' }}>
                  {isRTL
                    ? 'نؤمن أن القيادة الحقيقية في قطاع الإنشاءات لا تُقاس بعدد المشاريع المُنجزة، بل بمتانة ما نتركه خلفنا وديمومته ونزاهته للأجيال القادمة في عُمان.'
                    : 'We believe that true leadership in construction is measured not by the number of projects completed, but by the strength, durability, and integrity of what we leave behind for future generations in Oman.'}
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(15px,1.3vw,16px)', color: 'rgba(248,246,243,0.82)', lineHeight: 1.85, margin: '0 0 3rem' }}>
                  {isRTL
                    ? 'نحن نبني أكثر من مجرد هياكل — نبني منصة بناء تتّسم بالانضباط والسرعة واليقين في التنفيذ. طموحنا أن نصبح من أكثر المقاولين موثوقيةً وأعلاهم أداءً في عُمان.'
                    : 'We are building more than structures — we are building a construction platform defined by discipline, speed, and execution certainty. Our ambition is to become one of Oman\'s most trusted and performance-driven contractors, delivering projects that set new benchmarks in quality and control.'}
                </p>
                <div style={{ width: 40, height: 1, background: 'rgba(248,246,243,0.18)', marginBottom: '1.5rem' }} />
                <footer>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, fontWeight: 700, color: '#f8f6f3' }}>
                    {isRTL ? 'قابوس الخنجي' : 'Qaboos Al Khonji'}
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(248,246,243,0.65)', marginTop: 4, letterSpacing: isRTL ? '0' : '0.08em', textTransform: isRTL ? 'none' : 'uppercase' }}>
                    {isRTL ? 'رئيس مجلس الإدارة، البناء للمقاولات والصناعة' : 'Chairman, Al Binaa Construction & Industry'}
                  </div>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. HERITAGE — 4 defining chapters ────────────────────────────────── */}
      {/* Editorial 2×2 grid — not a year-by-year list */}
      <section style={{ background: 'var(--section-bg)', padding: 'clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,4rem)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ marginBottom: 'clamp(2.5rem,4vw,4rem)' }}>
            <SectionLabel>{isRTL ? 'مسيرتنا' : 'Our Heritage'}</SectionLabel>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,3.5vw,2.8rem)', fontWeight: 700, color: 'var(--fg)', margin: '0', lineHeight: 1.05, maxWidth: '18ch' }}>
              {isRTL ? 'أربعة فصول تحدد من نحن' : 'Four Chapters That Define Who We Are'}
            </h2>
          </div>
          {/* 2×2 editorial grid */}
          <div ref={heritageRef} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5px', background: 'var(--border-color)' }} className="heritage-grid">
            {HERITAGE.map((chapter, i) => (
              <div key={i}
                style={{ background: 'var(--section-bg)', padding: 'clamp(2rem,3.5vw,3rem)', borderBlockStart: '2px solid var(--border-color)', transition: 'background 0.22s, border-color 0.22s', cursor: 'default' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--alt-bg)'; e.currentTarget.style.borderBlockStartColor = 'var(--red)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--section-bg)'; e.currentTarget.style.borderBlockStartColor = 'var(--border-color)'; }}>
                {/* Era */}
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,3vw,2.5rem)', fontWeight: 700, color: 'var(--red)', lineHeight: 1, marginBottom: '0.5rem' }}>
                  {chapter.era}
                </div>
                {/* Chapter name */}
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: isRTL ? '0' : '0.12em', textTransform: isRTL ? 'none' : 'uppercase', fontWeight: 700, color: 'var(--fg)', marginBottom: '1rem' }}>
                  {chapter.chapter}
                </div>
                {/* Description */}
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 14.5, color: 'var(--fg-muted)', lineHeight: 1.78, margin: 0 }}>
                  {chapter.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. SAFETY & RESPONSIBILITY ───────────────────────────────────────── */}
      <section style={{ background: 'var(--alt-bg)', padding: 'clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,4rem)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: '5rem', alignItems: 'start' }} className="about-grid">
            <div>
              <SectionLabel>{t('csr_label')}</SectionLabel>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,3.5vw,2.8rem)', fontWeight: 700, color: 'var(--fg)', margin: '0 0 1.25rem', lineHeight: 1.05 }}>
                {t('csr_heading').split('\n').map((line, i) => <span key={i}>{line}{i === 0 && <br />}</span>)}
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 14.5, color: 'var(--fg-muted)', lineHeight: 1.8, marginBottom: '2rem' }}>{t('csr_body')}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { n: isRTL ? 'صفر إصابات' : 'Zero Harm', label: isRTL ? 'هدف السلامة — كل موقع، كل يوم' : 'Safety target — every site, every day' },
                  { n: 'ISO',  label: isRTL ? 'إدارة الجودة المعتمدة' : 'Certified quality management' },
                  { n: '100%', label: isRTL ? 'الامتثال لـ OSHA وقانون العمل العُماني' : 'OSHA & Oman Labour Law compliance' },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--red)', flexShrink: 0 }}>{item.n}</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--fg-muted)', lineHeight: 1.5 }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div ref={csrGridRef} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5px', background: 'var(--border-color)' }}>
              {CSR_PILLARS.map((p, i) => (
                <div key={i}
                  style={{ background: 'var(--card-bg)', padding: '2rem', borderBlockStart: '2px solid var(--border-strong)', transition: 'background 0.25s, border-color 0.25s', cursor: 'default' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(245,20,31,0.04)'; e.currentTarget.style.borderBlockStartColor = 'rgba(245,20,31,0.4)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--card-bg)'; e.currentTarget.style.borderBlockStartColor = 'var(--border-strong)'; }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700, letterSpacing: isRTL ? '0' : '0.1em', textTransform: isRTL ? 'none' : 'uppercase', color: 'var(--red)', marginBottom: '0.65rem' }}>{p.title}</div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--fg-muted)', lineHeight: 1.7, margin: 0 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. TEAM & EQUIPMENT — merged ─────────────────────────────────────── */}
      <section style={{ background: 'var(--section-bg)', padding: 'clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,4rem)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>

          {/* Team */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', marginBottom: 'clamp(3rem,5vw,5rem)' }} className="about-grid">
            <div ref={teamRef}>
              <SectionLabel>{t('team_label')}</SectionLabel>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,3.5vw,2.8rem)', fontWeight: 700, color: 'var(--fg)', margin: '0 0 1.25rem', lineHeight: 1.05 }}>
                {t('team_heading_pre')}{totalManpower}+{t('team_heading_post')}
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 14.5, color: 'var(--fg-muted)', lineHeight: 1.8, marginBottom: '2rem', maxWidth: 520 }}>{t('team_sub')}</p>
              <div ref={statsRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                {[
                  { n: '25', label: isRTL ? 'مهندسون'    : 'Engineers'    },
                  { n: '20', label: isRTL ? 'مشرفون'     : 'Supervisors'  },
                  { n: '4',  label: isRTL ? 'مساحون'     : 'Surveyors'    },
                  { n: '42', label: isRTL ? 'حداد تسليح' : 'Steel Fixers' },
                ].map(item => (
                  <div key={item.label} style={{ borderBlockStart: '2px solid var(--border-color)', paddingTop: '1rem' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 700, color: 'var(--fg)', lineHeight: 1 }}>{item.n}</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, color: 'var(--fg-muted)', marginTop: 4, textTransform: isRTL ? 'none' : 'uppercase', letterSpacing: isRTL ? '0' : '0.08em' }}>{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img src="/images/working-together.png" alt="Al Binaa team reviewing plans on site" loading="lazy" style={{ width: '100%', height: 380, objectFit: 'cover', display: 'block', objectPosition: 'center top' }} />
            </div>
          </div>

          {/* Divider */}
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 'clamp(2.5rem,4vw,4rem)' }}>
            <SectionLabel>{t('equipment_label')}</SectionLabel>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem,2.5vw,2rem)', fontWeight: 700, color: 'var(--fg)', margin: '0 0 2rem', lineHeight: 1.05 }}>{t('equipment_heading')}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5px', background: 'var(--border-color)' }}>
              {[
                { qty: '6',         name: isRTL ? 'رافعات برجية'        : 'Tower Cranes'          },
                { qty: '4',         name: isRTL ? 'رافعات متنقلة'       : 'Mobile Cranes'          },
                { qty: '4',         name: isRTL ? 'رافعات حفر'          : 'Excavation Cranes'      },
                { qty: '5+',        name: isRTL ? 'شاحنات نقل ثقيل'     : 'Heavy Transport Trucks' },
                { qty: '5,900 m²',  name: isRTL ? 'قوالب دوكا'          : 'Doka Formwork'          },
                { qty: '15,000 m²', name: isRTL ? 'سقالات ثقيلة'        : 'Heavy Scaffolding'      },
              ].map((e, i) => (
                <div key={i}
                  style={{ background: 'var(--section-bg)', padding: '1.5rem 1.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', transition: 'background 0.2s' }}
                  onMouseEnter={ev => { ev.currentTarget.style.background = 'var(--alt-bg)'; }}
                  onMouseLeave={ev => { ev.currentTarget.style.background = 'var(--section-bg)'; }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, fontWeight: 600, color: 'var(--fg)' }}>{e.name}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--red)', flexShrink: 0 }}>{e.qty}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
