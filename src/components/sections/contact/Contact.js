"use client";
import { useEffect, useState } from "react";
import useTheme from "@/hooks/useTheme";

const Contact = ({ isVisible = false }) => {
  const theme = useTheme();

  return (
    <section id="contact" className="relative overflow-hidden">
      {/* Main Contact Section */}
      <div
        className={`relative py-20 lg:py-32 transition-all duration-500 ${
          theme === "dark"
            ? "bg-gradient-to-b from-gray-900 to-black"
            : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
        }`}
      >
        {/* Enhanced background effects */}
        <div className="absolute inset-0">
          <div
            className={`absolute inset-0 transition-all duration-500 ${
              theme === "dark"
                ? "bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20"
                : "bg-gradient-to-br from-blue-200/20 via-transparent to-purple-200/20"
            }`}
          ></div>
          <div
            className={`absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse transition-all duration-500 ${
              theme === "dark" ? "bg-blue-500/10" : "bg-blue-400/15"
            }`}
          ></div>
          <div
            className={`absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse transition-all duration-500 ${
              theme === "dark" ? "bg-purple-500/10" : "bg-purple-400/15"
            }`}
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        {/* Floating particles with theme-based colors */}
        <div
          className={`absolute top-28 left-1/4 w-40 h-40 rounded-full blur-xl animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-blue-500/8" : "bg-blue-400/12"
          }`}
        ></div>
        <div
          className={`absolute bottom-28 right-1/3 w-32 h-32 rounded-full blur-xl animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-purple-500/6" : "bg-purple-400/10"
          }`}
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className={`absolute top-1/3 right-1/4 w-36 h-36 rounded-full blur-lg animate-ping transition-all duration-500 ${
            theme === "dark" ? "bg-cyan-500/7" : "bg-cyan-400/14"
          }`}
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className={`absolute bottom-1/3 left-1/4 w-28 h-28 rounded-full blur-2xl animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-indigo-500/8" : "bg-indigo-400/12"
          }`}
          style={{ animationDelay: "4s" }}
        ></div>
        <div
          className={`absolute top-2/3 left-1/3 w-16 h-16 rounded-full blur-xl animate-bounce transition-all duration-500 ${
            theme === "dark" ? "bg-blue-400/9" : "bg-blue-400/18"
          }`}
          style={{ animationDelay: "3s" }}
        ></div>

        {/* Additional glowy orbs */}
        <div
          className={`absolute top-1/4 right-1/4 w-28 h-28 rounded-full blur-xl animate-ping transition-all duration-500 ${
            theme === "dark" ? "bg-purple-400/16" : "bg-purple-400/25"
          }`}
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className={`absolute bottom-1/4 left-1/4 w-52 h-52 rounded-full blur-3xl animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-cyan-400/8" : "bg-cyan-400/15"
          }`}
          style={{ animationDelay: "7s" }}
        ></div>
        <div
          className={`absolute top-1/2 right-1/3 w-24 h-24 rounded-full blur-lg animate-bounce transition-all duration-500 ${
            theme === "dark" ? "bg-indigo-400/18" : "bg-indigo-400/30"
          }`}
          style={{ animationDelay: "4s" }}
        ></div>
        <div
          className={`absolute bottom-1/2 left-1/2 transform -translate-x-1/2 w-36 h-36 rounded-full blur-2xl animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-blue-500/10" : "bg-blue-500/20"
          }`}
          style={{ animationDelay: "8s" }}
        ></div>
        <div
          className={`absolute top-3/4 right-1/4 w-20 h-20 rounded-full blur-md animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-purple-500/20" : "bg-purple-500/35"
          }`}
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className={`absolute bottom-1/4 right-1/3 w-16 h-16 rounded-full blur-sm animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-cyan-400/14" : "bg-cyan-400/25"
          }`}
          style={{ animationDelay: "5s" }}
        ></div>
        <div
          className={`absolute top-1/3 left-1/2 transform -translate-x-1/2 w-44 h-44 rounded-full blur-3xl animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-indigo-500/6" : "bg-indigo-500/12"
          }`}
          style={{ animationDelay: "10s" }}
        ></div>

        <div className="container relative z-10">
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column - Hero Content & Features */}
            <div
              className={`transition-all duration-1000 delay-300 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              {/* Hero Content */}
              <div className="mb-12">
                {/* Badge */}
                <div
                  className={`inline-flex items-center px-4 py-2 mt-16 xl:mt-0 mb-6 backdrop-blur-sm rounded-full border shadow-lg transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-white/10 border-white/20"
                      : "bg-white/80 border-blue-200/50"
                  }`}
                >
                  <span
                    className={`text-sm font-medium mr-2 transition-colors duration-300 ${
                      theme === "dark" ? "text-blue-300" : "text-blue-600"
                    }`}
                  >
                    💬
                  </span>
                  <span
                    className={`text-sm font-medium transition-colors duration-300 ${
                      theme === "dark" ? "text-white" : "text-gray-800"
                    }`}
                  >
                    Get In Touch
                  </span>
                </div>

                {/* Main Heading */}
                <h2
                  className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight transition-all duration-300`}
                >
                  <span
                    className={`transition-colors duration-300 ${
                      theme === "dark" ? "text-white" : "text-blue-600"
                    }`}
                  >
                    Ready to Automate
                  </span>
                  <br />
                  <span
                    className={`bg-clip-text text-transparent transition-all duration-300 ${
                      theme === "dark"
                        ? "bg-gradient-to-r from-blue-400 to-purple-400"
                        : "bg-gradient-to-r from-indigo-600 to-purple-600"
                    }`}
                  >
                    Your Group?
                  </span>
                </h2>

                {/* Subtitle */}
                <p
                  className={`text-xl mb-8 leading-relaxed transition-colors duration-300 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Join thousands of successful Roblox groups using Clan Labs to
                  manage members, track progression, and streamline operations
                  with our powerful Discord integration.
                </p>
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div
                  className={`backdrop-blur-md rounded-2xl p-4 border hover:scale-105 transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-400/30"
                      : "bg-gradient-to-br from-blue-100/60 to-cyan-100/60 border-blue-300/50"
                  }`}
                >
                  <div
                    className={`text-2xl font-bold mb-1 transition-colors duration-300 ${
                      theme === "dark" ? "text-blue-400" : "text-blue-600"
                    }`}
                  >
                    3,000+
                  </div>
                  <div
                    className={`text-sm font-medium transition-colors duration-300 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Groups Served
                  </div>
                </div>
                <div
                  className={`backdrop-blur-md rounded-2xl p-4 border hover:scale-105 transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-400/30"
                      : "bg-gradient-to-br from-purple-100/60 to-pink-100/60 border-purple-300/50"
                  }`}
                >
                  <div
                    className={`text-2xl font-bold mb-1 transition-colors duration-300 ${
                      theme === "dark" ? "text-purple-400" : "text-purple-600"
                    }`}
                  >
                    6 Years
                  </div>
                  <div
                    className={`text-sm font-medium transition-colors duration-300 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    In Service
                  </div>
                </div>
                <div
                  className={`backdrop-blur-md rounded-2xl p-4 border hover:scale-105 transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-400/30"
                      : "bg-gradient-to-br from-green-100/60 to-emerald-100/60 border-green-300/50"
                  }`}
                >
                  <div
                    className={`text-2xl font-bold mb-1 transition-colors duration-300 ${
                      theme === "dark" ? "text-green-400" : "text-green-600"
                    }`}
                  >
                    24/7
                  </div>
                  <div
                    className={`text-sm font-medium transition-colors duration-300 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Expert Support
                  </div>
                </div>
              </div>
              {/* Features Card */}
              <div
                className={`backdrop-blur-md rounded-3xl p-8 border shadow-2xl mb-8 transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-white/10 border-white/20"
                    : "bg-white/80 border-blue-200/50"
                }`}
              >
                <div className="text-center mb-8">
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg transition-all duration-300 ${
                      theme === "dark"
                        ? "bg-gradient-to-r from-blue-500 to-purple-500"
                        : "bg-gradient-to-r from-blue-600 to-purple-600"
                    }`}
                  >
                    <i className="fas fa-star text-white text-xl"></i>
                  </div>
                  <h3
                    className={`text-2xl font-bold bg-clip-text text-transparent mb-4 transition-all duration-300 ${
                      theme === "dark"
                        ? "bg-gradient-to-r from-blue-400 to-purple-400"
                        : "bg-gradient-to-r from-indigo-600 to-purple-600"
                    }`}
                  >
                    Why Choose Clan Labs?
                  </h3>
                  <p
                    className={`text-lg leading-relaxed transition-colors duration-300 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Six years of proven excellence in Roblox group management,
                    serving over 3,000 groups with powerful Discord integration
                    and comprehensive automation tools.
                  </p>
                </div>

                <div className="space-y-6">
                  <div
                    className={`flex items-start p-4 rounded-xl hover:scale-105 transition-all duration-300 ${
                      theme === "dark"
                        ? "bg-white/5 hover:bg-white/10"
                        : "bg-blue-50/50 hover:bg-blue-100/70"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 transition-all duration-300 ${
                        theme === "dark"
                          ? "bg-gradient-to-r from-blue-500 to-purple-500"
                          : "bg-gradient-to-r from-blue-600 to-purple-600"
                      }`}
                    >
                      <i className="fab fa-discord text-white text-lg"></i>
                    </div>
                    <div>
                      <h4
                        className={`font-semibold text-lg mb-2 transition-colors duration-300 ${
                          theme === "dark" ? "text-white" : "text-gray-800"
                        }`}
                      >
                        Discord Integration
                      </h4>
                      <p
                        className={`transition-colors duration-300 ${
                          theme === "dark" ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        Seamless Discord bot integration for automated member
                        management
                      </p>
                    </div>
                  </div>

                  <div
                    className={`flex items-start p-4 rounded-xl hover:scale-105 transition-all duration-300 ${
                      theme === "dark"
                        ? "bg-white/5 hover:bg-white/10"
                        : "bg-green-50/50 hover:bg-green-100/70"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 transition-all duration-300 ${
                        theme === "dark"
                          ? "bg-gradient-to-r from-green-500 to-blue-500"
                          : "bg-gradient-to-r from-green-600 to-blue-600"
                      }`}
                    >
                      <i className="fas fa-code text-white text-lg"></i>
                    </div>
                    <div>
                      <h4
                        className={`font-semibold text-lg mb-2 transition-colors duration-300 ${
                          theme === "dark" ? "text-white" : "text-gray-800"
                        }`}
                      >
                        API Management
                      </h4>
                      <p
                        className={`transition-colors duration-300 ${
                          theme === "dark" ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        Powerful APIs for custom integrations and automation
                      </p>
                    </div>
                  </div>

                  <div
                    className={`flex items-start p-4 rounded-xl hover:scale-105 transition-all duration-300 ${
                      theme === "dark"
                        ? "bg-white/5 hover:bg-white/10"
                        : "bg-purple-50/50 hover:bg-purple-100/70"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 transition-all duration-300 ${
                        theme === "dark"
                          ? "bg-gradient-to-r from-purple-500 to-pink-500"
                          : "bg-gradient-to-r from-purple-600 to-pink-600"
                      }`}
                    >
                      <i className="fas fa-headset text-white text-lg"></i>
                    </div>
                    <div>
                      <h4
                        className={`font-semibold text-lg mb-2 transition-colors duration-300 ${
                          theme === "dark" ? "text-white" : "text-gray-800"
                        }`}
                      >
                        24/7 Expert Support
                      </h4>
                      <p
                        className={`transition-colors duration-300 ${
                          theme === "dark" ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        Round-the-clock assistance from our experienced team
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links Card */}
              <div
                className={`backdrop-blur-md rounded-3xl p-8 border transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-400/30"
                    : "bg-gradient-to-r from-blue-100/60 to-purple-100/60 border-blue-300/50"
                }`}
              >
                <h4
                  className={`font-bold text-xl mb-6 text-center transition-colors duration-300 ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  }`}
                >
                  Quick Links
                </h4>
                <div className="grid grid-cols-1 gap-4">
                  <a
                    href="https://store.clanlabs.co/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center p-4 rounded-xl hover:scale-105 transition-all duration-300 group ${
                      theme === "dark"
                        ? "bg-white/10 hover:bg-white/20"
                        : "bg-white/60 hover:bg-white/80"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 transition-all duration-300 ${
                        theme === "dark" ? "bg-green-500/20" : "bg-green-100/60"
                      }`}
                    >
                      <i
                        className={`fas fa-shopping-cart group-hover:scale-110 transition-transform duration-300 ${
                          theme === "dark" ? "text-green-400" : "text-green-600"
                        }`}
                      ></i>
                    </div>
                    <div>
                      <div
                        className={`font-semibold transition-colors duration-300 ${
                          theme === "dark" ? "text-white" : "text-gray-800"
                        }`}
                      >
                        Visit Our Store
                      </div>
                      <div
                        className={`text-sm transition-colors duration-300 ${
                          theme === "dark" ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        Get started with Clan Labs
                      </div>
                    </div>
                    <i
                      className={`fas fa-arrow-right ml-auto group-hover:translate-x-1 transition-transform duration-300 ${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}
                    ></i>
                  </a>

                  <a
                    href="https://drive.google.com/file/d/17lhzK_nmtquGCB8DOdipGGgHdnp_NFkR/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center p-4 rounded-xl hover:scale-105 transition-all duration-300 group ${
                      theme === "dark"
                        ? "bg-white/10 hover:bg-white/20"
                        : "bg-white/60 hover:bg-white/80"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 transition-all duration-300 ${
                        theme === "dark"
                          ? "bg-yellow-500/20"
                          : "bg-yellow-100/60"
                      }`}
                    >
                      <i
                        className={`fas fa-handshake group-hover:scale-110 transition-transform duration-300 ${
                          theme === "dark"
                            ? "text-yellow-400"
                            : "text-yellow-600"
                        }`}
                      ></i>
                    </div>
                    <div>
                      <div
                        className={`font-semibold transition-colors duration-300 ${
                          theme === "dark" ? "text-white" : "text-gray-800"
                        }`}
                      >
                        Partnership Info
                      </div>
                      <div
                        className={`text-sm transition-colors duration-300 ${
                          theme === "dark" ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        Learn about partnerships
                      </div>
                    </div>
                    <i
                      className={`fas fa-arrow-right ml-auto group-hover:translate-x-1 transition-transform duration-300 ${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}
                    ></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Discord Widget */}
            <div
              className={`transition-all duration-1000 delay-500 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              <div
                className={`backdrop-blur-md rounded-3xl p-8 border shadow-2xl h-full transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-white/10 border-white/20"
                    : "bg-white/80 border-blue-200/50"
                }`}
              >
                {/* Discord Header */}
                <div className="text-center mb-8">
                  <div
                    className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transition-all duration-300 ${
                      theme === "dark"
                        ? "bg-gradient-to-r from-indigo-500 to-purple-500"
                        : "bg-gradient-to-r from-indigo-600 to-purple-600"
                    }`}
                  >
                    <i className="fab fa-discord text-white text-2xl"></i>
                  </div>
                  <h3
                    className={`text-3xl font-bold bg-clip-text text-transparent mb-4 transition-all duration-300 ${
                      theme === "dark"
                        ? "bg-gradient-to-r from-indigo-400 to-purple-400"
                        : "bg-gradient-to-r from-indigo-600 to-purple-600"
                    }`}
                  >
                    Join Our Community
                  </h3>
                  <p
                    className={`text-lg transition-colors duration-300 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Connect with us on Discord for instant support, updates, and
                    to be part of our growing community.
                  </p>
                </div>

                {/* Discord Widget */}
                <div className="flex justify-center">
                  <div className="relative">
                    <div
                      className={`absolute inset-0 rounded-2xl blur-xl transition-all duration-500 ${
                        theme === "dark"
                          ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20"
                          : "bg-gradient-to-r from-blue-400/30 to-purple-400/30"
                      }`}
                    ></div>
                    <iframe
                      src={`https://discord.com/widget?id=438126591520800779&theme=${
                        theme === "dark" ? "dark" : "light"
                      }`}
                      width="350"
                      height="500"
                      allowtransparency="true"
                      frameBorder="0"
                      sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                      className="relative rounded-2xl shadow-2xl"
                    ></iframe>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-8">
                  <div
                    className={`inline-flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg ${
                      theme === "dark"
                        ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600"
                        : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700"
                    }`}
                  >
                    <i className="fab fa-discord mr-2"></i>
                    Join Discord Server
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
