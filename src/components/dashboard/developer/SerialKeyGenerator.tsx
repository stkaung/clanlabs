"use client";

import { useState } from "react";
import useTheme from "@/hooks/useTheme";

type KeyType = "Subscription" | "Division";
type TimeUnit = "Month(s)" | "Year(s)";
type OutputFormat = "New Line" | "Comma Separated" | "Space Separated";

interface GeneratedKey {
  value: string;
}

export default function SerialKeyGenerator() {
  const theme = useTheme();
  const [keyType, setKeyType] = useState<KeyType>("Subscription");
  const [amount, setAmount] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [timeUnit, setTimeUnit] = useState<TimeUnit>("Month(s)");
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("New Line");
  const [generatedKeys, setGeneratedKeys] = useState<GeneratedKey[]>([]);

  const generateKeys = () => {
    // This is a placeholder implementation
    const newKeys: GeneratedKey[] = [];
    const prefix = keyType === "Subscription" ? "CL-SUB" : "CL-DIV";
    const year = new Date().getFullYear();
    
    for (let i = 0; i < parseInt(amount); i++) {
      // Generate a random string of 20 characters
      const randomStr = Array(20)
        .fill(0)
        .map(() => Math.random().toString(36).charAt(2).toUpperCase())
        .join("");
      
      newKeys.push({
        value: `${prefix}-${year}-${randomStr}`,
      });
    }
    
    setGeneratedKeys(newKeys);
  };

  const copyKeys = () => {
    const separator = outputFormat === "New Line" 
      ? "\n" 
      : outputFormat === "Comma Separated" 
        ? "," 
        : " ";
    
    const keyString = generatedKeys.map(k => k.value).join(separator);
    navigator.clipboard.writeText(keyString);
  };

  const downloadKeys = () => {
    const separator = outputFormat === "New Line" ? "\n" : outputFormat === "Comma Separated" ? "," : " ";
    const keyString = generatedKeys.map(k => k.value).join(separator);
    const blob = new Blob([keyString], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "serial-keys.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-bold ${
            theme === "dark" ? "text-gray-100" : "text-gray-900"
          }`} style={{ fontFamily: "'Poppins', sans-serif" }}>
            Serial Keys
          </h1>
          <p className={`mt-1 text-sm ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}>
            Generate and manage serial keys for subscriptions and divisions
          </p>
        </div>
      </div>

      <div className={`rounded-lg border ${
        theme === "dark" ? "bg-gray-900/80 border-gray-800" : "bg-white border-gray-200"
      }`}>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className={`text-lg font-semibold ${
              theme === "dark" ? "text-gray-100" : "text-gray-900"
            }`}>
              Generate Serial Keys
            </h2>
            <button className={`flex items-center space-x-2 px-3 py-1 rounded-md text-sm ${
              theme === "dark" ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-500"
            }`}>
              <i className="fas fa-wand-magic-sparkles" />
              <span>Generator</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Configuration */}
            <div className="space-y-6">
              <div>
                <h3 className={`text-sm font-medium mb-4 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}>
                  Key Configuration
                </h3>
                <label className="block mb-2 text-sm text-gray-500">Serial Key Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setKeyType("Subscription")}
                    className={`py-3 px-4 rounded-lg text-center transition-all duration-200 ${
                      keyType === "Subscription"
                        ? "bg-blue-500 text-white"
                        : theme === "dark"
                        ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Subscription
                  </button>
                  <button
                    onClick={() => setKeyType("Division")}
                    className={`py-3 px-4 rounded-lg text-center transition-all duration-200 ${
                      keyType === "Division"
                        ? "bg-blue-500 text-white"
                        : theme === "dark"
                        ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Division
                  </button>
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-500">Amount</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="1"
                  className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:outline-none transition-colors duration-200 ${
                    theme === "dark"
                      ? "bg-gray-800 border-gray-700 text-white focus:ring-blue-500/20"
                      : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500/30"
                  }`}
                  placeholder="Number of serial keys to generate"
                />
                <p className="mt-1 text-xs text-gray-500">Number of serial keys to generate</p>
              </div>

              {keyType === "Subscription" && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm text-gray-500">Duration</label>
                    <input
                      type="number"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      min="1"
                      className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:outline-none transition-colors duration-200 ${
                        theme === "dark"
                          ? "bg-gray-800 border-gray-700 text-white focus:ring-blue-500/20"
                          : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500/30"
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm text-gray-500">Unit</label>
                    <select
                      value={timeUnit}
                      onChange={(e) => setTimeUnit(e.target.value as TimeUnit)}
                      className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:outline-none transition-colors duration-200 ${
                        theme === "dark"
                          ? "bg-gray-800 border-gray-700 text-white focus:ring-blue-500/20"
                          : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500/30"
                      }`}
                    >
                      <option>Month(s)</option>
                      <option>Year(s)</option>
                    </select>
                  </div>
                </div>
              )}

              <div>
                <label className="block mb-2 text-sm text-gray-500">Output Format</label>
                <select
                  value={outputFormat}
                  onChange={(e) => setOutputFormat(e.target.value as OutputFormat)}
                  className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:outline-none transition-colors duration-200 ${
                    theme === "dark"
                      ? "bg-gray-800 border-gray-700 text-white focus:ring-blue-500/20"
                      : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500/30"
                  }`}
                >
                  <option>New Line</option>
                  <option>Comma Separated</option>
                  <option>Space Separated</option>
                </select>
              </div>

              <button
                onClick={generateKeys}
                disabled={!amount || (keyType === "Subscription" && !duration)}
                className={`w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-lg font-medium transition-colors duration-200 ${
                  !amount || (keyType === "Subscription" && !duration)
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white`}
              >
                <i className="fas fa-key" />
                <span>Generate Keys</span>
              </button>
            </div>

            {/* Right Column - Generated Keys */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className={`text-sm font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}>
                  Generated Keys
                </h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={copyKeys}
                    className={`flex items-center space-x-1 px-3 py-1 rounded-md text-sm transition-colors duration-200 ${
                      theme === "dark"
                        ? "text-blue-400 hover:text-blue-300"
                        : "text-blue-600 hover:text-blue-500"
                    }`}
                  >
                    <i className="far fa-copy" />
                    <span>Copy</span>
                  </button>
                  <button
                    onClick={downloadKeys}
                    className={`flex items-center space-x-1 px-3 py-1 rounded-md text-sm transition-colors duration-200 ${
                      theme === "dark"
                        ? "text-green-400 hover:text-green-300"
                        : "text-green-600 hover:text-green-500"
                    }`}
                  >
                    <i className="fas fa-download" />
                    <span>Download</span>
                  </button>
                </div>
              </div>

              <div className={`min-h-[200px] p-4 rounded-lg border ${
                theme === "dark"
                  ? "bg-gray-800/80 border-gray-700"
                  : "bg-gray-50 border-gray-200"
              }`}>
                <div className="font-mono text-sm whitespace-pre-wrap break-all">
                  {generatedKeys.map((key, index) => (
                    <div
                      key={index}
                      className={theme === "dark" ? "text-gray-300" : "text-gray-700"}
                    >
                      {key.value}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}