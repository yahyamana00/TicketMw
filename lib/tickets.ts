import { ID, Query, Storage } from 'appwrite';
import { databases, storage, DATABASE_ID, COLLECTIONS, BUCKET_ID } from './appwrite';
import { getCurrentUser } from './auth';

export type TicketPriority = 'low' | 'medium' | 'high';
export type TicketStatus = 'open' | 'in-progress' | 'resolved';

export interface Ticket {
  $id: string;
  title: string;
  description: string;
  priority: TicketPriority;
  category: string;
  status: TicketStatus;
  userId: string;
  assignedTo?: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  attachments?: string[];
}

export interface Comment {
  $id: string;
  ticketId: string;
  userId: string;
  content: string;
  attachments?: string[];
  createdAt: string;
}

export interface FileUpload {
  fileId: string;
  name: string;
  size: number;
  mimeType: string;
}

export async function uploadFile(file: File): Promise<FileUpload> {
  try {
    const response = await storage.createFile(
      BUCKET_ID,
      ID.unique(),
      file
    );

    return {
      fileId: response.$id,
      name: response.name,
      size: response.size,
      mimeType: response.mimeType
    };
  } catch (error) {
    console.error('File upload failed:', error);
    throw error;
  }
}

export async function createTicket(
  ticket: Omit<Ticket, 'status' | 'createdAt' | 'updatedAt' | '$id'>,
  files?: File[]
) {
  try {
    const user = await getCurrentUser();
    if (!user.success) throw new Error('User not authenticated');

    // Upload files if provided
    const attachments: string[] = [];
    if (files && files.length > 0) {
      for (const file of files) {
        const upload = await uploadFile(file);
        attachments.push(upload.fileId);
      }
    }

    const response = await databases.createDocument(
      DATABASE_ID,
      COLLECTIONS.TICKETS,
      ID.unique(),
      {
        ...ticket,
        userId: user.data.$id,
        attachments,
        status: 'open',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    );

    return { success: true, data: response };
  } catch (error) {
    return { success: false, error };
  }
}

export async function getTicket(ticketId: string) {
  try {
    const response = await databases.getDocument(
      DATABASE_ID,
      COLLECTIONS.TICKETS,
      ticketId
    );
    return { success: true, data: response as Ticket };
  } catch (error) {
    return { success: false, error };
  }
}

export async function getTicketComments(ticketId: string) {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.COMMENTS,
      [
        Query.equal('ticketId', ticketId),
        Query.orderDesc('$createdAt'),
      ]
    );
    return { success: true, data: response.documents as Comment[] };
  } catch (error) {
    return { success: false, error };
  }
}

export async function addComment(
  ticketId: string,
  content: string,
  files?: File[]
) {
  try {
    const user = await getCurrentUser();
    if (!user.success) throw new Error('User not authenticated');

    // Upload files if provided
    const attachments: string[] = [];
    if (files && files.length > 0) {
      for (const file of files) {
        const upload = await uploadFile(file);
        attachments.push(upload.fileId);
      }
    }

    const response = await databases.createDocument(
      DATABASE_ID,
      COLLECTIONS.COMMENTS,
      ID.unique(),
      {
        ticketId,
        userId: user.data.$id,
        content,
        attachments,
        createdAt: new Date().toISOString(),
      }
    );

    // Update ticket's updatedAt timestamp
    await databases.updateDocument(
      DATABASE_ID,
      COLLECTIONS.TICKETS,
      ticketId,
      {
        updatedAt: new Date().toISOString(),
      }
    );

    return { success: true, data: response };
  } catch (error) {
    return { success: false, error };
  }
}

export async function getUserTickets() {
  try {
    const user = await getCurrentUser();
    if (!user.success) throw new Error('User not authenticated');

    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.TICKETS,
      [
        Query.equal('userId', user.data.$id),
        Query.orderDesc('$createdAt'),
      ]
    );

    return { success: true, data: response.documents as Ticket[] };
  } catch (error) {
    return { success: false, error };
  }
}

export async function updateTicket(ticketId: string, updates: Partial<Ticket>) {
  try {
    const response = await databases.updateDocument(
      DATABASE_ID,
      COLLECTIONS.TICKETS,
      ticketId,
      {
        ...updates,
        updatedAt: new Date().toISOString(),
      }
    );

    return { success: true, data: response };
  } catch (error) {
    return { success: false, error };
  }
}

export async function getFilePreview(fileId: string): Promise<string> {
  try {
    const result = await storage.getFilePreview(BUCKET_ID, fileId);
    return result.href;
  } catch (error) {
    console.error('Failed to get file preview:', error);
    throw error;
  }
}