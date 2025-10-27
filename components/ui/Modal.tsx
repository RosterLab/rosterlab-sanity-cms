"use client";

import React, { useRef, useEffect } from "react";
import { useFocusTrap } from "@/lib/hooks/useFocusTrap";

interface ModalProps {
  children: React.ReactElement;
  style?: React.CSSProperties;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
}

export default function Modal({
  children,
  style,
  isOpen,
  onClose,
  title,
  description,
}: ModalProps) {
  const dialogRef = useFocusTrap(isOpen, onClose);
  const titleId = useRef(
    `modal-title-${Math.random().toString(36).substr(2, 9)}`,
  );
  const descId = useRef(
    `modal-desc-${Math.random().toString(36).substr(2, 9)}`,
  );

  useEffect(() => {
    // Prevent body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={dialogRef as React.RefObject<HTMLDivElement>}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId.current}
        aria-describedby={description ? descId.current : undefined}
        className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto m-4 focus:outline-none"
        style={style}
      >
        {/* Hidden title for accessibility if not in children */}
        <h2 id={titleId.current} className="sr-only">
          {title}
        </h2>
        {description && (
          <p id={descId.current} className="sr-only">
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}
