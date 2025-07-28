"use client";
import { useState } from "react";
import useTheme from "@/hooks/useTheme";

interface SetupGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function SetupGroupModal({ isOpen, onClose }: SetupGroupModalProps) {
  const theme = useTheme();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [serialKey, setSerialKey] = useState<string>("");
  const [selectedServer, setSelectedServer] = useState<string>("");
  const [selectedGroup, setSelectedGroup] = useState<string>("");
  const [groupName, setGroupName] = useState<string>("Your Group");

  // Mock data - replace with actual API calls
  const discordServers = [
    { id: "1", name: "Software Ventures Discord" },
    { id: "2", name: "Development Team Server" },
    { id: "3", name: "Beta Testing Community" },
  ];

  const mainGroups = [
    { id: "1", name: "Software Ventures" },
    { id: "2", name: "Development Team" },
    { id: "3", name: "Beta Testers" },
  ];

  function handleSerialKeyChange(value: string): void {
    // Format as XXXX-XXXX-XXXX-XXXX
    const cleanValue = value.replace(/[^A-Z0-9]/g, "");
    const formattedValue = cleanValue
      .substring(0, 16)
      .replace(/(.{4})/g, "$1-")
      .replace(/-$/, "");
    setSerialKey(formattedValue);
  }

  function handleNextStep(): void {
    if (currentStep === 1 && serialKey.length === 19) {
      setCurrentStep(2);
    } else if (currentStep === 2 && selectedServer && selectedGroup) {
      // Get group name from selection
      const group = mainGroups.find((g) => g.id === selectedGroup);
      if (group) setGroupName(group.name);
      setCurrentStep(3);
    }
  }

  function handlePreviousStep(): void {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }

  function handleClose(): void {
    setCurrentStep(1);
    setSerialKey("");
    setSelectedServer("");
    setSelectedGroup("");
    setGroupName("Your Group");
    onClose();
  }

  function handleFinish(): void {
    // Here you would typically make an API call to setup the group
    console.log("Setting up group:", {
      serialKey,
      selectedServer,
      selectedGroup,
    });
    handleClose();
  }

  if (!isOpen) return null;

