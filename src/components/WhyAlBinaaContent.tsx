'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { PageBanner } from '@/components/PageBanner';

const DIFFERENTIATORS_EN = [
  {
    icon: '①',
    title: 'One Contract. Four Disciplines.',
    body: 'Al Binaa delivers civil structure, MEP systems, interior finishing, and design-build under a single management contract. Most projects in Oman involve separate contracts for each discipline, every handover is a risk event: scope gaps, coordination failures, finger-pointing delays. Al Binaa removes all of it. One team. One accountability.',
  },
  {
    icon: '②',
    title: '30 Years of Verified Delivery',
    body: 'Founded 1997. 200+ delivered projects across Muscat, Sohar, Sur, and Wahiba Sands. Rimal I (242 residential units) delivered on schedule. OFFICE 1991 (9-storey commercial tower, Al Khuwair) delivered ahead of schedule. No project has been abandoned, delayed at handover, or litigated. The track record is the proof.',
  },
  {
    icon: '③',
    title: 'ISO 9001:2015 Quality Management',
    body: 'Certified by Bureau Veritas to ISO 9001:2015, the current standard, not the older 2008 revision. Quality management procedures are documented, audited, and enforced on every project. Dedicated QA/QC engineers are assigned on-site from groundwork through to final finishing sign-off.',
  },
  {
    icon: '④',
    title: 'Al Khonji Group Backing',
    body: 'Al Binaa is part of Al Khonji Group, one of Oman\'s most established conglomerates. Financial stability means projects are never halted for bridge financing. AQAR, Al Khonji Real Estate, is Al Binaa\'s longest-standing client. When a developer\'s own group trusts the contractor with its landmark projects, that is the clearest possible signal of confidence.',
  },
];

const DIFFERENTIATORS_AR = [
  {
    icon: '①',
    title: 'عقد واحد. أربع تخصصات.',
    body: 'تُسلّم شركة البناء أعمال الهيكل الإنشائي وأنظمة MEP والتشطيبات الداخلية والتصميم والتنفيذ ضمن عقد إدارة واحد. تنطوي معظم المشاريع في عُمان على عقود منفصلة لكل تخصص، وكل تسليم بينهما يمثل نقطة مخاطرة. تُلغي شركة البناء كل هذه المخاطر. فريق واحد. مسؤولية واحدة.',
  },
  {
    icon: '②',
    title: '30 عامًا من التسليم الموثق',
    body: 'تأسست عام 1997. أكثر من 200 مشروع مُسلَّم عبر مسقط وصحار وصور وسهل الوهيبة. تم تسليم ريمال 1 (242 وحدة سكنية) في موعده المحدد. وسُلِّم مجمع OFFICE 1991 (برج تجاري من 9 طوابق، الخوير) قبل الموعد المحدد. لم يُتوقف عن أي مشروع أو يُتأخر في تسليمه أو يُحاكَم بشأنه. السجل الحافل هو الدليل.',
  },
  {
    icon: '③',
    title: 'نظام إدارة الجودة ISO 9001:2015',
    body: 'معتمدة من Bureau Veritas وفق معيار ISO 9001:2015، الإصدار الأحدث، لا الإصدار القديم 2008. إجراءات إدارة الجودة موثقة وتخضع للتدقيق وتُطبَّق على كل مشروع. يُعيَّن مهندسو ضمان الجودة ومراقبة الجودة في موقع المشروع منذ أعمال الأساس حتى التوقيع النهائي على التشطيبات.',
  },
  {
    icon: '④',
    title: 'دعم مجموعة الخنجي',
    body: 'شركة البناء جزء من مجموعة الخنجي، إحدى أعرق الشركات القابضة في سلطنة عُمان. الاستقرار المالي يعني عدم توقف المشاريع بسبب التمويل. وشركة عقار، الخنجي للعقارات، هي أقدم عملاء شركة البناء وأكثرهم ثقةً. حين يعهد المطور نفسه إلى المقاول بمشاريعه الرائدة، فذلك أوضح دليل على الثقة.',
  },
];

