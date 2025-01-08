'use client'
import { Button, Form, Input, Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { createBase } from './actions';
import { Base } from '../../../../../../components/cards/BaseCard';
import { createClient } from "@/utils/supabase/client";
import { useTranslations } from "next-intl";

export default function Page({ params }: { params: Promise<{ id: number }>}) {

    const t = useTranslations('Base');
    const tN = useTranslations('Nicotine');
    const tM = useTranslations('Mixture');

    const [id, setId] = useState(0);

    useEffect(() => {
        params.then((actualParams) => {
            setId(actualParams.id);
        });

    },[params])

    const [pgContent, setPgContent] = useState("50");
    const [vgContent, setVgContent] = useState("50");

    const [name, setName] = useState<string>('');

    const [nicotineStrength, setNicotineStrength] = useState<number>(0);

    const [nicotineType, setNicotineType] = useState<string|undefined>('');

//   useEffect(() => {
//       const pgContentNumeric = Number.parseInt(pgContent);
//       const newVgContent = (100 - pgContentNumeric).toString();
//       if (vgContent != newVgContent)
//       {
//           setVgContent(newVgContent);
//       }
//   },[pgContent]);

//   useEffect(() => {
//       const vgContentNumeric = Number.parseInt(vgContent);
//       const newPgContent = (100 - vgContentNumeric).toString();
//       if (pgContent != newPgContent)
//       {
//           setVgContent(newPgContent);
//       }
//   },[vgContent]);

    useEffect(() => {
        if (id < 1) {
            return;
        }
        const supabase = createClient();

        supabase
            .from('bases')
            .select()
            .eq('id', id)
            .then(({data, error}) => {
                if (error || !data)
                    return;

                const fetchedBase: Base = data[0];
                
                setName(fetchedBase.name);
                setNicotineType(fetchedBase.nicotine_type);
                setNicotineStrength(fetchedBase.nicotine_strength);
                setRatio(fetchedBase.pg.toString(), 'pg');
            });
    },[id]);

    const setRatio = (valueString: string, type: string) => {
        let value = Number.parseInt(valueString);
        if (value < 0) {
            value = 0;
        }
        if (value > 100) {
            value = 100;
        }

        const invertedValue = 100 - value;
        
        if (type === "pg") {
            setPgContent(value.toString());
            setVgContent(invertedValue.toString());
        } else if (type === "vg") {
            setVgContent(value.toString());
            setPgContent(invertedValue.toString());
        }
    }

    const setNicotineTypeHelper = (keys: Set<string>) => {
        const values = keys.entries().next().value;
        return values ? values[0] : '';
    }

    return (
        <div className="min-h-screen">
            <div className="container max-w-3xl mx-auto">
                <h1 className="text-4xl py-10">{t('title_edit')}</h1>
                <Form className="w-full max-w-xs">
                    <Input name="id" type="hidden" value={id.toString()} />
                    <Input name="name" label={t('name')} type="text" value={name} onValueChange={(value) => setName(value)} />
                    <Select name="nicotineType" selectedKeys={(nicotineType ? (nicotineType.length > 0 ? [nicotineType] : []) : [])} onSelectionChange={(keys) => setNicotineTypeHelper(keys as Set<string>)} label={tN('type')}>
                        <SelectItem key="none">{tN('none')}</SelectItem>
                        <SelectItem key="freebase-nicotine">{tN('freebase-nicotine')}</SelectItem>
                        <SelectItem key="salt-nicotine">{tN('salt-nicotine')}</SelectItem>
                    </Select>
                    <Input name="nicotineStrength" label={tN('strength')} endContent={<span><sup>mg</sup>/<sub>ml</sub></span>} type="number" value={nicotineStrength.toString()} onValueChange={(value) => setNicotineStrength(Number.parseInt(value))} />
                    <Input name="pgContent" label={tM('pg_content')} type="number" value={pgContent} onValueChange={(value) => setRatio(value, 'pg')} endContent="%" />
                    <Input name="vgContent" label={tM('vg_content')} type="number" value={vgContent} onValueChange={(value) => setRatio(value, 'vg')} endContent="%" />

                    <Button formAction={createBase} color="primary" type="submit">{t('save')}</Button>
                </Form>
            </div>
        </div>
    );
}