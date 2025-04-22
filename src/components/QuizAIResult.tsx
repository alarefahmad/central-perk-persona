
import React, { useState } from "react";
import { toast } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";

type QuizAIResultProps = {
  answers: string[];
  questions: string[];
  onRestart: () => void;
};

export const QuizAIResult: React.FC<QuizAIResultProps> = ({ answers, questions, onRestart }) => {
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    const prompt = 
      `You are a fun and insightful quiz bot. Given the quiz answers below, determine which Friends character (Ross, Rachel, Joey, Monica, Chandler, Phoebe) the user is MOST like. Your output should start ONLY with the name of the character on the first line, then a short, playful explanation why you chose that result in a second paragraph. 

Questions and answers:\n` + 
      questions.map((q, i) => `Q${i+1}: ${q}\nA${i+1}: ${answers[i]}`).join("\n") +
      "\n\nRemember, only output the character name first, then the explanation on a new line.";

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 200,
          temperature: 0.8,
        }),
      });

      if (!response.ok) {
        throw new Error("AI API request failed! (Check your API key and usage limits)");
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content as string | undefined;
      if (!content) {
        throw new Error("No response from AI.");
      }
      setResult(content.trim());
      toast({
        title: "Success",
        description: "AI has analyzed your quiz results!",
      });
    } catch (e: any) {
      setError(e.message || "Unknown error contacting AI.");
      toast({
        title: "Error",
        description: e.message || "Unknown error contacting AI.",
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
              {"Enter your OpenAI API key below (won't be stored), then click Analyze to reveal which Friends character you are."}
            </p>
            <input
              className="px-3 py-2 border rounded w-full mb-4"
              type="password"
              placeholder="sk-..."
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              disabled={loading}
            />
            <Button 
              onClick={handleAnalyze} 
              disabled={loading || !apiKey}
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
