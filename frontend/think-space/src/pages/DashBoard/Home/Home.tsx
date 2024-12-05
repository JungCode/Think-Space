import { Clock, CalendarClock, Lightbulb, Book } from "lucide-react";
import RecentlyVisited from "./Home_subComponents/RecentlyVisited";
import UpcomingEvents from "./Home_subComponents/UpcomingEvents";
import SuggestedForYou from "./Home_subComponents/SuggestedForYou";
import Learn from "./Home_subComponents/Learn";

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
      children: <UpcomingEvents />,
    },
    {
      title: "Suggested for you",
      icon: Lightbulb,
      children: <SuggestedForYou />,
    },
    {
      title: "Learn",
      icon: Book,
      children: <Learn />,
    },
  ];

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return "Good morning";
    } else if (currentHour < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  };

  return (
    <div className="flex-col justify-center mt-0 p-28 m-28 ">
      <h1 className="flex justify-center mb-20 text-3xl font-semibold">
        {getGreeting()}, {user.name}
      </h1>
      <div className="">
        <ul className="">
          {mainItems.map((item, index) => (
            <li key={index} className="flex flex-col gap-2 mb-12">
              <div className="flex items-center gap-2 text-gray-600">
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
