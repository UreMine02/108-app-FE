import { useEffect, useState } from "react";
import { getAllNotes } from "../../../api";
import { useNavigate } from "react-router-dom";
import { deleteNote } from "../../../api/index";
import { ToastContainer, toast } from "react-toastify";

const List = () => {
    const [notes, setNotes] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        const fetchNotes = async () => {
            const res = await getAllNotes()
            if (res.success) {
                setNotes(res.data)
            }
        }
        fetchNotes()
    }, [])

    const handleDelete = async (id) => {
        try {
            const confirm = window.confirm("Bạn có chắc chắn muốn xóa bệnh nhân này không?")
            if (confirm) {
                const res = await deleteNote(id)
                if (res.success) {
                    const newNotes = notes.filter((note) => note._id !== id)
                    setNotes(newNotes)
                    toast.success("Xóa bệnh nhân thành công")
                }
            }
        } catch (error) {
            toast.error("Xóa bệnh nhân thất bại")
        }
    }

    return (
        <div className="bg-white p-20">
            <ToastContainer />
            <h1 className="text-2xl font-bold text-center mb-6">Danh sách thông tin</h1>
            <div>
                {notes.length > 0 && notes?.map((note) => (
                    <div key={note._id} className="py-2 my-2 rounded shadow-md px-4 flex justify-between">
                        <div>
                            <h1 className="text-xl font-bold">{note.ten} - {note.gioiTinh} - {note.tuoi} (tuổi)</h1>
                            <div>Mã bệnh nhân: {note.maBenhNhan}</div>
                        </div>
                        <div className="flex mb-2">
                            <div className="px-4 flex items-center cursor-pointer rounded shadow-md bg-green-200 text-green-600" onClick={() => navigate(`/detail/${note._id}`)}>Sửa</div>
                            <div className="px-4 flex items-center cursor-pointer rounded shadow-md bg-red-200 text-red-600 ml-2" onClick={() => handleDelete(note._id)}>Xóa</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default List;