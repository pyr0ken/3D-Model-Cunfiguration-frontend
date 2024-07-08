import moment from "moment";

export default function Sender({ name, text, time }) {
  return (
    <div className="col-start-1 col-end-8 rounded-lg">
      <div className="flex flex-col">
        <div className="relative rounded-xl bg-gray-400 px-4 py-2 text-sm text-black shadow">
          <div className="flex flex-col">
            <span className="text-sm font-semibold italic text-neutral-800">
              "{name}" : 
            </span>
            <p>{text}</p>
            <span className="text-sm font-semibold italic text-gray-800">
              {moment(time).format('LTS')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
