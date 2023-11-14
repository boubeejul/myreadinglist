import { Droppable } from "react-beautiful-dnd"
import { Book } from "../../types/model"
import { BookTile } from "../BookTile/BookTile"
import style from "./style.module.css"

interface Props {
    title: string,
    bookList: Book[],
    setBookList: React.Dispatch<React.SetStateAction<Book[]>>
}

export function List({ title, bookList, setBookList }: Props) {

    const handleDelete = (id: number) => {
        setBookList(bookList.filter(book => book.id !== id))
    }

    return (
        <div className={style.wrapper}>
            <h2>{title}</h2>

            <Droppable droppableId={title}>
                {
                    (provided) => (
                        <div className={style.bookList} ref={provided.innerRef} {...provided.droppableProps}>
                            {
                                bookList.map((book, index) => {
                                    return (
                                        <BookTile
                                            book={book}
                                            handleDelete={handleDelete}
                                            index={index}
                                            listName={title}
                                        />
                                    )
                                })
                            }
                        {provided.placeholder}
                        </div>
                    )
                }
            </Droppable>
        </div>
    )
}