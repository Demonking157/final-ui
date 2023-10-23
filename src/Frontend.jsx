import './normal.css';
import './frontend.css';
import {useState, useEffect} from 'react';

function Frontend() {

  const [input , setInput] = useState("");
  const [chatLog , setChatLog] = useState([{
    user: "ai",
    message: "How i can help you today?"
  }]);

  // useEffect(()=>{
  //   fetchData()
  // },[]);

  // const fetchData = async ()=>{
  //   try{
  //     const response= await fetch('http://localhost:5000/api')
  //     const jsonData =await response.json();
  //     setChatLog(jsonData)
  //   }
  //   catch(error){
  //     console.log("ERROR", error)
  //   }
  // }

  function clearChat(){
    setChatLog([]);
  }

  async function handleSubmit(e){
    e.preventdefault();
    let chatLogNew = [...chatLog , {user : "me", message: `${input}`}]
    setInput("");
    setChatLog(chatLogNew)

    //fetch response from api
    const messages= chatLogNew.map((message)=>message.message).join("\n")
    const response = await fetch("http://localhost:5000/api",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: messages
      })
      // .then(response=>response.json())
      // .catch(error=>console.log(error))
    });
      const data = await response.json();
      setChatLog([...chatLogNew,{user: "ai",message: `${input.message}`}])
  }

  return (
    <div className="container">
      <aside className="sidemenu">
        <div className="side-menu-button" onClick={clearChat}>
          <span>+</span>
          Genrating Learning Path
        </div>
      </aside>
      <section className ="chatbox">
        <div className="chat-log">
          {chatLog.map((message,index)=><ChatMessage key={index} message={message}/>)}
          
        </div>
        <div className="chat-input-holder">
          <form onSubmit={handleSubmit}>
          <input 
          value={input}
          onChange={(e)=> setInput(e.target.value)}
          rows="1" 
          className="chat-input-textarea"></input>
          </form>
        </div>
      </section>
      
    </div>
  );
}

const ChatMessage = ({message}) =>{
  return(
    <div className={`chat-message ${message.user === "ai" && "chatai"}`}>
            <div className="chat-message-center">
              <div className={`avatar ${message.user === "ai" && "chatai"}`}>
              {message.user === "ai" && <svg
    xmlns="http://www.w3.org/2000/svg"
    width={41}
    height={41}
    fill="none"
  >
    <text x={-9999} y={-9999}>
      {"ChatAI"}
    </text>
    <path
      fill="currentColor"
      d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835A9.964 9.964 0 0 0 18.306.5a10.079 10.079 0 0 0-9.614 6.977 9.967 9.967 0 0 0-6.664 4.834 10.08 10.08 0 0 0 1.24 11.817 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 7.516 3.35 10.078 10.078 0 0 0 9.617-6.981 9.967 9.967 0 0 0 6.663-4.834 10.079 10.079 0 0 0-1.243-11.813ZM22.498 37.886a7.474 7.474 0 0 1-4.799-1.735c.061-.033.168-.091.237-.134l7.964-4.6a1.294 1.294 0 0 0 .655-1.134V19.054l3.366 1.944a.12.12 0 0 1 .066.092v9.299a7.505 7.505 0 0 1-7.49 7.496ZM6.392 31.006a7.471 7.471 0 0 1-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 0 0 1.308 0l9.724-5.614v3.888a.12.12 0 0 1-.048.103l-8.051 4.649a7.504 7.504 0 0 1-10.24-2.744ZM4.297 13.62A7.469 7.469 0 0 1 8.2 10.333c0 .068-.004.19-.004.274v9.201a1.294 1.294 0 0 0 .654 1.132l9.723 5.614-3.366 1.944a.12.12 0 0 1-.114.01L7.04 23.856a7.504 7.504 0 0 1-2.743-10.237Zm27.658 6.437-9.724-5.615 3.367-1.943a.121.121 0 0 1 .113-.01l8.052 4.648a7.498 7.498 0 0 1-1.158 13.528v-9.476a1.293 1.293 0 0 0-.65-1.132Zm3.35-5.043c-.059-.037-.162-.099-.236-.141l-7.965-4.6a1.298 1.298 0 0 0-1.308 0l-9.723 5.614v-3.888a.12.12 0 0 1 .048-.103l8.05-4.645a7.497 7.497 0 0 1 11.135 7.763Zm-21.063 6.929-3.367-1.944a.12.12 0 0 1-.065-.092v-9.299a7.497 7.497 0 0 1 12.293-5.756 6.94 6.94 0 0 0-.236.134l-7.965 4.6a1.294 1.294 0 0 0-.654 1.132l-.006 11.225Zm1.829-3.943 4.33-2.501 4.332 2.5v5l-4.331 2.5-4.331-2.5V18Z"
    />
  </svg> }
              </div>
              <div className="message">
                {message.message}
              </div>
            </div>
          </div>
  )
}

