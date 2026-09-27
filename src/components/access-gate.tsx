"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

type AccessGateProps = { onEnter: () => void };
type AccessState = "input" | "verifying" | "granted";

export function AccessGate({ onEnter }: AccessGateProps) {
  const [visible, setVisible] = useState(true);
  const [digits, setDigits] = useState("");
  const [state, setState] = useState<AccessState>("input");
  const reducedMotion = useReducedMotion();
  const verifyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const grantAccess = useCallback(() => {
    if (digits.length !== 4 || state !== "input") return;
    setState("verifying");
    verifyTimer.current = setTimeout(() => {
      setState("granted");
      sessionStorage.setItem("ankush-portfolio-access", "granted");
      exitTimer.current = setTimeout(() => {
        setVisible(false);
        onEnter();
      }, reducedMotion ? 80 : 700);
    }, reducedMotion ? 80 : 520);
  }, [digits.length, onEnter, reducedMotion, state]);

  useEffect(() => {
    if (sessionStorage.getItem("ankush-portfolio-access") === "granted") {
      const frame = requestAnimationFrame(() => {
        setVisible(false);
        onEnter();
      });
      return () => cancelAnimationFrame(frame);
    }
  }, [onEnter]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (!visible || state !== "input") return;
      if (/^\d$/.test(event.key)) {
        setDigits((current) => (current.length < 4 ? current + event.key : current));
      } else if (event.key === "Backspace") {
        setDigits((current) => current.slice(0, -1));
      } else if (event.key === "Enter") {
        grantAccess();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [grantAccess, state, visible]);

  useEffect(() => {
    return () => {
      if (verifyTimer.current) clearTimeout(verifyTimer.current);
      if (exitTimer.current) clearTimeout(exitTimer.current);
    };
  }, []);

  function addDigit(digit: string) {
    if (state === "input") setDigits((current) => (current.length < 4 ? current + digit : current));
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.section
          className="access-gate"
          aria-label="Portfolio access"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: reducedMotion ? 0 : "-4%" }}
          transition={{ duration: reducedMotion ? 0.1 : 0.75, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="access-topline">
            <span>ANKUSH.</span>
            <span>PORTFOLIO ACCESS</span>
          </div>

          <div className="access-center" aria-live="polite">
            <p className="access-index">A/01</p>
            <h1>{state === "granted" ? "ACCESS GRANTED" : state === "verifying" ? "VERIFYING" : "ENTER"}</h1>
            <div className="digit-display" aria-label={`${digits.length} of 4 digits entered`}>
              {[0, 1, 2, 3].map((index) => (
                <span key={index} className={digits.length > index ? "filled" : ""} />
              ))}
            </div>
            <p className="access-instruction">
              {state === "input" ? "ENTER ANY 4 DIGITS" : state === "verifying" ? "CHECKING INPUT" : "WELCOME IN"}
            </p>
            {state === "input" && (
              <div className="access-controls">
                <div className="number-pad" aria-label="Numeric keypad">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number) => (
                    <button key={number} type="button" onClick={() => addDigit(String(number))}>
                      {number}
                    </button>
                  ))}
                </div>
                <div className="access-actions">
                  <button type="button" onClick={() => setDigits((value) => value.slice(0, -1))} disabled={!digits.length}>
                    Backspace
                  </button>
                  <button type="button" className="enter-button" onClick={grantAccess} disabled={digits.length !== 4}>
                    Enter ↗
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="access-bottomline">
            <span>NO PASSWORD REQUIRED</span>
            <span>4 DIGITS · ANY COMBINATION</span>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
