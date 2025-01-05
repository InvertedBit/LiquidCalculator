import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { EditIcon, TrashIcon } from "@/lib/icons";
import { useRouter } from "next/navigation";

export interface Flavour {
    id: number,
    name: string,
    description: string,
    pg: number,
    vg: number,
}

export function FlavourCard({id, name, description, pg, vg}: Flavour) {
    const router = useRouter();

    return (
        <Card>
            <CardHeader><span>{name}</span></CardHeader>
            <CardBody>
                <span className="text-lg">{description}</span><br />
                <span>PG/VG: {pg.toString()}/{vg.toString()}</span>
            </CardBody>
            <CardFooter>
                <div className="flex flex-row w-full justify-around">
                    <Button onPressEnd={() => router.push('/flavours/edit/' + id)} isIconOnly >
                        <EditIcon fill="blue" filled />
                    </Button>
                    <Button onPressEnd={() => router.push('/flavours/delete/' + id)} isIconOnly >
                        <TrashIcon fill="red" filled />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}