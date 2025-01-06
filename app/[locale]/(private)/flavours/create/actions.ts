'use client'
import { createClient } from '@/utils/supabase/client';
import { redirect } from 'next/navigation';

export async function createBase(formData: FormData) {
    const supabase = createClient();
    const result = await supabase.auth.getUser();

    if (result.error || !result.data) {
        redirect('/error');
    }

    const data = {
        user_id: result.data.user.id,
        name: formData.get('name'),
        description: formData.get('description'),
        pg: 50,
        vg: 50,
    };

    const { error } = await supabase
        .from('flavours')
        .insert(data);

    
    if (error) {
        redirect('/error')
    }

    redirect('/flavours')
}