import React, { useState } from "react";
import { Smile, Laugh, Heart, Users, Star, Tv } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { QuizAIResult } from "@/components/QuizAIResult";

type Character = "Ross" | "Rachel" | "Joey" | "Monica" | "Chandler" | "Phoebe";

const characters: Record<Character, { color: string; icon: React.ReactNode; blurb: string }> = {
  Ross: {
    color: "bg-green-200",
    icon: <BookOpen className="w-12 h-12 text-green-700 mx-auto" />,
    blurb: "You're intelligent, passionate, and sometimes a bit awkward. Like Ross, you love your friends fiercely (and might have had a few epic moments!)",
  },
  Rachel: {
    color: "bg-pink-200",
    icon: <Star className="w-12 h-12 text-pink-700 mx-auto" />,
    blurb: "Fashionable, charming, and caring! Like Rachel, you dazzle those around you with your growth and style.",
  },
  Joey: {
    color: "bg-orange-200",
    icon: <Laugh className="w-12 h-12 text-orange-700 mx-auto" />,
    blurb: "You're fun-loving, loyal, and have a big heart (plus, nobody can resist your smile or appetite!). How you doin'?",
  },
  Monica: {
    color: "bg-blue-200",
    icon: <Heart className="w-12 h-12 text-blue-700 mx-auto" />,
    blurb: "Organized, competitive, and deeply caring! Like Monica, you're the heart and the glue of your group.",
  },
  Chandler: {
    color: "bg-yellow-200",
    icon: <Smile className="w-12 h-12 text-yellow-700 mx-auto" />,
    blurb: "Sarcastic, witty, but a softie underneath! Like Chandler, you make everyone laugh and always support your friends.",
  },
  Phoebe: {
    color: "bg-purple-200",
    icon: <Users className="w-12 h-12 text-purple-700 mx-auto" />,
    blurb: "Creative, quirky, and full of surprises. Like Phoebe, you dance to your own unique tune and lift everyone's spirits!",
  },
};

const quiz = [
  {
    question: "What's your ideal way to spend a free evening?",
    options: [
      { text: "Reading, learning something new", character: "Ross" },
      { text: "Shopping or relaxing at a cafe", character: "Rachel" },
      { text: "Going out for pizza or flirting", character: "Joey" },
      { text: "Cooking for friends", character: "Monica" },
      { text: "Watching comedy shows", character: "Chandler" },
      { text: "Playing guitar or writing a song", character: "Phoebe" },
    ],
  },
  {
    question: "Pick a word that describes you best:",
    options: [
      { text: "Smart", character: "Ross" },
      { text: "Stylish", character: "Rachel" },
      { text: "Friendly", character: "Joey" },
      { text: "Organized", character: "Monica" },
      { text: "Funny", character: "Chandler" },
      { text: "Creative", character: "Phoebe" },
    ],
  },
  {
    question: "Which Central Perk order is most *you*?",
    options: [
      { text: "Black coffee and a book", character: "Ross" },
      { text: "Fancy decaf latte, extra foam", character: "Rachel" },
      { text: "Muffin and the biggest coffee", character: "Joey" },
      { text: "Homemade cookies, of course", character: "Monica" },
      { text: "Espresso with a joke", character: "Chandler" },
      { text: "Herbal tea, singing for tips!", character: "Phoebe" },
    ],
  },
  {
    question: "Choose a famous Friends catchphrase:",
    options: [
      { text: "\"We were on a break!\"", character: "Ross" },
      { text: "\"It's like all my life everyone has always told me, 'You're a shoe.'\"", character: "Rachel" },
      { text: "\"How you doin'?\"", character: "Joey" },
      { text: "\"Welcome to the real world. It sucks.\"", character: "Monica" },
      { text: "\"Could I BE wearing any more clothes?\"", character: "Chandler" },
      { text: "\"Smelly Cat, Smelly Cat...\"", character: "Phoebe" },
    ],
  },
  {
    question: "What would your friends say is your best trait?",
    options: [
      { text: "Loyalty", character: "Joey" },
      { text: "Supportiveness", character: "Monica" },
      { text: "Optimism", character: "Phoebe" },
      { text: "Intelligence", character: "Ross" },
      { text: "Fashion sense", character: "Rachel" },
      { text: "Sense of humor", character: "Chandler" },
    ],
  },
];

function getResult(answers: Character[]): Character {
  const tally: Record<Character, number> = {
    Ross: 0,
    Rachel: 0,
    Joey: 0,
    Monica: 0,
    Chandler: 0,
    Phoebe: 0,
  };
  answers.forEach((c) => {
    tally[c] = (tally[c] || 0) + 1;
  });
  return (Object.keys(tally) as Character[]).reduce((a, b) => (tally[a] >= tally[b] ? a : b));
}

function BookOpen(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}><path stroke="currentColor" strokeWidth={2} d="M2 19V6a2 2 0 0 1 2-2h6v15H4a2 2 0 0 1-2-2Zm0 0V6m0 13h10M22 19V6a2 2 0 0 0-2-2h-6v15h6a2 2 0 0 0 2-2Z"/></svg>
  );
}

const FriendsQuiz: React.FC = () => {
  const [answers, setAnswers] = useState<(string | null)[]>(Array(quiz.length).fill(null));
  const [showResult, setShowResult] = useState(false);

  const handleChange = (qIdx: number, char: string) => {
    const copy = [...answers];
    copy[qIdx] = char;
    setAnswers(copy);
  };

  const allAnswered = answers.every((a) => a);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResult(true);
  };

  const handleRestart = () => {
    setAnswers(Array(quiz.length).fill(null));
    setShowResult(false);
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 px-2 min-h-screen bg-gradient-to-br from-orange-100 via-green-100 to-purple-100">
      <Card className="max-w-lg w-full p-8 shadow-lg rounded-2xl">
        <div className="flex flex-col items-center mb-8">
          <Tv className="w-12 h-12 text-orange-400 mb-2" />
          <h1 className="text-3xl font-extrabold tracking-tight mb-1">Which <span className="text-primary">Friends</span> Character Are You?</h1>
          <p className="text-gray-600 text-center">Take the quiz and find your Central Perk spirit!</p>
        </div>
        {!showResult ? (
          <form onSubmit={handleSubmit} className="space-y-8">
            {quiz.map((q, qIdx) => (
              <fieldset key={qIdx} className="mb-6">
                <legend className="font-bold text-lg mb-1">{qIdx+1}. {q.question}</legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.options.map((opt, idx) => (
                    <label
                      key={idx}
                      className={`flex items-center gap-2 px-3 py-2 rounded cursor-pointer border ${
                        answers[qIdx] === opt.character
                          ? "border-primary bg-primary/10"
                          : "border-gray-200"
                      } transition`}
                    >
                      <input
                        type="radio"
                        name={`q${qIdx}`}
                        value={opt.character}
                        checked={answers[qIdx] === opt.character}
                        onChange={() => handleChange(qIdx, opt.character)}
                        className="accent-primary"
                        required
                      />
                      {opt.text}
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
            <Button type="submit" disabled={!allAnswered} className="w-full mt-6">
              Get My Result
            </Button>
          </form>
        ) : (
          <QuizAIResult 
            answers={answers as string[]} 
            questions={quiz.map(q => q.question)} 
            onRestart={handleRestart} 
          />
        )}
      </Card>
      <a
        href="/"
        className="mt-8 text-primary hover:underline text-sm"
      >
        ← Back to Home
      </a>
    </div>
  );
};

export default FriendsQuiz;
