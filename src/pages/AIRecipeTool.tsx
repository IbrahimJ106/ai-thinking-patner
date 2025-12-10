"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Upload, Link as LinkIcon, FileText, Youtube, FileAudio, FileTypePdf, FileInput } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";

const AIRecipeTool = () => {
  const [activeTab, setActiveTab] = useState<string>("text");
  const [inputContent, setInputContent] = useState<string>("");
  const [urlInput, setUrlInput] = useState<string>("");
  const [selectedUrlType, setSelectedUrlType] = useState<string>("website");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [outputContent, setOutputContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAnalyze = async () => {
    let contentToAnalyze = "";
    let inputType = "";

    if (activeTab === "text") {
      if (!inputContent.trim()) {
        showError("Please enter some text content to analyze.");
        return;
      }
      contentToAnalyze = inputContent;
      inputType = "text";
    } else if (activeTab === "url") {
      if (!urlInput.trim()) {
        showError("Please enter a URL to analyze.");
        return;
      }
      contentToAnalyze = urlInput;
      inputType = selectedUrlType;
    } else if (activeTab === "file") {
      if (!selectedFile) {
        showError("Please select a file to upload.");
        return;
      }
      contentToAnalyze = selectedFile.name; // In a real app, you'd upload the file
      inputType = selectedFile.type;
    }

    setIsLoading(true);
    setOutputContent(`Analyzing your ${inputType} content...`);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); 
      
      let simulatedOutput = `Analysis of your ${inputType} content:\n\n`;
      if (inputType === "text") {
        simulatedOutput += `"${contentToAnalyze.substring(0, Math.min(contentToAnalyze.length, 100))}..."\n\nKey insights: The text focuses on [topic 1] and [topic 2]. It aims to [purpose].\n\nSimplified version: This is a simplified explanation of your complex text, making it easier to understand.`;
      } else if (inputType === "website" || inputType === "youtube" || inputType === "google-doc" || inputType === "google-slide") {
        simulatedOutput += `URL: ${contentToAnalyze}\n\nKey insights from this ${inputType}: The content discusses [main theme] and provides [key information]. It's useful for [application].\n\nSummary: A concise summary of the ${inputType} content.`;
      } else if (inputType.startsWith("application/pdf")) {
        simulatedOutput += `PDF File: ${contentToAnalyze}\n\nKey insights from this PDF: The document covers [main topics] and presents [important data]. It's structured to [document purpose].\n\nExtracted information: Relevant sections and figures from the PDF.`;
      } else if (inputType.startsWith("audio/")) {
        simulatedOutput += `Audio File: ${contentToAnalyze}\n\nKey insights from this audio: The recording discusses [main points] and conveys [emotional tone]. It's a [type of audio] about [subject].\n\nTranscript summary: A summary of the spoken content.`;
      } else {
        simulatedOutput += `Content: ${contentToAnalyze}\n\nGeneral analysis: This content appears to be about [general topic]. Further details would require specific processing for its type.`;
      }
      
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
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="text">
                  <FileText className="mr-2 h-4 w-4" /> Text Input
                </TabsTrigger>
                <TabsTrigger value="url">
                  <LinkIcon className="mr-2 h-4 w-4" /> URL Input
                </TabsTrigger>
                <TabsTrigger value="file">
                  <Upload className="mr-2 h-4 w-4" /> File Upload
                </TabsTrigger>
              </TabsList>
              <TabsContent value="text" className="mt-4">
                <Textarea
                  placeholder="Paste your research papers, articles, notes, or any content here for analysis..."
                  value={inputContent}
                  onChange={(e) => setInputContent(e.target.value)}
                  rows={10}
                  className="w-full resize-y min-h-[150px]"
                />
              </TabsContent>
              <TabsContent value="url" className="mt-4 space-y-4">
                <div className="flex items-center space-x-2">
                  <Select value={selectedUrlType} onValueChange={setSelectedUrlType}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select URL Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="website">
                        <LinkIcon className="mr-2 h-4 w-4" /> Website
                      </SelectItem>
                      <SelectItem value="youtube">
                        <Youtube className="mr-2 h-4 w-4" /> YouTube Video
                      </SelectItem>
                      <SelectItem value="google-doc">
                        <FileText className="mr-2 h-4 w-4" /> Google Doc
                      </SelectItem>
                      <SelectItem value="google-slide">
                        <FileText className="mr-2 h-4 w-4" /> Google Slide
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    type="url"
                    placeholder="Enter URL (e.g., https://example.com/article)"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </TabsContent>
              <TabsContent value="file" className="mt-4 space-y-4">
                <Input
                  type="file"
                  accept=".pdf, .mp3, .wav, .ogg, .doc, .docx, .ppt, .pptx" // Common file types
                  onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)}
                  className="w-full"
                />
                {selectedFile && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Selected file: <span className="font-medium">{selectedFile.name}</span>
                  </p>
                )}
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Supported: PDFs, Audio (MP3, WAV), Google Docs/Slides (via URL), Websites, YouTube.
                </p>
              </TabsContent>
            </Tabs>
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