"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2 } from "lucide-react";

export type SchemaFieldType = "string" | "number" | "boolean" | "array";
export type ArrayItemType = "string" | "number" | "boolean";

interface SchemaFieldProps {
  fieldName: string;
  fieldType: SchemaFieldType;
  arrayItemType?: ArrayItemType;
  onNameChange: (name: string) => void;
  onTypeChange: (type: SchemaFieldType) => void;
  onArrayItemTypeChange?: (type: ArrayItemType) => void;
  onRemove: () => void;
}

export function SchemaField({
  fieldName,
  fieldType,
  arrayItemType = "string",
  onNameChange,
  onTypeChange,
  onArrayItemTypeChange,
  onRemove,
}: SchemaFieldProps) {
  return (
    <div className="flex items-center gap-4 p-2 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
      <Input
        placeholder="Field name"
        value={fieldName}
        onChange={(e) => onNameChange(e.target.value)}
        className="flex-1"
      />
      <div className="flex items-center gap-2">
        <Select value={fieldType} onValueChange={(value) => onTypeChange(value as SchemaFieldType)}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="string">Text</SelectItem>
            <SelectItem value="number">Number</SelectItem>
            <SelectItem value="boolean">True/False</SelectItem>
            <SelectItem value="array">List</SelectItem>
          </SelectContent>
        </Select>

        {fieldType === "array" && onArrayItemTypeChange && (
          <Select value={arrayItemType} onValueChange={(value) => onArrayItemTypeChange(value as ArrayItemType)}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Item type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="string">Text</SelectItem>
              <SelectItem value="number">Number</SelectItem>
              <SelectItem value="boolean">True/False</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onRemove}
        className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
} 