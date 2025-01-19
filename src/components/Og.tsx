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

export default function Og({
  blogData,
  origin,
}: {
  blogData: CollectionEntry<"blog">;
  origin: string;
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
      <h1>{blogData.data.title}</h1>
      <p>{blogData.data.description}</p>
      <span>Posted on {formattedDate(blogData.data.date)}</span>
      <img
        src={
          origin + blogData.data.cover
        }
        width={200}
        height={200}
        style={{
          maxWidth: "60%",
          maxHeight: "60%",
          borderRadius: "50px",
          paddingTop: "10px",
        }}
      />
    </div>
  );
}
