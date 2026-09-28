"use client";

import {
  motion,
  type MotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { FadeIn } from "@/components/motion/fade-in";

const stages = [
  { number: "01", name: "Idea", statement: "START WITH A PROBLEM." },
  { number: "02", name: "Structure", statement: "MAKE THE SYSTEM WORK." },
  { number: "03", name: "Code", statement: "CONNECT THE PIECES." },
  { number: "04", name: "Break", statement: "FIND WHAT DOESN’T HOLD." },
  { number: "05", name: "Ship", statement: "SHIP IT." },
] as const;

const stageWindows = [
  { inStart: 0, inEnd: 0, outStart: 0.17, outEnd: 0.195 },
  { inStart: 0.195, inEnd: 0.2, outStart: 0.375, outEnd: 0.395 },
  { inStart: 0.395, inEnd: 0.4, outStart: 0.585, outEnd: 0.605 },
  { inStart: 0.605, inEnd: 0.61, outStart: 0.795, outEnd: 0.815 },
  { inStart: 0.815, inEnd: 0.82, outStart: 1, outEnd: 1 },
] as const;

function stageIndexAt(value: number) {
  if (value < 0.2) return 0;
  if (value < 0.4) return 1;
  if (value < 0.61) return 2;
  if (value < 0.82) return 3;
  return 4;
}

function useStageOpacity(progress: MotionValue<number>, index: number) {
  const range = stageWindows[index];
  return useTransform(progress, (value) => {
    if (value < range.inStart) return 0;
    if (range.inEnd > range.inStart && value < range.inEnd) return (value - range.inStart) / (range.inEnd - range.inStart);
    if (value <= range.outStart || range.outEnd === range.outStart) return 1;
    if (value < range.outEnd) return 1 - (value - range.outStart) / (range.outEnd - range.outStart);
    return 0;
  });
}

function LabStageCopy({ progress, index }: { progress: MotionValue<number>; index: number }) {
  const opacity = useStageOpacity(progress, index);
  const range = stageWindows[index];
  const y = useTransform(progress, (value) => {
    if (value < range.inStart) return 18;
    if (range.inEnd > range.inStart && value < range.inEnd) return 18 * (1 - (value - range.inStart) / (range.inEnd - range.inStart));
    if (value <= range.outStart) return 0;
    if (range.outEnd > range.outStart && value < range.outEnd) return -14 * ((value - range.outStart) / (range.outEnd - range.outStart));
    return -14;
  });
  const stage = stages[index];

  return (
    <motion.div className="lab-stage-copy" style={{ opacity, y }} aria-hidden="true">
      <p>{stage.number} / {stage.name}</p>
      <h3>{stage.statement}</h3>
    </motion.div>
  );
}

function LabStageMeta({ progress, index }: { progress: MotionValue<number>; index: number }) {
  const opacity = useStageOpacity(progress, index);
  const meta = [
    ["BUILD_01 / CONCEPT", "SYSTEM / UNRESOLVED"],
    ["BUILD_02 / STRUCTURE", "GRID / LOCKED"],
    ["BUILD_03 / CONNECTION", "LOGIC / ACTIVE"],
    ["BUILD_04 / DEBUG", "ISSUE / DETECTED"],
    ["BUILD_05 / RELEASE", "STATUS / LIVE"],
  ][index];
  return <motion.p className="lab-stage-meta-line" style={{ opacity }}>{meta[0]}<span>{meta[1]}</span></motion.p>;
}

function LabNavigatorItem({ progress, index }: { progress: MotionValue<number>; index: number }) {
  const color = useTransform(progress, (value) => {
    const activeIndex = stageIndexAt(value);
    if (index === activeIndex) return "#c93434";
    return index < activeIndex ? "#3d3b37" : "#aaa69f";
  });
  const completion = useTransform(progress, (value) => index < stageIndexAt(value) ? 1 : 0);

  return (
    <motion.li style={{ color }}>
      <span>{stages[index].number}</span>
      <span>{stages[index].name}</span>
      <span className="lab-nav-complete"><motion.span style={{ scaleX: completion }} /></span>
    </motion.li>
  );
}

function LabGrid() {
  return (
    <div className="lab-grid" aria-hidden="true">
      {Array.from({ length: 9 }, (_, index) => <span className="lab-grid-v" key={`v-${index}`} />)}
      {Array.from({ length: 6 }, (_, index) => <span className="lab-grid-h" key={`h-${index}`} />)}
    </div>
  );
}

function LabWorkspace({ progress }: { progress: MotionValue<number> }) {
  const workspaceOpacity = useTransform(progress, [0, 0.045], [0.62, 1]);
  const workspaceScale = useTransform(progress, [0, 0.12, 0.22, 0.78, 0.84, 1], [0.62, 0.72, 1, 1, 0.98, 0.86]);
  const workspaceY = useTransform(progress, [0, 0.12, 0.22, 0.78, 0.84, 1], [16, 8, 0, 0, 2, -12]);
  const workspaceRotate = useTransform(progress, [0, 0.22, 0.67, 0.72, 0.8, 1], [-0.55, 0, 0, -0.28, 0, 0]);
  const frameDraw = useTransform(progress, [0, 0.065], [0.12, 1]);
  const navOpacity = useTransform(progress, [0.025, 0.075], [0, 1]);
  const navY = useTransform(progress, [0.025, 0.075], [-7, 0]);
  const copyOpacity = useTransform(progress, [0.055, 0.12], [0, 1]);
  const columnX = useTransform(progress, [0.055, 0.14, 0.25], [-22, -10, 0]);
  const imageOpacity = useTransform(progress, [0.085, 0.15], [0, 1]);
  const imageX = useTransform(progress, [0.085, 0.2, 0.67, 0.72, 0.8], [20, 0, 0, 5, 0]);
  const cardOneOpacity = useTransform(progress, [0.115, 0.155], [0, 1]);
  const cardTwoOpacity = useTransform(progress, [0.135, 0.175], [0, 1]);
  const cardThreeOpacity = useTransform(progress, [0.155, 0.195], [0, 1]);
  const cardOneY = useTransform(progress, [0.115, 0.2, 0.67, 0.72, 0.8], [12, 0, 0, -3, 0]);
  const cardTwoY = useTransform(progress, [0.135, 0.2, 0.67, 0.73, 0.8], [12, 0, 0, 4, 0]);
  const cardThreeX = useTransform(progress, [0.155, 0.2, 0.67, 0.74, 0.8], [12, 0, 0, -4, 0]);
  const problemOpacity = useTransform(progress, (value) => value <= 0.035 ? 1 : value >= 0.15 ? 0 : 1 - (value - 0.035) / 0.115);
  const ideaMarksOpacity = useTransform(progress, [0.12, 0.17, 0.2], [0, 1, 0]);
  const structureOpacity = useTransform(progress, [0.205, 0.25, 0.35, 0.39], [0, 1, 1, 0]);
  const measureOpacity = useTransform(progress, [0.205, 0.255, 0.34, 0.385], [0, 1, 1, 0]);
  const codeOpacity = useTransform(progress, [0.405, 0.45, 0.56, 0.6], [0, 1, 1, 0]);
  const connectingOpacity = useTransform(progress, [0.405, 0.45, 0.535], [0, 1, 1]);
  const connectedOpacity = useTransform(progress, [0.535, 0.57, 0.6], [0, 1, 0]);
  const signalProgress = useTransform(progress, [0.405, 0.57, 0.81, 0.93], [0, 0.88, 0.88, 1]);
  const signalOpacity = useTransform(progress, [0.4, 0.43, 1], [0, 1, 1]);
  const interfaceOpacity = useTransform(progress, (value) => {
    if (value <= 0.93) return 1;
    if (value >= 0.965) return 0.08;
    return 1 - ((value - 0.93) / 0.035) * 0.92;
  });
  const alignmentOpacity = useTransform(progress, [0.615, 0.65, 0.69, 0.72], [0, 1, 1, 0]);
  const errorOpacity = useTransform(progress, [0.65, 0.68, 0.735, 0.77], [0, 1, 1, 0]);
  const terminalOpacity = useTransform(progress, [0.68, 0.71, 0.775, 0.805], [0, 1, 1, 0]);
  const failureOpacity = useTransform(progress, [0.69, 0.72, 0.755], [0, 1, 0.35]);
  const fixingOpacity = useTransform(progress, [0.735, 0.765, 0.805], [0, 1, 0]);
  const philosophyOpacity = useTransform(progress, [0.7, 0.745, 0.79, 0.81], [0, 1, 1, 0]);
  const resolvedOpacity = useTransform(progress, [0.77, 0.795, 0.825], [0, 1, 0]);
  const shipOpacity = useTransform(progress, [0.825, 0.865], [0, 1]);
  const buildPassedOpacity = useTransform(progress, [0.84, 0.87, 0.925], [0, 1, 1]);
  const productionOpacity = useTransform(progress, [0.875, 0.905, 0.96], [0, 1, 1]);
  const deployedOpacity = useTransform(progress, [0.91, 0.94, 1], [0, 1, 1]);
  const liveOpacity = useTransform(progress, [0.945, 0.975], [0, 1]);

  return (
    <motion.div className="lab-workspace-wrap" style={{ opacity: workspaceOpacity, scale: workspaceScale, y: workspaceY, rotate: workspaceRotate }}>
      <motion.div className="lab-problem-flow" style={{ opacity: problemOpacity }} aria-hidden="true">
        <span>PROBLEM</span><i /><b>↓</b><span>IDEA</span><i /><b>↓</b><span>FIRST ATTEMPT</span>
      </motion.div>

      <div className="lab-workspace">
        <div className="lab-frame-trace" aria-hidden="true">
          <motion.span className="frame-top" style={{ scaleX: frameDraw }} />
          <motion.span className="frame-right" style={{ scaleY: frameDraw }} />
          <motion.span className="frame-bottom" style={{ scaleX: frameDraw }} />
          <motion.span className="frame-left" style={{ scaleY: frameDraw }} />
        </div>

        <motion.div className="lab-window-bar" style={{ opacity: interfaceOpacity }}>
          <div><span /><span /><span /></div>
          <p>PRODUCT.SYSTEM / BUILD LAB</p>
          <motion.span className="lab-window-status" style={{ opacity: shipOpacity }}>READY</motion.span>
        </motion.div>

        <div className="lab-interface">
          <motion.div className="lab-interface-base" style={{ opacity: interfaceOpacity }}>
            <motion.div className="lab-interface-nav" style={{ opacity: navOpacity, y: navY }}>
              <span className="lab-interface-logo">PRODUCT/</span>
              <div><i /><i /><i /></div>
              <span className="lab-rough-button">ACTION</span>
            </motion.div>

            <div className="lab-interface-grid">
              <motion.div className="lab-copy-block" style={{ opacity: copyOpacity, x: columnX }}>
                <span className="lab-eyebrow-line" />
                <span className="lab-title-line wide" />
                <span className="lab-title-line" />
                <span className="lab-body-line" />
                <span className="lab-body-line short" />
                <span className="lab-button-block">START</span>
              </motion.div>
              <motion.div className="lab-image-block" style={{ opacity: imageOpacity, x: imageX }}>
                <span>MEDIA / 01</span>
                <i /><i />
              </motion.div>
            </div>

            <div className="lab-card-row">
              <motion.div style={{ opacity: cardOneOpacity, y: cardOneY }}><span>01</span><i /><i /></motion.div>
              <motion.div style={{ opacity: cardTwoOpacity, y: cardTwoY }}><span>02</span><i /><i /></motion.div>
              <motion.div style={{ opacity: cardThreeOpacity, x: cardThreeX }}><span>03</span><i /><i /></motion.div>
            </div>
          </motion.div>

          <motion.div className="lab-idea-marks" style={{ opacity: ideaMarksOpacity }} aria-hidden="true">
            <span>ROUGH NAV</span><span>CONTENT?</span><span>CTA / TBD</span><span>MEDIA</span>
          </motion.div>

          <motion.div className="lab-measures" style={{ opacity: measureOpacity }} aria-hidden="true">
            <span className="measure-top">12 COL / 084 PX</span>
            <span className="measure-side">MODULE GAP / 016</span>
          </motion.div>

          <motion.div className="lab-structure-notes" style={{ opacity: structureOpacity }}>
            <span className="structure-layout"><b>LAYOUT</b>12 COLUMN GRID</span>
            <span className="structure-components"><b>COMPONENTS</b>05 MODULES</span>
            <span className="structure-hierarchy"><b>HIERARCHY</b>ESTABLISHED</span>
            <span className="structure-flow"><b>FLOW</b>DEFINED</span>
          </motion.div>

          <motion.div className="lab-annotations" style={{ opacity: codeOpacity }}>
            <span className="annotation-ui">UI</span>
            <span className="annotation-logic">LOGIC</span>
            <span className="annotation-data">DATA</span>
            <span className="annotation-interaction">INTERACTION</span>
          </motion.div>

          <motion.pre className="lab-code code-primary" style={{ opacity: codeOpacity }}><code>const idea = solve(problem)</code></motion.pre>
          <motion.pre className="lab-code code-state" style={{ opacity: codeOpacity }}><code>state → interaction</code></motion.pre>
          <motion.pre className="lab-code code-secondary" style={{ opacity: codeOpacity }}><code>interface → logic → data</code></motion.pre>
          <motion.pre className="lab-code code-loop" style={{ opacity: codeOpacity }}><code>request → response</code></motion.pre>

          <motion.div className="lab-code-status" style={{ opacity: codeOpacity }}>
            <span>BUILD_03</span>
            <motion.b style={{ opacity: connectingOpacity }}>SYSTEM CONNECTING...</motion.b>
            <motion.b className="connected" style={{ opacity: connectedOpacity }}>SYSTEM CONNECTED</motion.b>
          </motion.div>

          <svg className="lab-signal" viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true">
            <motion.path d="M132 168 H420 V280 H700 V132 H876 V466 H524 V510 H244" style={{ pathLength: signalProgress, opacity: signalOpacity }} />
          </svg>

          <motion.p className="lab-break-note" style={{ opacity: alignmentOpacity }}>WHY IS THIS 3PX OFF?</motion.p>
          <motion.div className="lab-error-tag" style={{ opacity: errorOpacity }}>ERROR / 3PX</motion.div>
          <motion.div className="lab-debug-terminal" style={{ opacity: terminalOpacity }}>
            <p>&gt; npm run build</p>
            <motion.p className="error-line" style={{ opacity: failureOpacity }}>✕ something broke</motion.p>
            <motion.p style={{ opacity: fixingOpacity }}>&gt; fixing...</motion.p>
          </motion.div>
          <motion.p className="lab-philosophy" style={{ opacity: philosophyOpacity }}>BUILD. BREAK. LEARN. REPEAT.</motion.p>
          <motion.p className="lab-resolved" style={{ opacity: resolvedOpacity }}>ISSUE RESOLVED ✓</motion.p>

          <motion.div className="lab-ship-mark" style={{ opacity: shipOpacity }}><span>READY TO SHIP</span><i>✓</i></motion.div>
          <div className="lab-deploy-sequence" aria-hidden="true">
            <motion.span style={{ opacity: buildPassedOpacity }}>BUILD PASSED</motion.span><i>↓</i>
            <motion.span style={{ opacity: productionOpacity }}>PRODUCTION READY</motion.span><i>↓</i>
            <motion.span style={{ opacity: deployedOpacity }}>DEPLOYED</motion.span>
            <motion.strong style={{ opacity: liveOpacity }}><i /> LIVE</motion.strong>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StaticInterface({ index }: { index: number }) {
  return (
    <div className={`lab-static-interface static-stage-${index + 1}`} aria-hidden="true">
      <div className="static-window-bar"><i /><i /><i /><span>{index === 4 ? "READY" : `BUILD_0${index + 1}`}</span></div>
      <div className="static-interface-nav"><b>PRODUCT/</b><span /><span /><span /></div>
      <div className="static-interface-body"><div><i /><i /><i /><button tabIndex={-1}>START</button></div><aside>MEDIA / 01</aside></div>
      <div className="static-interface-cards"><i /><i /><i /></div>
      {index === 2 && <span className="static-signal">UI → LOGIC → DATA → INTERACTION</span>}
      {index === 3 && <span className="static-error">ERROR / 3PX&nbsp;&nbsp; &gt; fixing...</span>}
      {index === 4 && <span className="static-live">● LIVE</span>}
    </div>
  );
}

function StaticBuildLab() {
  const details = [
    "A rough wireframe asks the useful question first: what should this actually solve?",
    "The idea gains a 12-column grid, defined hierarchy, measured modules, and a clear flow.",
    "UI, logic, data, and interaction connect into one working system.",
    "A controlled failure reveals the gaps: build, break, learn, repeat.",
    "The issue resolves, the build passes, and the product reaches production.",
  ];

  return (
    <div className="lab-static" aria-label="The Build Lab stages">
      <ol className="lab-static-nav" aria-label="Build Lab stages">
        {stages.map((stage) => <li key={stage.name}><span>{stage.number}</span>{stage.name}</li>)}
      </ol>
      {stages.map((stage, index) => (
        <article key={stage.name} className="lab-static-stage">
          <div className="lab-static-index"><span>{stage.number}</span><span>{stage.name}</span></div>
          <div>
            <h3>{stage.statement}</h3>
            <p>{details[index]}</p>
            <StaticInterface index={index} />
            {index === 2 && <code>const idea = solve(problem)</code>}
            {index === 3 && <code>&gt; npm run build&nbsp;&nbsp; ✕ something broke&nbsp;&nbsp; &gt; fixing...</code>}
            {index === 4 && <strong>IDEA → BUILD → BREAK → LEARN → SHIP</strong>}
          </div>
        </article>
      ))}
    </div>
  );
}

export function BuildLabSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: scrollRef, offset: ["start start", "end end"] });
  const stageTrack = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const questionOpacity = useTransform(scrollYProgress, (value) => value <= 0.13 ? 1 : value >= 0.19 ? 0 : 1 - (value - 0.13) / 0.06);
  const shipMessageOpacity = useTransform(scrollYProgress, (value) => {
    if (value <= 0.97) return 0;
    if (value >= 0.995) return 1;
    return (value - 0.97) / 0.025;
  });

  return (
    <section id="lab" className={`build-lab-section${reducedMotion ? " is-reduced" : ""}`}>
      <LabGrid />
      <div className="section-kicker"><span>05</span><span>Build Lab</span></div>
      <FadeIn className="build-lab-intro">
        <p className="label">An interactive build process</p>
        <h2>THE BUILD LAB.</h2>
        <p className="build-lab-intro-copy">Ideas rarely arrive finished.<br />Scroll through how I turn rough concepts into working products.</p>
        <p className="build-lab-scroll-cue">SCROLL TO START ↓</p>
      </FadeIn>

      <div ref={scrollRef} className="build-lab-scroll">
        <div className="build-lab-sticky">
          <div className="lab-stage-header">
            <div className="lab-stage-copy-stack">
              {stages.map((stage, index) => <LabStageCopy key={stage.name} progress={scrollYProgress} index={index} />)}
            </div>
            <div className="lab-stage-progress" aria-hidden="true"><motion.span style={{ scaleX: stageTrack }} /></div>
          </div>

          <div className="lab-experiment">
            <motion.p className="lab-question" style={{ opacity: questionOpacity }}>WHAT SHOULD THIS ACTUALLY SOLVE?</motion.p>
            <div className="lab-stage-meta" aria-hidden="true">
              {stages.map((stage, index) => <LabStageMeta key={stage.name} progress={scrollYProgress} index={index} />)}
            </div>
            <LabWorkspace progress={scrollYProgress} />
            <motion.div className="lab-ship-message" style={{ opacity: shipMessageOpacity }}>
              <strong>SHIP IT.</strong>
              <span>IDEA → BUILD → BREAK → LEARN → SHIP</span>
            </motion.div>
          </div>

          <div className="lab-navigator-wrap">
            <div className="lab-nav-progress" aria-hidden="true"><motion.span style={{ scaleY: stageTrack }} /></div>
            <ol className="lab-navigator" aria-label="Build Lab progress">
              {stages.map((stage, index) => <LabNavigatorItem key={stage.name} progress={scrollYProgress} index={index} />)}
            </ol>
          </div>
        </div>
      </div>

      <StaticBuildLab />
    </section>
  );
}
