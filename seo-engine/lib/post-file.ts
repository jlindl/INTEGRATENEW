/**
 * Turns a generated article into an MDX file in the site's post format.
 * The LinkedIn caption and publish status live in seo-engine/linkedin/, not here.
 */
import matter from "gray-matter";
import { config } from "../config";
import type { Article } from "./claude";
import type { Topic } from "./topics";

export function buildPostFile(article: Article, topic: Topic, date: string): string {
  const range = topic.type === "location" ? config.article.location : config.article.service;

  const data: Record<string, unknown> = {
    title: article.title,
    slug: article.slug,
    description: article.metaDescription,
    excerpt: article.excerpt,
    date,
    type: topic.type,
    category: range.category,
    targetKeyword: article.targetKeyword,
    ...(topic.type === "location"
      ? { location: topic.location.name, region: topic.location.county }
      : { service: topic.service.name }),
    trade: topic.audience.name,
    author: config.site.author,
    topicKey: topic.key,
  };

  return matter.stringify(`\n${article.body.trim()}\n`, data);
}
