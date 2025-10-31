import { describe, test, expect } from "@jest/globals";
import { authorFixtures } from "../fixtures/authors";
import { categoryFixtures } from "../fixtures/categories";
import { postFixtures } from "../fixtures/posts";

describe("Fixture Data Validation", () => {
  describe("Author Fixtures", () => {
    test("should have valid author data", () => {
      expect(authorFixtures.length).toBeGreaterThan(0);

      authorFixtures.forEach((author) => {
        expect(author._type).toBe("author");
        expect(author.name).toBeTruthy();
        expect(author.slug.current).toBeTruthy();
        expect(author.slug._type).toBe("slug");

        if (author.bio) {
          expect(Array.isArray(author.bio)).toBe(true);
        }
      });
    });

    test("should have unique slugs", () => {
      const slugs = authorFixtures.map((author) => author.slug.current);
      const uniqueSlugs = new Set(slugs);
      expect(slugs.length).toBe(uniqueSlugs.size);
    });
  });

  describe("Category Fixtures", () => {
    test("should have valid category data", () => {
      expect(categoryFixtures.length).toBeGreaterThan(0);

      categoryFixtures.forEach((category) => {
        expect(category._type).toBe("category");
        expect(category.title).toBeTruthy();
        expect(category.slug.current).toBeTruthy();
        expect(category.slug._type).toBe("slug");
      });
    });

    test("should have unique category slugs", () => {
      const slugs = categoryFixtures.map((category) => category.slug.current);
      const uniqueSlugs = new Set(slugs);
      expect(slugs.length).toBe(uniqueSlugs.size);
    });
  });

  describe("Post Fixtures", () => {
    test("should have valid post data", () => {
      expect(postFixtures.length).toBeGreaterThan(0);

      postFixtures.forEach((post) => {
        expect(post._type).toBe("post");
        expect(post.title).toBeTruthy();
        expect(post.slug.current).toBeTruthy();
        expect(post.slug._type).toBe("slug");
        expect(post.publishedAt).toBeTruthy();
        expect(new Date(post.publishedAt)).toBeInstanceOf(Date);

        if (post.body) {
          expect(Array.isArray(post.body)).toBe(true);
        }

        if (post.seo) {
          expect(post.seo.metaTitle).toBeTruthy();
          expect(post.seo.metaDescription).toBeTruthy();
        }
      });
    });

    test("should have unique post slugs", () => {
      const slugs = postFixtures.map((post) => post.slug.current);
      const uniqueSlugs = new Set(slugs);
      expect(slugs.length).toBe(uniqueSlugs.size);
    });

    test("should have valid published dates", () => {
      postFixtures.forEach((post) => {
        const publishedDate = new Date(post.publishedAt);
        expect(publishedDate.getTime()).not.toBeNaN();
        expect(publishedDate.getTime()).toBeLessThanOrEqual(Date.now());
      });
    });
  });
});
