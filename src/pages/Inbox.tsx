import { useState } from "react";
import { DocumentCard } from "@/components/DocumentCard";
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter, Grid, List, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SearchFilters {
  status: string[];
  language: string[];
  dateRange: string;
}

export default function Inbox() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState<SearchFilters>({
    status: [],
    language: [],
    dateRange: "all"
  });

  // Mock data
  const documents = [
    {
      id: "1",
      title: "Annual Report 2023.pdf",
      uploadDate: "2 hours ago",
      size: "2.3 MB",
      status: "completed" as const,
      language: "en" as const,
      pages: 45,
      confidence: 98
    },
    {
      id: "2",
      title: "കരാർ കത്ത്.pdf", 
      uploadDate: "5 hours ago",
      size: "1.1 MB",
      status: "processing" as const,
      language: "ml" as const,
      pages: 12
    },
    {
      id: "3",
      title: "Invoice_March_2024.pdf",
      uploadDate: "1 day ago", 
      size: "847 KB",
      status: "completed" as const,
      language: "en" as const,
      pages: 3,
      confidence: 95
    },
    {
      id: "4",
      title: "Contract Agreement.pdf",
      uploadDate: "2 days ago",
      size: "1.8 MB", 
      status: "failed" as const,
      language: "en" as const,
      pages: 23
    },
    {
      id: "5",
      title: "സർക്കാർ ഉത്തരവ്.pdf",
      uploadDate: "3 days ago",
      size: "956 KB",
      status: "completed" as const,
      language: "ml" as const,
      pages: 8,
      confidence: 92
    },
    {
      id: "6",
      title: "Financial Statement Q1.pdf",
      uploadDate: "1 week ago",
      size: "3.2 MB",
      status: "processing" as const,
      language: "en" as const,
      pages: 67
    }
  ];

  const stats = {
    total: documents.length,
    completed: documents.filter(d => d.status === "completed").length,
    processing: documents.filter(d => d.status === "processing").length,
    failed: documents.filter(d => d.status === "failed").length
  };

  const handleViewDocument = (id: string) => {
    navigate(`/document/${id}`);
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filters.status.length === 0 || filters.status.includes(doc.status);
    const matchesLanguage = filters.language.length === 0 || filters.language.includes(doc.language);
    
    return matchesSearch && matchesStatus && matchesLanguage;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Document Inbox</h1>
          <p className="text-muted-foreground">
            Manage and search through your document collection
          </p>
        </div>
        <Button onClick={() => navigate("/upload")}>
          <Upload className="h-4 w-4 mr-2" />
          Upload New
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Total Documents</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-success">{stats.completed}</div>
            <p className="text-xs text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-info">{stats.processing}</div>
            <p className="text-xs text-muted-foreground">Processing</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-destructive">{stats.failed}</div>
            <p className="text-xs text-muted-foreground">Failed</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-4">
            <div className="flex-1 w-full">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                filters={filters}
                onFiltersChange={setFilters}
                placeholder="Search documents by name..."
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredDocuments.length} of {documents.length} documents
            </p>
            {(filters.status.length > 0 || filters.language.length > 0 || filters.dateRange !== "all") && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFilters({ status: [], language: [], dateRange: "all" })}
              >
                <Filter className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Document Grid/List */}
      <div className={
        viewMode === "grid" 
          ? "grid gap-4 md:grid-cols-2 lg:grid-cols-3" 
          : "space-y-4"
      }>
        {filteredDocuments.length > 0 ? (
          filteredDocuments.map((document) => (
            <DocumentCard
              key={document.id}
              document={document}
              onView={handleViewDocument}
            />
          ))
        ) : (
          <Card className="col-span-full">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="text-center space-y-4">
                <div className="p-4 rounded-full bg-muted">
                  <Filter className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">No documents found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search criteria or filters
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery("");
                    setFilters({ status: [], language: [], dateRange: "all" });
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Load More (if needed) */}
      {filteredDocuments.length > 0 && (
        <div className="text-center pt-6">
          <Button variant="outline">Load More Documents</Button>
        </div>
      )}
    </div>
  );
}