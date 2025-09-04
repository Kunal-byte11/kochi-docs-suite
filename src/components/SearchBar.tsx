import { useState } from "react";
import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface SearchFilters {
  status: string[];
  language: string[];
  dateRange: string;
}

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  placeholder?: string;
}

export function SearchBar({ 
  value, 
  onChange, 
  filters, 
  onFiltersChange,
  placeholder = "Search documents..." 
}: SearchBarProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const statusOptions = [
    { value: "completed", label: "Completed" },
    { value: "processing", label: "Processing" },
    { value: "failed", label: "Failed" }
  ];

  const languageOptions = [
    { value: "en", label: "English" },
    { value: "ml", label: "Malayalam" }
  ];

  const dateOptions = [
    { value: "today", label: "Today" },
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
    { value: "all", label: "All Time" }
  ];

  const handleFilterChange = (type: keyof SearchFilters, value: string | string[]) => {
    onFiltersChange({
      ...filters,
      [type]: value
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      status: [],
      language: [],
      dateRange: "all"
    });
  };

  const activeFilterCount = filters.status.length + filters.language.length + 
    (filters.dateRange !== "all" ? 1 : 0);

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="pl-9"
          />
        </div>

        {/* Filter Button */}
        <DropdownMenu open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="relative">
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {activeFilterCount > 0 && (
                <Badge className="ml-2 h-5 w-5 flex items-center justify-center text-xs p-0">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            {/* Status Filter */}
            <DropdownMenuLabel>Status</DropdownMenuLabel>
            {statusOptions.map((option) => (
              <DropdownMenuCheckboxItem
                key={option.value}
                checked={filters.status.includes(option.value)}
                onCheckedChange={(checked) => {
                  const newStatus = checked
                    ? [...filters.status, option.value]
                    : filters.status.filter(s => s !== option.value);
                  handleFilterChange("status", newStatus);
                }}
              >
                {option.label}
              </DropdownMenuCheckboxItem>
            ))}

            <DropdownMenuSeparator />

            {/* Language Filter */}
            <DropdownMenuLabel>Language</DropdownMenuLabel>
            {languageOptions.map((option) => (
              <DropdownMenuCheckboxItem
                key={option.value}
                checked={filters.language.includes(option.value)}
                onCheckedChange={(checked) => {
                  const newLanguage = checked
                    ? [...filters.language, option.value]
                    : filters.language.filter(l => l !== option.value);
                  handleFilterChange("language", newLanguage);
                }}
              >
                {option.label}
              </DropdownMenuCheckboxItem>
            ))}

            <DropdownMenuSeparator />

            {/* Date Range */}
            <DropdownMenuLabel>Date Range</DropdownMenuLabel>
            {dateOptions.map((option) => (
              <DropdownMenuCheckboxItem
                key={option.value}
                checked={filters.dateRange === option.value}
                onCheckedChange={() => handleFilterChange("dateRange", option.value)}
              >
                {option.label}
              </DropdownMenuCheckboxItem>
            ))}

            {activeFilterCount > 0 && (
              <>
                <DropdownMenuSeparator />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="w-full justify-start"
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear all filters
                </Button>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Active Filter Tags */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.status.map((status) => (
            <Badge key={status} variant="secondary" className="flex items-center gap-1">
              {statusOptions.find(s => s.value === status)?.label}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 ml-1"
                onClick={() => handleFilterChange("status", filters.status.filter(s => s !== status))}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
          {filters.language.map((language) => (
            <Badge key={language} variant="secondary" className="flex items-center gap-1">
              {languageOptions.find(l => l.value === language)?.label}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 ml-1"
                onClick={() => handleFilterChange("language", filters.language.filter(l => l !== language))}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
          {filters.dateRange !== "all" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {dateOptions.find(d => d.value === filters.dateRange)?.label}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 ml-1"
                onClick={() => handleFilterChange("dateRange", "all")}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}