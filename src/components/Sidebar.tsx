import React from 'react';
import { Inbox, Shield, PenSquare, Search, Settings, Archive, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

interface SidebarProps {
  currentView: 'inbox' | 'spam';
  onViewChange: (view: 'inbox' | 'spam') => void;
  onComposeClick: () => void;
  inboxCount: number;
  spamCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onViewChange,
  onComposeClick,
  inboxCount,
  spamCount,
}) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <h1 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          Mail
        </h1>
      </div>

      {/* Compose Button */}
      <div className="p-4">
        <Button 
          onClick={onComposeClick}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
        >
          <PenSquare className="w-4 h-4 mr-2" />
          Compose
        </Button>
      </div>

      {/* Search */}
      <div className="px-4 pb-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input 
            placeholder="Search mail..."
            className="pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2">
        <div className="space-y-1">
          <button
            onClick={() => onViewChange('inbox')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentView === 'inbox'
                ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center">
              <Inbox className="w-4 h-4 mr-3" />
              Inbox
            </div>
            {inboxCount > 0 && (
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                {inboxCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onViewChange('spam')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentView === 'spam'
                ? 'bg-red-50 text-red-700 border-r-2 border-red-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center">
              <Shield className="w-4 h-4 mr-3" />
              Spam
            </div>
            {spamCount > 0 && (
              <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                {spamCount}
              </span>
            )}
          </button>

          <button className="w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Archive className="w-4 h-4 mr-3" />
            Archive
          </button>

          <button className="w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Trash2 className="w-4 h-4 mr-3" />
            Trash
          </button>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100">
        <button className="w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          <Settings className="w-4 h-4 mr-3" />
          Settings
        </button>
      </div>
    </div>
  );
};
