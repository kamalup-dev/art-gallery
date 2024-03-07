import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  "https://irfzjowoxktrxrthxdqc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlyZnpqb3dveGt0cnhydGh4ZHFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4MDYwMjYsImV4cCI6MjAyNTM4MjAyNn0.8IDMst-h7mFIS0DcgfB0-Ry2l2rlRVmmedUdAGrlhDU"
);

const supabase_url = "https://irfzjowoxktrxrthxdqc.supabase.co"

export {supabase_url};
export default supabase;