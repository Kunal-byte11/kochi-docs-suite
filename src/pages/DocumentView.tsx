import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Share, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PdfViewer } from "@/components/PdfViewer";
import { SummaryPanel } from "@/components/SummaryPanel";
import { OCRStatus } from "@/components/OCRStatus";
import { LanguageBadge } from "@/components/LanguageBadge";

export default function DocumentView() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock document data - in real app, fetch based on ID
  const document = {
    id: id || "1",
    title: "Annual Report 2023.pdf",
    uploadDate: "March 15, 2024",
    size: "2.3 MB",
    status: "completed" as const,
    language: "en" as const,
    pages: 45,
    confidence: 98,
    url: "/sample-document.pdf"
  };

  // Mock summary data
  const summaryData = {
    keyPoints: [
      "Company revenue increased by 23.5% compared to previous year",
      "New market expansion into Southeast Asia shows promising results", 
      "R&D investment reached $2.1M, focusing on AI and automation",
      "Employee satisfaction scores improved by 15% across all departments",
      "Sustainability initiatives reduced carbon footprint by 18%"
    ],
    entities: [
      { name: "John Smith", type: "Person", confidence: 95 },
      { name: "Acme Corporation", type: "Organization", confidence: 98 },
      { name: "New York", type: "Location", confidence: 92 },
      { name: "Q4 2023", type: "Date", confidence: 89 },
      { name: "$2.1 million", type: "Money", confidence: 96 }
    ],
    sentiment: "positive" as const,
    language: "en" as const,
    confidence: 98
  };

  const fullText = `Annual Report 2023

Executive Summary

We are pleased to present our annual report for 2023, marking another year of significant growth and innovation for our organization. This year has been characterized by strategic expansions, technological advancements, and a renewed commitment to sustainability.

Financial Performance

Our financial results for 2023 demonstrate the strength of our business model and the effectiveness of our strategic initiatives. Revenue grew by 23.5% compared to the previous year, reaching $45.2 million. This growth was driven primarily by increased market penetration and the successful launch of three new product lines.

Market Expansion

During 2023, we successfully expanded into Southeast Asian markets, establishing partnerships in Thailand, Vietnam, and Malaysia. These new markets contributed approximately 12% of our total revenue and show promising growth potential for the coming years.

Research & Development

Innovation remains at the core of our business strategy. We invested $2.1 million in research and development activities, with a particular focus on artificial intelligence and automation technologies. These investments are already showing results, with two patent applications filed and several new products in the pipeline.

Human Resources

Our team is our greatest asset, and we are proud to report a 15% improvement in employee satisfaction scores across all departments. We implemented new professional development programs and enhanced our work-life balance initiatives, resulting in a 95% employee retention rate.

Sustainability Initiatives

Environmental responsibility is integral to our corporate values. This year, we reduced our carbon footprint by 18% through energy-efficient operations, sustainable sourcing practices, and investment in renewable energy solutions. We are committed to achieving carbon neutrality by 2030.

Looking Forward

As we move into 2024, we remain optimistic about our growth prospects. We plan to continue our international expansion, invest further in technology innovation, and strengthen our commitment to sustainable business practices.

Thank you to all our stakeholders - employees, customers, partners, and shareholders - for their continued support and trust in our vision.

Sincerely,
John Smith
Chief Executive Officer
Acme Corporation`;

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b bg-card">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/inbox")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Inbox
          </Button>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button variant="outline" size="sm">
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl font-bold">{document.title}</h1>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Uploaded on {document.uploadDate}</span>
            <span>•</span>
            <span>{document.size}</span>
            <span>•</span>
            <span>{document.pages} pages</span>
          </div>

          <div className="flex items-center gap-2">
            <OCRStatus status={document.status} confidence={document.confidence} />
            <LanguageBadge language={document.language} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex min-h-0">
        {/* PDF Viewer */}
        <div className="flex-1 p-6">
          <PdfViewer 
            documentUrl={document.url}
            totalPages={document.pages}
            className="h-full"
          />
        </div>

        {/* Summary Panel */}
        <div className="w-96 border-l bg-card p-6 overflow-y-auto">
          <SummaryPanel 
            summary={summaryData}
            fullText={fullText}
          />
        </div>
      </div>
    </div>
  );
}