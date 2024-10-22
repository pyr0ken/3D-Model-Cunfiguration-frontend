import { CircleLoader } from "react-spinners";

export default function ImageTo3dLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="flex flex-col items-center justify-center gap-y-5 mb-24">
        <CircleLoader color="blue" size={170} />
        <div className="flex flex-col gap-y-2 text-center font-bold text-white">
          <p className="text-xl">در حال ساختن مدل ۳ بعدی با هوش مصنوعی...</p>
          <p className="text-md">
            این فرآیند بسته بر پیچیدگی عکس ممکن است تا دقایقی زمانبر باشد.
          </p>
        </div>
      </div>
    </div>
  );
}
