import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { db, storage } from './firebase/Config';
import { collection, query, orderBy, getDocs, doc, deleteDoc  } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import Loader from '../common/Loader';
import Modal from './ModalResponse';

const AnswerTable = () => {
    const [chatHistory, setChatHistory] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [itemOffset, setItemOffset] = useState(0);
    const [open, setOpen] = useState(false);

    const itemsPerPage = 5;
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = chatHistory.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(chatHistory.length / itemsPerPage);

    useEffect(() => {
        const collectionRef = collection(db, "report");
        const q = query(collectionRef, orderBy("timestamp", "desc"));
    
        getDocs(q)
            .then((querySnapshot) => {
                setChatHistory(
                querySnapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }))
                );
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error mengambil data koleksi:', error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);

    // Invoke when user click to request another page.
    const handlePageClick = (event: any) => {
        const newOffset = (event.selected * itemsPerPage) % chatHistory.length;
        setItemOffset(newOffset);
    };

    return (
        <div className=" rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <form>
            <div className="flex flex-auto mb-9 mt-2 items-center">
                <h3 className="text-2xl font-bold text-black dark:text-white mr-auto">Tabel Data</h3>
            </div>
            
            {/* To add table height */}
            <div className="max-w-full overflow-x-auto">
                {loading ? (
                <Loader />
                ) : (
                <table className="w-full table-auto">
                    <thead>
                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                        <th className="min-w-[20px] py-4 px-4 xl:px-8 xl:py-6">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            No
                        </h5>
                        </th>
                        <th className="min-w-[150px] py-4 px-4 xl:px-8 xl:py-6">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Email
                        </h5>
                        </th>
                        <th className="min-w-[220px] py-4 px-4 xl:px-8 xl:py-6">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Pertanyaan
                        </h5>
                        </th>
                        <th className="min-w-[100px] py-4 px-4 xl:px-8 xl:py-6">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Tanggal
                        </h5>
                        </th>
                        <th className="min-w-[100px] py-4 px-4 xl:px-8 xl:py-6">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Status
                        </h5>
                        </th>
                        <th className="py-4 px-4 xl:px-8 xl:py-6">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Aksi
                        </h5>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentItems.map((items: any, id: any) => (
                        <tr key={id}>
                        <td className="border-b justify-center items-center border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:px-8 xl:py-6">
                            <p className="text-black dark:text-white">
                            {id + 1}
                            </p>
                        </td>
                        <td className="border-b justify-center items-center border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:px-8 xl:py-6">
                            <p className="text-black dark:text-white">
                            {/* {items.filename} */}
                            </p>
                        </td>
                        <td className="border-b justify-center items-center border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:px-8 xl:py-6">
                            <p className="text-black dark:text-white">
                            {items.question}
                            </p>
                        </td>
                        <td className="border-b justify-center items-center border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:px-8 xl:py-6">
                            <p className="text-black dark:text-white">
                            {items.timestamp}
                            </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark">
                            <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
                            Sukses
                            </p>
                        </td>
                        <td className="border-b justify-center items-center border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:px-8 xl:py-6">
                            <div className="flex items-center space-x-3.5">
                            <NavLink to="/data-response/send"
                                className="hover:text-primary">
                                <svg
                                    className="fill-current"
                                    width="18"
                                    height="18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                >
                                    <path d="M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376V479.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z"/>
                                </svg>
                            </NavLink>


                            <button className="hover:text-danger">
                                <svg
                                    className="fill-current"
                                    width="18"
                                    height="18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 448 512"
                                >
                                    <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"/>
                                </svg>
                            </button>
                            </div>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                )}
            </div>
                <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                containerClassName="inline-flex -space-x-px text-base h-10 my-5"
                pageLinkClassName="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 border border-e-0 border-greendark hover:bg-green hover:text-white dark:border-bodydark2 dark:text-gray-400 dark:hover:bg-green dark:hover:text-white"
                previousLinkClassName="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 border border-e-0 border-greendark rounded-s-lg hover:bg-green hover:text-white dark:border-bodydark2 dark:text-gray-400 dark:hover:bg-green dark:hover:text-white"
                nextLinkClassName="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 border border-greendark rounded-e-lg hover:bg-green hover:text-white dark:border-bodydark2 dark:text-gray-400 dark:hover:bg-green dark:hover:text-white"
                activeClassName="text-white border-green bg-green dark:bg-green dark:text-white"
                />
            </form>
        </div>
    );
}

export default AnswerTable;