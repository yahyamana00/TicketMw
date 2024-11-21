'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { createTicket } from '@/lib/tickets';
import { Upload, X, Loader2, FileIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_FILE_TYPES = [
  'image/*',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
  'application/zip',
  'application/x-zip-compressed'
];

const ticketSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  priority: z.enum(['low', 'medium', 'high']),
  category: z.enum(['technical', 'billing', 'general']),
  email: z.string().email('Invalid email address'),
  name: z.string().min(2, 'Name is required'),
});

interface TicketFormProps {
  isAuthenticated?: boolean;
}

export function TicketForm({ isAuthenticated = false }: TicketFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<z.infer<typeof ticketSchema>>({
    resolver: zodResolver(ticketSchema),
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    
    // Validate file size and type
    const invalidFiles = selectedFiles.filter(file => {
      const isValidSize = file.size <= MAX_FILE_SIZE;
      const isValidType = ACCEPTED_FILE_TYPES.some(type => {
        if (type.endsWith('/*')) {
          return file.type.startsWith(type.replace('/*', ''));
        }
        return file.type === type;
      });
      return !isValidSize || !isValidType;
    });

    if (invalidFiles.length > 0) {
      toast({
        title: "Invalid files",
        description: "Some files were rejected due to size or type restrictions",
        variant: "destructive",
      });
      return;
    }

    setFiles(prev => [...prev, ...selectedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  async function onSubmit(data: z.infer<typeof ticketSchema>) {
    setIsLoading(true);
    try {
      const result = await createTicket({
        ...data,
        userId: isAuthenticated ? 'user' : 'guest',
      }, files);

      if (result.success) {
        toast({
          title: 'Request submitted successfully',
          description: isAuthenticated 
            ? 'Track your ticket in the dashboard.'
            : 'Check your email for updates on your request.',
        });
        reset();
        setFiles([]);
        
        // Redirect based on authentication status
        if (isAuthenticated) {
          router.push('/dashboard');
        } else {
          router.push('/');
        }
      } else {
        throw new Error('Failed to submit request');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit request. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {!isAuthenticated && (
        <>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              {...register('name')}
              disabled={isLoading}
              placeholder="Your name"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              disabled={isLoading}
              placeholder="Your email address"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
        </>
      )}

      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          {...register('title')}
          disabled={isLoading}
          placeholder="Brief description of your issue"
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register('description')}
          disabled={isLoading}
          placeholder="Detailed explanation of your issue"
          className="min-h-[150px]"
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="priority">Priority</Label>
          <Select
            disabled={isLoading}
            onValueChange={(value) => setValue('priority', value as any)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
          {errors.priority && (
            <p className="text-sm text-red-500">{errors.priority.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select
            disabled={isLoading}
            onValueChange={(value) => setValue('category', value as any)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technical">Technical</SelectItem>
              <SelectItem value="billing">Billing</SelectItem>
              <SelectItem value="general">General</SelectItem>
            </SelectContent>
          </Select>
          {errors.category && (
            <p className="text-sm text-red-500">{errors.category.message}</p>
          )}
        </div>
      </div>

      {/* File Upload Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Attachments</Label>
          <span className="text-sm text-muted-foreground">
            Max size: 10MB per file
          </span>
        </div>
        
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          multiple
          onChange={handleFileChange}
          accept={ACCEPTED_FILE_TYPES.join(',')}
        />

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={triggerFileInput}
          disabled={isLoading}
        >
          <Upload className="mr-2 h-4 w-4" />
          Upload Files
        </Button>

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

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          'Submit Request'
        )}
      </Button>
    </form>
  );
}