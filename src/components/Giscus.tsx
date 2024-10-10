import Giscus from "@giscus/react";
import React from "react";
// TODO: READ https://dev.to/melvnl/add-comment-system-to-your-static-site-with-giscus-482o
export default function GiscusComp() {
  return (
    <Giscus
      id="comments"
      repo="NeonGamerBot-QK/blog"
      repoId=""
      category="Announcements"
      categoryId="DIC_kwDOF1L2fM4B-hVS"
      mapping="specific"
      term="Blog comments"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="/custom_giscus.css"
      lang="en"
      loading="lazy"
    />
  );
}
