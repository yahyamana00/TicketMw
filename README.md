# TicketMe - Modern Support Ticketing System

A powerful, AI-enhanced support ticketing system built with Next.js, Tailwind CSS, and Appwrite.

## Features

### Authentication & Security
- Email and Google OAuth sign-in options
- Email verification system
- Session management with auto-logout
- Role-based access control (Customer/Employee)
- Secure password handling

### Ticket Management
- Create, view, and manage support tickets
- File attachments support (up to 10MB per file)
- Multiple file formats supported:
  - Images
  - PDFs
  - Word documents
  - Text files
  - ZIP archives
- Priority levels (Low, Medium, High)
- Status tracking (Open, In Progress, Resolved)
- Category organization

### User Interface
- Modern, responsive design
- Dark/Light theme support
- Real-time updates
- Interactive dashboard with statistics
- Advanced ticket filtering and search
- Beautiful animations and transitions

### Dashboard Features
- Ticket statistics overview
- Recent ticket activity
- Status distribution charts
- Priority-based organization
- Quick access to common actions

### Email Notifications
- Welcome emails for new users
- Verification emails
- Login notifications
- Ticket status updates

## Technical Stack

### Frontend
- Next.js 14
- React 18
- Tailwind CSS
- shadcn/ui components
- Lucide React icons

### Backend & Services
- Appwrite (Backend as a Service)
  - Authentication
  - Database
  - Storage
  - Functions
- Email service integration

### State Management & Forms
- React Hook Form
- Zod validation
- Custom hooks for session management

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```env
   NEXT_PUBLIC_APPWRITE_ENDPOINT=your_appwrite_endpoint
   NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
   NEXT_PUBLIC_APPWRITE_BUCKET_ID=your_bucket_id
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
├── app/                  # Next.js app directory
│   ├── dashboard/       # Dashboard pages
│   ├── login/          # Authentication pages
│   ├── register/       # User registration
│   └── tickets/        # Ticket management
├── components/          # Reusable components
│   ├── auth/           # Authentication components
│   ├── tickets/        # Ticket-related components
│   └── ui/             # UI components
├── lib/                # Utility functions and API
│   ├── auth.ts        # Authentication logic
│   ├── tickets.ts     # Ticket management
│   └── appwrite.ts    # Appwrite configuration
└── hooks/              # Custom React hooks
```

## Security Features

- CSRF protection
- XSS prevention
- Secure session handling
- Input validation
- File upload restrictions
- Rate limiting

## Performance Optimizations

- Image optimization
- Code splitting
- Dynamic imports
- Cached API responses
- Optimized builds

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - See LICENSE file for details