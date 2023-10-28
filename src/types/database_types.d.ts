import { Database } from "./supabase";

export type Account = Database["public"]["Tables"]["accounts"]["Row"];

export type Address = Database["public"]["Tables"]["addresses"]["Row"];

export type Business = Database["public"]["Tables"]["business"]["Row"];