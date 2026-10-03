"use client";

import { useCallback, useEffect, useState } from "react";
import { PortfolioIntro } from "@/components/portfolio-intro";
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
import { PORTFOLIO_INTRO_STORAGE_KEY } from "@/lib/portfolio-intro";

function hasCompletedIntro() {
  if (typeof window === "undefined") return false;

  try {
    return sessionStorage.getItem(PORTFOLIO_INTRO_STORAGE_KEY) === "complete";
  } catch {
    return false;
  }
}

export function PortfolioShell({ year }: { year: number }) {
  const [introWasCompleteAtLoad] = useState(hasCompletedIntro);
  const [introComplete, setIntroComplete] = useState(introWasCompleteAtLoad);
  const [motionStateReady, setMotionStateReady] = useState(false);
  const [refreshEntranceComplete, setRefreshEntranceComplete] = useState(false);
  const handleIntroComplete = useCallback(() => setIntroComplete(true), []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMotionStateReady(true);
      if (introWasCompleteAtLoad) setRefreshEntranceComplete(true);
    });
    return () => cancelAnimationFrame(frame);
  }, [introWasCompleteAtLoad]);

  useEffect(() => {
    if (!introComplete) return;
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
  }, [introComplete]);

  const siteClassName = introComplete
    ? `site-ready${introWasCompleteAtLoad && !refreshEntranceComplete ? " site-refreshing" : ""}`
    : "site-waiting";

  return (
    <>
      {!introWasCompleteAtLoad && <PortfolioIntro onComplete={handleIntroComplete} />}
      <main id="portfolio-site" className={siteClassName}>
        <Hero active={!motionStateReady || introComplete} />
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
