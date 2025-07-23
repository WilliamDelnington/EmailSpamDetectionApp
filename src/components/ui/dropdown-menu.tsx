import React, { createContext, useContext, useRef, useState } from 'react';

// Specify available data and functions
interface DropdownMenuContextProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

const DropdownMenuContext = createContext<DropdownMenuContextProps | undefined>(undefined);

export const DropdownMenu: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  return (
    <DropdownMenuContext.Provider value={{ open, setOpen, triggerRef }}>
      <div className="relative inline-block">{children}</div>
    </DropdownMenuContext.Provider>
  );
};

export const DropdownMenuTrigger: React.FC<{ asChild?: boolean; children: React.ReactElement }> = ({ asChild, children }) => {
  const ctx = useContext(DropdownMenuContext);
  if (!ctx) throw new Error('DropdownMenuTrigger must be used within DropdownMenu');
  const { open, setOpen, triggerRef } = ctx;

  const child = children as React.ReactElement<any, any>;

  return React.cloneElement(child, {
    ref: triggerRef,
    onClick: (e: React.MouseEvent) => {
      setOpen(!open);
      if (child.props && typeof child.props.onClick == "function") child.props.onClick(e);
    },
  });
};

export const DropdownMenuContent: React.FC<{ align?: 'start' | 'end'; className?: string; children: React.ReactNode }> = ({ align = 'start', className = '', children }) => {
  const ctx = useContext(DropdownMenuContext);
  if (!ctx) throw new Error('DropdownMenuContent must be used within DropdownMenu');
  const { open, triggerRef } = ctx;
  if (!open) return null;
  return (
    <div
      className={`absolute z-10 min-w-[10rem] bg-white border border-gray-200 rounded shadow-lg mt-2 ${align === 'end' ? 'right-0' : 'left-0'} ${className}`}
      style={{ top: '100%' }}
    >
      {children}
    </div>
  );
};

export const DropdownMenuItem: React.FC<{ onClick?: (e: React.MouseEvent) => void; className?: string; children: React.ReactNode }> = ({ onClick, className = '', children }) => {
  const ctx = useContext(DropdownMenuContext);
  if (!ctx) throw new Error('DropdownMenuItem must be used within DropdownMenu');
  const { setOpen } = ctx;
  return (
    <button
      type="button"
      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition ${className}`}
      onClick={(e) => {
        setOpen(false);
        if (onClick) onClick(e);
      }}
    >
      {children}
    </button>
  );
}; 