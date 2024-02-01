import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabaseClient = createClient(
  "https://ennwjiitmiqwdrgxkevm.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVubndqaWl0bWlxd2RyZ3hrZXZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM5Mjc3OTgsImV4cCI6MTk5OTUwMzc5OH0.zCHzwchIjcmKNmccb9D4OLVwrWrpLHMmf4a8W7UedFs"
);

export const supabaseClientUrl = "https://ennwjiitmiqwdrgxkevm.supabase.co";
