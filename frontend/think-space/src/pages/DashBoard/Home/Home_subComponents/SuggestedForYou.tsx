import { Layers } from "lucide-react";

const SuggestedForYou = () => {
  return (
    <div className="flex items-center justify-center h-64 p-6 text-gray-400 bg-white border border-gray-200 rounded-lg shadow-lg">
      <div className="flex flex-col items-center justify-center gap-5">
        <Layers size={20} />
        <span>Pages revelant to you will show up here.</span>
      </div>
    </div>
  );
};

export default SuggestedForYou;
