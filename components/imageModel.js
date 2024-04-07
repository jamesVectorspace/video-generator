import { useRouter } from "next/router";

export default function ImageModelFC({ model }) {
  const router = useRouter();
  return (
    <div
      className="w-full cursor-pointer"
      onClick={() =>
        router.push({
          pathname: `/image-generator/${model.id}`,
        })
      }
    >
      <img
        className="rounded-lg hover:md:scale-105 transition lg:h-80 lg:w-80 object-cover w-full"
        src={model.url}
      />
      <h4 className="inline-block group-focus:bg-black mt-3" translate="no">
        <span className="text-r8-gray-10 group-focus:text-white">
          {model.name}
        </span>
      </h4>
    </div>
  );
}
