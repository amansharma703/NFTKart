import { useEffect, useState } from "react";
import { setGlobalState, useGlobalState } from "../store";

const Artworks = () => {
    const [nfts] = useGlobalState("nfts");
    const [end, setEnd] = useState(4);
    const [count] = useState(4);
    const [collection, setCollection] = useState([]);

    const excludeID = ["213", "212", "209", "208", "205", "204", "203", "194", "196", "192", "193", "185", "183", "178", "175"];

    const getCollection = () => {
        const filterData = nfts.filter((item) => !excludeID.includes(String(item.id)));
        return filterData.slice(0, end);
    };

    useEffect(() => {
        setCollection(getCollection());
    }, [nfts, end]);

    return (
        <div className='bg-[#151c25] gradient-bg-artworks'>
            <div className='w-4/5 py-10 mx-auto'>
                <h4 className='text-white text-3xl font-bold uppercase text-gradient'>
                    {collection.length > 0 ? "Latest Artworks" : "No Artworks Yet"}
                </h4>

                <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-4 lg:gap-3 py-2.5'>
                    {collection.map((nft, i) => (
                        <Card key={i} nft={nft} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export const Card = ({ nft }) => {
    const setNFT = () => {
        setGlobalState("nft", nft);
        setGlobalState("showModal", "scale-100");
    };

    return (
        <div className='w-full shadow-xl shadow-black rounded-md overflow-hidden bg-gray-800 my-2 p-3'>
            <img src={nft.metadataURI} alt={nft.title} className='h-60 w-full object-cover shadow-lg shadow-black rounded-lg mb-3' />
            <h4 className='text-white font-semibold'>{nft.title}</h4>
            <p className='text-gray-400 text-xs my-1 text-justify'>{nft.description}</p>
            <div className='flex justify-between items-center mt-3 text-white'>
                <div className='flex flex-col'>
                    <small className='text-xs'>Current Price</small>
                    <p className='text-sm font-semibold'>{nft.cost} ETH</p>
                </div>

                <button className='bid__btn d-flex align-items-center gap-1' onClick={setNFT}>
                    <i className='ri-shopping-bag-line'></i> View Details
                </button>
            </div>
        </div>
    );
};

export default Artworks;
