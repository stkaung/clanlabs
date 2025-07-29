"use client";
import { useState, useEffect } from "react";
import useTheme from "@/hooks/useTheme";
import BotAccountCard from "./BotAccountCard";

interface BotAccountData {
  id: string;
  name: string;
  avatar: string;
  groupCount: number;
  isDefault: boolean;
  isDevelopment: boolean;
}

interface BotAccountsGridProps {
  searchQuery?: string;
  onCreateBotAccount?: () => void;
}

function BotAccountsGrid({
  searchQuery = "",
  onCreateBotAccount,
}: BotAccountsGridProps) {
  const theme = useTheme();
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [displayedCount, setDisplayedCount] = useState<number>(0);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(12); // Show 12 bot accounts per page

  // Mock data - replace with actual data from API
  const [botAccounts] = useState<BotAccountData[]>([
    // Development bots (first 20)
    {
      id: "1",
      name: "ClanLabs38",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 24,
      isDefault: true,
      isDevelopment: true,
    },
    {
      id: "2",
      name: "ClanLabsBot2",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 12,
      isDefault: true,
      isDevelopment: true,
    },
    {
      id: "3",
      name: "ClanLabsTestBot",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 3,
      isDefault: true,
      isDevelopment: true,
    },
    {
      id: "4",
      name: "DevBot_Alpha",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 8,
      isDefault: false,
      isDevelopment: true,
    },
    {
      id: "5",
      name: "TestRunner_Beta",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 15,
      isDefault: false,
      isDevelopment: true,
    },
    {
      id: "6",
      name: "ClanDev_001",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 5,
      isDefault: false,
      isDevelopment: true,
    },
    {
      id: "7",
      name: "DebugBot_X1",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 2,
      isDefault: false,
      isDevelopment: true,
    },
    {
      id: "8",
      name: "StagingBot_A",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 18,
      isDefault: false,
      isDevelopment: true,
    },
    {
      id: "9",
      name: "ClanTest_Prime",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 7,
      isDefault: false,
      isDevelopment: true,
    },
    {
      id: "10",
      name: "DevEnv_Bot01",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 11,
      isDefault: false,
      isDevelopment: true,
    },
    {
      id: "11",
      name: "QA_TestBot",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 4,
      isDefault: false,
      isDevelopment: true,
    },
    {
      id: "12",
      name: "AutoTest_V2",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 9,
      isDefault: false,
      isDevelopment: true,
    },
    {
      id: "13",
      name: "ClanDev_002",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 6,
      isDefault: false,
      isDevelopment: true,
    },
    {
      id: "14",
      name: "TestSuite_Bot",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 13,
      isDefault: false,
      isDevelopment: true,
    },
    {
      id: "15",
      name: "DevOps_Helper",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 1,
      isDefault: false,
      isDevelopment: true,
    },
    {
      id: "16",
      name: "ClanTest_002",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 14,
      isDefault: false,
      isDevelopment: true,
    },
    {
      id: "17",
      name: "UnitTest_Bot",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 10,
      isDefault: false,
      isDevelopment: true,
    },
    {
      id: "18",
      name: "Integration_X",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 3,
      isDefault: false,
      isDevelopment: true,
    },
    {
      id: "19",
      name: "ClanDev_003",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 16,
      isDefault: false,
      isDevelopment: true,
    },
    {
      id: "20",
      name: "Sandbox_Bot",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 8,
      isDefault: false,
      isDevelopment: true,
    },

    // Production bots (21-60)
    {
      id: "21",
      name: "ClanProd_001",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 45,
      isDefault: true,
      isDevelopment: false,
    },
    {
      id: "22",
      name: "MainBot_Live",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 67,
      isDefault: true,
      isDevelopment: false,
    },
    {
      id: "23",
      name: "ClanMaster_01",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 89,
      isDefault: true,
      isDevelopment: false,
    },
    {
      id: "24",
      name: "GroupManager_A",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 34,
      isDefault: false,
      isDevelopment: false,
    },
    {
      id: "25",
      name: "ClanBot_Primary",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 56,
      isDefault: false,
      isDevelopment: false,
    },
    {
      id: "26",
      name: "AutoMod_Pro",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 23,
      isDefault: false,
      isDevelopment: false,
    },
    {
      id: "27",
      name: "ClanProd_002",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 78,
      isDefault: false,
      isDevelopment: false,
    },
    {
      id: "28",
      name: "LiveBot_Alpha",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 41,
      isDefault: false,
      isDevelopment: false,
    },
    {
      id: "29",
      name: "ClanMaster_02",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 62,
      isDefault: false,
      isDevelopment: false,
    },
    {
      id: "30",
      name: "GroupBot_Pro",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 29,
      isDefault: false,
      isDevelopment: false,
    },
    {
      id: "31",
      name: "ClanProd_003",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 85,
      isDefault: false,
      isDevelopment: false,
    },
    {
      id: "32",
      name: "ModBot_Live",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 37,
      isDefault: false,
      isDevelopment: false,
    },
    {
      id: "33",
      name: "ClanMaster_03",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 73,
      isDefault: false,
      isDevelopment: false,
    },
    {
      id: "34",
      name: "AdminBot_X1",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 19,
      isDefault: false,
      isDevelopment: false,
    },
    {
      id: "35",
      name: "ClanProd_004",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 91,
      isDefault: false,
      isDevelopment: false,
    },
    {
      id: "36",
      name: "GroupHelper_1",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 52,
      isDefault: false,
      isDevelopment: false,
    },
    {
      id: "37",
      name: "ClanMaster_04",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 64,
      isDefault: false,
      isDevelopment: false,
    },
    {
      id: "38",
      name: "LiveMod_Bot",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 26,
      isDefault: false,
      isDevelopment: false,
    },
    {
      id: "39",
      name: "ClanProd_005",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 88,
      isDefault: false,
      isDevelopment: false,
    },
    {
      id: "40",
      name: "MainHelper_2",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 43,
      isDefault: false,
      isDevelopment: false,
    },
    {
      id: "41",
      name: "ClanMaster_05",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 77,
      isDefault: false,
      isDevelopment: false,
    },
    {
      id: "42",
      name: "GroupAdmin_Y",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 31,
      isDefault: false,
      isDevelopment: false,
    },
    {
      id: "43",
      name: "ClanProd_006",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 69,
      isDefault: false,
      isDevelopment: false,
    },
    {
      id: "44",
      name: "AutoBot_Live",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 54,
      isDefault: false,
      isDevelopment: false,
    },
    {
      id: "45",
      name: "ClanMaster_06",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 82,
      isDefault: false,
      isDevelopment: false,
    },
    {
      id: "46",
      name: "ModHelper_3",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 17,
      isDefault: false,
      isDevelopment: false,
    },
    {
      id: "47",
      name: "ClanProd_007",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 95,
      isDefault: false,
      isDevelopment: false,
    },
    {
      id: "48",
      name: "LiveGroup_Bot",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 38,
      isDefault: false,
      isDevelopment: false,
    },
    {
      id: "49",
      name: "ClanMaster_07",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 71,
      isDefault: false,
      isDevelopment: false,
    },
    {
      id: "50",
      name: "AdminHelper_Z",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 22,
      isDefault: false,
      isDevelopment: false,
    },
    {
      id: "51",
      name: "ClanProd_008",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 58,
      isDefault: false,
      isDevelopment: false,
    },
    {
      id: "52",
      name: "GroupBot_Live",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 46,
      isDefault: false,
      isDevelopment: false,
    },
    {
      id: "53",
      name: "ClanMaster_08",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 83,
      isDefault: false,
      isDevelopment: false,
    },
    {
      id: "54",
      name: "ModBot_Pro",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 27,
      isDefault: false,
      isDevelopment: false,
    },
    {
      id: "55",
      name: "ClanProd_009",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 74,
      isDefault: false,
      isDevelopment: false,
    },
    {
      id: "56",
      name: "LiveAdmin_Bot",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 35,
      isDefault: false,
      isDevelopment: false,
    },
    {
      id: "57",
      name: "ClanMaster_09",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 92,
      isDefault: false,
      isDevelopment: false,
    },
    {
      id: "58",
      name: "GroupMod_4",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 18,
      isDefault: false,
      isDevelopment: false,
    },
    {
      id: "59",
      name: "ClanProd_010",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 66,
      isDefault: false,
      isDevelopment: false,
    },
    {
      id: "60",
      name: "MainBot_Pro",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 49,
      isDefault: false,
      isDevelopment: false,
    },

    // Backup/Utility bots (61-84)
    {
      id: "61",
      name: "BackupBot_001",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 5,
      isDefault: false,
      isDevelopment: false,
    },
    {
      id: "62",
      name: "ClanBackup_A",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 12,
      isDefault: false,
      isDevelopment: false,
    },
    {
      id: "63",
      name: "EmergencyBot_1",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 3,
      isDefault: false,
      isDevelopment: false,
    },
    {
      id: "64",
      name: "UtilityBot_X",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 8,
      isDefault: false,
      isDevelopment: false,
    },
    {
      id: "65",
      name: "BackupBot_002",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 7,
      isDefault: false,
      isDevelopment: false,
    },
    {
      id: "66",
      name: "ClanBackup_B",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 15,
      isDefault: false,
      isDevelopment: false,
    },
    {
      id: "67",
      name: "SpareBot_Alpha",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 2,
      isDefault: false,
      isDevelopment: false,
    },
    {
      id: "68",
      name: "HelperBot_1",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 11,
      isDefault: false,
      isDevelopment: false,
    },
    {
      id: "69",
      name: "BackupBot_003",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 6,
      isDefault: false,
      isDevelopment: false,
    },
    {
      id: "70",
      name: "ClanBackup_C",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 9,
      isDefault: false,
      isDevelopment: false,
    },
    {
      id: "71",
      name: "AuxiliaryBot_2",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 4,
      isDefault: false,
      isDevelopment: false,
    },
    {
      id: "72",
      name: "UtilityBot_Y",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 13,
      isDefault: false,
      isDevelopment: false,
    },
    {
      id: "73",
      name: "BackupBot_004",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 1,
      isDefault: false,
      isDevelopment: false,
    },
    {
      id: "74",
      name: "ClanBackup_D",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 16,
      isDefault: false,
      isDevelopment: false,
    },
    {
      id: "75",
      name: "SpareBot_Beta",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 8,
      isDefault: false,
      isDevelopment: false,
    },
    {
      id: "76",
      name: "HelperBot_2",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 10,
      isDefault: false,
      isDevelopment: false,
    },
    {
      id: "77",
      name: "BackupBot_005",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 14,
      isDefault: false,
      isDevelopment: false,
    },
    {
      id: "78",
      name: "ClanBackup_E",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 3,
      isDefault: false,
      isDevelopment: false,
    },
    {
      id: "79",
      name: "AuxiliaryBot_3",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 7,
      isDefault: false,
      isDevelopment: false,
    },
    {
      id: "80",
      name: "UtilityBot_Z",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 12,
      isDefault: false,
      isDevelopment: false,
    },
    {
      id: "81",
      name: "BackupBot_006",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 5,
      isDefault: false,
      isDevelopment: false,
    },
    {
      id: "82",
      name: "ClanBackup_F",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 9,
      isDefault: false,
      isDevelopment: false,
    },
    {
      id: "83",
      name: "SpareBot_Gamma",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 6,
      isDefault: false,
      isDevelopment: false,
    },
    {
      id: "84",
      name: "HelperBot_3",
      avatar:
        "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/150/150/AvatarHeadshot/Webp/noFilter",
      groupCount: 11,
      isDefault: false,
      isDevelopment: false,
    },
  ]);

  const filteredBotAccounts = botAccounts.filter((bot) =>
    bot.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredBotAccounts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageAccounts = filteredBotAccounts.slice(startIndex, endIndex);

  // Reset to page 1 when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Handle search loading simulation and count animation
  useEffect(() => {
    if (searchQuery) {
      setIsSearching(true);
      const searchTimer = setTimeout(() => {
        setIsSearching(false);
      }, 100);

      return () => clearTimeout(searchTimer);
    } else {
      setIsSearching(false);
    }
  }, [searchQuery]);

  // Animate the count changes instantly for real-time search
  useEffect(() => {
    const targetCount = filteredBotAccounts.length;
    if (displayedCount !== targetCount) {
      const countTimer = setTimeout(
        () => {
          setDisplayedCount(targetCount);
        },
        isSearching ? 120 : 0
      );

      return () => clearTimeout(countTimer);
    }
  }, [filteredBotAccounts.length, displayedCount, isSearching]);

  function handleUpdate(botId: string): void {
    console.log("Updating bot account:", botId);
  }

  function handleDelete(botId: string): void {
    console.log("Deleting bot account:", botId);
  }

  function handleCreateBotAccount(): void {
    if (onCreateBotAccount) {
      onCreateBotAccount();
    } else {
      console.log("Create new bot account");
    }
  }

  function handlePageChange(page: number): void {
    setCurrentPage(page);
  }

  function handlePreviousPage(): void {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function handleNextPage(): void {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <div>
      {/* Section Header */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-2 sm:space-y-0 mb-3">
            <h2
              className={`text-xl sm:text-3xl font-bold transition-all duration-300 ${
                theme === "dark" ? "text-white" : "text-blue-500"
              } ${
                searchQuery ? "scale-95 opacity-80" : "scale-100 opacity-100"
              }`}
              style={{
                fontFamily: "'Poppins', sans-serif",
                textShadow:
                  theme === "dark"
                    ? "0 2px 4px rgba(0, 0, 0, 0.3)"
                    : "0 1px 2px rgba(0, 0, 0, 0.1)",
              }}
            >
              {searchQuery ? "Search Results" : "Bot Accounts"}
            </h2>

            {/* Enhanced Count Badge with Loading State */}
            <div className="relative">
              <div
                className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-bold inline-flex items-center w-fit transition-all duration-300 ${
                  isSearching ? "animate-pulse" : "animate-none"
                } ${
                  searchQuery
                    ? theme === "dark"
                      ? "bg-green-500/20 text-green-300 border border-green-500/30"
                      : "bg-green-100 text-green-700 border border-green-300/30"
                    : theme === "dark"
                    ? "bg-purple-500/20 text-purple-300"
                    : "bg-purple-100 text-purple-700"
                }`}
                style={{
                  boxShadow: searchQuery
                    ? theme === "dark"
                      ? "0 0 0 1px rgba(34, 197, 94, 0.2), 0 2px 8px rgba(34, 197, 94, 0.15)"
                      : "0 0 0 1px rgba(34, 197, 94, 0.1), 0 1px 4px rgba(34, 197, 94, 0.1)"
                    : theme === "dark"
                    ? "0 0 0 1px rgba(147, 51, 234, 0.2), 0 2px 8px rgba(147, 51, 234, 0.15)"
                    : "0 0 0 1px rgba(147, 51, 234, 0.1), 0 1px 4px rgba(147, 51, 234, 0.1)",
                }}
              >
                {isSearching ? (
                  <>
                    <div className="w-3 h-3 mr-1 rounded-full border-2 border-current border-t-transparent animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <i
                      className={`${
                        searchQuery ? "fas fa-search" : "fas fa-robot"
                      } mr-1 transition-all duration-200`}
                    />
                    <span className="transition-all duration-300">
                      {displayedCount} {searchQuery ? "Found" : "Total"}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Enhanced Search Status */}
          <div
            className={`space-y-2 transition-all duration-300 ${
              searchQuery
                ? "opacity-100 max-h-20"
                : "opacity-0 max-h-0 overflow-hidden"
            }`}
          >
            {searchQuery && (
              <div
                className={`flex items-center space-x-2 text-xs transition-all duration-500 ${
                  isSearching ? "opacity-50" : "opacity-100"
                }`}
              >
                <div
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-gray-800/50 border border-gray-700/50"
                      : "bg-gray-50 border border-gray-200/50"
                  }`}
                >
                  <i
                    className={`fas fa-search transition-all duration-200 ${
                      theme === "dark" ? "text-blue-400" : "text-blue-600"
                    }`}
                  />
                  <span
                    className={`transition-all duration-200 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Showing {startIndex + 1}-
                    {Math.min(endIndex, filteredBotAccounts.length)} of{" "}
                    {filteredBotAccounts.length} bot accounts matching{" "}
                    <span
                      className={`font-semibold ${
                        theme === "dark" ? "text-blue-300" : "text-blue-600"
                      }`}
                    >
                      &quot;{searchQuery}&quot;
                    </span>
                  </span>
                  {!isSearching && searchQuery && (
                    <div
                      className={`ml-2 w-2 h-2 rounded-full transition-all duration-200 ${
                        filteredBotAccounts.length > 0
                          ? "bg-green-500 shadow-lg shadow-green-500/30"
                          : "bg-red-500 shadow-lg shadow-red-500/30"
                      }`}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="ml-4 flex-shrink-0">
          <button
            onClick={handleCreateBotAccount}
            className={`flex items-center space-x-2 sm:space-x-3 py-2 sm:py-4 px-4 sm:px-8 rounded-lg font-bold text-white text-xs sm:text-sm transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl whitespace-nowrap ${
              searchQuery ? "opacity-75 hover:opacity-100" : "opacity-100"
            }`}
            style={{
              background: "linear-gradient(135deg, #15803D 0%, #166534 100%)",
              fontFamily: "'Poppins', sans-serif",
              textShadow: "0 1px 2px rgba(0,0,0,0.2)",
              boxShadow:
                theme === "dark"
                  ? "0 8px 25px rgba(21, 128, 61, 0.3), 0 0 0 1px rgba(255,255,255,0.1)"
                  : "0 8px 25px rgba(21, 128, 61, 0.2)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "linear-gradient(135deg, #166534 0%, #15803D 100%)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "linear-gradient(135deg, #15803D 0%, #166534 100%)";
            }}
          >
            <i className="fas fa-plus text-xs sm:text-sm" />
            <span>Add Bot Account</span>
          </button>
        </div>
      </div>

      {/* Pagination Controls - Above Table */}
      {filteredBotAccounts.length > 0 && totalPages > 1 && (
        <div className="mb-6 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          {/* Page Info */}
          <div
            className={`text-sm transition-all duration-300 ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Showing {startIndex + 1} to{" "}
            {Math.min(endIndex, filteredBotAccounts.length)} of{" "}
            {filteredBotAccounts.length} bot accounts
            {searchQuery && (
              <span
                className={`ml-1 ${
                  theme === "dark" ? "text-blue-300" : "text-blue-600"
                }`}
              >
                matching &quot;{searchQuery}&quot;
              </span>
            )}
          </div>

          {/* Pagination Buttons */}
          <div className="flex items-center space-x-2">
            {/* Previous Button */}
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:scale-105"
              }`}
              style={{
                backgroundColor:
                  theme === "dark"
                    ? "rgba(59, 130, 246, 0.15)"
                    : "rgba(59, 130, 246, 0.1)",
                color: theme === "dark" ? "#DBEAFE" : "#1E40AF",
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor:
                  theme === "dark"
                    ? "rgba(59, 130, 246, 0.3)"
                    : "rgba(59, 130, 246, 0.2)",
              }}
            >
              <i className="fas fa-chevron-left mr-1" />
              Previous
            </button>

            {/* Page Numbers */}
            <div className="flex items-center space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => {
                  // Show first page, last page, current page, and pages around current
                  const showPage =
                    page === 1 ||
                    page === totalPages ||
                    Math.abs(page - currentPage) <= 1;

                  if (!showPage && page === 2 && currentPage > 4) {
                    return (
                      <span
                        key="ellipsis-start"
                        className={`px-2 py-1 text-sm ${
                          theme === "dark" ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        ...
                      </span>
                    );
                  }

                  if (
                    !showPage &&
                    page === totalPages - 1 &&
                    currentPage < totalPages - 3
                  ) {
                    return (
                      <span
                        key="ellipsis-end"
                        className={`px-2 py-1 text-sm ${
                          theme === "dark" ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        ...
                      </span>
                    );
                  }

                  if (!showPage) {
                    return null;
                  }

                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 ${
                        page === currentPage ? "shadow-lg" : ""
                      }`}
                      style={{
                        backgroundColor:
                          page === currentPage
                            ? theme === "dark"
                              ? "rgba(59, 130, 246, 0.25)"
                              : "rgba(59, 130, 246, 0.15)"
                            : theme === "dark"
                            ? "rgba(30, 41, 59, 0.4)"
                            : "rgba(241, 245, 249, 0.6)",
                        color:
                          page === currentPage
                            ? theme === "dark"
                              ? "#FFFFFF"
                              : "#1E40AF"
                            : theme === "dark"
                            ? "#CBD5E1"
                            : "#64748B",
                        borderWidth: "1px",
                        borderStyle: "solid",
                        borderColor:
                          page === currentPage
                            ? theme === "dark"
                              ? "rgba(59, 130, 246, 0.4)"
                              : "rgba(59, 130, 246, 0.3)"
                            : "transparent",
                        boxShadow:
                          page === currentPage
                            ? theme === "dark"
                              ? "0 4px 12px rgba(59, 130, 246, 0.2)"
                              : "0 4px 12px rgba(59, 130, 246, 0.15)"
                            : "none",
                      }}
                    >
                      {page}
                    </button>
                  );
                }
              )}
            </div>

            {/* Next Button */}
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:scale-105"
              }`}
              style={{
                backgroundColor:
                  theme === "dark"
                    ? "rgba(59, 130, 246, 0.15)"
                    : "rgba(59, 130, 246, 0.1)",
                color: theme === "dark" ? "#DBEAFE" : "#1E40AF",
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor:
                  theme === "dark"
                    ? "rgba(59, 130, 246, 0.3)"
                    : "rgba(59, 130, 246, 0.2)",
              }}
            >
              Next
              <i className="fas fa-chevron-right ml-1" />
            </button>
          </div>
        </div>
      )}

      {/* Enhanced Bot Accounts List */}
      {filteredBotAccounts.length > 0 ? (
        <div
          className={`transition-all duration-500 ${
            isSearching ? "opacity-50 scale-98" : "opacity-100 scale-100"
          }`}
        >
          {/* Table-like Header */}
          <div
            className={`mb-4 px-6 py-3 rounded-lg border transition-all duration-300 hidden md:block ${
              theme === "dark"
                ? "bg-gray-800/50 border-gray-700/50"
                : "bg-gray-50/80 border-gray-200/50"
            }`}
            style={{ backdropFilter: "blur(8px)" }}
          >
            <div className="flex items-center space-x-6">
              {/* Name Section - matches card left section */}
              <div
                className="flex items-center space-x-4 min-w-0"
                style={{ width: "280px" }}
              >
                <span
                  className={`text-sm font-semibold uppercase tracking-wider ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Name
                </span>
              </div>

              {/* Stats Section - matches card center section */}
              <div className="flex-1 flex items-center justify-center space-x-8">
                <div className="text-center" style={{ width: "80px" }}>
                  <span
                    className={`text-sm font-semibold uppercase tracking-wider ${
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }`}
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Groups
                  </span>
                </div>
                <div className="text-center" style={{ width: "120px" }}>
                  <span
                    className={`text-sm font-semibold uppercase tracking-wider ${
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }`}
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Configuration
                  </span>
                </div>
              </div>

              {/* Actions Section - matches card right section */}
              <div
                className="flex items-center justify-center"
                style={{ width: "200px" }}
              >
                <span
                  className={`text-sm font-semibold uppercase tracking-wider ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Actions
                </span>
              </div>
            </div>
          </div>

          {/* Bot Accounts List */}
          <div className="space-y-3">
            {currentPageAccounts.map((botAccount, index) => (
              <div
                key={botAccount.id}
                className="transition-all duration-300"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: `fadeInUp 0.6s ease-out ${index * 100}ms both`,
                }}
              >
                <BotAccountCard
                  botAccount={botAccount}
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
          className={`text-center py-12 rounded-lg border-2 border-dashed transition-all duration-500 ${
            isSearching ? "opacity-50" : "opacity-100"
          }`}
          style={{
            borderColor: theme === "dark" ? "#2A2A2A" : "#E5E7EB",
            backgroundColor: theme === "dark" ? "#1E1E1E" : "#F9FAFB",
          }}
        >
          {isSearching ? (
            <>
              <div className="w-12 h-12 mx-auto mb-4 rounded-full border-4 border-purple-500 border-t-transparent animate-spin" />
              <h3
                className="text-lg font-medium mb-2"
                style={{ color: theme === "dark" ? "#FFFFFF" : "#1F2937" }}
              >
                Searching...
              </h3>
              <p
                className="text-sm"
                style={{ color: theme === "dark" ? "#A0A0A0" : "#6B7280" }}
              >
                Looking for bot accounts matching &quot;{searchQuery}&quot;
              </p>
            </>
          ) : searchQuery ? (
            <>
              <div
                className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  theme === "dark" ? "bg-gray-800" : "bg-gray-100"
                }`}
              >
                <i
                  className="fas fa-robot text-2xl"
                  style={{ color: theme === "dark" ? "#6B7280" : "#9CA3AF" }}
                />
              </div>
              <h3
                className="text-lg font-medium mb-2"
                style={{ color: theme === "dark" ? "#FFFFFF" : "#1F2937" }}
              >
                No bot accounts found
              </h3>
              <p
                className="text-sm mb-4"
                style={{ color: theme === "dark" ? "#A0A0A0" : "#6B7280" }}
              >
                No bot accounts match &quot;
                <span
                  className={`font-semibold ${
                    theme === "dark" ? "text-purple-300" : "text-purple-600"
                  }`}
                >
                  {searchQuery}
                </span>
                &quot;
              </p>
              <p
                className="text-xs"
                style={{ color: theme === "dark" ? "#6B7280" : "#9CA3AF" }}
              >
                Try searching with different keywords or add a new bot account
              </p>
            </>
          ) : (
            <>
              <i
                className="fas fa-robot text-4xl mb-4"
                style={{ color: theme === "dark" ? "#A0A0A0" : "#6B7280" }}
              />
              <h3
                className="text-lg font-medium mb-2"
                style={{ color: theme === "dark" ? "#FFFFFF" : "#1F2937" }}
              >
                No bot accounts yet
              </h3>
              <p
                className="text-sm mb-4"
                style={{ color: theme === "dark" ? "#A0A0A0" : "#6B7280" }}
              >
                You haven&apos;t added any bot accounts yet
              </p>
              <button
                onClick={handleCreateBotAccount}
                className="inline-flex items-center space-x-2 py-2 px-4 rounded-lg font-medium transition-all duration-200 hover:scale-105"
                style={{ backgroundColor: "#8B5CF6", color: "#FFFFFF" }}
              >
                <i className="fas fa-plus text-sm" />
                <span>Add Your First Bot Account</span>
              </button>
            </>
          )}
        </div>
      )}

      {/* Simple Bottom Navigation - For users who scroll through content */}
      {filteredBotAccounts.length > 0 && totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:scale-105"
              }`}
              style={{
                backgroundColor:
                  theme === "dark"
                    ? "rgba(59, 130, 246, 0.1)"
                    : "rgba(59, 130, 246, 0.08)",
                color: theme === "dark" ? "#CBD5E1" : "#64748B",
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor:
                  theme === "dark"
                    ? "rgba(59, 130, 246, 0.2)"
                    : "rgba(59, 130, 246, 0.15)",
              }}
            >
              <i className="fas fa-chevron-left" />
              <span>Previous</span>
            </button>

            <span
              className={`px-4 py-2 text-sm font-medium ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:scale-105"
              }`}
              style={{
                backgroundColor:
                  theme === "dark"
                    ? "rgba(59, 130, 246, 0.1)"
                    : "rgba(59, 130, 246, 0.08)",
                color: theme === "dark" ? "#CBD5E1" : "#64748B",
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor:
                  theme === "dark"
                    ? "rgba(59, 130, 246, 0.2)"
                    : "rgba(59, 130, 246, 0.15)",
              }}
            >
              <span>Next</span>
              <i className="fas fa-chevron-right" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BotAccountsGrid;
