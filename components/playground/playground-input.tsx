"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { SchemaField, SchemaFieldType, ArrayItemType } from "./schema-field";

interface PlaygroundInputProps {
  text: string;
  setText: (text: string) => void;
  schema: Record<string, { type: string; items?: { type: string } }>;
  setSchema: (
    schema: Record<string, { type: string; items?: { type: string } }>
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

interface Field {
  id: string;
  name: string;
  type: SchemaFieldType;
  arrayItemType?: ArrayItemType;
}

export function PlaygroundInput({
  text,
  setText,
  schema,
  setSchema,
  onSubmit,
  isLoading,
}: PlaygroundInputProps) {
  const [fields, setFields] = useState<Field[]>(
    Object.entries(schema).map(([name, { type, items }]) => ({
      id: Math.random().toString(36).substr(2, 9),
      name,
      type: type as SchemaFieldType,
      arrayItemType: items?.type as ArrayItemType,
    }))
  );

  const addField = () => {
    setFields([
      ...fields,
      {
        id: Math.random().toString(36).substr(2, 9),
        name: "",
        type: "string",
      },
    ]);
  };

  const removeField = (id: string) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const updateField = (id: string, updates: Partial<Field>) => {
    setFields(
      fields.map((field) =>
        field.id === id ? { ...field, ...updates } : field
      )
    );

    const newSchema = fields.reduce((acc, field) => {
      if (field.id === id) {
        const fieldName = updates.name || field.name;
        const fieldType = updates.type || field.type;
        const fieldArrayItemType = updates.arrayItemType || field.arrayItemType;

        acc[fieldName] = {
          type: fieldType,
          ...(fieldType === "array" && fieldArrayItemType
            ? { items: { type: fieldArrayItemType } }
            : {}),
        };
      } else {
        acc[field.name] = {
          type: field.type,
          ...(field.type === "array" && field.arrayItemType
            ? { items: { type: field.arrayItemType } }
            : {}),
        };
      }
      return acc;
    }, {} as Record<string, { type: string; items?: { type: string } }>);

    setSchema(newSchema);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 sm:space-y-6">
      <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-4 border-b border-neutral-200 dark:border-neutral-700 pb-2">
        Input
      </h3>
      <div>
        <label
          htmlFor="text"
          className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
        >
          Input Text
        </label>
        <textarea
          id="text"
          rows={4}
          className="w-full px-3 py-2 border border-neutral-200 dark:border-neutral-700 rounded-md shadow-sm focus:ring-neutral-500 focus:border-neutral-500 bg-background text-sm sm:text-base"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your text here..."
        />
      </div>

      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3 sm:mb-4">
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Fields to Extract
          </label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addField}
            className="flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <Plus className="h-4 w-4" />
            Add Field
          </Button>
        </div>
        <div className="space-y-2 sm:space-y-3 max-w-full overflow-hidden">
          {fields.map((field) => (
            <SchemaField
              key={field.id}
              fieldName={field.name}
              fieldType={field.type}
              arrayItemType={field.arrayItemType}
              onNameChange={(name) => updateField(field.id, { name })}
              onTypeChange={(type) => updateField(field.id, { type })}
              onArrayItemTypeChange={(type) =>
                updateField(field.id, { arrayItemType: type })
              }
              onRemove={() => removeField(field.id)}
            />
          ))}
          {fields.length === 0 && (
            <div className="text-center py-6 sm:py-8 text-neutral-500 dark:text-neutral-400 text-sm sm:text-base">
              No fields added yet. Click &quot;Add Field&quot; to start.
            </div>
          )}
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading || fields.length === 0}
        className="w-full mt-4"
      >
        {isLoading ? (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-white mr-2"></div>
            Processing...
          </div>
        ) : (
          "Extract Data"
        )}
      </Button>
    </form>
  );
}
