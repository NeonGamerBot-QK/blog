import React from "react";
export default function HomePage({ files }) {
  // const ackee = getClient()
  // const files = getCollection;
  //TODO: Add your code here
  // future neon here: vrovrovrooro
  //  window.console.log(files[0]);
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center flex-col">
        <div className="lg:max-w-xl max-w-md">
          <h1 className="text-5xl font-bold">Blogs</h1>
        </div>

        {/* Grid container */}
        <div className="grid gap-2 pt-10 sm:grid-cols-2 lg:grid-cols-3">
          {files
            .filter((f) => f.data.date.getTime() < Date.now())
            .map((file, i) => (
              <div
                key={i}
                className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl m-10"
              >
                <figure>
                  <img
                    src={file.data.cover}
                    alt={file.data.title}
                    className="w-full h-full"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{file.data.title}</h2>
                  <p>{file.data.description}</p>
                  <div className="card-actions justify-end">
                    <button
                      className="text-base btn btn-primary"
                      style={{}}
                      //@ts-ignore
                      data-to={
                        "/read/" + file.id.replace("src/content/blog/", "")
                      }
                      data-ackee-action={file.data.title}
                      // href={`/read/${file.id.replace("src/content/blog/", "")}`}
                    >
                      Read
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
