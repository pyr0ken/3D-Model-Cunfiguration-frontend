import NavigationDash from "./NavigationDash";

export default function Dashboard() {
  return (
    <>
      <main className="w-full h-screen flex flex-row relative">
        <NavigationDash />
        {/* <h1 className="text-white flex-1 absolute left-[40%] top-2">
          Hello I am 3 TIMES NOWWWWWWWWWWWWWWW
        </h1> */}
        <div className="flex-1 gap-4">
          {[
            [24, 32, 32, 16, 16],
            [32, 40, 56],
            [64, 32, 32],
          ].map((card, index) => (
            <div className="flex-1" key={index}>
              {card.map((height, index) => (
                <div
                  className={`mb-4 h-${height} rounded-xl border-2 border-slate-400/10 p-4 bg-neutral-900`}
                  key={index}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
