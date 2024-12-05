import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// Add CardContent if needed!
interface AppSidebarProps {
  user: {
    imageUrl: string;
    name: string;
  };
}
// Nice

const Cards = [
  {
    title: "👾",
    description: "Testing card",
    lastUsedBy: "user",
    lastHours: "2 hours ago",
  },
  {
    title: "👾",
    description: "Testing card",
    lastUsedBy: "user",
    lastHours: "2 hours ago",
  },
  {
    title: "👾",
    description: "Testing card",
    lastUsedBy: "user",
    lastHours: "2 hours ago",
  },
  {
    title: "👾",
    description: "Testing card",
    lastUsedBy: "user",
    lastHours: "2 hours ago",
  },
  {
    title: "👾",
    description: "Testing card",
    lastUsedBy: "user",
    lastHours: "2 hours ago",
  },
  {
    title: "👾",
    description: "Testing card",
    lastUsedBy: "user",
    lastHours: "2 hours ago",
  },
  {
    title: "👾",
    description: "Testing card",
    lastUsedBy: "user",
    lastHours: "2 hours ago",
  },
];

const RecentlyVisited = ({ user }: AppSidebarProps) => {
  return (
    <div className="flex flex-row justify-center gap-3">
      {Cards.map((item, index) => (
        <Card className="w-36 h-36" key={index}>
          <CardHeader>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </CardHeader>
          <CardFooter className="gap-2 text-gray-600">
            <Avatar className="w-5 h-5">
              <AvatarImage src={user.imageUrl} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="text-xs">{item.lastHours}</span>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default RecentlyVisited;