const COMPARISON_ROWS_EN = [
  { criterion: 'All disciplines under one contract', albinaa: '✓', others: '✗ Separate contracts typical' },
  { criterion: 'ISO 9001:2015 (current standard)', albinaa: '✓', others: 'Partial, many hold 9001:2008' },
  { criterion: 'Premium residential & hospitality focus', albinaa: '✓', others: '✗ Most focus on govt. / infrastructure' },
  { criterion: 'Private developer track record', albinaa: '200+ projects', others: 'Govt./PDO/ROP primary' },
  { criterion: 'Conglomerate financial backing', albinaa: 'Al Khonji Group', others: 'Varies' },
  { criterion: 'Excellent Contractor Grade', albinaa: '✓', others: '✓ (some)' },
];

const COMPARISON_ROWS_AR = [
  { criterion: 'جميع التخصصات في عقد واحد', albinaa: '✓', others: '✗ عقود منفصلة في الغالب' },
  { criterion: 'ISO 9001:2015 (الإصدار الأحدث)', albinaa: '✓', others: 'جزئي، كثيرون يحملون 2008' },
  { criterion: 'تركيز على السكني الراقي والضيافة', albinaa: '✓', others: '✗ معظمهم يعتمدون على الحكومة والبنية التحتية' },
  { criterion: 'سجل مع المطورين الخاصين', albinaa: '+200 مشروع', others: 'حكومي / PDO / ROP بالدرجة الأولى' },
  { criterion: 'دعم مالي من مجموعة قابضة', albinaa: 'مجموعة الخنجي', others: 'متفاوت' },
  { criterion: 'درجة مقاول ممتاز', albinaa: '✓', others: '✓ (بعضهم)' },
];

const FAQ_EN = [
  {
    q: 'How does Al Binaa compare to Galfar for a commercial building project?',
    a: 'Galfar Engineering & Contracting SAOG is Oman\'s largest contractor (25,000+ employees, ~$646M revenue) and specialises in infrastructure, oil & gas, roads, and government mega-projects. For a private commercial building, hotel, or residential development, Al Binaa\'s dedicated focus on premium building construction, single-contract delivery, and ISO 9001:2015 certification is better suited. Al Binaa delivered OFFICE 1991, a 9-storey commercial tower in Al Khuwair, ahead of schedule.',
  },
  {
    q: 'How does Al Binaa compare to Al Turki Enterprises?',
    a: 'Al Turki Enterprises is a 7,000-employee Omani contractor with a strong government and institutional portfolio (Royal Court, Royal Oman Police, PDO, Sultan Qaboos University). Al Binaa\'s clients are primarily private developers and hospitality groups. If your project is a private residential complex, commercial tower, or hotel, Al Binaa\'s focus, scale, and single-contract model are the better fit.',
  },
  {
    q: 'Does Al Binaa take on hospitality and hotel construction?',
    a: 'Yes. Delivered projects include Desert Nights Resort (18,000 sqm, Wahiba Sands), Best Western Sur Plaza Hotel (Sohar), and Al Wadi Hotel (110-room renovation, Sohar). Active pipeline includes Ibis Style Hotel Ruwi (183 rooms, OMR 5.2M). Al Binaa handles hospitality MEP, finishing, and FF&E coordination as part of its single-contract scope.',
  },
  {
    q: 'What contract sizes does Al Binaa typically handle?',
    a: 'Al Binaa manages projects from OMR 1M to OMR 20M+. Rimal I was OMR 13.6M; OFFICE 1991 was OMR 12.1M; Rimal II (active) is OMR 13M. The company typically runs 4–6 projects concurrently, supported by 1,000+ skilled employees.',
  },
];

