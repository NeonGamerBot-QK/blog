import React from "react";
import { format } from "date-fns";
import { type CollectionEntry } from "astro:content";
function formattedDate(date: Date) {
  function getOrdinal(num: number) {
    const suffixes = ["th", "st", "nd", "rd"];
    const val = num % 100;
    return num + (suffixes[(val - 20) % 10] || suffixes[val] || suffixes[0]);
  }

  const formattedDate =
    format(date, "MMMM ") +
    getOrdinal(date.getDate()) +
    " " +
    format(date, "yyyy");

  return formattedDate;
}

export default function OgHome({
  posts,
}: {
  posts: CollectionEntry<"blog">[];
}) {
  return (
    <div
      style={{
        background: "#1e1e2e",
        color: "#cdd6f4",
        padding: "1rem",
        display: "flex",
        textAlign: "center",
        height: "100%",
        width: "100%",
        paddingTop: "16px",
        flexDirection: "column",
      }}
    >
      <h1 style={{}}>Saahil's Blog</h1>
      <p>My {posts.length} blogs</p>
      <span>Last posted blog  {formattedDate(posts.reverse().filter(e=>e.data.date.getTime() < Date.now())[0].data.date)}</span>
    </div>
  );
}
