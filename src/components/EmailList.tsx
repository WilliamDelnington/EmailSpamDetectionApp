import React from 'react';
import { MoreVertical, Shield, ShieldOff, Trash2, Clock, Mail, MailOpen } from 'lucide-react';
import { Button } from '../components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu';
import type { Email } from '../hooks/useEmails';

interface EmailListProps {
  emails: Email[];
  currentView: 'inbox' | 'spam';
  onEmailClick: (email: Email) => void;
  onMarkAsSpam: (id: string) => void;
  onMarkAsNotSpam: (id: string) => void;
  onDelete: (id: string) => void;
}

export const EmailList: React.FC<EmailListProps> = ({
  emails,
  currentView,
  onEmailClick,
  onMarkAsSpam,
  onMarkAsNotSpam,
  onDelete,
}) => {
  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days}d ago`;
    } else if (hours > 0) {
      return `${hours}h ago`;
    } else {
      return 'Just now';
    }
  };

  const truncateText = (text: string, length: number) => {
    return text.length > length ? text.substring(0, length) + '...' : text;
  };

  return (
    <div className="flex-1 bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4">
        <h2 className="text-xl font-semibold text-gray-900 capitalize flex items-center gap-2">
          {currentView === 'inbox' ? (
            <Mail className="w-5 h-5 text-blue-600" />
          ) : (
            <Shield className="w-5 h-5 text-red-600" />
          )}
          {currentView} ({emails.length})
        </h2>
      </div>

      {/* Email List */}
      <div className="divide-y divide-gray-100">
        {emails.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-500">
            <Mail className="w-12 h-12 mb-4 text-gray-300" />
            <p className="text-lg font-medium mb-2">No emails here</p>
            <p className="text-sm">
              {currentView === 'inbox' 
                ? 'Your inbox is empty. All caught up!' 
                : 'No spam emails found.'}
            </p>
          </div>
        ) : (
          emails.map((email) => (
            <div
              key={email.id}
              className={`px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors border-l-4 ${
                !email.isRead 
                  ? 'border-l-blue-500 bg-blue-50/30' 
                  : 'border-l-transparent'
              }`}
              onClick={() => onEmailClick(email)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center mb-1">
                    <div className="flex items-center mr-3">
                      {!email.isRead ? (
                        <Mail className="w-4 h-4 text-blue-600 mr-2" />
                      ) : (
                        <MailOpen className="w-4 h-4 text-gray-400 mr-2" />
                      )}
                      <p className={`text-sm font-medium truncate ${
                        !email.isRead ? 'text-gray-900' : 'text-gray-700'
                      }`}>
                        {email.from}
                      </p>
                    </div>
                    <div className="flex items-center text-xs text-gray-500 ml-auto">
                      <Clock className="w-3 h-3 mr-1" />
                      {formatTime(email.timestamp)}
                    </div>
                  </div>
                  
                  <h3 className={`text-sm mb-1 truncate ${
                    !email.isRead ? 'font-semibold text-gray-900' : 'font-medium text-gray-800'
                  }`}>
                    {email.subject}
                  </h3>
                  
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {truncateText(email.body, 120)}
                  </p>
                </div>

                <div className="ml-4 flex-shrink-0">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-gray-100"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      {currentView === 'inbox' ? (
                        <DropdownMenuItem 
                          onClick={(e) => {
                            e.stopPropagation();
                            onMarkAsSpam(email.id);
                          }}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Shield className="w-4 h-4 mr-2" />
                          Mark as Spam
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem 
                          onClick={(e) => {
                            e.stopPropagation();
                            onMarkAsNotSpam(email.id);
                          }}
                          className="text-green-600 hover:text-green-700"
                        >
                          <ShieldOff className="w-4 h-4 mr-2" />
                          Not Spam
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem 
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(email.id);
                        }}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};