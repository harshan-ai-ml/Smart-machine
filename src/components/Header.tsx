import { Gauge, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export const Header = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out",
      description: "You have been successfully logged out",
    });
  };

  return <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Gauge className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Smart Sprocket</h1>
              <p className="text-xs text-muted-foreground">Industrial Machine Management</p>
            </div>
          </Link>
          {user && (
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          )}
        </div>
      </div>
    </header>;
};
