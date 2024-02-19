import { useEffect, useState } from "react";
import { getAllNotes } from "../../../api";

const List = () => {
    const [notes, setNotes] = useState([])
    useEffect(() => {
        const fetchNotes = async () => {
            const res = await getAllNotes()
            if (res.success) {
                setNotes(res.data)
            }
        }
        fetchNotes()
    }, [])

    return (
        <div>
            <h1 className="text-2xl font-bold">List of Notes</h1>
            <div>
                {notes.map((note) => (
                    <div key={note._id} className="border p-2 my-2">
                        <h1 className="text-xl font-bold">{note.maBenhNhan}</h1>
                        <p>{note.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default List;