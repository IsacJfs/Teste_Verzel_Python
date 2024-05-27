import React, { useState } from 'react';

interface SidebarItemProps {
  title: string;
  children: React.ReactNode;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="my-4">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-lg font-semibold">{title}</h2>
        <span>{isOpen ? '▲' : '▼'}</span>
      </div>
      {isOpen && <div className="mt-2">{children}</div>}
    </div>
  );
};

export default SidebarItem;
