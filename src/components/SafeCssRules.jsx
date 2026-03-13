// SafeCssRules.jsx
import { useEffect } from "react";

export default function SafeCssRules() {
  useEffect(() => {
    for (const sheet of document.styleSheets) {
      try {
        const rules = sheet.cssRules;
        if (rules) {
          console.log("Rules from stylesheet:", sheet.href, rules);
        }
      } catch (err) {
        if (err instanceof DOMException && err.name === "SecurityError") {
          console.warn("Cannot access cssRules for cross-origin stylesheet:", sheet.href);
        } else {
          console.error(err);
        }
      }
    }
  }, []);

  return null; // No UI needed
}