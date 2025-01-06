import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: number }> } ) {
    const id = (await params).id;
    const supabase = await createClient();

    await supabase
        .from('flavours')
        .delete()
        .eq('id', id);
    
    
    revalidatePath('/bases', 'page');
    redirect('/bases');
}