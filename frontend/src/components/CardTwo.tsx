import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { db, auth } from './firebase/Config';
import { collection, doc, getDocs } from "firebase/firestore";

const CardThree = () => {
    const Navigate = useNavigate()
    const [totalDocuments, setTotalDocuments] = useState(0);


    useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
        const uid = user.uid;
        const documentsCollection = collection(db, "report");
        getDocs(documentsCollection).then((querySnapshot) => {
            const total = querySnapshot.size;
            setTotalDocuments(total);
        }).catch((error) => {
            console.error('Error mengambil data koleksi:', error);
        });


        } else {
        // User is signed out
        Navigate('/signin')
        console.log("user is logged out")
        }
    });

    }, [])

    return (
        <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
            <svg 
                xmlns="http://www.w3.org/2000/svg"
                className="fill-green dark:fill-white"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 64 512">
                <path d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64V320c0 17.7 14.3 32 32 32s32-14.3 32-32V64zM32 480a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"/>
            </svg>
        </div>

        <div className="mt-4 flex items-end justify-between">
            <div>
            <h4 className="text-title-md font-bold text-black dark:text-white">
                {totalDocuments}
            </h4>
            <span className="text-sm font-medium">Tidak Ada Jawaban</span>
            </div>

        </div>
        </div>
    );
};

export default CardThree;