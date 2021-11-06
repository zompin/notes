import React, {useRef, useEffect, BaseSyntheticEvent} from 'react'
import Content from "../Content/Content";
import Button from "../Button/Button";
import style from './Header.module.css'

interface Props {
  value: Draft
  onChange: (value: Draft) => void
  onAdd: () => void
}

export default function Header(props: Props) {
  const ref = useRef<HTMLDivElement>(null)

  function onChange(e: BaseSyntheticEvent) {
    const innerHTML = e.target.innerHTML
    const innerText = e.target.innerText

    props.onChange({
      innerHTML: innerHTML === '<div><br></div>' || innerHTML === '<br>' ? '' : innerHTML,
      innerText: innerText === '\n' ? '' : innerText,
    })
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' && e.ctrlKey) {
      props.onAdd()
    }
  }

  useEffect(() => {
    if (!ref.current) {
      return
    }

    ref.current.addEventListener('keydown', onKeydown)

    return () => {
      ref.current.removeEventListener('keydown', onKeydown)
    }
  }, [])

  return (
    <header className={style.container}>
      <Content
        classNameInner={style.search}
        onChange={onChange}
        value={props.value.innerHTML}
        placeholder='Search'
        ref={ref}
      />
      {
        !!props.value.innerText && (
          <Button
            onClick={props.onAdd}
            disabled={!props.value.innerHTML}
            className={style.addNote}
          >
            +
          </Button>
        )
      }
    </header>
  )
}
