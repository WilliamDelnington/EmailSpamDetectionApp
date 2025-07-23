import React, { useState } from 'react';
import { X, Send, Paperclip, Bold, Italic, Underline } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { useToast } from '../hooks/use-toast';

interface ComposeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (email: { to: string; subject: string; body: string }) => void;
}

export const ComposeModal: React.FC<ComposeModalProps> = ({
  isOpen,
  onClose,
  onSend,
}) => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const handleSend = async () => {
    if (!to || !subject || !body) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);
    
    // Simulate sending delay
    setTimeout(() => {
      onSend({ to, subject, body });
      setTo('');
      setSubject('');
      setBody('');
      setIsSending(false);
      onClose();
      
      toast({
        title: "Email Sent",
        description: `Your email has been sent to ${to}`,
      });
    }, 1000);
  };

  const handleClose = () => {
    setTo('');
    setSubject('');
    setBody('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0">
        <DialogHeader className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold text-gray-900">
              New Message
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex flex-col h-full">
          {/* Email Form */}
          <div className="px-6 py-4 space-y-4">
            <div>
              <Input
                placeholder="Recipients"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="border-0 border-b border-gray-200 rounded-none px-0 focus:border-blue-500 focus:ring-0"
              />
            </div>
            
            <div>
              <Input
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="border-0 border-b border-gray-200 rounded-none px-0 focus:border-blue-500 focus:ring-0"
              />
            </div>
          </div>

          {/* Formatting Toolbar */}
          <div className="px-6 py-2 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Bold className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Italic className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Underline className="h-4 w-4" />
              </Button>
              <div className="w-px h-4 bg-gray-300 mx-2" />
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Paperclip className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Message Body */}
          <div className="flex-1 px-6 py-4">
            <Textarea
              placeholder="Compose your message..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="min-h-[300px] border-0 resize-none focus:ring-0 p-0 text-sm leading-relaxed"
            />
          </div>

          {/* Send Button */}
          <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Paperclip className="w-4 h-4 mr-2" />
                Attach files
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button 
                onClick={handleSend}
                disabled={isSending}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6"
              >
                {isSending ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                    Sending...
                  </div>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
