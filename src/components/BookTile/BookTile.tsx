import { AiFillDelete } from "react-icons/ai"
import { Book } from "../../types/model"
import { Draggable } from "react-beautiful-dnd"
import style from "./style.module.css"

interface Props {
    book: Book,
    handleDelete(id: number): void,
    index: number
    listName: string
}

export function BookTile({ book, handleDelete, index, listName }: Props) {

    return (
        <Draggable key={book.id.toString()} draggableId={book.id.toString()} index={index}>
            {
                (provided) => (

                    <div key={book.id} className={listName == "To Be Read" ? style.toRead : style.hasRead} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        {book.name}
                        <div className={style.options}>
                            <AiFillDelete style={{ cursor: "pointer" }} onClick={() => handleDelete(book.id)} />
                        </div>
                    </div>
                )
            }
        </Draggable>
    )
}