import React, {BaseSyntheticEvent, useState} from "react";
import style from './Note.module.css'
import Content from "../Content/Content";
import SizeWatch from "../SizeWatch";

interface Props {
  data: Note
  onRemove: (e: BaseSyntheticEvent) => void
}

export default function Note ({ data, onRemove }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [isEditable, setIsEditable] = useState(false)

  function onToggle() {
    setIsOpen(state => !state)
  }

  return (
    <div
      className={style.note}
    >
      <button
        className={style.button}
        onClick={onToggle}
        data-open={isOpen}
      />
      {
        isOpen && isEditable ? (
          <Content value={''} onChange={() => {}} />
        ) : (
          <SizeWatch>
            <div
              className={style.inner}
              dangerouslySetInnerHTML={{ __html: data.contentText }}
              data-open={isOpen}
            />
          </SizeWatch>
        )
      }
    </div>
  )
}
