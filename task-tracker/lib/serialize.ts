/**
 * Serializes MongoDB documents to plain JavaScript objects
 * Converts ObjectIds and Dates to strings for safe transmission to Client Components
 */

export function serializeDocument<T>(doc: any): T {
  if (!doc) return doc;

  // Convert Mongoose document to plain object if needed
  const plainDoc = doc.toObject ? doc.toObject() : doc;

  return JSON.parse(JSON.stringify(plainDoc, (key, value) => {
    // Convert ObjectId to string
    if (value && typeof value === 'object' && value._bsontype === 'ObjectId') {
      return value.toString();
    }
    // Convert Date to ISO string
    if (value instanceof Date) {
      return value.toISOString();
    }
    return value;
  })) as T;
}

export function serializeDocuments<T>(docs: any[]): T[] {
  return docs.map(doc => serializeDocument<T>(doc));
}
