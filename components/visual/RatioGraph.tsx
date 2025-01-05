
export interface Part {
    name: string,
    ratio: number,
    volume: string,
}

export function RatioGraph({parts}: Array<Part>) {

    const colors = [
        "bg-blue-600",
        "bg-orange-600",
        "bg-green-600",
        "bg-red-600",
    ];

    const segments = parts.map((part, index) => <div key={index} style={{width: part.ratio + '%'}} className={colors[index] + ' flex'}><div className="mx-auto self-center w-fit text-center"><div>{part.name}</div><div>{part.volume}</div></div></div>);

    console.log(parts);

    return (
        <div className="w-full h-52 flex flex-row">
            {segments}
        </div>
    );
}