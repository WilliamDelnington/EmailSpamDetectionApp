import React, { createContext, useContext } from 'react';
import ReactDOM from 'react-dom';

interface DialogContextProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DialogContext = createContext<DialogContextProps | undefined>(undefined);

export const Dialog: React.FC<{ open: boolean; onOpenChange: (open: boolean) => void; children: React.ReactNode }> = ({ open, onOpenChange, children }) => {
  return (
    <DialogContext.Provider value={{ open, onOpenChange }}>
      {children}
    </DialogContext.Provider>
  );
};

export const DialogContent: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = '', children }) => {
  const ctx = useContext(DialogContext);
  if (!ctx || !ctx.open) return null;
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className={`bg-white rounded shadow-lg w-full max-w-lg ${className}`}>{children}</div>
    </div>,
    document.body
  );
};

export const DialogHeader: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = '', children }) => (
  <div className={`border-b px-4 py-2 ${className}`}>{children}</div>
);

export const DialogTitle: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = '', children }) => (
  <h2 className={`text-lg font-semibold ${className}`}>{children}</h2>
); 