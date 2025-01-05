import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { EditIcon, TrashIcon } from "@/lib/icons";
import { useRouter } from "next/navigation";
import { Chip } from "@nextui-org/react";
import { JSX } from "react";

export interface Base {
    id: number,
    name: string,
    nicotine_type: string,
    nicotine_strength: number,
    pg: number,
    vg: number,
}

export interface BaseCardProps {
    base: Base,
    layout?: string,
    controls?: Array<JSX.Element>,
}

export function BaseCard({base, layout = 'default', controls = []}: BaseCardProps) {
    const {id, name, nicotine_type, nicotine_strength, pg, vg} = base;
    const router = useRouter();

    if (controls.length == 0) {
        controls = [
            <Button key={0} onPressEnd={() => router.push('/bases/edit/' + id)} isIconOnly >
                <EditIcon fill="blue" filled />
            </Button>,
            <Button key={1} onPressEnd={() => router.push('/bases/delete/' + id)} isIconOnly >
                <TrashIcon fill="red" filled />
            </Button>

        ];
    }
    const chips = [
        <Chip color="primary" key={0}><sup>PG</sup>/<sub>VG</sub> {pg.toString()}/{vg.toString()}</Chip>
    ];

    if (nicotine_type !== 'none') {
        chips.push(
            <Chip color="secondary" key={1}>Nic {nicotine_strength.toString()}mg</Chip>
        );
    }

    if (layout == 'compact') {
        return (
            <Card>
                <CardHeader>
                    <div className="grid grid-flow-row">
                        <div className="grid grid-flow-col gap-5">
                            <span>{name}</span>
                            {chips}
                        </div>
                        <div>
                            <div className="">
                                {controls}
                            </div>
                        </div>

                    </div>
                </CardHeader>
            </Card>

        );
    }
    return (
        <Card>
            <CardHeader><span>{name}</span></CardHeader>
            <CardBody>
                <span>PG/VG: {pg.toString()}/{vg.toString()}</span>
            </CardBody>
            <CardFooter>
                <div className="flex flex-row w-full justify-around">
                    {controls}
                </div>
            </CardFooter>
        </Card>
    );
}