  return (
    <>
      {/* Full-screen backdrop overlay */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-300 ${
          theme === "dark" ? "bg-black/40" : "bg-black/20"
        }`}
        onClick={handleClose}
      />

      {/* Modal container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
        {/* Modal */}
        <div
          className={`relative w-full max-w-2xl mx-4 rounded-2xl border shadow-2xl backdrop-blur-md pointer-events-auto max-h-[90vh] flex flex-col ${
            theme === "dark"
              ? "bg-gray-800/95 border-gray-600/50"
              : "bg-white/95 border-gray-200/50"
          }`}
          style={{ backdropFilter: "blur(12px)" }}
        >
          {/* Header */}
          <div
            className={`px-8 py-6 border-b flex-shrink-0 ${
              theme === "dark" ? "border-gray-600/50" : "border-gray-200/50"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2
                  className={`text-2xl font-bold ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Setup New Group
                </h2>
                <p
                  className={`text-sm mt-1 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Configure your group integration in 3 simple steps
                </p>
              </div>
              <button
                onClick={handleClose}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 ${
                  theme === "dark"
                    ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                }`}
              >
                <i className="fas fa-times text-sm" />
              </button>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center mt-6 space-x-8">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className="relative">
                    {/* Spinning border */}
                    {step <= currentStep && (
                      <div
                        className="absolute inset-0 rounded-full animate-spin"
                        style={{
                          background:
                            step <= currentStep
                              ? "conic-gradient(from 0deg, #3B82F6, #8B5CF6, #06B6D4, #3B82F6)"
                              : "transparent",
                          padding: "2px",
                        }}
                      >
                        <div
                          className={`w-full h-full rounded-full ${
                            theme === "dark" ? "bg-gray-800" : "bg-white"
                          }`}
                        />
                      </div>
                    )}

                    {/* Step circle */}
                    <div
                      className={`relative w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                        step <= currentStep
                          ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg"
                          : theme === "dark"
                          ? "bg-gray-700 text-gray-400"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {step}
                    </div>
                  </div>

                  {step < 3 && (
                    <div
                      className={`w-16 h-1 mx-4 transition-all duration-300 ${
                        step < currentStep
                          ? "bg-gradient-to-r from-blue-500 to-indigo-600"
                          : theme === "dark"
                          ? "bg-gray-700"
                          : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Content - Scrollable */}
          <div className="px-8 py-8 flex-1 overflow-y-auto">
            {/* Step 1: Serial Key */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h3
                    className={`text-lg font-semibold mb-2 ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Enter Serial Key
                  </h3>
                  <p
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Please enter your valid Clan Labs serial key to continue
                  </p>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Serial Key *
                  </label>
                  <input
                    type="text"
                    value={serialKey}
                    onChange={(e) =>
                      handleSerialKeyChange(e.target.value.toUpperCase())
                    }
                    placeholder="XXXX-XXXX-XXXX-XXXX"
                    className={`w-full px-4 py-3 rounded-lg border text-lg font-mono tracking-wider transition-all duration-200 focus:outline-none focus:ring-2 ${
                      theme === "dark"
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                    }`}
                    maxLength={19}
                  />
                  {serialKey && serialKey.length !== 19 && (
                    <p
                      className={`text-xs mt-1 ${
                        theme === "dark" ? "text-red-400" : "text-red-600"
                      }`}
                    >
                      Serial key must be 16 characters long
                    </p>
                  )}
                </div>

                <div className="text-center">
                  <a
                    href="https://store.clanlabs.co"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-sm font-medium transition-colors duration-200 hover:underline ${
                      theme === "dark"
                        ? "text-blue-400 hover:text-blue-300"
                        : "text-blue-600 hover:text-blue-700"
                    }`}
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Don&apos;t have a serial key? Buy one!
                  </a>
                </div>
              </div>
            )}

            {/* Step 2: Server and Group Selection */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h3
                    className={`text-lg font-semibold mb-2 ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Configure Integration
                  </h3>
                  <p
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Select your Discord server and the main group to integrate
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      Select a Discord server *
                    </label>
                    <select
                      value={selectedServer}
                      onChange={(e) => setSelectedServer(e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 ${
                        theme === "dark"
                          ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                          : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      <option value="">Choose a server...</option>
                      {discordServers.map((server) => (
                        <option key={server.id} value={server.id}>
                          {server.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      Select the main group *
                    </label>
                    <select
                      value={selectedGroup}
                      onChange={(e) => setSelectedGroup(e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 ${
                        theme === "dark"
                          ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                          : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      <option value="">Choose a group...</option>
                      {mainGroups.map((group) => (
                        <option key={group.id} value={group.id}>
                          {group.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Success Message */}
            {currentStep === 3 && (
              <div className="space-y-6 text-center">
                <div className="mb-6">
                  <div
                    className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                      theme === "dark"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    <i className="fas fa-check text-3xl" />
                  </div>
                  <h3
                    className={`text-xl font-bold mb-2 ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Deployment Successful!
                  </h3>
                </div>

                <div
                  className={`text-left p-6 rounded-lg ${
                    theme === "dark"
                      ? "bg-gray-700/50 border border-gray-600/50"
                      : "bg-gray-50 border border-gray-200"
                  }`}
                >
                  <p
                    className={`text-sm leading-relaxed ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    <strong>
                      Deployment of {groupName} has been successful.
                    </strong>
                    <br />
                    <br />
                    It may take up to 10 minutes for Clan Labs to register that
                    you have setup a group in your Discord server (Discord API).
                    <br />
                    <br />
                    Please wait up to 48 hours for an official Clan Labs Roblox
                    bot account (ClanLabs38) to join your group. Bot accounts
                    are added manually, and the team has been made aware of your
                    request.
                    <br />
                    <br />
                    If you haven&apos;t already, invite the Clan Labs Discord
                    bot to your Discord server.
                    <br />
                    <br />
                    Feel free to join our Discord server to ask any questions or
                    provide feedback.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div
            className={`px-8 py-6 border-t flex-shrink-0 ${
              theme === "dark" ? "border-gray-600/50" : "border-gray-200/50"
            }`}
          >
            <div className="flex justify-between">
              {/* Left side buttons */}
              <div className="flex space-x-3">
                {currentStep > 1 && currentStep < 3 && (
                  <button
                    onClick={handlePreviousStep}
                    className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 hover:scale-105 ${
                      theme === "dark"
                        ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                    }`}
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Previous
                  </button>
                )}
              </div>

              {/* Right side buttons */}
              <div className="flex space-x-3">
                {currentStep < 3 && (
                  <button
                    onClick={handleClose}
                    className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 hover:scale-105 ${
                      theme === "dark"
                        ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                    }`}
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Cancel
                  </button>
                )}

                {currentStep === 1 && (
                  <button
                    onClick={handleNextStep}
                    disabled={serialKey.length !== 19}
                    className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                      serialKey.length === 19
                        ? "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white hover:scale-105 shadow-lg"
                        : theme === "dark"
                        ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Next
                  </button>
                )}

                {currentStep === 2 && (
                  <button
                    onClick={handleNextStep}
                    disabled={!selectedServer || !selectedGroup}
                    className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                      selectedServer && selectedGroup
                        ? "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white hover:scale-105 shadow-lg"
                        : theme === "dark"
                        ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Finish
                  </button>
                )}

                {currentStep === 3 && (
                  <button
                    onClick={handleFinish}
                    className="px-8 py-2.5 rounded-lg font-medium bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white transition-all duration-200 hover:scale-105 shadow-lg"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Done
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SetupGroupModal;
