
import React, { useState } from "react";
import { toast } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";

// Paste your actual OpenAI API key here (must be a public/testing key for frontend use)
const OPENAI_API_KEY = "sk-...your-key-here..."; // <-- Put your API key here

// ***** Place your ChatGPT agent system prompt in this variable *****
const AGENT_SYSTEM_PROMPT = `
You are a fun and insightful quiz bot. Given answers to a Friends character quiz, you determine which of the main characters the user is most like. Start your output ONLY with the character's name on the first line, then a playful explanation in a new paragraph.

(You can edit this text: Put your ChatGPT agent code here.)
`;
// ******************************************

type QuizAIResultProps = {
  answers: string[];
  questions: string[];
  onRestart: () => void;
};

export const QuizAIResult: React.FC<QuizAIResultProps> = ({
  answers,
  questions,
  onRestart,
}) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    // Send the quiz data as a "user" message, using your agent prompt as the "system" message
    const userMessage =
      questions
        .map(
          (q, i) => `Q${i + 1}: ${q}\nA${i + 1}: ${answers[i]}`
        )
        .join("\n");

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "gpt-4o", // Use your desired model
            messages: [
              { role: "system", content: AGENT_SYSTEM_PROMPT.trim() },
              { role: "user", content: userMessage },
            ],
            max_tokens: 200,
            temperature: 0.8,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "AI API request failed! (Check your API key and usage limits)"
        );
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content as string | undefined;
      if (!content) {
        throw new Error("No response from AI.");
      }
      setResult(content.trim());
      toast("AI has analyzed your quiz results!");
    } catch (e: any) {
      setError(e.message || "Unknown error contacting AI.");
      toast(e.message || "Unknown error contacting AI.", {
        description: "AI API analysis failed.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center py-8">
      {!result ? (
        <>
          <div className="mb-6 text-center">
            <h2 className="text-xl font-bold mb-2">Get your result, powered by AI!</h2>
            <p className="mb-4 text-gray-600">
              {"Click below to reveal which Friends character you are. (Powered by ChatGPT)"}
            </p>
            <Button 
              onClick={handleAnalyze} 
              disabled={loading}
              className="w-full"
            >
              {loading ? "Analyzing..." : "Analyze with AI"}
            </Button>
            {error && <p className="text-red-500 mt-3">{error}</p>}
          </div>
          <Button variant="outline" onClick={onRestart}>Try Again</Button>
        </>
      ) : (
        <div className="text-center w-full max-w-md">
          {result.split('\n').map((line, idx) => (
            <p key={idx} className={idx === 0 ? "text-2xl font-bold mb-3 underline" : "mb-5 text-lg"}>
              {line}
            </p>
          ))}
          <Button onClick={onRestart} variant="outline" className="mt-3">Try Again</Button>
        </div>
      )}
    </div>
  );
};
