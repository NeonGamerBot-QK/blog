import React from "react";
export default function HomePage({ files }) {
  // const ackee = getClient()
  // const files = getCollection;
  //TODO: Add your code here
//  window.console.log(files[0]);
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="lg:max-w-xl max-w-md">
          <h1 className="text-5xl font-bold">Blogs</h1>
          <div className="gap-6 pt-10 items-center">
            {files
              .filter((f) => f.data.date.getTime() < Date.now())
              .map((file, i) => (
                <div
                  key={i}
                  className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl m-10 h-1/2"
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

                        onClick={() => {
                          //                       window.ackeeTracker.create(`ee0b7b5c-cd10-4e1f-a6b2-5c40c8f5473b`).action(`02edb20f-d68d-498f-a124-4c13cf8395a4`, {
                          //                     key: file.data.title,
                          //                   value: 1
                          //               })
                          //
                          location.pathname =
                            "/read/" + file.id.replace("src/content/blog/", "");
                          console.log(`$click`);
                        }}
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
    </div>
  );
}
