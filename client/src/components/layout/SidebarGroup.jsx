import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import SidebarItem from './SidebarItem';

export default function SidebarGroup({
  title,
  items = [],
  activeTab,
  onSelectTab,
  collapsed = false,
  collapsible = false,
  isGroupCollapsed = false,
  onToggleGroup
}) {
  if (!items || items.length === 0) return null;

  return (
    <div className="space-y-1">
      {!collapsed ? (
        <div className="flex items-center justify-between px-2.5 py-1">
          <span className="text-[10px] sm:text-[11px] font-extrabold tracking-wider uppercase text-sky-400/80 truncate">
            {title}
          </span>
          {collapsible && (
            <button
              type="button"
              onClick={onToggleGroup}
              className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition"
              aria-label={`Toggle ${title} group`}
            >
              {isGroupCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>
      ) : (
        <div className="border-t border-slate-800/60 my-2 mx-1" />
      )}

      {(!isGroupCollapsed || collapsed) && (
        <div className="space-y-0.5">
          {items.map((item) => (
            <SidebarItem
              key={item.id}
              id={item.id}
              label={item.label}
              icon={item.icon}
              badge={item.badge}
              isActive={activeTab === item.id}
              isAction={item.isAction}
              collapsed={collapsed}
              onClick={() => onSelectTab(item)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