export default Frontend;



// import "./App.css";
// import { useEffect, useState, useRef } from "react";
// import axios from "axios";

// function App() {
//   const [input, setInput] = useState();
//   const [chats, setChats] = useState([]);
//   const [selectModel, setSelectmodel] = useState(null);
//   const [model, setModel] = useState([]);
//   const count = useRef("");
//   const handelSumbit = async (e) => {
//     e.preventDefault();
//     const chatLog = [...chats, { user: "me", chat: input }];
//     setChats(chatLog);
//     setInput("");
//     const response = await axios.post("http://localhost:5000/", {
//       chats: chatLog.map((chat) => chat.chat).join(" "),
//       model: selectModel,
//     });
//     // const res = await response.json();
//     console.log(response);
//     setChats((chats) => [...chats, { user: "ai", chat: response.data.chat }]);
//   };

//   const onPressEnter = (e) => {
//     if (e.keyCode == 13 && e.shiftKey == false) {
//       e.preventDefault();
//       handelSumbit(e);
//     }
//   };

//   useEffect(() => {
//     const getUsers = async () => {
//       const response = await axios.get("http://localhost:5000/");
//       count.current = response.data.model;
//       setModel(response.data.model);
//       setSelectmodel(count.current[0].id);
//     };

//     getUsers();
//   }, []);

//   const handelModel = (e) => {
//     setSelectmodel(e.target.value);
//   };

//   return (
//     <div className="App">
//       <aside className="left-panel">
//         <button className="btn">
//           {/* Plus svg */}
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth="1.5"
//             stroke="currentColor"
//             className="w-6 h-6"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M12 4.5v15m7.5-7.5h-15"
//             />
//           </svg>
          
//         </button>
//         <div>
//           <select
//             value={selectModel}
//             onChange={handelModel}
//             className="btn selectModel"
//           >
//             {model &&
//               model.map((m) => (
//                 <option name={m.id}>
//                   <p>{m.id}</p>
//                 </option>
//               ))}
//           </select>
//         </div>
//       </aside>
//       <section className="main">
//         <div className="main_chat">
//           {chats.map((chat) =>
//             chat.user === "me" ? (
//               <div className="me">
//                 <div className="chat">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth="1.5"
//                     stroke="currentColor"
//                     className="w-6 h-6"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
//                     />
//                   </svg>
//                   <div>{chat.chat}</div>
//                 </div>
//               </div>
//             ) : (
//               <div className="ai">
//                 <div className="chat">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth="1.5"
//                     stroke="currentColor"
//                     className="w-6 h-6"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
//                     />
//                   </svg>
//                   <div>{chat.chat}</div>
//                 </div>
//               </div>
//             )
//           )}
//         </div>
//         <div className="chatBox">
//           <form onSubmit={handelSumbit}>
//             <textarea
//               type="text"
//               value={input}
//               className="inField"
//               onChange={(e) => setInput(e.target.value)}
//               rows="1"
//               onKeyDown={onPressEnter}
//             />
//           </form>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default App;

