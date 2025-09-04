import { useState } from "react";
import { ZoomIn, ZoomOut, RotateCw, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PdfViewerProps {
  documentUrl: string;
  totalPages: number;
  className?: string;
}

export function PdfViewer({ documentUrl, totalPages, className }: PdfViewerProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 50));
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);
  
  const handlePrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

  return (
    <div className={cn("flex flex-col h-full bg-card border rounded-lg", className)}>
      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 border-b bg-muted/50">
        <div className="flex items-center gap-2">
          {/* Page Navigation */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2 px-2">
              <span className="text-sm font-medium">{currentPage}</span>
              <span className="text-sm text-muted-foreground">of</span>
              <span className="text-sm font-medium">{totalPages}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="w-px h-6 bg-border mx-2" />

          {/* Zoom Controls */}
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Badge variant="outline" className="min-w-[60px] justify-center">
              {zoom}%
            </Badge>
            <Button variant="ghost" size="sm" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>

          <Button variant="ghost" size="sm" onClick={handleRotate}>
            <RotateCw className="h-4 w-4" />
          </Button>
        </div>

        <Button variant="ghost" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
      </div>

      {/* PDF Display Area */}
      <div className="flex-1 overflow-auto bg-gray-100 dark:bg-gray-900 p-4 flex items-center justify-center">
        <div 
          className="bg-white shadow-lg border"
          style={{
            transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
            transformOrigin: "center center",
            transition: "transform 0.2s ease"
          }}
        >
          {/* PDF Page Placeholder - In a real app, this would be a PDF rendering component */}
          <div className="w-[595px] h-[842px] bg-white border flex flex-col">
            {/* Document Header */}
            <div className="p-8 border-b">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Sample Document - Page {currentPage}
              </h1>
              <p className="text-gray-600 text-sm">
                Document processing and OCR analysis results
              </p>
            </div>

            {/* Document Content */}
            <div className="flex-1 p-8 text-gray-700">
              <div className="space-y-4">
                <p className="text-justify leading-relaxed">
                  This is a sample document page showing how the PDF viewer component works. 
                  In a real application, this would display the actual PDF content using a 
                  PDF rendering library like react-pdf or pdf.js.
                </p>
                
                <p className="text-justify leading-relaxed">
                  The document analysis shows various extracted entities, key points, and 
                  sentiment analysis results. Users can navigate between pages, zoom in/out, 
                  and rotate the document as needed.
                </p>

                <div className="mt-8 p-4 bg-gray-50 rounded border">
                  <h3 className="font-semibold mb-2">Document Metadata:</h3>
                  <ul className="text-sm space-y-1">
                    <li>• Total Pages: {totalPages}</li>
                    <li>• Current Zoom: {zoom}%</li>
                    <li>• Rotation: {rotation}°</li>
                    <li>• OCR Status: Completed</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Page Footer */}
            <div className="p-4 border-t bg-gray-50 text-center text-sm text-gray-500">
              Page {currentPage} of {totalPages} • Kochi Docs Suite
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}