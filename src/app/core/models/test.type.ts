export class Test {
  id: number;
  state: string;
  error: string | null;
  results: TestResults | null;
  test_id: string;
  created_at: string;
  updated_at: string;
  hidden?: boolean;
  url: string;
}

export class TestResults {
  onload_time: number | null;
  first_contentful_paint_time: number | null;
  page_elements: number | null;
  report_url: string;
  redirect_duration: number | null;
  first_paint_time: number | null;
  dom_content_loaded_duration?: number | null;
  dom_content_loaded_time: number | null;
  dom_interactive_time: number | null;
  page_bytes: number | null;
  page_load_time: number | null;
  html_bytes: number | null;
  fully_loaded_time: number | null;
  html_load_time: number | null;
  rum_speed_index: number | null;
  yslow_score: number | null;
  pagespeed_score: number | null;
  backend_duration: number | null;
  onload_duration: number | null;
  connect_duration: number | null;
}