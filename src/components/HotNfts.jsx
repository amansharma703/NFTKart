import { useEffect, useState } from "react";
import { setGlobalState, useGlobalState } from "../store";
import { Card } from "./Artworks";

const HotNfts = () => {
    const [nfts] = useGlobalState("nfts");
    const [end, setEnd] = useState(4);
    const [collection, setCollection] = useState([]);

    const excludeID = ["213", "212", "209", "208", "205", "204", "203", "194", "196", "192", "193", "185", "183", "178", "175"];

    const getCollection = () => {
        const filterData = nfts.filter((item) => !excludeID.includes(String(item.id)) && Number(item.cost) > 0.002);
        return filterData.slice(0, end);
    };

    useEffect(() => {
        setCollection(getCollection());
    }, [nfts, end]);

    if (collection.length === 0) {
        return <></>;
    }

    return (
        <div className='bg-[#151c25] gradient-bg-artworks'>
            <div className='w-4/5 py-10 mx-auto'>
                <h4 className='text-white text-3xl font-bold uppercase text-gradient'>Hot NFTs</h4>

                <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-4 lg:gap-3 py-2.5'>
                    {collection.map((nft, i) => (
                        <Card key={i} nft={nft} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HotNfts;
