import { describe, test, expect } from "@jest/globals";
import { schemaTypes } from "../schemas";

describe("Sanity Schema Validation", () => {
  test("should have all required schema types", () => {
    const expectedTypes = [
      "author",
      "category",
      "post",
      "asset",
      "seo",
      "hero",
      "pricing",
      "testimonial",
      "blockContent",
      "youtube",
    ];

    const schemaTypeNames = schemaTypes.map((schema) => schema.name);

    expectedTypes.forEach((expectedType) => {
      expect(schemaTypeNames).toContain(expectedType);
    });
  });

  test("should have valid document types", () => {
    const documentTypes = schemaTypes.filter(
      (schema) => schema.type === "document",
    );

    expect(documentTypes.length).toBeGreaterThan(0);

    documentTypes.forEach((docType) => {
      expect(docType).toHaveProperty("name");
      expect(docType).toHaveProperty("title");
      expect(docType).toHaveProperty("fields");
      expect(Array.isArray(docType.fields)).toBe(true);
    });
  });

  test("should have required fields for post schema", () => {
    const postSchema = schemaTypes.find((schema) => schema.name === "post");

    expect(postSchema).toBeDefined();
    expect(postSchema?.fields).toBeDefined();

    const fieldNames =
      postSchema?.fields?.map((field: any) => field.name) || [];
    const requiredFields = ["title", "slug", "author", "publishedAt"];

    requiredFields.forEach((field) => {
      expect(fieldNames).toContain(field);
    });
  });

  test("should have required fields for asset schema", () => {
    const assetSchema = schemaTypes.find((schema) => schema.name === "asset");

    expect(assetSchema).toBeDefined();
    expect(assetSchema?.fields).toBeDefined();

    const fieldNames =
      assetSchema?.fields?.map((field: any) => field.name) || [];
    const requiredFields = ["title", "slug"];

    requiredFields.forEach((field) => {
      expect(fieldNames).toContain(field);
    });
  });

  test("should have validation rules for required fields", () => {
    const postSchema = schemaTypes.find((schema) => schema.name === "post");
    const titleField = postSchema?.fields?.find(
      (field: any) => field.name === "title",
    );

    expect(titleField?.validation).toBeDefined();
  });
});
