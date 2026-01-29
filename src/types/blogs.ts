export type BlogParams = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;

  status: "draft" | "published" | "archived";
  published_at: string | null;
  reading_time: number;

  author: {
    id: string;
    name: string;
    email: string;
  };

  main_attachment: {
    id: string;
    file_name: string;
    original_name: string;
    file_size: number;
    mime_type: string;
    url: string;
    download_url: string;
  } | null;

  meta: {
    title: string;
    description: string;
    keywords: string[] | null;
  };

  created_at: string;
  updated_at: string;
};