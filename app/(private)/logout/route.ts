import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function GET(request: NextRequest) {
    const supabase = await createClient();
    supabase.auth.signOut();
    revalidatePath('/', 'layout');
    redirect('/');
}