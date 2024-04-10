import { ImageModels, VideoModels } from "@/lib/models";
import VideoModelFC from "../components/videoModel";
import { useState } from "react";
import useEthers from "@/hooks/useEthers";
import { baseAbi } from "@/abis/baseAbi";
import ImageModelFC from "@/components/imageModel";

const TabTypes = {
  videos: 0,
  images: 1,
};

export default function Home() {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(0);
  const { autoBaseHandler, web3 } = useEthers();
  const [tabValue, setTabValue] = useState(TabTypes.videos);

  const connectHandler = async () => {
    const success = await autoBaseHandler();
    if (success) {
      const accounts = await web3.eth.getAccounts();
      setAddress(accounts[0]);
      const tokenAddress = "0xC2464FB6eDC12e4c0D3aA9B201497A27e6b7eF04";
      const tokenContract = new web3.eth.Contract(baseAbi, tokenAddress);
      const balance = await tokenContract.methods.balanceOf(accounts[0]).call();
      setBalance(parseFloat(balance) / 10 ** 18);
    }
  };

  return (
    <main className="px-4 lg:px-0 flex justify-center flex-col items-center min-h-dvh">
      <div className="flex justify-center mb-4 mt-4">
        <img
          className="w-20 h-20"
          src={"/assets/baseai.png"}
          alt="baseai logo"
        />
      </div>
      {!address || address == "" ? (
        <div className="flex flex-col justify-center items-center gap-4">
          <h1 className="text-3xl lg:text-5xl font-extrabold text-center leading-snug lg:leading-tight">
            BaseAI video creator
          </h1>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={connectHandler}
          >
            Connect Metamask
          </button>
        </div>
      ) : (
        <>
          {/* 50000 */}
          {balance >= 0 ? (
            <>
              <section className="flex justify-center flex-col items-center py-6 lg:py-12 gap-y-6 lg:gap-y-12">
                <h1 className="text-4xl lg:text-7xl font-extrabold text-center leading-snug lg:leading-tight">
                  Generates an{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-tr from-blue-400 to-blue-600 dark:from-blue-400 dark:to-blue-200">
                    Video and Image
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
                <div className="border-b border-gray-200 dark:border-gray-700">
                  <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                    <li
                      className="me-2"
                      onClick={() => setTabValue(TabTypes.videos)}
                    >
                      <div
                        className={
                          tabValue === TabTypes.videos
                            ? "inline-flex items-center justify-center p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group cursor-pointer"
                            : "inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group cursor-pointer"
                        }
                      >
                        Video
                      </div>
                    </li>
                    <li
                      className="me-2"
                      onClick={() => setTabValue(TabTypes.images)}
                    >
                      <div
                        className={
                          tabValue === TabTypes.images
                            ? "inline-flex items-center justify-center p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group cursor-pointer"
                            : "inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group cursor-pointer"
                        }
                      >
                        Image
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 pt-4">
                  {tabValue === TabTypes.videos && (
                    <>
                      {VideoModels.map((model, idx) => {
                        return <VideoModelFC model={model} key={idx} />;
                      })}
                    </>
                  )}

                  {tabValue === TabTypes.images && (
                    <>
                      {ImageModels.map((model, idx) => {
                        return <ImageModelFC model={model} key={idx} />;
                      })}
                    </>
                  )}
                </div>
              </section>
            </>
          ) : (
            <h1 className="text-3xl lg:text-5xl font-extrabold text-center leading-snug lg:leading-tight">
              Balance is not enough
            </h1>
          )}
        </>
      )}
    </main>
  );
}
