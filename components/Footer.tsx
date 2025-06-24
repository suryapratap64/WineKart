import { assets } from "@/assets/assets"
import Image from "next/image"


const Footer=()=>{

    return (
       <footer>
        <div className="flex flex-col md:flex-row items-start justify-center px-6 md:px-16 lg:px-32 gap-10 py-14 border-b border-gray-500/30 text-gray-500">
        <div className="w-4/5">
        {/* <Image src={assets.logotheka} alt="Footer Logo" /> */}
         <h1   className="cursor-pointer text-orange-600 text-2xl font-serif  w-28 md:w-32">WineKart</h1>
        <p>
            this is a footer that contains some information anout theka policy and other authenticity proviede by the indian goverment.



        </p>

        </div>
        <div>
                    <h2 className="font-medium text-gray-900 mb-5">Company</h2>
                    <ul className="text-sm space-y-2">
                        <li>
                            <a className="hover:underline transition" href="#">Home</a>
                        </li>
                         <li>
                <a className="hover:underline transition" href="#">About us</a>
              </li>
              <li>
                <a className="hover:underline transition" href="#">Contact us</a>
              </li>
              <li>
                <a className="hover:underline transition" href="#">Privacy policy</a>
              </li>
                    </ul>
        </div>

       
         <div className="w-1/2 flex items-start justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-gray-900 mb-5">Get in touch</h2>
            <div className="text-sm space-y-2">
              <p>+1-777-888-999</p>
              <p>contact@winekart</p>
            </div>
          </div>
        </div>
          <p className="py-4 text-center text-xs md:text-sm">
        Copyright 2025 © winekart.dev All Right Reserved.
      </p>
       </div>

       </footer>
    )

}
export default Footer