"use client";

import Image from "next/image";
import { ArrowUp, ArrowUpRight, FileText, Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { navigation } from "@/data/site";
import { profile } from "@/data/profile";
import { socials } from "@/data/socials";
import { FadeIn } from "@/components/motion/fade-in";

function ContactItem({ index, label, value, href, icon }: { index: number; label: string; value: string; href: string | null; icon: React.ReactNode }) {
  const content = <><span className="contact-index">{String(index + 1).padStart(2, "0")}</span><span className="contact-icon" aria-hidden="true">{icon}</span><span className="contact-label">{label}</span><strong>{value}</strong><ArrowUpRight className="contact-arrow" size={18} /></>;
  return href ? (
    <a className="contact-item" href={href} target={href.startsWith("mailto:") ? undefined : "_blank"} rel={href.startsWith("mailto:") ? undefined : "noreferrer"}>
      {content}
    </a>
  ) : (
    <div className="contact-item unavailable-contact" aria-disabled="true" title={`${label} can be added in socials data`}>
      <span className="contact-index">{String(index + 1).padStart(2, "0")}</span><span className="contact-icon" aria-hidden="true">{icon}</span><span className="contact-label">{label}</span><strong>Not added yet</strong><span className="contact-arrow">—</span>
    </div>
  );
}

export function ContactFooter({ year }: { year: number }) {
  const footerRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const isInView = useInView(footerRef, { once: true, amount: 0.3 });
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const pointerX = useSpring(rawX, { stiffness: 80, damping: 20 });
  const pointerY = useSpring(rawY, { stiffness: 80, damping: 20 });
  const mascotX = useTransform(pointerX, [-1, 1], [-9, 9]);
  const mascotY = useTransform(pointerY, [-1, 1], [-4, 5]);
  const mascotRotate = useTransform(pointerX, [-1, 1], [-1.5, 1.5]);

  function trackFooter(event: React.PointerEvent<HTMLElement>) {
    if (reducedMotion || event.pointerType !== "mouse") return;
    const rect = footerRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(((event.clientX - rect.left) / rect.width) * 2 - 1);
    rawY.set(((event.clientY - rect.top) / rect.height) * 2 - 1);
  }

  return (
    <footer id="contact" className="site-footer">
      <section className="contact-section">
        <div className="section-kicker light"><span>07</span><span>Contact</span></div>
        <div className="contact-grid">
          <FadeIn className="contact-cta"><p className="label">Have an idea?</p><h2>LET’S BUILD<br />SOMETHING<br /><em>GREAT.</em></h2></FadeIn>
          <FadeIn className="contact-panel" delay={0.08}>
            <p>Open to placements, internships, professional networking, and thoughtful collaborations.</p>
            <div className="contact-list">
              <ContactItem index={0} label="Email" value={socials.email ?? ""} href={socials.email ? `mailto:${socials.email}` : null} icon={<Mail />} />
              <ContactItem index={1} label="GitHub" value="View profile" href={socials.github} icon={<FaGithub />} />
              <ContactItem index={2} label="LinkedIn" value="Connect" href={socials.linkedin} icon={<FaLinkedinIn />} />
              <ContactItem index={3} label="Resume" value="Open résumé" href={profile.resumeUrl} icon={<FileText />} />
            </div>
          </FadeIn>
        </div>
      </section>

      <section ref={footerRef} className="final-footer" onPointerMove={trackFooter} onPointerLeave={() => { rawX.set(0); rawY.set(0); }}>
        <motion.div className="footer-top" initial={reducedMotion ? false : { opacity: 0, y: 28 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
          <div><span className="brand light-brand">ANKUSH.</span><p>Creative developer<br />Mangalore, India</p></div>
          <nav aria-label="Footer navigation">{navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav>
          <a className="back-to-top" href="#top">Back to top <ArrowUp size={16} /></a>
        </motion.div>
        <div className="footer-name-wrap">
          <div className="footer-name-anchor"><motion.p className="footer-name" initial={reducedMotion ? false : { y: "105%" }} animate={isInView ? { y: "0%" } : { y: "105%" }} transition={{ duration: 0.95, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}>ANKUSH</motion.p></div>
          <div className="footer-mascot-anchor"><motion.div
              className="footer-mascot"
              style={reducedMotion ? undefined : { x: mascotX, y: mascotY, rotate: mascotRotate }}
            ><motion.div className="footer-mascot-entrance" initial={reducedMotion ? false : { opacity: 0, y: "72%" }} animate={isInView ? { opacity: 1, y: "0%" } : { opacity: 0, y: "72%" }} transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}><div className="footer-mascot-idle"><Image src="/assets/mascot.png" alt="Ankush mascot waving goodbye" fill sizes="20vw" /></div></motion.div></motion.div></div>
        </div>
        <motion.div className="footer-bottom" initial={reducedMotion ? false : { opacity: 0, y: 15 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }} transition={{ duration: 0.55, delay: 0.72 }}><span>© {year} Ankush</span><span>Designed & built with care.</span><span>All rights reserved.</span></motion.div>
      </section>
    </footer>
  );
}
