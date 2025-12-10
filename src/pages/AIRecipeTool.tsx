"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";

const AIRecipeTool = () => {
  const [inputContent, setInputContent] = useState<string>("");
  const [outputContent, setOutputContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAnalyze = async () => {
    if (!inputContent.trim()) {
      showError("Please enter some content to analyze.");
      return;
    }

    setIsLoading(true);
    setOutputContent("Analyzing your content...");

    // Simulate an API call to an AI backend
    try {
      // In a real application, you would send inputContent to your AI backend here
      // For now, we'll simulate a response
      await new Promise((resolve) => setTimeout(resolve, 2000)); 
      
      const simulatedOutput = `Analysis of your content:\n\n"${inputContent.substring(0, 100)}..."\n\nKey insights: The content focuses on [topic 1] and [topic 2]. It aims to [purpose].\n\nSimplified version: This is a simplified explanation of your complex text, making it easier to understand.`;
      
      setOutputContent(simulatedOutput);
      showSuccess("Content analyzed successfully!");
    } catch (error) {
      console.error("Error analyzing content:", error);
      showError("Failed to analyze content. Please try again.");
      setOutputContent("Error: Could not analyze content.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-4xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">AI Research & Thinking Partner</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Your Sources / Content</h2>
            <Textarea
              placeholder="Paste your research papers, articles, notes, or any content here for analysis..."
              value={inputContent}
              onChange={(e) => setInputContent(e.target.value)}
              rows={10}
              className="w-full resize-y min-h-[150px]"
            />
          </div>
          <Button 
            onClick={handleAnalyze} 
            disabled={isLoading} 
            className="w-full py-3 text-lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Analyze Content"
            )}
          </Button>
          <div>
            <h2 className="text-xl font-semibold mb-2">AI Output</h2>
            <Textarea
              placeholder="AI analysis will appear here: clarity, insights, transformations..."
              value={outputContent}
              readOnly
              rows={10}
              className="w-full resize-y min-h-[150px] bg-gray-100 dark:bg-gray-800"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIRecipeTool;