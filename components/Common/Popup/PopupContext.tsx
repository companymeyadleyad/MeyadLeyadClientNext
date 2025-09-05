"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import Popup from "./Popup";

type PopupType = "success" | "error";

interface PopupOptions {
  type: PopupType;
  message: string;
  title?: string;
  actionText?: string;
  actionHandler?: () => void;
}

interface PopupContextProps {
  showPopup: (options: PopupOptions) => void;
}

const PopupContext = createContext<PopupContextProps | undefined>(undefined);

export const PopupProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [popupOptions, setPopupOptions] = useState<PopupOptions>({
    type: "success",
    message: "",
  });

  const showPopup = (options: PopupOptions) => {
    setPopupOptions(options);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    if (popupOptions.actionHandler) {
      popupOptions.actionHandler();
    }
  };

  return (
    <PopupContext.Provider value={{ showPopup }}>
      {children}
      <Popup
        open={open}
        onClose={handleClose}
        type={popupOptions.type}
        title={popupOptions.title}
        message={popupOptions.message}
        actionText={popupOptions.actionText}
        actionHandler={handleClose}
      />
    </PopupContext.Provider>
  );
};

export const usePopup = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error("usePopup must be used within a PopupProvider");
  }
  return context.showPopup;
};
