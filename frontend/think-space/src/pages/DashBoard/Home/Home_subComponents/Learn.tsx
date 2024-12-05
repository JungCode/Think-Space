import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// Add CardDescription if needed!
import { Book, CirclePlay } from "lucide-react";

const Cards = [
  {
    title: "Customize & Style your content",
    type: Book, // Book (if reading), Video (if video)
    time: "9m read",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    title: "Types of content blocks",
    type: CirclePlay,
    time: "10m watch",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    title: "Book 1",
    type: Book,
    time: "6m read",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    title: "Media 2",
    type: CirclePlay,
    time: "10m watch",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    title: "Media 3",
    type: CirclePlay,
    time: "12m watch",
    imageUrl: "https://via.placeholder.com/150",
  },
];

const Learn = () => {
  return (
    <div className="flex flex-row justify-center gap-3">
      {Cards.map((item, index) => (
        <Card className="flex flex-col justify-between w-56 h-56" key={index}>
          <div>
            <CardHeader className="p-0">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="object-cover w-full h-32 rounded-t-lg"
              />
            </CardHeader>
            <CardContent className="p-3">
              <CardTitle className="text-sm font-light">{item.title}</CardTitle>
            </CardContent>
          </div>
          <CardFooter className="flex items-center gap-2 p-3 text-gray-500">
            <item.type size={15} />
            <span className="text-xs">{item.time}</span>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Learn;
