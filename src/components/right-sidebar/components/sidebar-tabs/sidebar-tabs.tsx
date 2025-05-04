interface SidebarTabsProps {
  currentTab: string;
  onChange: (tab: string) => void;
}

export function SidebarTabs({ currentTab, onChange }: SidebarTabsProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2">
        {["related", "watchlist", "history"].map((tab) => (
          <button
            key={tab}
            className={`px-3 py-1 rounded-md text-sm ${
              currentTab === tab ? "bg-primary text-white" : "bg-white/10"
            }`}
            onClick={() => onChange(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}
