"use client";

export function PlaygroundTips() {
  return (
    <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
      <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
        Tips
      </h4>
      <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-2">
        <li>• Make sure your JSON schema is valid</li>
        <li>• Use descriptive field names in your schema</li>
        <li>• The API will return null for fields it cannot determine</li>
        <li>• Maximum input text length is 5000 characters</li>
      </ul>
    </div>
  );
} 