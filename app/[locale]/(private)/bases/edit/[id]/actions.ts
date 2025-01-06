'use client'
import { createClient } from '@/utils/supabase/client';
import { redirect } from 'next/navigation';

export async function createBase(formData: FormData) {
    const supabase = createClient();
    const result = await supabase.auth.getUser();

    if (result.error || !result.data) {
        redirect('/error');
    }
    const id = formData.get('id');

    const data = {
        user_id: result.data.user.id,
        name: formData.get('name'),
        nicotine_type: formData.get('nicotineType'),
        nicotine_strength: formData.get('nicotineStrength'),
        pg: formData.get('pgContent'),
        vg: formData.get('vgContent'),
    };


    const { error } = await supabase
        .from('bases')
        .update(data)
        .eq('id', id);

    
    if (error) {
        redirect('/error')
    }

    redirect('/bases')
}