import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Upload, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  Eye,
  Calendar
} from "lucide-react";
import { DocumentCard } from "@/components/DocumentCard";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  // Mock data
  const stats = {
    totalDocuments: 1247,
    processed: 1156,
    processing: 34,
    failed: 57,
    monthlyGrowth: 12.5
  };

  const recentDocuments = [
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
    }
  ];

  const handleViewDocument = (id: string) => {
    navigate(`/document/${id}`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your document processing activity.
          </p>
        </div>
        <Button onClick={() => navigate("/upload")}>
          <Upload className="h-4 w-4 mr-2" />
          Upload Documents
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDocuments.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +{stats.monthlyGrowth}% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processed</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{stats.processed.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {((stats.processed / stats.totalDocuments) * 100).toFixed(1)}% completion rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing</CardTitle>
            <Clock className="h-4 w-4 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-info">{stats.processing}</div>
            <p className="text-xs text-muted-foreground">
              Currently being analyzed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed</CardTitle>
            <Badge variant="destructive" className="h-6 w-6 p-0 flex items-center justify-center">
              {stats.failed}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{stats.failed}</div>
            <p className="text-xs text-muted-foreground">
              {((stats.failed / stats.totalDocuments) * 100).toFixed(1)}% error rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Documents */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Documents</CardTitle>
            <Button variant="outline" size="sm" onClick={() => navigate("/inbox")}>
              <Eye className="h-4 w-4 mr-2" />
              View All
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentDocuments.map((doc) => (
              <DocumentCard 
                key={doc.id} 
                document={doc} 
                onView={handleViewDocument}
              />
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start h-12"
              onClick={() => navigate("/upload")}
            >
              <Upload className="h-5 w-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Upload New Documents</div>
                <div className="text-xs text-muted-foreground">Drag & drop or browse files</div>
              </div>
            </Button>

            <Button 
              variant="outline" 
              className="w-full justify-start h-12"
              onClick={() => navigate("/inbox")}
            >
              <FileText className="h-5 w-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Browse Documents</div>
                <div className="text-xs text-muted-foreground">Search and filter your files</div>
              </div>
            </Button>

            <Button 
              variant="outline" 
              className="w-full justify-start h-12"
              onClick={() => navigate("/settings")}
            >
              <Calendar className="h-5 w-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Scheduled Reports</div>
                <div className="text-xs text-muted-foreground">Configure automated exports</div>
              </div>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}