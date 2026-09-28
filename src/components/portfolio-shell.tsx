"use client";

import { useCallback, useEffect, useState } from "react";
import { AccessGate } from "@/components/access-gate";
import { Hero } from "@/components/hero";
import { AboutSection } from "@/components/about-section";
import { ProjectsSection } from "@/components/projects-section";
import { EditorialMarquee } from "@/components/editorial-marquee";
import { SkillsSection } from "@/components/skills-section";
import { RecognitionSection } from "@/components/recognition-section";
import { BuildLabSection } from "@/components/build-lab-section";
import { ContactFooter } from "@/components/contact-footer";
import { CustomCursor } from "@/components/custom-cursor";
import { siteConfig } from "@/data/site";

export function PortfolioShell({ year }: { year: number }) {
  const [entered, setEntered] = useState(false);
  const handleEnter = useCallback(() => setEntered(true), []);

  useEffect(() => {
    if (!entered) return;
    const targetId = decodeURIComponent(window.location.hash.slice(1));
    if (!targetId) return;
    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(targetId);
      if (!target) return;
      const previousBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "auto";
      target.scrollIntoView({ block: "start" });
      document.documentElement.style.scrollBehavior = previousBehavior;
    });
    return () => cancelAnimationFrame(frame);
  }, [entered]);

  return (
    <>
      <AccessGate onEnter={handleEnter} />
      <main className={entered ? "site-ready" : "site-waiting"}>
        <Hero active={entered} />
        {siteConfig.sectionVisibility.about && <AboutSection />}
        {siteConfig.sectionVisibility.projects && <ProjectsSection />}
        {siteConfig.sectionVisibility.projects && <EditorialMarquee />}
        {siteConfig.sectionVisibility.skills && <SkillsSection />}
        {siteConfig.sectionVisibility.lab && <BuildLabSection />}
        {siteConfig.sectionVisibility.recognition && <RecognitionSection />}
        {siteConfig.sectionVisibility.contact && <ContactFooter year={year} />}
      </main>
      <CustomCursor />
    </>
  );
}
