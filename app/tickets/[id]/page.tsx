'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { 
  MessageSquare, 
  Paperclip, 
  Send, 
  Loader2, 
  Bot,
  AlertCircle,
  FileIcon,
  Upload,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

const priorityColors = {
  low: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
};

const statusColors = {
  open: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  'in-progress': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  resolved: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
};

export default function TicketDetailPage() {
  const params = useParams();
  const { toast } = useToast();
  const [ticket, setTicket] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState(null);

  useEffect(() => {
    loadTicketDetails();
  }, [params.id]);

  const loadTicketDetails = async () => {
    try {
      // Load ticket details and comments
      setIsLoading(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load ticket details",
        variant: "destructive"
      });
    }
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(prev => [...prev, ...selectedFiles]);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const analyzeWithAI = async () => {
    setIsAnalyzing(true);
    try {
      // Simulate AI analysis
      await new Promise(resolve => setTimeout(resolve, 2000));
      setAiSuggestion({
        solution: "Based on the description, this appears to be a common configuration issue. Try the following steps:\n\n1. Clear your browser cache\n2. Reset your application settings\n3. Restart the application",
        confidence: 0.85,
        needsHumanReview: false
      });
    } catch (error) {
      toast({
        title: "AI Analysis Failed",
        description: "Could not analyze the ticket. A support agent will review it.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const submitComment = async () => {
    setIsSubmitting(true);
    try {
      // Add comment logic here
      setNewComment('');
      setFiles([]);
      toast({
        title: "Comment Added",
        description: "Your response has been added to the ticket."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add comment",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      {/* Ticket Header */}
      <div className="bg-card border rounded-lg p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">Technical Issue with Login</h1>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className={priorityColors.high}>
                High Priority
              </Badge>
              <Badge variant="secondary" className={statusColors.open}>
                Open
              </Badge>
              <span className="text-sm text-muted-foreground">
                Opened {formatDistanceToNow(new Date(), { addSuffix: true })}
              </span>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={analyzeWithAI}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Bot className="mr-2 h-4 w-4" />
                Analyze with AI
              </>
            )}
          </Button>
        </div>

        <p className="text-muted-foreground mb-4">
          Unable to access the login page after recent update. Getting a 404 error.
        </p>

        {aiSuggestion && (
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-4">
            <div className="flex items-start space-x-2">
              <Bot className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-semibold mb-2">AI Suggested Solution</h3>
                <p className="text-sm whitespace-pre-wrap">{aiSuggestion.solution}</p>
                <div className="mt-2 flex items-center space-x-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {Math.round(aiSuggestion.confidence * 100)}% Confidence
                  </Badge>
                  {aiSuggestion.needsHumanReview && (
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                      Needs Human Review
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <Separator className="my-6" />

        {/* Comments Section */}
        <div className="space-y-6">
          <h2 className="text-lg font-semibold">Comments</h2>
          
          {/* Comment Input */}
          <div className="space-y-4">
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[100px]"
            />
            
            {/* File Upload */}
            <div className="space-y-2">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                multiple
                onChange={handleFileChange}
              />
              <div className="flex items-center space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('file-upload').click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Attach Files
                </Button>
                <Button
                  type="button"
                  onClick={submitComment}
                  disabled={!newComment && files.length === 0}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Response
                    </>
                  )}
                </Button>
              </div>

              {/* File Preview */}
              {files.length > 0 && (
                <div className="space-y-2">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 border rounded-md bg-muted/50"
                    >
                      <div className="flex items-center space-x-2">
                        <FileIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm truncate max-w-[200px]">
                          {file.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ({(file.size / 1024 / 1024).toFixed(2)} MB)
                        </span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => removeFile(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Comment Thread */}
          <div className="space-y-4">
            {/* Example Comment */}
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-start space-x-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">Support Agent</span>
                      <span className="text-xs text-muted-foreground">
                        2 hours ago
                      </span>
                    </div>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      Staff
                    </Badge>
                  </div>
                  <p className="text-sm mb-2">
                    Thank you for reporting this issue. We're looking into it and will get back to you shortly.
                  </p>
                  <div className="flex items-center space-x-2">
                    <Paperclip className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-primary hover:underline cursor-pointer">
                      screenshot.png
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}