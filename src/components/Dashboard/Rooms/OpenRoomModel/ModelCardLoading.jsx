import { Skeleton } from "@nextui-org/react";

export default function ModelCardLoading() {
  return (
    <div className="relative mt-4 max-w-md cursor-pointer overflow-hidden rounded-xl border border-neutral-800 bg-gradient-to-r from-neutral-900 to-neutral-950 px-8 py-10 text-center shadow-2xl dark">
      <Skeleton className="mb-4 inline-flex items-center justify-center rounded-full bg-default-200 p-3 shadow-lg">
        <div className="h-10 w-10 bg-default-300"></div>
      </Skeleton>
      <Skeleton>
        <h3 className="h-6 w-0"></h3>
      </Skeleton>
    </div>
  );
}
