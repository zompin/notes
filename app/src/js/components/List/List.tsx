import React, {BaseSyntheticEvent} from 'react'
import style from './List.module.css'
import Note from "../Note/Note";

interface Props {
  items: Note[]
  onRemove: (t: number) => void
}

export default function List(props: Props) {
  function onRemove(e: BaseSyntheticEvent) {
    props.onRemove(+e.target.dataset.id)
  }

  return (
    <div className={style.list}>
      {
        props.items.length ? props.items.map(item => (
          <Note
            key={`item-${item.timestamp}`}
            data={item}
            onRemove={onRemove}
          />
        )) : (
          <div className={style.empty}>empty</div>
        )
      }
    </div>
  )
}
