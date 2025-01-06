'use client'
import { Button, Form, Input, Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";
import { createBase } from './actions';
import { useTranslations } from "next-intl";

export default function Page() {

    const t = useTranslations('Base');
    const tN = useTranslations('Nicotine');
    const tM = useTranslations('Mixture');

    const [pgContent, setPgContent] = useState("50");
    const [vgContent, setVgContent] = useState("50");
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

    return (
        <div className="min-h-screen">
            <div className="container max-w-3xl mx-auto">
                <h1 className="text-4xl py-10">{t('title_create')}</h1>
                <Form className="w-full max-w-xs">
                    <Input name="name" label={t('name')} type="text" />
                    <Select name="nicotineType" label={tN('type')}>
                        <SelectItem key="none">{tN('none')}</SelectItem>
                        <SelectItem key="freebase-nicotine">{tN('freebase-nicotine')}</SelectItem>
                        <SelectItem key="salt-nicotine">{tN('salt-nicotine')}</SelectItem>
                    </Select>
                    <Input name="nicotineStrength" label={tN('strength')} endContent={<span><sup>mg</sup>/<sub>ml</sub></span>} type="number" />
                    <Input name="pgContent" label={tM('pg_content')} type="number" value={pgContent} onValueChange={(value) => setRatio(value, 'pg')} endContent="%" />
                    <Input name="vgContent" label={tM('vg_content')} type="number" value={vgContent} onValueChange={(value) => setRatio(value, 'vg')} endContent="%" />

                    <Button formAction={createBase} color="primary" type="submit">{t('save')}</Button>
                </Form>
            </div>
        </div>
    );
}