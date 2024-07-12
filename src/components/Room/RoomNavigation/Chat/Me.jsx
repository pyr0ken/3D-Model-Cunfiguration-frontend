import moment from "moment";

export default function Me({ text, time }) {
  return (
    <div className="col-start-7 col-end-13 rounded-lg">
      <div className="flex flex-col">
        <div className="relative rounded-xl bg-leva-3/70 px-4 py-2 text-sm text-white shadow">
          <div className="flex flex-col">
            <p>{text}</p>
            <span className="text-sm font-semibold italic text-neutral-800">
              {moment(time).format('LTS')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
