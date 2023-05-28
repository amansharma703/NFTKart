import { useGlobalState, setGlobalState, setLoadingMsg, setAlert } from "../store";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { create } from "ipfs-http-client";
import { mintNFT } from "../Blockchain.Services";

const auth = "Basic " + Buffer.from("2Gg95YqQ672apEtGQbewfwGQANc" + ":" + "b2c85789868e83772bfbc59ddd6d09bb").toString("base64");

const client = create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    headers: {
        authorization: auth,
    },
});

const CreateNFT = () => {
    const [modal] = useGlobalState("modal");
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [fileUrl, setFileUrl] = useState("");
    const [imgBase64, setImgBase64] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !price || !description) return;

        setGlobalState("modal", "scale-0");
        setGlobalState("loading", { show: true, msg: "Uploading IPFS data..." });

        try {
            const created = await client.add(fileUrl);
            const metadataURI = `https://ipfs.io/ipfs/${created.path}`;
            const nft = { title, price, description, metadataURI };

            setLoadingMsg("Intializing transaction...");
            setFileUrl(metadataURI);
            await mintNFT(nft);

            resetForm();
            setAlert("Minting completed...", "green");
            window.location.reload();
        } catch (error) {
            console.log("Error uploading file: ", error);
            setAlert(`Minting failed... ${error}`, "red");
        }
    };

    const changeImage = async (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) reader.readAsDataURL(e.target.files[0]);

        reader.onload = (readerEvent) => {
            const file = readerEvent.target.result;
            setImgBase64(file);
            setFileUrl(e.target.files[0]);
        };
    };

    const closeModal = () => {
        setGlobalState("modal", "scale-0");
        resetForm();
    };

    const resetForm = () => {
        setFileUrl("");
        setImgBase64(null);
        setTitle("");
        setPrice("");
        setDescription("");
    };

    return (
        <div
            className={`fixed top-0 left-0 w-screen h-screen flex items-center
        justify-center bg-black bg-opacity-50 transform
        transition-transform duration-300 ${modal}`}
        >
            <div className='bg-[#151c25] shadow-xl shadow-[#7a42fc] rounded-xl w-11/12 md:w-2/5 h-5/6 p-6'>
                <form className='flex flex-col'>
                    <div className='flex flex-row justify-between items-center'>
                        <p className='font-semibold text-gray-400'>Add NFT</p>
                        <button type='button' onClick={closeModal} className='border-0 bg-transparent focus:outline-none'>
                            <FaTimes className='text-gray-400' />
                        </button>
                    </div>

                    <div className='flex flex-row justify-center items-center rounded-xl mt-2'>
                        <div className='shrink-0 rounded-xl overflow-hidden h-40 w-40'>
                            <img alt='NFT' className='h-full w-full object-cover cursor-pointer' src={imgBase64 || "img-09.jpg"} />
                        </div>
                    </div>

                    <div className='flex flex-row justify-between items-center bg-gray-800 rounded-xl mt-3'>
                        <label className='block'>
                            <span className='sr-only'>Choose profile photo</span>
                            <input
                                type='file'
                                accept='image/png, image/gif, image/jpeg, image/webp'
                                className='block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-[#19212c] file:text-gray-400
                  hover:file:bg-[#1d2631]
                  cursor-pointer focus:ring-0 focus:outline-none'
                                onChange={changeImage}
                                required
                            />
                        </label>
                    </div>

                    <div className='flex flex-row justify-between items-center bg-gray-800 rounded-xl mt-3'>
                        <input
                            className='block w-full text-sm
                text-slate-500 bg-transparent border-0
                focus:outline-none focus:ring-0'
                            type='text'
                            name='title'
                            placeholder='Title'
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            required
                        />
                    </div>

                    <div className='flex flex-row justify-between items-center bg-gray-800 rounded-xl mt-3'>
                        <input
                            className='block w-full text-sm
                text-slate-500 bg-transparent border-0
                focus:outline-none focus:ring-0'
                            type='number'
                            step={0.01}
                            min={0.01}
                            name='price'
                            placeholder='Price (Eth)'
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}
                            required
                        />
                    </div>

                    <div className='flex flex-row justify-between items-center bg-gray-800 rounded-xl mt-3'>
                        <textarea
                            className='block w-full text-sm resize-none
                text-slate-500 bg-transparent border-0
                focus:outline-none focus:ring-0 h-20'
                            type='text'
                            name='description'
                            placeholder='Description'
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            required
                        ></textarea>
                    </div>

                    <button type='submit' className='bid__btn shadow-lg shadow-black rounded-full cursor-pointer mt-4' onClick={handleSubmit}>
                        Mint Now
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateNFT;
