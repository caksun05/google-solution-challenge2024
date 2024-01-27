import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from './firebase/Config';
import { getDocs, collection } from "firebase/firestore";


const CardOne = () => {
  const Navigate = useNavigate()
  const [totalHistory, setTotalHistory] = useState(0);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const historyCollection = collection(db, "chatHistory");
        getDocs(historyCollection).then((querySnapshot) => {
          const total = querySnapshot.size;
          setTotalHistory(total);
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
          className="fill-green dark:fill-white"
          width="22"
          height="16"
          viewBox="0 0 22 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="2" y="4" width="4" height="12" fill="" />
          <rect x="8" y="1" width="4" height="15" fill="" />
          <rect x="14" y="6" width="4" height="10" fill="" />
        </svg>

      </div>
      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-black dark:text-white">
            {totalHistory}
          </h4>
          <span className="text-sm font-medium">Total Aktivitas</span>
        </div>
      </div>
    </div>
  );
};

export default CardOne;