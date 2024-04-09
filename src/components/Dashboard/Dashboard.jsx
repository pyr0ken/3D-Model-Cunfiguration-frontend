import NavigationDash from "./NavigationDash";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <>
      <main className="flex h-screen">
        <NavigationDash />
        <Outlet />
      </main>
    </>
  );
}
