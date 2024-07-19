import { ChevronLeftIcon } from "@heroicons/react/24/outline";

const RoomToolBoxLink = ({ children, name, componentName, setSelectedTab, selectedTab = null }) => {
  const handleClick = () => {
    // setSelectedProject(null);
    setTimeout(() => {
      setSelectedTab(componentName);
    }, 150);
  };

  return (
    <div
      title={name}
      onClick={handleClick}
      className={`${selectedTab === componentName ? "bg-leva-3/80 text-white" : "hover:bg-leva-3/30 hover:stroke-neutral-100 hover:text-neutral-100" } flex cursor-pointer place-items-center gap-3 rounded-lg stroke-neutral-400 p-2 text-neutral-400 transition-colors duration-100`}
    >
      {children}
      <div className="flex w-full place-items-center justify-start overflow-auto">
        <p className="w-full truncate whitespace-nowrap text-inherit">{name}</p>
        <ChevronLeftIcon className="size-8 stroke-inherit stroke-[0.75]" />
      </div>
    </div>
  );
};

export default RoomToolBoxLink;
