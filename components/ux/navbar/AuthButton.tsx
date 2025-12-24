import { Button } from "@/components/ui/button";
import { getUserInfo, removeUser } from "@/services/auth.serivce";
import { LogOut, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AuthButton() {
  const userInfo = getUserInfo();
  const router = useRouter();

  const handleLogout = () => {
    removeUser();
    router.refresh();
    toast.error("LogOut Successfully", {
      position: "top-center",
      duration: 2500,
      icon: <LogOut size={16} />,
    });
  };

  return (
    <div className="w-full lg:w-auto">
      {userInfo?.email ? (
        <Button
          variant="destructive"
          onClick={handleLogout}
          className="w-full justify-start lg:justify-center"
          size="default"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Logout</span>
          <span className="sm:hidden">Logout</span>
        </Button>
      ) : (
        <Link href="/login" className="block w-full">
          <Button
            className="w-full justify-start lg:justify-center"
            size="default"
          >
            <User className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Login</span>
            <span className="sm:hidden">Login</span>
          </Button>
        </Link>
      )}
    </div>
  );
}
