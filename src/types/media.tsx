
export type MediaParams = {
  id: string;
  type: string;
  slot: string;
  title: string;
  description: string | null;
  url: string | null;
  is_active: boolean;
  display_order: number;
  media: Media;
  created_at: string;
  updated_at: string;
};

export type Media = {
  id: string;
  file_name: string;
  original_name: string;
  file_size: number;
  mime_type: string;
  url: string;
  download_url: string;
  attachable_type: string;
  attachable_id: string;
  created_at: string;
  updated_at: string;
};