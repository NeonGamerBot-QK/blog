import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// const markdown = `Just a link: www.nasa.gov.`;

export default function MarkdownPage({ markdown }) {
  //@ts-ignore
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} className="markdown-page">
      {markdown}
    </ReactMarkdown>
  );
}
