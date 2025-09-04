import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UploadDropzone } from "@/components/UploadDropzone";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, FileText, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UploadFile {
  id: string;
  file: File;
  progress: number;
  status: "uploading" | "completed" | "error";
}

export default function Upload() {
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleFilesAdded = (files: File[]) => {
    const newUploadFiles = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      progress: 0,
      status: "uploading" as const
    }));

    setUploadFiles(prev => [...prev, ...newUploadFiles]);

    // Simulate upload progress
    newUploadFiles.forEach(uploadFile => {
      simulateUpload(uploadFile.id);
    });
  };

  const simulateUpload = (fileId: string) => {
    const interval = setInterval(() => {
      setUploadFiles(prev => prev.map(file => {
        if (file.id === fileId && file.status === "uploading") {
          const newProgress = Math.min(file.progress + Math.random() * 20, 100);
          
          if (newProgress >= 100) {
            clearInterval(interval);
            // Randomly simulate success or error
            const isSuccess = Math.random() > 0.1; // 90% success rate
            
            setTimeout(() => {
              setUploadFiles(prev => prev.map(f => 
                f.id === fileId 
                  ? { ...f, progress: 100, status: isSuccess ? "completed" : "error" }
                  : f
              ));

              if (isSuccess) {
                toast({
                  title: "Upload successful",
                  description: `${file.file.name} has been uploaded and is being processed.`
                });
              } else {
                toast({
                  title: "Upload failed",
                  description: `Failed to upload ${file.file.name}. Please try again.`,
                  variant: "destructive"
                });
              }
            }, 500);

            return { ...file, progress: 100 };
          }
          
          return { ...file, progress: newProgress };
        }
        return file;
      }));
    }, 200);
  };

  const handleFileRemove = (fileId: string) => {
    setUploadFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const completedFiles = uploadFiles.filter(file => file.status === "completed");
  const errorFiles = uploadFiles.filter(file => file.status === "error");
  const uploadingFiles = uploadFiles.filter(file => file.status === "uploading");

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Upload Documents</h1>
        <p className="text-muted-foreground">
          Upload your documents for automated processing and OCR analysis
        </p>
      </div>

      {/* Upload Stats */}
      {uploadFiles.length > 0 && (
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-info" />
                <div>
                  <div className="text-2xl font-bold">{uploadingFiles.length}</div>
                  <p className="text-xs text-muted-foreground">Uploading</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-success" />
                <div>
                  <div className="text-2xl font-bold text-success">{completedFiles.length}</div>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-destructive" />
                <div>
                  <div className="text-2xl font-bold text-destructive">{errorFiles.length}</div>
                  <p className="text-xs text-muted-foreground">Failed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle>Select Files to Upload</CardTitle>
        </CardHeader>
        <CardContent>
          <UploadDropzone
            files={uploadFiles}
            onFilesAdded={handleFilesAdded}
            onFileRemove={handleFileRemove}
          />
        </CardContent>
      </Card>

      {/* Completed Files */}
      {completedFiles.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success" />
              Successfully Uploaded ({completedFiles.length})
            </CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate("/inbox")}
            >
              View in Inbox
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {completedFiles.map(uploadFile => (
                <div
                  key={uploadFile.id}
                  className="flex items-center justify-between p-3 rounded-lg border bg-success/5"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <div>
                      <p className="font-medium">{uploadFile.file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(uploadFile.file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-success/10 text-success">
                    Processing
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Failed Files */}
      {errorFiles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              Upload Errors ({errorFiles.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {errorFiles.map(uploadFile => (
                <div
                  key={uploadFile.id}
                  className="flex items-center justify-between p-3 rounded-lg border bg-destructive/5"
                >
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-destructive" />
                    <div>
                      <p className="font-medium">{uploadFile.file.name}</p>
                      <p className="text-sm text-destructive">Upload failed. Please try again.</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleFilesAdded([uploadFile.file])}
                  >
                    Retry
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Help Text */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-2">Supported File Types</h3>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>• <strong>PDF files:</strong> Text documents, reports, contracts</p>
            <p>• <strong>Images:</strong> PNG, JPG, JPEG, TIFF formats</p>
            <p>• <strong>Languages:</strong> English and Malayalam text recognition</p>
            <p>• <strong>Max size:</strong> 50MB per file</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}