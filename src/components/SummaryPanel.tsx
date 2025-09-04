import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Download, Share } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SummaryData {
  keyPoints: string[];
  entities: { name: string; type: string; confidence: number }[];
  sentiment: "positive" | "neutral" | "negative";
  language: "en" | "ml";
  confidence: number;
}

interface SummaryPanelProps {
  summary: SummaryData;
  fullText: string;
}

export function SummaryPanel({ summary, fullText }: SummaryPanelProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("summary");

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Text has been copied to your clipboard."
    });
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive": return "bg-success/10 text-success";
      case "negative": return "bg-destructive/10 text-destructive";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getEntityTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "person": return "bg-info/10 text-info";
      case "organization": return "bg-warning/10 text-warning";
      case "location": return "bg-success/10 text-success";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Document Analysis</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="entities">Entities</TabsTrigger>
          <TabsTrigger value="fulltext">Full Text</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-4">
          {/* Metadata */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Analysis Metadata</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Confidence</span>
                <Badge variant="outline">{summary.confidence}%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Language</span>
                <Badge variant="outline">
                  {summary.language === "en" ? "English" : "Malayalam"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Sentiment</span>
                <Badge className={getSentimentColor(summary.sentiment)}>
                  {summary.sentiment}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Key Points */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm">Key Points</CardTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleCopy(summary.keyPoints.join("\n• "))}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {summary.keyPoints.map((point, index) => (
                  <li key={index} className="text-sm flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="entities" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm">Named Entities</CardTitle>
              <Badge variant="outline">{summary.entities.length} found</Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {summary.entities.map((entity, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded border">
                    <div>
                      <span className="font-medium text-sm">{entity.name}</span>
                      <Badge 
                        className={`ml-2 ${getEntityTypeColor(entity.type)}`}
                        variant="secondary"
                      >
                        {entity.type}
                      </Badge>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {entity.confidence}%
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fulltext" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm">Extracted Text</CardTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleCopy(fullText)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="max-h-96 overflow-y-auto p-3 bg-muted rounded text-sm leading-relaxed whitespace-pre-wrap">
                {fullText}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}