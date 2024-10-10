import fs from "fs";
import React from "react";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getBlogData, getBlogFileNames, type File } from "../util";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default function HomePage({}) {
  const files = getBlogData();
  //TODO: Add your code here
  // console.debug(files[0]);
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="lg:max-w-xl max-w-md">
          <h1 className="text-5xl font-bold">Home Page</h1>
          <div className="grid">
            {files.map((file: File, i) => (
              <div
                key={i}
                className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl"
              >
                <figure>
                  <img
                    src={file.config.cover}
                    alt={file.config.title}
                    className="w-full h-full"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{file.config.title}</h2>
                  <p>{file.config.description}</p>
                  <div className="card-actions justify-end">
                    <a
                      className="btn btn-primary"
                      style={{ color: "var(--text)" }}
                      href={`/read/${file.fileName.replace(/\.md$/, "")}`}
                    >
                      Read
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
