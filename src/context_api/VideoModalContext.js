"use client";
import { createContext, useContext, useState } from "react";

const VideoModalContext = createContext(null);

const VideoModalContextProvider = ({ children }) => {
  const [openModalType, setOpenModalType] = useState(null);

  const openVideoModal = (modalType) => {
    setOpenModalType(modalType);
  };

  const closeVideoModal = () => {
    setOpenModalType(null);
  };

  const isAnyVideoModalOpen = openModalType !== null;

  return (
    <VideoModalContext.Provider
      value={{
        isAnyVideoModalOpen,
        openModalType,
        openVideoModal,
        closeVideoModal,
      }}
    >
      {children}
    </VideoModalContext.Provider>
  );
};

export const useVideoModal = () => {
  const context = useContext(VideoModalContext);
  if (!context) {
    throw new Error(
      "useVideoModal must be used within a VideoModalContextProvider"
    );
  }
  return context;
};

export default VideoModalContextProvider;
