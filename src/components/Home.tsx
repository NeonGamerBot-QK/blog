import React from "react";

export default function HomePage({ files }) {
  // const files = getCollection;
  //TODO: Add your code here
  // console.debug(files[0]);
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="lg:max-w-xl max-w-md">
          <h1 className="text-5xl font-bold">Home Page</h1>
          <div className="gap-6 pt-10 items-center">
            {files
              .filter((f) => f.data.date.getTime() < Date.now())
              .map((file, i) => (
                <div
                  key={i}
                  className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl m-5"
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
                      <a
                        className="text-base btn btn-primary"
                        style={{}}
                        href={`/read/${file.slug}`}
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
