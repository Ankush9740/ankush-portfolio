import { Camera, CarFront, Check, FileText, Folder, RotateCcw, ScanLine } from "lucide-react";
import type { ComponentType } from "react";

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

export function AutrixVisual() {
  return (
    <div
      className="autrix-visual"
      role="img"
      aria-label="Autrix scanning a vehicle photograph and identifying a yellow Audi R8"
    >
      <div className="autrix-input-panel">
        <span className="autrix-panel-heading"><strong>AUTRIX</strong><small>Visual input</small></span>
        <span className="autrix-vehicle-preview" aria-hidden="true">
          <i className="autrix-focus-corners" />
          <CarFront className="autrix-car-icon" strokeWidth={1.25} />
          <i className="autrix-scan-line" />
        </span>
        <span className="autrix-input-ready"><Camera aria-hidden="true" />Vehicle photograph</span>
      </div>

      <div className="autrix-processing" aria-hidden="true">
        <span className="autrix-transfer-line"><i /></span>
        <span className="autrix-processing-state"><ScanLine /><small>Qwen Vision</small><strong>Analyzing</strong></span>
      </div>

      <div className="autrix-result-panel">
        <span className="autrix-result-state"><Check aria-hidden="true" />Vehicle identified</span>
        <strong className="autrix-result-name">Audi R8</strong>
        <span className="autrix-result-fields">
          <span><small>Make</small><strong>Audi</strong></span>
          <span><small>Model</small><strong>R8</strong></span>
          <span><small>Colour</small><strong>Yellow</strong></span>
        </span>
        <span className="autrix-result-complete"><i />Estimate ready</span>
      </div>
    </div>
  );
}

export function ApiSentinelVisual() {
  return (
    <div
      className="api-sentinel-visual"
      role="img"
      aria-label="API Sentinel sending a GET request and validating a successful JSON response"
    >
      <div className="api-sentinel-request">
        <span className="api-sentinel-method">GET</span>
        <code className="api-sentinel-url">/api/users/1</code>
        <span className="api-sentinel-send">Send</span>
      </div>
      <span className="api-sentinel-progress" aria-hidden="true"><i /></span>
      <div className="api-sentinel-response">
        <div className="api-sentinel-response-meta">
          <strong>200 OK</strong>
          <span>23 ms</span>
        </div>
        <code className="api-sentinel-json" aria-hidden="true">
          <span>{"{"}</span>
          <span>&nbsp;&nbsp;&quot;id&quot;: 1,</span>
          <span>&nbsp;&nbsp;&quot;status&quot;: &quot;active&quot;</span>
          <span>{"}"}</span>
        </code>
        <div className="api-sentinel-assertion">
          <span><i>✓</i> Status = 200</span>
          <strong>1/1 passed</strong>
        </div>
      </div>
    </div>
  );
}

export function FilePilotVisual() {
  return (
    <div
      className="filepilot-visual"
      role="img"
      aria-label="FilePilot scanning a local folder, finding an exact duplicate, and preparing a reversible organization plan"
    >
      <div className="filepilot-titlebar">
        <span className="filepilot-window-controls" aria-hidden="true"><i /><i /><i /></span>
        <strong>FILEPILOT</strong>
        <small>LOCAL / WINDOWS</small>
      </div>
      <div className="filepilot-workspace">
        <div className="filepilot-folder">
          <Folder aria-hidden="true" strokeWidth={1.4} />
          <span><small>Unsorted folder</small><strong>248 files</strong></span>
        </div>
        <span className="filepilot-scan-track" aria-hidden="true"><i /></span>
        <div className="filepilot-files" aria-hidden="true">
          <span className="filepilot-file filepilot-file-one"><FileText strokeWidth={1.45} /><i>DOC</i></span>
          <span className="filepilot-file filepilot-file-two"><FileText strokeWidth={1.45} /><i>IMG</i></span>
          <span className="filepilot-file filepilot-file-three"><FileText strokeWidth={1.45} /><i>ZIP</i></span>
          <span className="filepilot-file filepilot-file-four"><FileText strokeWidth={1.45} /><i>PDF</i></span>
        </div>
        <div className="filepilot-categories">
          <span><i />Documents</span>
          <span><i />Media</span>
          <span><i />Archives</span>
        </div>
        <div className="filepilot-duplicate">
          <span className="filepilot-duplicate-files" aria-hidden="true"><FileText /><FileText /></span>
          <span><small>Exact duplicate</small><strong>SHA-256 match</strong></span>
        </div>
      </div>
      <div className="filepilot-status">
        <span className="filepilot-plan"><Check aria-hidden="true" />Safe plan ready</span>
        <span className="filepilot-undo"><RotateCcw aria-hidden="true" />Undo verified</span>
      </div>
    </div>
  );
}

/**
 * Add a custom project visual:
 * 1. Create its dedicated component in this file (for example, FutureProjectVisual).
 * 2. Register a unique identifier below; the registry key becomes its ProjectVisualId.
 * 3. Use that same identifier in the project's `visual` field in projects.ts.
 * 4. Add uniquely prefixed styles/animations in globals.css (for example, `.future-project-*`).
 */
const projectVisuals = {
  quizloom: QuizloomVisual,
  autrix: AutrixVisual,
  apiSentinel: ApiSentinelVisual,
  filepilot: FilePilotVisual,
} satisfies Record<string, ComponentType>;

export type ProjectVisualId = keyof typeof projectVisuals;

export function ProjectVisual({ visual }: { visual: ProjectVisualId }) {
  const Visual = projectVisuals[visual];
  if (!Visual) return null;

  return <Visual />;
}
