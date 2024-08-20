import React from "react";

import type { HighlightProps } from "./highlight.type";

const Highlight: React.FC<HighlightProps> = ({ text, searchTerm }) => {
  if (!searchTerm) {
    return <span>{text}</span>;
  }

  const parts = text.split(new RegExp(`(${searchTerm})`, "gi"));

  return (
    <span>
      {parts.map((part, index) =>
        part.toLowerCase() === searchTerm.toLowerCase() ? (
          <mark key={index}>{part}</mark>
        ) : (
          <span key={index}>{part}</span>
        ),
      )}
    </span>
  );
};

export { Highlight };
