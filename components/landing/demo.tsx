"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BASE_URL } from "@/lib/constants";
import {
  SchemaField,
  SchemaFieldType,
  ArrayItemType,
} from "@/components/playground/schema-field";

const EXAMPLE_TEXT = "Hi! My name is John and I'm 25 years old.";
const EXAMPLE_SCHEMA_FIELDS: SchemaFieldState[] = [
  { name: "name", type: "string" as SchemaFieldType },
  { name: "age", type: "number" as SchemaFieldType },
];

function fieldsToSchema(
  fields: SchemaFieldState[]
): Record<string, { type: SchemaFieldType; items?: { type: ArrayItemType } }> {
  const schema: Record<
    string,
    { type: SchemaFieldType; items?: { type: ArrayItemType } }
  > = {};
  for (const field of fields) {
    if (!field.name) continue;
    if (field.type === "array") {
      schema[field.name] = {
        type: "array",
        items: { type: field.arrayItemType || "string" },
      };
    } else {
      schema[field.name] = { type: field.type };
    }
  }
  return schema;
}

type SchemaFieldState = {
  name: string;
  type: SchemaFieldType;
  arrayItemType?: ArrayItemType;
};

const Demo = () => {
  const [message, setMessage] = useState<string>(EXAMPLE_TEXT);
  const [schemaFields, setSchemaFields] = useState<SchemaFieldState[]>(
    EXAMPLE_SCHEMA_FIELDS
  );
  const [result, setResult] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFieldChange = (
    idx: number,
    changes: Partial<SchemaFieldState>
  ) => {
    setSchemaFields((fields) =>
      fields.map((f, i) => (i === idx ? { ...f, ...changes } : f))
    );
  };
  const handleRemoveField = (idx: number) => {
    setSchemaFields((fields) => fields.filter((_, i) => i !== idx));
  };
  const handleAddField = () => {
    setSchemaFields((fields) => [...fields, { name: "", type: "string" }]);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    const schema = fieldsToSchema(schemaFields);
    try {
      const response = await fetch(`${BASE_URL}/api/extract`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: message,
          format: schema,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to process request");
      }
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-5 items-center">
      <div className="relative w-full rounded-xl bg-neutral-900/5 p-4 ring-1 ring-inset ring-neutral-900/10 lg:rounded-2xl">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center rounded-md bg-primary-700 px-3 py-1 text-xs font-medium text-white ring-1 ring-inset ring-primary-400/20">
              POST
            </span>
            <div className="h-[20px] w-px bg-neutral-300" />
            <p className="break-all">{BASE_URL}/api/extract</p>
          </div>
        </div>

        {!result && !error && (
          <form
            className="relative flex flex-col items-center gap-2 h-full mt-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <Input
              className="bg-white"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter text to extract data from..."
              disabled={isLoading}
            />

            <div className="bg-primary-90 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 w-full space-y-2">
              <div className="flex flex-col gap-2">
                {schemaFields.map((field, idx) => (
                  <SchemaField
                    key={idx}
                    fieldName={field.name}
                    fieldType={field.type}
                    arrayItemType={field.arrayItemType}
                    onNameChange={(name) => handleFieldChange(idx, { name })}
                    onTypeChange={(type) =>
                      handleFieldChange(idx, {
                        type,
                        arrayItemType: type === "array" ? "string" : undefined,
                      })
                    }
                    onArrayItemTypeChange={(arrayItemType) =>
                      handleFieldChange(idx, { arrayItemType })
                    }
                    onRemove={() => handleRemoveField(idx)}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:gap-2 w-full">
              <Button
                type="button"
                variant="outline"
                onClick={handleAddField}
                className="w-full sm:[width:calc(33.333334%-0.25rem)]"
              >
                + Add Field
              </Button>

              <Button
                className="w-full sm:[width:calc(66.666667%-0.25rem)]"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center flex-row gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Processing...
                  </div>
                ) : (
                  "Extract Data"
                )}
              </Button>
            </div>
          </form>
        )}

        <div className="mt-4 rounded-lg border-2 border-dashed border-neutral-300 text-sm">
          {error ? (
            <div className="p-4 text-red-600">{error}</div>
          ) : result ? (
            <div className="p-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Extracted Data</h3>
                <BricksView data={result as Record<string, unknown>} />
              </div>
            </div>
          ) : (
            <div className="p-4 text-neutral-700 flex items-center justify-center h-56">
              Results will be shown here
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function formatValue(value: unknown): string {
  if (value === null) return "Not found";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "object" && value !== null) {
    return JSON.stringify(value, null, 2);
  }
  return String(value);
}

function Brick({ label, value }: { label: string; value: string }) {
  return (
    <div className="w-full bg-primary-50 dark:bg-primary-950 border border-primary-200 dark:border-primary-800 rounded-lg px-4 py-3 mb-2 shadow-sm">
      <span className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wide mb-1 block">
        {label}
      </span>
      <span className="text-base font-medium text-primary-900 dark:text-primary-100 break-all whitespace-pre-wrap">
        {value}
      </span>
    </div>
  );
}

function BricksView({ data }: { data: Record<string, unknown> }) {
  return (
    <div className="flex flex-col w-full">
      {Object.entries(data).map(([key, value]) => (
        <Brick
          key={key}
          label={key.replace(/([A-Z])/g, " $1").trim()}
          value={formatValue(value)}
        />
      ))}
    </div>
  );
}

export default Demo;