const FAQ_AR = [
  {
    q: 'كيف تُقارن شركة البناء بشركة جلفار لمشروع بناء تجاري؟',
    a: 'شركة جلفار للهندسة والمقاولات إحدى أكبر شركات المقاولات في عُمان (أكثر من 25,000 موظف)، وتتخصص في البنية التحتية والنفط والغاز والطرق والمشاريع الحكومية الضخمة. أما لمشاريع البناء التجاري الخاص أو الفنادق أو المجمعات السكنية، فإن تركيز شركة البناء على الإنشاء المتميز وعقدها الواحد وشهادة ISO 9001:2015 تجعلها الخيار الأنسب.',
  },
  {
    q: 'كيف تُقارن شركة البناء بمؤسسات التركي؟',
    a: 'مؤسسات التركي شركة عُمانية بأكثر من 7,000 موظف، مع محفظة حكومية ومؤسسية قوية (الديوان الملكي، الشرطة، PDO، جامعة السلطان قابوس). أما عملاء شركة البناء فهم بصفة أساسية مطورون خاصون ومجموعات ضيافة. إن كان مشروعك مجمعًا سكنيًا راقيًا أو برجًا تجاريًا أو فندقًا، فإن نموذج العقد الواحد لشركة البناء هو الأنسب.',
  },
  {
    q: 'هل تتولى شركة البناء مشاريع إنشاء الفنادق والمنتجعات؟',
    a: 'نعم. من المشاريع المُسلَّمة: منتجع ليالي الصحراء (18,000 متر مربع، سهل الوهيبة)، فندق بست ويسترن سور بلازا (صحار)، وفندق الوادي (تجديد 110 غرف، صحار). ومن المشاريع الجارية: فندق إيبيس ستايل روي (183 غرفة، 5.2 مليون ريال عُماني).',
  },
  {
    q: 'ما أحجام العقود التي تتعامل معها شركة البناء؟',
    a: 'تتراوح مشاريع شركة البناء بين 1 مليون و20 مليون ريال عُماني وأكثر. بلغت قيمة ريمال 1 نحو 13.6 مليون ريال، وOFFICE 1991 نحو 12.1 مليون ريال. تدير الشركة عادةً من 4 إلى 6 مشاريع متزامنة بدعم من أكثر من 1,000 موظف متخصص.',
  },
];

