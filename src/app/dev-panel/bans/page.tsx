import BansList from "./components/BansList";

export const metadata = {
  title: "Bans Management - ClanLabs",
  description: "Manage banned users and groups in your Roblox community",
};

export default function BansPage() {
  return (
    <BansList />
  );
}