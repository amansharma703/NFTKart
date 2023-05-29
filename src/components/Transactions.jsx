import { useEffect, useState } from "react";
import { BiTransfer } from "react-icons/bi";
import { MdOpenInNew } from "react-icons/md";
import { useGlobalState, truncate } from "../store";
import Loader from "./ui/Icons/Loader";

const Transactions = () => {
    const [transactions] = useGlobalState("transactions");
    const [end, setEnd] = useState(6);
    const [count] = useState(3);
    const [collection, setCollection] = useState([]);

    const getCollection = () => {
        return transactions.slice(0, end);
    };

    useEffect(() => {
        setCollection(getCollection());
    }, [transactions, end]);

    return (
        <div>
            <div className='w-4/5 py-10 mx-auto'>
                <h4 className='text-white text-3xl font-bold uppercase text-gradient'>
                    {collection.length > 0 ? "Latest Transactions" : "No Transaction Yet"}
                </h4>

                {!transactions ? (
                    <Loader />
                ) : (
                    <>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-4 lg:gap-2 py-2.5'>
                            {collection.map((tx) => (
                                <div
                                    key={tx.id}
                                    className='flex justify-between items-center border border-pink-500 text-gray-400 w-full shadow-xl shadow-black rounded-md overflow-hidden bg-gray-800 my-2 p-3'
                                >
                                    <div className='rounded-md shadow-sm shadow-pink-500 p-2'>
                                        <BiTransfer />
                                    </div>

                                    <div>
                                        <h4 className='text-sm'>{tx.title} Transfered</h4>
                                        <small className='flex flex-row justify-start items-center'>
                                            <span className='mr-1'>Received by</span>
                                            <span className='text-[white] mr-2'>{truncate(tx.owner, 4, 4, 11)}</span>
                                            <a href={`/profile/${tx.owner}`}>
                                                <MdOpenInNew />
                                            </a>
                                        </small>
                                    </div>

                                    <p className='text-sm font-medium'>{tx.cost}ETH</p>
                                </div>
                            ))}
                        </div>

                        {collection.length > 0 && transactions.length > collection.length && (
                            <div className='flex justify-center'>
                                <button
                                    className='bid__btn shadow-lg shadow-black rounded-full cursor-pointer mt-4'
                                    onClick={() => setEnd(end + count)}
                                >
                                    Load More
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Transactions;
