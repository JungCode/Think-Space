import { Book, CalendarClock, Clock, Lightbulb } from "lucide-react";
import RecentlyVisited from "./Home_subComponents/RecentlyVisited";

interface AppSidebarProps {
  user: {
    imageUrl: string;
    name: string;
  };
}

const Home = ({ user }: AppSidebarProps) => {
  const mainItems = [
    {
      title: "Recently Visited",
      icon: Clock,
      children: <RecentlyVisited user={user} />,
    },
    {
      title: "Upcoming Events",
      icon: CalendarClock,
      chilren: <p>hi</p>,
    },
    {
      title: "Suggested for you",
      icon: Lightbulb,
      chilren: <p>hi</p>,
    },
    {
      title: "Learn",
      icon: Book,
      chilren: <p>hi</p>,
    },
  ];

  return (
    <div className="flex-col justify-center border-2 border-dashed">
      <h1 className="flex justify-center">Good afternoon, {user.name}</h1>
      <div className="p-5 m-5">
        <ul className="">
          {mainItems.map((item, index) => (
            <li
              key={index}
              className="flex flex-col gap-2 mb-12 border-2 border-double border-cyan-400"
            >
              <div className="flex items-center gap-0 text-gray-600">
                <item.icon size={12} />
                <span className="text-xs font-medium">{item.title}</span>
              </div>
              <div>{item.children}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
