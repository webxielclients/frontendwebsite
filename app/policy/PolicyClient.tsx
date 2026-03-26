'use client';

import { useState, useEffect, useRef, ReactNode, RefObject } from 'react';
import Image from 'next/image';

function useInView(threshold = 0.12): [RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>;
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

interface RevealProps {
  children: ReactNode;
  delay?: number;
  dir?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}
function Reveal({ children, delay = 0, dir = 'up', className = '' }: RevealProps) {
  const [ref, inView] = useInView();
  const translate: Record<string, string> = {
    up: 'translateY(24px)',
    down: 'translateY(-24px)',
    left: 'translateX(-24px)',
    right: 'translateX(24px)',
  };
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'none' : translate[dir],
      transition: `opacity .6s cubic-bezier(.16,1,.3,1) ${delay}ms,
                   transform .6s cubic-bezier(.16,1,.3,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

function SectionHeading({ number, title }: { number: string; title: string }) {
  return (
    <h2 className="text-[16px] font-bold text-gray-900 mt-8 mb-3">
      {number}. {title}
    </h2>
  );
}

function SubHeading({ title }: { title: string }) {
  return (
    <h3 className="text-[14px] font-semibold text-gray-800 mt-4 mb-2">
      {title}
    </h3>
  );
}

function P({ children }: { children: ReactNode }) {
  return (
    <p className="text-[13.5px] text-gray-600 leading-[1.85] mb-4 last:mb-0">
      {children}
    </p>
  );
}

function DefinitionList({ items }: { items: { term: string; def: string }[] }) {
  return (
    <ul className="text-[13.5px] text-gray-600 leading-[1.85] mb-4 space-y-2">
      {items.map(({ term, def }) => (
        <li key={term}>
          <span className="font-semibold text-gray-800">{term}</span> {def}
        </li>
      ))}
    </ul>
  );
}


export default function PrivacyPolicyPage() {
  const [heroIn, setHeroIn] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroIn(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="font-sans text-gray-900 bg-white overflow-x-hidden">
      <main>

        <div
          className="relative w-full overflow-hidden"
          style={{
            height: 'clamp(180px, 28vw, 280px)',
            opacity: heroIn ? 1 : 0,
            transition: 'opacity .8s ease',
          }}
        >
          <Image
            src="/privacyimage.png"
            alt="Privacy Policy"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <section className="max-w-[720px] mx-auto px-6 py-12 md:py-16">

          <Reveal>
            <h1 className="text-[28px] md:text-[34px] font-bold text-gray-900 text-center mb-2">
              Privacy Policy
            </h1>
            <p className="text-center text-[13px] text-gray-400 mb-10">
              Last updated: 20th December 2025
            </p>
          </Reveal>

          <Reveal delay={60}>
            <SectionHeading number="1" title="Introduction" />
            <P>
              This Privacy Policy describes Our policies and procedures on the collection, use,
              and disclosure of Your information when You use the Service and explains Your
              privacy rights and how the law protects You.
            </P>
            <P>
              We use Your Personal Data to provide and improve the Service. By using the Service,
              You agree to the collection and use of information in accordance with this Privacy
              Policy.
            </P>
          </Reveal>

          <Reveal delay={60}>
            <SectionHeading number="2" title="Interpretation and Definitions" />

            <SubHeading title="Interpretation" />
            <P>
              Words with an initial capital letter have meanings defined under the following
              conditions. These definitions apply whether the terms appear in singular or plural
              form.
            </P>

            <SubHeading title="Definitions" />
            <P>For the purposes of this Privacy Policy:</P>
            <DefinitionList items={[
              { term: 'Account', def: 'means a unique account created for You to access our Service or parts of our Service.' },
              { term: 'Affiliate', def: 'means an entity that controls, is controlled by, or is under common control with a party.' },
              { term: 'Application', def: 'refers to the Chang Pay platform, website, or related software provided by the Company.' },
              { term: 'Company', def: '(referred to as "the Company", "We", "Us" or "Our") refers to Chang Pay, operated by Chang Global Ventures Ltd and/or Chang Global Technologies Pty Ltd.' },
              { term: 'Country', def: 'refers to the jurisdiction in which the Company operates or is registered.' },
              { term: 'Device', def: 'means any device that can access the Service, such as a computer, mobile phone, or tablet.' },
              { term: 'Personal Data', def: 'means any information that relates to an identified or identifiable individual.' },
              { term: 'Service', def: 'refers to the Chang Pay website, application, and related services.' },
              { term: 'Service Provider', def: 'means any third party that processes data on behalf of the Company to facilitate or support the Service.' },
              { term: 'Usage Data', def: 'refers to data collected automatically through the use of the Service.' },
              { term: 'You', def: 'means the individual or legal entity accessing or using the Service.' },
            ]} />
          </Reveal>

          <Reveal delay={60}>
            <SectionHeading number="3" title="Collecting and Using Your Personal Data" />

            <SubHeading title="Types of Data Collected" />
            <SubHeading title="Personal Data" />
            <P>
              While using Our Service, We may ask You to provide certain personally identifiable
              information that can be used to contact or identify You. This may include your name,
              email address, and other contact details, as well as information required for service
              delivery and compliance purposes.
            </P>

            <SubHeading title="Usage Data" />
            <P>
              Usage Data is collected automatically when using the Service. This may include your
              device&apos;s IP address, browser type, browser version, pages visited, time and date of
              visits, time spent on pages, device identifiers, and other diagnostic data.
            </P>
            <P>
              When accessing the Service through a mobile device, We may also collect information
              such as the type of device, operating system, browser type, and mobile network
              information.
            </P>
          </Reveal>

          <Reveal delay={60}>
            <SectionHeading number="4" title="Use of Your Personal Data" />
            <P>
              The Company may use Personal Data to provide and maintain the Service, manage user
              accounts, perform contractual obligations, communicate with users regarding updates
              or service-related information, provide general information about our services,
              manage user requests, conduct business transfers, analyze usage trends, improve
              services, and meet legal or regulatory obligations.
            </P>
          </Reveal>

          <Reveal delay={60}>
            <SectionHeading number="5" title="Sharing of Your Personal Data" />
            <P>
              We may share Your personal information with Service Providers who assist in
              operating or analyzing the Service, with Affiliates who are required to comply with
              this Privacy Policy, with business partners where relevant to service delivery,
              during mergers, acquisitions, or asset transfers, when required by law or public
              authorities, or with Your consent.
            </P>
          </Reveal>

          <Reveal delay={60}>
            <SectionHeading number="6" title="Retention of Your Personal Data" />
            <P>
              The Company retains Personal Data only for as long as necessary to fulfill the
              purposes outlined in this Privacy Policy, comply with legal obligations, resolve
              disputes, and enforce agreements. Usage Data is generally retained for a shorter
              period unless required for security, functionality, or legal compliance.
            </P>
          </Reveal>

          <Reveal delay={60}>
            <SectionHeading number="7" title="Transfer of Your Personal Data" />
            <P>
              Your information may be processed and stored in locations outside of Your
              jurisdiction. By using the Service and submitting Your information, You consent to
              such transfers. We take reasonable steps to ensure that Your data is treated
              securely and in accordance with this Privacy Policy.
            </P>
          </Reveal>

          <Reveal delay={60}>
            <SectionHeading number="8" title="Delete Your Personal Data" />
            <P>
              You have the right to request access to, correction of, or deletion of Your
              Personal Data. You may manage your information through your account settings, if
              available, or by contacting Us. Certain data may be retained where required by law
              or legitimate business purposes.
            </P>
          </Reveal>

          <Reveal delay={60}>
            <SectionHeading number="9" title="Disclosure of Your Personal Data" />
            <P>
              Personal Data may be disclosed in connection with business transactions such as
              mergers or acquisitions, to comply with legal obligations, to protect the rights and
              property of the Company, to investigate wrongdoing, or to protect users and the
              public.
            </P>
          </Reveal>

          <Reveal delay={60}>
            <SectionHeading number="10" title="Security of Your Personal Data" />
            <P>
              We take reasonable measures to protect Your Personal Data. However, no method of
              transmission or storage is completely secure, and absolute security cannot be
              guaranteed.
            </P>
          </Reveal>

          <Reveal delay={60}>
            <SectionHeading number="11" title="Children's Privacy" />
            <P>
              Our Service is not intended for individuals under the age of 18. We do not
              knowingly collect Personal Data from children. If such data is identified, we will
              take steps to remove it.
            </P>
          </Reveal>

          <Reveal delay={60}>
            <SectionHeading number="12" title="Links to Other Websites" />
            <P>
              Our Service may contain links to third-party websites. We are not responsible for
              the content, privacy policies, or practices of those websites and encourage You to
              review their privacy policies.
            </P>
          </Reveal>

          <Reveal delay={60}>
            <SectionHeading number="13" title="Changes to This Privacy Policy" />
            <P>
              We may update this Privacy Policy from time to time. Updates will be posted on this
              page, and the &ldquo;Last updated&rdquo; date will be revised. Continued use of the Service
              constitutes acceptance of any changes.
            </P>
          </Reveal>

          <Reveal delay={60}>
            <SectionHeading number="14" title="Contact Us" />
            <P>
              If you have any questions about this Privacy Policy, please contact us at:{' '}
              <a href="mailto:support@usechangpay.com"
                className="text-[#16a34a] hover:underline font-medium">
                support@usechangpay.com
              </a>
              .
            </P>
          </Reveal>

        </section>
      </main>
    </div>
  );
}