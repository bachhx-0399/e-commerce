import type { HighlightProps } from "./highlight.type";

const Highlight: React.FC<HighlightProps> = ({
  text,
  searchTerm,
  truncate = false,
  truncateLength = 100,
}) => {
  const truncateText = (rawText: string) => {
    if (rawText.length <= truncateLength) {
      return rawText;
    }
    return `${text.slice(0, truncateLength)}...`;
  };

  if (searchTerm) {
    const parts = text.split(new RegExp(`(${searchTerm})`, "gi"));

    if (truncate) {
      const highlightIndex = parts.findIndex(
        (part) => part.toLowerCase() === searchTerm.toLowerCase(),
      );

      if (highlightIndex === -1) {
        return <span>{truncateText(text)}</span>;
      }

      const beforeHighlight = parts.slice(0, highlightIndex).join("");
      const afterHighlight = parts.slice(highlightIndex + 1).join("");

      const truncatedText = `${beforeHighlight.length > 20 ? "..." : ""}${beforeHighlight.slice(-20)}${parts[highlightIndex]}${afterHighlight.slice(0, 20)}${afterHighlight.length > 20 ? "..." : ""}`;

      const truncatedParts = truncatedText.split(
        new RegExp(`(${searchTerm})`, "gi"),
      );

      return (
        <span>
          {truncatedParts.map((part, index) =>
            part.toLowerCase() === searchTerm.toLowerCase() ? (
              <mark key={index}>{part}</mark>
            ) : (
              <span key={index}>{part}</span>
            ),
          )}
        </span>
      );
    }

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
  }

  return <span>{truncate ? truncateText(text) : text}</span>;
};

export { Highlight };
