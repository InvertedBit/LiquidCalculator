import { Part, RatioGraph } from "@/components/visual/RatioGraph";
import { Ingredient } from "@/models/calculator";
import { createClient } from "@/utils/supabase/client";
import { Button, Form, Input, Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Base, BaseCard } from "../cards/BaseCard";
import { createNewLiquid } from "@/app/(private)/calculator/actions";

export default function BaseCalculator() {


    const [nicotineBases, setNicotineBases] = useState(new Array<Base>);

    const [selectedBases, setSelectedBases] = useState(new Array<Base>);

    const [bases, setBases] = useState(new Array<Base>);

    const [ingredients, setIngredients] = useState(new Array<Ingredient>);

    const [nicotineType, setNicotineType] = useState('none');
    const [nicotineStrength, setNicotineStrength] = useState(0);

    const [pgContent, setPgContent] = useState(50);
    const [vgContent, setVgContent] = useState(50);

    const [targetVolume, setTargetVolume] = useState(50);

    useEffect(() => {
        const supabase = createClient();

        supabase
            .from('bases')
            .select()
            .then((data) => {
                if (data?.data) {
                    setBases(data.data);
                }
            });
    }, [])

    useEffect(() => {
        if (selectedBases.length === 0 || targetVolume === 0) {
            return;
        }
        const hasNicotine = nicotineType !== 'none' && nicotineStrength > 0;

        if (hasNicotine && nicotineBases.length === 0) {
            return;
        }

        if (!selectedBases.find((base) => base.pg > 0) || !selectedBases.find((base) => base.vg > 0)) {
            return;
        }

        const newIngredients = new Array<Ingredient>;
        let remainingVolume = targetVolume;
        let pgNeeded = targetVolume / 100 * pgContent;
        let vgNeeded = targetVolume / 100 * vgContent;

        if (hasNicotine) {
            const nicotineBaseVolume = targetVolume / nicotineBases[0].nicotine_strength * nicotineStrength;
            const nicotineBaseRatio = 100 / targetVolume * nicotineBaseVolume;
            const nicotinePgVolume = nicotineBaseVolume / 100 * nicotineBases[0].pg;
            const nicotineVgVolume = nicotineBaseVolume / 100 * nicotineBases[0].vg;
            newIngredients.push({
                name: nicotineBases[0].name,
                type: 'base',
                nicotine_type: nicotineBases[0].nicotine_type,
                nicotine_strength: nicotineBases[0].nicotine_strength,
                pg: nicotineBases[0].pg,
                vg: nicotineBases[0].vg,
                volume: nicotineBaseVolume,
                pgVolume: nicotinePgVolume,
                vgVolume: nicotineVgVolume,
                ratio: nicotineBaseRatio,
            });

            remainingVolume -= nicotineBaseVolume;

            pgNeeded -= nicotinePgVolume;
            vgNeeded -= nicotineVgVolume;
            

            

        }

        let maxPgRatio = 0, maxVgRatio = 0;
        let pgLiquidIndex = -1, vgLiquidIndex = -1;

        selectedBases.forEach((base, index) => {
            if (base.pg > maxPgRatio) {
                maxPgRatio = base.pg;
                pgLiquidIndex = index;
            }
            if (base.vg > maxVgRatio) {
                maxVgRatio = base.vg;
                vgLiquidIndex = index;
            }
        });
        let nicotineRatio = 0;
        //if (hasNicotine) {
        //    nicotineRatio = newIngredients[0].ratio;
        //    if (targetRatio !== baseRatio && targetRatio !== nicotineRatio) {
        //        return;
        //    }
        //}

        if (pgLiquidIndex === vgLiquidIndex) {
            const targetRatio = pgContent / vgContent;
            const baseRatio = selectedBases[pgLiquidIndex].pg / selectedBases[pgLiquidIndex].vg;

            if (targetRatio !== baseRatio) {
                return;
            }
            newIngredients.push({
                name: selectedBases[pgLiquidIndex].name,
                type: 'base',
                nicotine_type: selectedBases[pgLiquidIndex].nicotine_type,
                nicotine_strength: selectedBases[pgLiquidIndex].nicotine_strength,
                pg: selectedBases[pgLiquidIndex].pg,
                vg: selectedBases[pgLiquidIndex].vg,
                volume: remainingVolume,
                pgVolume: remainingVolume / 100 * selectedBases[pgLiquidIndex].pg,
                vgVolume: remainingVolume / 100 * selectedBases[pgLiquidIndex].vg,
                ratio: baseRatio,
            });
            setIngredients(newIngredients);
            return;
        }

        if (selectedBases[pgLiquidIndex].vg === 0 && selectedBases[vgLiquidIndex].pg === 0) {
            newIngredients.push({
                name: selectedBases[pgLiquidIndex].name,
                type: 'base',
                nicotine_type: selectedBases[pgLiquidIndex].nicotine_type,
                nicotine_strength: selectedBases[pgLiquidIndex].nicotine_strength,
                pg: selectedBases[pgLiquidIndex].pg,
                vg: selectedBases[pgLiquidIndex].vg,
                volume: pgNeeded,
                pgVolume: pgNeeded,
                vgVolume: 0,
                ratio: 100 / targetVolume * pgNeeded,
            });
            newIngredients.push({
                name: selectedBases[vgLiquidIndex].name,
                type: 'base',
                nicotine_type: selectedBases[vgLiquidIndex].nicotine_type,
                nicotine_strength: selectedBases[vgLiquidIndex].nicotine_strength,
                pg: selectedBases[vgLiquidIndex].pg,
                vg: selectedBases[vgLiquidIndex].vg,
                volume: vgNeeded,
                pgVolume: vgNeeded,
                vgVolume: 0,
                ratio: 100 / targetVolume * vgNeeded,
            });
            setIngredients(newIngredients);
            return;

        }



        


    }, [selectedBases, nicotineBases, nicotineType, nicotineStrength, pgContent, vgContent, targetVolume])


    const setRatio = (value: number, type: string) => {
        if (value < 0) {
            value = 0;
        }
        if (value > 100) {
            value = 100;
        }

        const invertedValue = 100 - value;
        
        if (type === "pg") {
            setPgContent(value);
            setVgContent(invertedValue);
        } else if (type === "vg") {
            setVgContent(value);
            setPgContent(invertedValue);
        }
    }

    const addNicotineBase = (item: Base) => {
        if (nicotineBases.find((base) => base.name === item.name && base.pg === item.pg && base.vg === item.vg && base.nicotine_strength === item.nicotine_strength && base.nicotine_type === item.nicotine_type)) {
            return;
        }
        const newNicotineBases = new Array<Base>;
        newNicotineBases.push(item);
        setNicotineBases(newNicotineBases);
    };

    const addFillerBase = (item: Base) => {
        console.log(item);
        if (selectedBases.find((base) => base.name === item.name && base.pg === item.pg && base.vg === item.vg && base.nicotine_strength === item.nicotine_strength && base.nicotine_type === item.nicotine_type)) {
            return;
        }
        const newBases = selectedBases;
        newBases.push(item);
        setSelectedBases(newBases);
    };

    const nicotineBaseCards = bases.filter((base) => base.nicotine_type !== 'none').map((base, index) => <BaseCard key={index} layout="compact" controls={[<Button key={0} onPressEnd={() => addNicotineBase(base)}>Add</Button>]} {...base} />)
    const fillerBaseCards = bases.filter((base) => base.nicotine_type === 'none').map((base, index) => <BaseCard key={index} layout="compact" controls={[<Button key={0} onPressEnd={() => addFillerBase(base)}>Add</Button>]} {...base} />)

    const selectedNicotineBases = nicotineBases.map((base, index) => <li key={index}><span>{base.name}</span></li>);
    const selectedFillerBases = selectedBases.map((base, index) => <li key={index}><span>{base.name}</span></li>);

    const parts: Array<Part> = ingredients.map((item) => { return {
        name: item.name,
        ratio: item.ratio,
        volume: item.volume + 'ml',
    }});


    return (
        <div>
            <RatioGraph parts={parts}/>
            <Form className="w-full">
                <div className="w-full grid grid-cols-2 gap-10">
                    <div className="w-full grid grid-cols-2 auto-rows-min gap-2">
                        <div className="w-full col-span-2">
                            <h3 className="text-lg">Ingredients</h3>
                            <ul>
                                {selectedNicotineBases}
                            </ul>
                            <ul>
                                {selectedFillerBases}
                            </ul>
                        </div>
                        <Input name="name" label="Name" type="text" />
                        <Select name="nicotineType" label="Nicotine type" value={nicotineType} onSelectionChange={(value) => setNicotineType(value.toString())}>
                            <SelectItem key="none">No Nicotine</SelectItem>
                            <SelectItem key="freebase-nicotine">Freebase Nicotine</SelectItem>
                            <SelectItem key="salt-nicotine">Salt Nicotine</SelectItem>
                        </Select>
                        <Input name="targetPgContent" label="Target PG content" type="number" value={pgContent.toString()} onValueChange={(value) => setRatio(Number.parseInt(value), 'pg')} endContent="%" />
                        <Input name="targetVgContent" label="Target VG content" type="number" value={vgContent.toString()} onValueChange={(value) => setRatio(Number.parseInt(value), 'vg')} endContent="%" />
                        <Input name="targetNicotineStrength" label="Target Nicotine strength" endContent={<span><sup>mg</sup>/<sub>ml</sub></span>} type="number" value={nicotineStrength.toString()} onValueChange={(value) => setNicotineStrength(Number.parseInt(value))} />
                        <Input name="targetVolume" label="Target volume" endContent="ml" type="number" value={targetVolume.toString()} onValueChange={(value) => setTargetVolume(Number.parseInt(value))}  />

                        <Button formAction={createNewLiquid} type="submit">Save as new Liquid</Button>

                    </div>
                    <div className="w-full">
                        <h3 className="text-2xl">Nicotine Bases</h3>
                        <div>
                            {nicotineBaseCards}
                        </div>
                        <h3 className="text-2xl">Filler Bases</h3>
                        <div>
                            {fillerBaseCards}
                        </div>
                    </div>

                </div>
            </Form>
        </div>

    );
}