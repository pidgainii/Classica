import { Outlet } from "react-router";
import SettingsNavigationBar from "../../Components/ui/SettingsNavigationBar";

export default function SettingsPage() {
  return (
    <div>
      <h1>Settings</h1>
      <SettingsNavigationBar />

      {/* GeneralSettingsPage or DeleteAccountPage */}
      <Outlet />
    </div>
  );
}