export function WhyAlBinaaContent() {
  const locale = useLocale();
  const isRTL  = locale === 'ar';

  const differentiators = isRTL ? DIFFERENTIATORS_AR : DIFFERENTIATORS_EN;
  const comparisonRows  = isRTL ? COMPARISON_ROWS_AR : COMPARISON_ROWS_EN;
  const faq             = isRTL ? FAQ_AR : FAQ_EN;

  return (
    <>
      <PageBanner
        title={isRTL ? 'لماذا شركة البناء؟' : 'Why Al Binaa?'}
        subtitle={isRTL
          ? 'عقد واحد. أربع تخصصات. 30 عامًا من التسليم الموثق في سلطنة عُمان.'
          : 'One contract. Four disciplines. 30 years of verified delivery in Oman.'}
      />

      {/* Differentiators */}
      <section style={{ padding: '80px 24px', maxWidth: 900, margin: '0 auto' }}>
        {/* Answer-first lead (AEO) */}
        <p style={{
          fontFamily: 'Josefin Sans, sans-serif',
          fontSize: 'clamp(1.05rem, 1.6vw, 1.3rem)',
          lineHeight: 1.7,
          color: 'var(--fg)',
          margin: '0 0 48px',
          maxWidth: 760,
          textAlign: isRTL ? 'right' : 'left',
          marginInlineStart: isRTL ? 'auto' : 0,
        }}>
          {isRTL
            ? 'تتميّز شركة البناء بأنها تنفّذ الهيكل الإنشائي وأنظمة MEP والتشطيبات ضمن عقد إدارة واحد منذ عام 1997، معتمدة وفق ISO 9001:2015 ومدعومة من مجموعة الخنجي. عقد واحد يلغي مخاطر التسليم بين المقاولين.'
            : 'Al Binaa stands apart because it delivers civil structure, MEP, and interior finishing under a single management contract, certified to ISO 9001:2015, backed by the Al Khonji Group, and proven since 1997. One contract removes the handover risk between subcontractors.'}
        </p>
        <h2 style={{
          fontFamily: 'Cinzel, serif',
          fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          marginBottom: 48,
          textAlign: isRTL ? 'right' : 'left',
        }}>
          {isRTL ? 'ما الذي يميّزنا' : 'What Sets Al Binaa Apart'}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
          {differentiators.map((d, i) => (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: isRTL ? '1fr auto' : 'auto 1fr',
              gap: 24,
              alignItems: 'start',
              direction: isRTL ? 'rtl' : 'ltr',
            }}>
              <span style={{
                fontFamily: 'Cinzel, serif',
                fontSize: '2rem',
                color: 'var(--red)',
                lineHeight: 1,
                order: isRTL ? 1 : 0,
                minWidth: 36,
              }}>
                {d.icon}
              </span>
              <div style={{ order: isRTL ? 0 : 1 }}>
                <h3 style={{
                  fontFamily: 'Cinzel, serif',
                  fontSize: '1rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: 12,
                  color: 'var(--fg)',
                }}>
                  {d.title}
                </h3>
                <p style={{
                  fontFamily: 'Josefin Sans, sans-serif',
                  fontSize: '0.95rem',
                  lineHeight: 1.75,
                  color: 'var(--fg-muted)',
                  maxWidth: 700,
                }}>
                  {d.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison table */}
      <section style={{
        background: 'var(--bg-subtle, #f9f9f9)',
        padding: '80px 24px',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginBottom: 36,
            textAlign: isRTL ? 'right' : 'left',
          }}>
            {isRTL ? 'مقارنة مع المقاولين الآخرين في عُمان' : 'Al Binaa vs Other Contractors in Oman'}
          </h2>

          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontFamily: 'Josefin Sans, sans-serif',
              fontSize: '0.875rem',
              direction: isRTL ? 'rtl' : 'ltr',
            }}>
              <thead>
                <tr>
                  <th style={{ textAlign: isRTL ? 'right' : 'left', padding: '12px 16px', borderBottom: '2px solid var(--red)', fontFamily: 'Cinzel, serif', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    {isRTL ? 'المعيار' : 'Criterion'}
                  </th>
                  <th style={{ textAlign: 'center', padding: '12px 16px', borderBottom: '2px solid var(--red)', fontFamily: 'Cinzel, serif', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--red)' }}>
                    {isRTL ? 'شركة البناء' : 'Al Binaa'}
                  </th>
                  <th style={{ textAlign: 'center', padding: '12px 16px', borderBottom: '2px solid currentColor', fontFamily: 'Cinzel, serif', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    {isRTL ? 'مقاولون آخرون' : 'Other Contractors'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border, #e0e0e0)' }}>
                    <td style={{ padding: '14px 16px', color: 'var(--fg)', textAlign: isRTL ? 'right' : 'left' }}>{row.criterion}</td>
                    <td style={{ padding: '14px 16px', textAlign: 'center', fontWeight: 600, color: 'var(--red)' }}>{row.albinaa}</td>
                    <td style={{ padding: '14px 16px', textAlign: 'center', color: 'var(--fg-muted)' }}>{row.others}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p style={{
            fontFamily: 'Josefin Sans, sans-serif',
            fontSize: '0.75rem',
            color: 'var(--fg-muted)',
            marginTop: 16,
            textAlign: isRTL ? 'right' : 'left',
          }}>
            {isRTL
              ? 'المصادر: مواقع الشركات الرسمية، ZoomInfo, Construction Week Online، يونيو 2026.'
              : 'Sources: company websites, ZoomInfo, Construction Week Online, June 2026.'}
          </p>
        </div>
      </section>

      {/* Project track record strip */}
      <section style={{ padding: '80px 24px', maxWidth: 900, margin: '0 auto' }}>
        <h2 style={{
          fontFamily: 'Cinzel, serif',
          fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          marginBottom: 36,
          textAlign: isRTL ? 'right' : 'left',
        }}>
          {isRTL ? 'سجل المشاريع' : 'The Track Record'}
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 24,
          direction: isRTL ? 'rtl' : 'ltr',
        }}>
          {[
            { stat: '30+', label: isRTL ? 'عامًا في عُمان' : 'Years in Oman' },
            { stat: '200+', label: isRTL ? 'مشروعًا مُسلَّمًا' : 'Delivered projects' },
            { stat: '11',   label: isRTL ? 'مشاريع جارية' : 'Active projects' },
            { stat: '1,000+', label: isRTL ? 'موظف متخصص' : 'Skilled employees' },
          ].map((s, i) => (
            <div key={i} style={{
              borderTop: '2px solid var(--red)',
              paddingTop: 20,
              textAlign: isRTL ? 'right' : 'left',
            }}>
              <div style={{
                fontFamily: 'Cinzel, serif',
                fontSize: '2.5rem',
                fontWeight: 700,
                color: 'var(--red)',
                lineHeight: 1,
                marginBottom: 8,
              }}>
                {s.stat}
              </div>
              <div style={{
                fontFamily: 'Josefin Sans, sans-serif',
                fontSize: '0.8rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--fg-muted)',
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40, display: 'flex', gap: 16, flexWrap: 'wrap', direction: isRTL ? 'rtl' : 'ltr' }}>
          <Link href={`/${locale}/projects`} className="btn-press" style={{
            display: 'inline-block',
            padding: '12px 28px',
            background: 'var(--red)',
            color: '#fff',
            fontFamily: 'Josefin Sans, sans-serif',
            fontSize: '0.8rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            textDecoration: 'none',
          }}>
            {isRTL ? 'تصفّح المشاريع' : 'View Portfolio'}
          </Link>
          <Link href={`/${locale}/qualifications`} className="btn-press" style={{
            display: 'inline-block',
            padding: '12px 28px',
            border: '1px solid var(--fg)',
            color: 'var(--fg)',
            fontFamily: 'Josefin Sans, sans-serif',
            fontSize: '0.8rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            textDecoration: 'none',
          }}>
            {isRTL ? 'المؤهلات والشهادات' : 'Qualifications'}
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section style={{
        background: 'var(--bg-subtle, #f9f9f9)',
        padding: '80px 24px',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginBottom: 40,
            textAlign: isRTL ? 'right' : 'left',
          }}>
            {isRTL ? 'أسئلة شائعة' : 'Common Questions'}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
            {faq.map((item, i) => (
              <div key={i} style={{
                borderTop: '1px solid var(--border, #e0e0e0)',
                paddingTop: 28,
                direction: isRTL ? 'rtl' : 'ltr',
              }}>
                <h3 style={{
                  fontFamily: 'Josefin Sans, sans-serif',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  marginBottom: 12,
                  lineHeight: 1.5,
                  textAlign: isRTL ? 'right' : 'left',
                  color: 'var(--fg)',
                }}>
                  {item.q}
                </h3>
                <p style={{
                  fontFamily: 'Josefin Sans, sans-serif',
                  fontSize: '0.9rem',
                  lineHeight: 1.75,
                  color: 'var(--fg-muted)',
                  textAlign: isRTL ? 'right' : 'left',
                }}>
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginBottom: 16,
          }}>
            {isRTL ? 'ابدأ المحادثة' : 'Begin the Conversation'}
          </h2>
          <p style={{
            fontFamily: 'Josefin Sans, sans-serif',
            fontSize: '0.95rem',
            lineHeight: 1.75,
            color: 'var(--fg-muted)',
            marginBottom: 32,
          }}>
            {isRTL
              ? 'فريقنا جاهز للرد خلال 48 ساعة لمناقشة متطلبات مشروعك.'
              : 'Our team responds within 48 hours to discuss your project requirements.'}
          </p>
          <Link href={`/${locale}/contact`} className="btn-press" style={{
            display: 'inline-block',
            padding: '14px 36px',
            background: 'var(--red)',
            color: '#fff',
            fontFamily: 'Josefin Sans, sans-serif',
            fontSize: '0.85rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            textDecoration: 'none',
          }}>
            {isRTL ? 'طلب استشارة' : 'Request a Consultation'}
          </Link>
        </div>
      </section>
    </>
  );
}
