import { BounceLoader } from "react-spinners";

export default function JoinLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="flex flex-col items-center justify-center rounded-lg bg-leva-2 p-16 shadow-2xl shadow-leva-2">
        <BounceLoader color="#007BFF" />
        <h1 className="mt-4 text-xl font-bold text-gray-300">درحال ملحق شدن...</h1>
      </div>
    </div>
  );
}
