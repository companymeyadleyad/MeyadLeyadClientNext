"use client";

import React, { useState } from "react";
import styles from "./RoomsModal.module.css";

interface RoomsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (selectedRooms: string[]) => void;
  selectedRooms?: string[];
}

const RoomsModal: React.FC<RoomsModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  selectedRooms = []
}) => {
  const [localSelectedRooms, setLocalSelectedRooms] = useState<string[]>(selectedRooms);

  // אפשרויות חדרים לפי התמונה
  const roomOptions = [
    "1", "1.5", "2", "2.5", "3", "3.5", "4", "4.5", "5", "5.5", "+6"
  ];

  const handleRoomToggle = (room: string) => {
    setLocalSelectedRooms(prev => {
      const roomIndex = roomOptions.indexOf(room);
      
      // אם הכפתור כבר נבחר, אפס הכל
      if (prev.includes(room)) {
        return [];
      }
      
      // אם זה הכפתור הראשון שנבחר
      if (prev.length === 0) {
        return [room];
      }
      
      // אם יש כבר כפתור אחד נבחר, בחר את הטווח
      if (prev.length === 1) {
        const firstRoomIndex = roomOptions.indexOf(prev[0]);
        const minIndex = Math.min(firstRoomIndex, roomIndex);
        const maxIndex = Math.max(firstRoomIndex, roomIndex);
        
        const newRooms = [];
        for (let i = minIndex; i <= maxIndex; i++) {
          newRooms.push(roomOptions[i]);
        }
        return newRooms;
      }
      
      // אם יש כבר טווח נבחר, אפס הכל
      return [];
    });
  };

  const handleConfirm = () => {
    onConfirm(localSelectedRooms);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <div className={styles.roomsContainer}>
          {roomOptions.map((room) => (
            <button
              key={room}
              className={`${styles.roomButton} ${
                localSelectedRooms.includes(room) ? styles.selected : ""
              }`}
              onClick={() => handleRoomToggle(room)}
            >
              {room}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomsModal;
