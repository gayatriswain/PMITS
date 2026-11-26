import "server-only";
import type { Types } from "mongoose";
import { Blog, BlogCategory } from "@/models";
import { HttpError } from "@/lib/api";

/**
 * The default blog category ("Uncategorized"). It can be renamed but never deleted: posts of a
 * deleted category - and posts saved without any category - are put into it.
 */
export async function defaultCategoryId(): Promise<Types.ObjectId> {
  const found = await BlogCategory.findOne({ isDefault: true }, "_id").lean<{ _id: Types.ObjectId }>();
  if (found) return found._id;
  const made = await BlogCategory.findOneAndUpdate(
    { slug: "uncategorized" },
    { $set: { isDefault: true }, $setOnInsert: { name: "Uncategorized", order: 999 } },
    { upsert: true, new: true },
  ).lean<{ _id: Types.ObjectId }>();
  return made!._id;
}

/** Before a category is deleted: refuse the default one, move the others' posts to the default. */
export async function beforeCategoryDelete(id: string) {
  const cat = await BlogCategory.findById(id, "isDefault name").lean<{ isDefault?: boolean; name?: string }>();
  if (!cat) return;
  if (cat.isDefault) throw new HttpError(422, `"${cat.name ?? "Uncategorized"}" is the default category. You can rename it, but it cannot be deleted.`);
  const def = await defaultCategoryId();
  await Blog.updateMany({ categories: id }, { $pull: { categories: id } });
  // posts left without any category go to the default one
  await Blog.updateMany({ $or: [{ categories: { $size: 0 } }, { categories: { $exists: false } }] }, { $set: { categories: [def] } });
}

/** A blog post always has at least one category. */
export async function withDefaultCategory<T extends Record<string, unknown>>(d: T): Promise<T> {
  const cats = Array.isArray(d.categories) ? d.categories.filter(Boolean) : [];
  if (cats.length) return d;
  return { ...d, categories: [String(await defaultCategoryId())] };
}
