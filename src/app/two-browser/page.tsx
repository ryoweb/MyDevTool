// "use client";
// import { useState } from "react";
// import { Input } from "@nextui-org/react";


// export default function TwoBrowser() {
//     const [url, setUrl] = useState("");
//     const [url2, setUrl2] = useState("");

//     const handleChange = (e) => {
//         setUrl(e.target.value);
//     };
//     const handleChange2 = (e) => {
//         setUrl2(e.target.value);
//         document.cookie = "cookieName=cookieValue; SameSite=None; Secure";
//     };
//     return (
//         <div>
//             <div className="flex w-full flex-wrap md:flex-nowrap gap-1">
//                 <Input type="text" label="URL" onChange={handleChange} />
//                 <Input type="text" label="URL" onChange={handleChange2} />
//             </div>
//             <div className="flex w-full flex-wrap md:flex-nowrap gap-1">
//                 <iframe
//                     src="https://www.m-note.jp/exv/inq-item"
//                     width="100%"
//                     height="1000px"
//                     sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
//                     allowFullScreen
//                 ></iframe>
//                 <iframe
//                     src="https://www.m-note.jp/exv"
//                     width="100%"
//                     height="1000px"
//                     sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
//                     allowFullScreen
//                 ></iframe>
//             </div>
//         </div>
//     );
// }