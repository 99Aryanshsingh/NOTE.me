import React, { useState } from "react";
import styles from "./note.module.scss";
import formatDate from "../../../utils/formatDate";
import Button from "../../../components/atoms/button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import utils from "../../../utils/localstorage";

function Note(props) {
  const { text, date, color } = props;
  const [expand, setExpand] = useState(false);
  const [noteText, setNoteText]=useState("");

  const handleSave = () => {
    // Logic for creating a note...
    const authToken = utils.getFromLocalStorage('auth-key');
    if(!authToken){
      toast.error("User should e logged-in.");
    }
    if (!noteText.length ||noteText.split(' ').length<3) {
      toast.error("Note should contain atleast 3 words.");
    }
    fetch("http://localhost:3001/api/notes", {
      headers: {
        "Content-Type": "application/json",
        authorization: authToken,

      },
      body: JSON.stringify({
        text:noteText,
        color,
      }),
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log({ data });
        if (data?.success === 200) {
          toast.success("Notes created Successfully...");
        } else toast.error(data?.message);
      })
      .catch((error) => {
        console.log({ error });
        toast.error("Notes creation failed!");
      });

  }
  return (
    <article className={styles.container} style={{ backgroundColor: color }}>
      <div className={styles.content}>
        {!text.length ? (
          <textarea value={noteText} onChange={(e)=>setNoteText(e.target.value)} className={styles.textarea}/>
        ) : (
          <>
            <p className={expand ? styles.expanded : ""}>{text}</p>
            {text.length > 154 ? (
              <button onClick={() => setExpand((prev) => !prev)}>
                read {expand ? "less" : "more"}
              </button>
            ) : null}
          </>
        )}
        {/* <p className={expand ? styles.expanded : ""}>{text}</p>
        {text.length > 154 ?( <button onClick={()=>setExpand((prev)=>!prev)}>read {expand ? "less":"more"}</button>): null} */}
      </div>
      <footer className={styles.footer}>
        <div>
        {formatDate(date)}
        </div>
        {noteText.length?<Button text={'save'} className={styles.saveBtn} handleClick={handleSave}/>:null}
      </footer>
    </article>
  );
}

export default Note;
