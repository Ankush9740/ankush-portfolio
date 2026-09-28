import { ScanLine } from "lucide-react";
import type { ComponentType } from "react";
import type { ProjectVisualId } from "@/data/projects";

export function QuizloomVisual() {
  return (
    <div
      className="project-media-grid project-media-grid-quizloom quizloom-identity"
      role="img"
      aria-label="Quizloom room code connecting two players to a live answer session"
    >
      <span className="quizloom-connection quizloom-connection-room" aria-hidden="true" />
      <span className="quizloom-connection quizloom-connection-player-one" aria-hidden="true" />
      <span className="quizloom-connection quizloom-connection-player-two" aria-hidden="true" />
      <span className="quizloom-connection quizloom-connection-answers" aria-hidden="true" />

      <span className="quizloom-node quizloom-room-code">
        <small>Room code</small>
        <strong>482913</strong>
      </span>
      <span className="quizloom-node quizloom-player quizloom-player-one"><i />Player 01</span>
      <span className="quizloom-mark" aria-hidden="true">Q</span>
      <span className="quizloom-node quizloom-player quizloom-player-two"><i />Player 02</span>
      <span className="quizloom-node quizloom-answers">
        <small>Answer</small>
        <strong><i>A</i><i>B</i><i>C</i><i>D</i></strong>
      </span>
    </div>
  );
}

export function AutoLensVisual() {
  return (
    <div
      className="project-media-grid project-media-grid-autolens autolens-identity"
      role="img"
      aria-label="AutoLens camera image passing through AI recognition into vehicle details"
    >
      <span className="autolens-connection autolens-connection-camera" aria-hidden="true" />
      <span className="autolens-connection autolens-connection-vehicle" aria-hidden="true" />
      <span className="autolens-connection autolens-connection-ai" aria-hidden="true" />
      <span className="autolens-connection autolens-connection-result" aria-hidden="true" />

      <span className="autolens-node autolens-camera-node">
        <small>Input</small>
        <strong>Camera</strong>
      </span>
      <span className="autolens-node autolens-ai-node">
        <small>Engine</small>
        <strong>AI / Active</strong>
      </span>
      <span className="autolens-scanner" aria-hidden="true">
        <ScanLine className="autolens-scan-icon" strokeWidth={1.25} />
        <i className="autolens-scan-beam" />
      </span>
      <span className="autolens-node autolens-vehicle-node">
        <small>Detected</small>
        <strong>Vehicle</strong>
      </span>
      <span className="autolens-node autolens-result-node">
        <span><small>Make</small><strong>BMW</strong></span>
        <span><small>Model</small><strong>iX</strong></span>
        <span><small>Colour</small><strong>Blue</strong></span>
      </span>
    </div>
  );
}

const projectVisuals = {
  quizloom: QuizloomVisual,
  autolens: AutoLensVisual,
} satisfies Record<ProjectVisualId, ComponentType>;

export function ProjectVisual({ visual }: { visual: ProjectVisualId }) {
  const Visual = projectVisuals[visual];
  return <Visual />;
}
