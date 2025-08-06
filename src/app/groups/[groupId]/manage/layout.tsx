"use client";

import { useParams } from "next/navigation";
import GroupManageSidebar from "@/components/dashboard/group-manage/GroupManageSidebar";
import DashboardLayout from "@/components/dashboard/layout/DashboardLayout";

export default function GroupManageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const groupId = params.groupId as string;

  return (
    <DashboardLayout customSidebar={<GroupManageSidebar groupId={groupId} />}>
      <div className="p-8">{children}</div>
    </DashboardLayout>
  );
}