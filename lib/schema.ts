import { ZodTypeAny, z } from "zod";

export type SchemaType = "string" | "number" | "boolean" | "array" | "object";

export interface JsonSchemaProperty {
  type: SchemaType;
  items?: JsonSchemaProperty;
  properties?: Record<string, JsonSchemaProperty>;
  required?: string[];
  description?: string;
  format?: string;
  enum?: unknown[];
  minimum?: number;
  maximum?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  [key: string]: unknown;
}

export interface JsonSchema {
  [key: string]: JsonSchemaProperty;
}

function isJsonSchemaProperty(obj: unknown): obj is JsonSchemaProperty {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "type" in obj &&
    typeof (obj as JsonSchemaProperty).type === "string"
  );
}

export const determineSchemaType = (schema: JsonSchemaProperty | JsonSchema): SchemaType => {
  if (!isJsonSchemaProperty(schema)) {
    if (Array.isArray(schema)) {
      return "array";
    } else if (typeof schema === "object") {
      return "object";
    }
    return typeof schema as SchemaType;
  }
  return schema.type;
};

export const jsonSchemaToZod = (schema: JsonSchemaProperty | JsonSchema): ZodTypeAny => {
  if (typeof schema === "object" && !isJsonSchemaProperty(schema) && !Array.isArray(schema)) {
    const shape: Record<string, ZodTypeAny> = {};
    for (const key in schema) {
      if (Object.prototype.hasOwnProperty.call(schema, key)) {
        shape[key] = jsonSchemaToZod(schema[key] as JsonSchemaProperty);
      }
    }
    return z.object(shape);
  }

  const type = determineSchemaType(schema);

  switch (type) {
    case "string":
      return z.string().nullable();
    case "number":
      return z.number().nullable();
    case "boolean":
      return z.boolean().nullable();
    case "array":
      if (!isJsonSchemaProperty(schema) || !schema.items) {
        return z.array(z.unknown()).nullable();
      }
      return z.array(jsonSchemaToZod(schema.items)).nullable();
    case "object":
      const shape: Record<string, ZodTypeAny> = {};
      if (isJsonSchemaProperty(schema)) {
        for (const key in schema) {
          if (key !== "type" && Object.prototype.hasOwnProperty.call(schema, key)) {
            shape[key] = jsonSchemaToZod(schema[key] as JsonSchemaProperty);
          }
        }
      }
      return z.object(shape);
    default:
      throw new Error(`Unsupported schema type: ${type}`);
  }
};