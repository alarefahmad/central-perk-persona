
// Update this page with a playful intro and a link to the quiz!

import { Button } from "@/components/ui/button";
import { Tv, Smile } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-100 via-green-100 to-purple-100 px-4">
      <div className="text-center max-w-lg mb-10">
        <div className="flex justify-center mb-4">
          <Tv className="w-14 h-14 text-orange-400 mr-2" />
          <Smile className="w-14 h-14 text-green-500" />
        </div>
        <h1 className="text-4xl font-extrabold mb-3">Discover Your Inner <span className="text-primary">Friend</span>!</h1>
        <p className="text-xl text-gray-700 mb-6">
          Take our quick quiz inspired by <span className="font-semibold">Friends</span> and see which character matches your personality.
        </p>
        <a href="/friends-quiz">
          <Button className="text-lg px-8 py-4 bg-gradient-to-tr from-orange-400 to-green-400 hover:from-orange-500 hover:to-green-500">
            Start the Friends Quiz
          </Button>
        </a>
      </div>
      <footer className="text-sm text-gray-400 mt-12">Made with ☕️ at Central Perk</footer>
    </div>
  );
};

export default Index;
