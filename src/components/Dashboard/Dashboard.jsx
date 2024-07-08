import NavigationDash from "./Navigation/NavigationDash";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <>
      <main className="flex h-screen overflow-hidden">
        <NavigationDash />
        <Outlet />
      </main>
    </>
  );
}
