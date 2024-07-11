import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useEditModelsDashboard from "../../hooks/dashboard/useEditModelsChart";
import useRoomMembersDashboard from "../../hooks/dashboard/useRoomMembersChart";
import useDashboardCard from "../../hooks/dashboard/useDashboardCard";
import { FaUpload } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { FaNoteSticky } from "react-icons/fa6";

export default function DashboardMainPage() {
  const { data: editModels, isLoading: editModelsIsLoading } =
    useEditModelsDashboard();
  const { data: roomMembers, isLoading: roomMembersIsLoading } =
    useRoomMembersDashboard();
  const { data: dashboardCard, isLoading: dashboardCardIsLoading } =
    useDashboardCard();

  return (
    <div className="mx-10 my-8 flex flex-col justify-between">
      <div className="flex text-white">
        <div className="flex flex-col gap-y-3">
          {!roomMembersIsLoading && (
            <>
              <p className="ml-10 text-center text-2xl">
                نمودار جلسات شما و تعداد اعضا
              </p>
              <AreaChart
                width={700}
                height={400}
                data={roomMembers}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <Area
                  type="monotone"
                  dataKey="members"
                  stroke="rgb(59,130,246)"
                />
                <CartesianGrid stroke="#fff4" strokeDasharray="3 3" />
                <XAxis dataKey="title" />
                <YAxis dataKey="members" />
                <Tooltip
                  labelStyle={{ color: "#fff" }}
                  itemStyle={{
                    textShadow:
                      "0 0 5px rgb(59,130,246), 0 0 5px rgb(59,130,246)",
                    color: "#fff",
                  }}
                  contentStyle={{
                    background: "#fff4",
                    border: 0,
                    borderRadius: "5px",
                  }}
                />
              </AreaChart>
            </>
          )}
        </div>
        <div className="flex flex-col gap-y-3">
          {!editModelsIsLoading && (
            <>
              <p className="ml-10 text-center text-2xl">
                نمودار مدل های ویرایش شده و تعداد نقطه ها
              </p>
              <AreaChart
                width={800}
                height={400}
                data={editModels}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <Area
                  type="monotone"
                  dataKey="points"
                  stroke="rgb(59,130,246)"
                />
                <CartesianGrid stroke="#fff4" strokeDasharray="3 3" />
                <XAxis dataKey="display_name" />
                <YAxis dataKey="points" />
                <Tooltip
                  labelStyle={{ color: "#fff" }}
                  itemStyle={{
                    textShadow:
                      "0 0 5px rgb(59,130,246), 0 0 5px rgb(59,130,246)",
                    color: "#fff",
                  }}
                  contentStyle={{
                    background: "#fff4",
                    border: 0,
                    borderRadius: "5px",
                  }}
                />
              </AreaChart>
            </>
          )}
        </div>
      </div>
      {!dashboardCardIsLoading && (
        <div className="flex mb-10 items-center justify-around text-white dark">
          <div className="flex flex-col items-center justify-center gap-y-5 rounded-xl bg-leva-5 p-6 transition-colors hover:text-leva-3">
            <p className="text-xl">مدل های ادیت شده</p>
            <p>
              <FaUpload className="size-20" />
            </p>
            <p className="text-[4rem]">{dashboardCard.edited_models_count}</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-y-5 rounded-xl bg-leva-5 p-6 transition-colors hover:text-leva-3">
            <p className="text-xl">مدل های آپلود شده</p>
            <p>
              <FaRegEdit className="size-20" />
            </p>
            <p className="text-[4rem]">
              {" "}
              {dashboardCard.uploaded_models_count}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-y-5 rounded-xl bg-leva-5 p-6 px-10 transition-colors hover:text-leva-3">
            <p className="text-xl">نقطه ها</p>
            <p>
              <FaNoteSticky className="size-20" />
            </p>
            <p className="text-[4rem]"> {dashboardCard.points_count}</p>
          </div>
        </div>
      )}
    </div>
  );
}
