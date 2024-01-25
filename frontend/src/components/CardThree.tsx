import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase/Config';
import { useNavigate } from 'react-router-dom';
import { db } from './firebase/Config';
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useState } from "react";

const CardThree = () => {
  const Navigate = useNavigate()
  const [totalDocuments, setTotalDocuments] = useState(0);


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const documentsCollection = collection(db, "metadata");
        const docRef = doc(documentsCollection);
        getDocs(documentsCollection).then((querySnapshot) => {
          const total = querySnapshot.size;
          setTotalDocuments(total);
          console.log('Total dokumen dalam koleksi:', totalDocuments);
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
          viewBox="0 0 384 512"
        >
          <path d="M320 464c8.8 0 16-7.2 16-16V160H256c-17.7 0-32-14.3-32-32V48H64c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H320zM0 64C0 28.7 28.7 0 64 0H229.5c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64z"/>
        </svg>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-black dark:text-white">
            {totalDocuments}
          </h4>
          <span className="text-sm font-medium">Total Dokumen</span>
        </div>

      </div>
    </div>
  );
};

export default CardThree;
