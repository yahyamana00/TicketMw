'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function UnauthorizedModal() {
  const [countdown, setCountdown] = useState(5);
  const [open, setOpen] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/login');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  const handleRedirect = () => {
    setOpen(false);
    router.push('/login');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Authentication Required</DialogTitle>
          <DialogDescription className="text-center">
            You must be signed in to access this page.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center items-center py-4">
          <div className="text-center space-y-2">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
            <p className="text-sm text-muted-foreground">
              Redirecting to login in {countdown} seconds...
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button 
            className="w-full" 
            onClick={handleRedirect}
          >
            Sign In Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}