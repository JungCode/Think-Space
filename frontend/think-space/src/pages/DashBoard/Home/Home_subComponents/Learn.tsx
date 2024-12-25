import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// Add CardDescription if needed!
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Book, CirclePlay } from "lucide-react";
import { useState } from "react";
import Customize from "./Learn_subComponents/customize";
import Types from "./Learn_subComponents/types";

const Cards = [
  {
    title: "Customize & Style your content",
    type: Book, // Book (if reading), Video (if video)
    time: "9m read",
    imageUrl:
      "https://narrato.io/blog/wp-content/uploads/2024/10/e08ea0d2cc2f04b4dc820c6b6de6b360_02_34_09_30_10_2024.png",
    content: <Customize />,
  },
  {
    title: "Types of content blocks",
    type: CirclePlay,
    time: "10m watch",
    imageUrl:
      "https://s3.us-west-2.amazonaws.com/public.notion-static.com/template/7ed8b380-9c62-4eb7-9775-a0345cd90a53/desktop.png",
    content: <Types />,
  },
  {
    title: "Book 1",
    type: Book,
    time: "6m read",
    imageUrl:
      "https://i.pinimg.com/736x/59/e7/ec/59e7ecb6aaceb154e3ed2db5aa24315e.jpg",
    content: <Customize />,
  },
  {
    title: "Media 2",
    type: CirclePlay,
    time: "10m watch",
    imageUrl:
      "https://i0.wp.com/aixpost.com/wp-content/uploads/2024/06/article-images-2024-06-07T105822.341.png?fit=960%2C540&ssl=1",
    content: <Customize />,
  },
  {
    title: "Media 3",
    type: CirclePlay,
    time: "12m watch",
    imageUrl: "https://images7.alphacoders.com/567/567990.jpg",
    content: <Customize />,
  },
];

interface CardItem {
  title: string;
  type: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  time: string;
  imageUrl: string;
  content: JSX.Element;
}

const Learn = () => {
  const [selectedCard, setSelectedCard] = useState<CardItem | null>(null);

  const handleCardClick = (item: CardItem) => {
    setSelectedCard(item);
  };
  return (
    <div className="flex flex-row justify-center gap-3">
      {Cards.map((item, index) => (
        <button key={index} onClick={() => handleCardClick(item)}>
          <Card className="flex flex-col justify-between w-56 h-56">
            <div>
              <CardHeader className="p-0">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="object-cover w-full h-32 rounded-t-lg"
                />
              </CardHeader>
              <CardContent className="p-3">
                <CardTitle className="text-sm font-light text-left">
                  {item.title}
                </CardTitle>
              </CardContent>
            </div>
            <CardFooter className="flex items-center gap-2 p-3 text-gray-500">
              <item.type size={15} />
              <span className="text-xs">{item.time}</span>
            </CardFooter>
          </Card>
        </button>
      ))}
      {selectedCard && (
        <Dialog
          open={!!selectedCard}
          onOpenChange={() => setSelectedCard(null)}
        >
          <DialogTrigger asChild>
            <button className="hidden">Open Dialog</button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-7xl max-h-[80vh] overflow-y-auto bg-white border border-gray-300 rounded-lg p-6 shadow-lg">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-blue-700">
                {selectedCard.title}
              </DialogTitle>
              <DialogDescription className="text-lg text-gray-600">
                {selectedCard.type === Book
                  ? "This is a book."
                  : "This is a media."}
              </DialogDescription>
            </DialogHeader>
            <div className="p-4">{selectedCard.content}</div>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Learn;
