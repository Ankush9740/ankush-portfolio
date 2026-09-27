"use client";

import type { IconType } from "react-icons";
import { FaCss3Alt } from "react-icons/fa6";
import { RiOpenaiFill } from "react-icons/ri";
import { TbApi, TbBrandCSharp } from "react-icons/tb";
import { VscCode } from "react-icons/vsc";
import {
  SiAndroid, SiAndroidstudio, SiAnthropic, SiC, SiGit, SiGithub,
  SiGoogle, SiGooglegemini, SiHtml5, SiJavascript, SiJetpackcompose,
  SiKotlin, SiMaterialdesign, SiNextdotjs, SiNodedotjs, SiOllama,
  SiOpenjdk, SiPostgresql, SiPython, SiQwen, SiReact, SiSupabase,
  SiTypescript, SiVercel,
} from "react-icons/si";
import { skillGroups } from "@/data/skills";
import { Magnetic } from "@/components/motion/magnetic";
import { FadeIn } from "@/components/motion/fade-in";

const skillIcons: Record<string, IconType> = {
  android: SiAndroid,
  androidstudio: SiAndroidstudio,
  api: TbApi,
  c: SiC,
  claude: SiAnthropic,
  compose: SiJetpackcompose,
  csharp: TbBrandCSharp,
  css: FaCss3Alt,
  gemini: SiGooglegemini,
  gemma: SiGoogle,
  git: SiGit,
  github: SiGithub,
  html: SiHtml5,
  java: SiOpenjdk,
  javascript: SiJavascript,
  kotlin: SiKotlin,
  material: SiMaterialdesign,
  nextjs: SiNextdotjs,
  nodejs: SiNodedotjs,
  ollama: SiOllama,
  openai: RiOpenaiFill,
  postgresql: SiPostgresql,
  python: SiPython,
  qwen: SiQwen,
  react: SiReact,
  supabase: SiSupabase,
  typescript: SiTypescript,
  vercel: SiVercel,
  vscode: VscCode,
};

function SkillContent({ skill, index }: { skill: (typeof skillGroups)[number]["skills"][number]; index: number }) {
  const Icon = skillIcons[skill.icon];
  return (
    <>
      <span className="skill-icon" aria-hidden="true">{Icon && <Icon />}</span>
      <span className="skill-copy"><strong>{skill.name}</strong></span>
      <span className="skill-sequence">{String(index + 1).padStart(2, "0")}</span>
    </>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="skills-section">
      <div className="section-kicker light"><span>04</span><span>Skills / Tech</span></div>
      <FadeIn className="skills-heading">
        <p className="label">The working toolkit</p>
        <h2>TOOLS THAT<br />MOVE IDEAS.</h2>
        <p>No percentages. Just the technologies, tools, and workflows connected to the work.</p>
      </FadeIn>

      <div className="skill-groups">
        {skillGroups.map((group, groupIndex) => (
          <FadeIn key={group.title} className="skill-group" delay={groupIndex * 0.04}>
            <div className="skill-group-head">
              <span>{String(groupIndex + 1).padStart(2, "0")}</span>
              <div><h3>{group.title}</h3><p>{group.description}</p></div>
            </div>
            <div className="skill-cloud">
              {group.skills.map((skill, skillIndex) => (
                <Magnetic key={skill.name} className="skill-item">
                  <div tabIndex={0}><SkillContent skill={skill} index={skillIndex} /></div>
                </Magnetic>
              ))}
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
