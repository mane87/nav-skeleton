import {useState} from 'react';
import { Menu, Calendar, BarChart2, PieChart, Settings, Clock, Users, LayoutDashboard } from 'lucide-react';
import { clsx } from 'clsx';

const NavItem = ({ icon: Icon, label, children }) => {
  const [open, setOpen] = useState(false);
  const hasChildren = Array.isArray(children) && children.length > 0;
  return (
    <div>
      <button
        onClick={() => hasChildren && setOpen(!open)}
        className="flex items-center w-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
        <Icon className="w-5 h-5" />
        <span className="ml-3 flex-1 text-left">{label}</span>
        {hasChildren && (
          <svg
            className={clsx('w-4 h-4 transition-transform', open && 'rotate-90')}
            fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        )}
      </button>
      {hasChildren && open && (
        <div className="ml-6 mt-1 space-y-1">
          {children.map((child) => {
            const ChildIcon = child.icon;
            return (
              <a key={child.label} href="#" className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                <ChildIcon className="w-4 h-4" />
                <span className="ml-3">{child.label}</span>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard' },
    { icon: Calendar, label: 'Calendar' },
    { divider: true },
    {
      icon: BarChart2,
      label: 'Reports',
      children: [
        { icon: Clock, label: 'Timesheet' },
        { icon: Users, label: 'People' },
      ],
    },
    {
      icon: PieChart,
      label: 'Insights',
      children: [
        { icon: LayoutDashboard, label: 'General' },
        { icon: BarChart2, label: 'Budgets' },
      ],
    },
  ];
  return (
    <div className={clsx('h-screen bg-white dark:bg-gray-900 shadow-lg flex flex-col', collapsed ? 'w-16' : 'w-64') }>
      <div className="flex items-center justify-between p-4">
        <span className={clsx('text-lg font-semibold', collapsed && 'hidden')}>Menu</span>
        <button onClick={() => setCollapsed(!collapsed)} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
          <Menu className="w-5 h-5" />
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto space-y-1 px-2">
        {navItems.map((item, idx) => item.divider ? (
          <hr key={idx} className="my-2 border-gray-200 dark:border-gray-700" />
        ) : (
          <NavItem key={item.label} icon={item.icon} label={item.label} children={item.children} />
        ))}
      </nav>
      <div className="mt-auto p-2">
        <a href="#" className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
          <Settings className="w-5 h-5" />
          <span className={clsx('ml-3', collapsed && 'hidden')}>Settings</span>
        </a>
      </div>
    </div>
  );
}
