import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://lzlsoexwomugbxsruive.supabase.co",
  "sb_publishable__LqeztEIXeAyrUeWfS8SEg_vbU0p-TZ",
);

export default supabase;
