"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 p-2 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
      <div className="w-full sm:w-auto flex-1 min-w-0">
        <Input
          placeholder="Field name"
          value={fieldName}
          onChange={(e) => onNameChange(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full sm:w-auto">
        <Select
          value={fieldType}
          onValueChange={(value) => onTypeChange(value as SchemaFieldType)}
        >
          <SelectTrigger className="w-full sm:w-[120px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="string">Text</SelectItem>
            <SelectItem value="number">Number</SelectItem>
            <SelectItem value="boolean">True/False</SelectItem>
            <SelectItem value="array">List</SelectItem>
          </SelectContent>
        </Select>

        {fieldType === "array" && onArrayItemTypeChange && (
          <Select
            value={arrayItemType}
            onValueChange={(value) =>
              onArrayItemTypeChange(value as ArrayItemType)
            }
          >
            <SelectTrigger className="w-full sm:w-[120px]">
              <SelectValue placeholder="Item" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="string">Text</SelectItem>
              <SelectItem value="number">Number</SelectItem>
              <SelectItem value="boolean">True/False</SelectItem>
            </SelectContent>
          </Select>
        )}

        <Button
          variant="ghost"
          size="icon"
          onClick={onRemove}
          className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 h-8 w-8 sm:h-10 sm:w-10"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
