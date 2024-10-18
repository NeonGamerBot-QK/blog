import Giscus from "@giscus/react";
import React from "react";
// TODO: READ https://dev.to/melvnl/add-comment-system-to-your-static-site-with-giscus-482o
export default function GiscusComp() {
  return (
    <Giscus
      id="comments"
      repo="NeonGamerBot-QK/blog"
      repoId="R_kgDOM8DnFQ"
      category="General"
      categoryId="DIC_kwDOM8DnFc4Cjakf"
      mapping="title"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="1"
      inputPosition="bottom"
      theme="/custom_giscus.css"
      lang="en"
      loading="lazy"
    />
  );
}
