import AiModels from "@/lib/models";
import AiModelFC from "./components/aiModel";

export default function Home() {
  return (
    <main className="px-4 lg:px-0 flex justify-center flex-col items-center">
      <section className="flex justify-center flex-col items-center py-6 lg:py-12 gap-y-6 lg:gap-y-12">
        <h1 className="text-4xl lg:text-7xl font-extrabold text-center leading-snug lg:leading-tight">
          Generates an{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-tr from-blue-400 to-blue-600 dark:from-blue-400 dark:to-blue-200">
            Video
          </span>{" "}
          <br className="hidden lg:inline-block" /> just from{" "}
          <span className="bg-black text-white dark:text-black dark:bg-white">
            [text]
          </span>
        </h1>
        <p className="lg:text-lg text-slate-600 dark:text-slate-200 text-center border dark:border-white px-8 py-1 rounded-full">
          Generated over <b>400</b> images!
        </p>
        <p className="lg:text-xl text-slate-800 dark:text-slate-200 text-center hidden">
          Powered by{" "}
          <a
            href="/"
            target="_blank"
            className="hover:underline underline-offset-4"
          >
            Stable Diffusion
          </a>{" "}
          with{" "}
          <a
            href="/"
            target="_blank"
            className="hover:underline underline-offset-4"
          >
            Replicate
          </a>
        </p>
      </section>
      <section className="max-w-5xl">
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
          {AiModels.map((model, idx) => {
            return <AiModelFC model={model} key={idx} />;
          })}
        </div>
      </section>
    </main>
  );
}
