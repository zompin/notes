import React, {Ref, forwardRef, BaseSyntheticEvent, useEffect, useRef} from 'react'
import cs from 'classnames'
import style from './Content.module.css'

interface Props {
  value: string,
  onChange: (v: BaseSyntheticEvent) => void
  className?: string
  classNameInner?: string
  placeholder?: string
}

export default forwardRef(function Content(props: Props, ref: Ref<HTMLDivElement>) {
  const containerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const inner = innerRef.current

    if (!container || !inner || (!window as any).ResizeObserver) {
      return
    }

    // @ts-ignore-next-line
    const observer = new ResizeObserver(function(entries: any) {
      if (entries[0]) {
        container.style.setProperty('height', `${entries[0].target.clientHeight}px`)
      }
    })

    observer.observe(inner)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div
      className={cs(style.content, props.className)}
      style={{ overflow: 'visible', transition: 'height 0.3s' }}
      ref={function(elem) {
        containerRef.current = elem

        if (ref !== null) {
          //@ts-ignore-next-line
          ref.current = elem
        }
      }}
    >
      <div
        className={cs(style.inner, props.classNameInner)}
        contentEditable
        onInput={props.onChange}
        dangerouslySetInnerHTML={{__html: props.value}}
        ref={innerRef}
        data-placeholder={props.placeholder}
        tabIndex={0}
        style={{ outline: 'none' }}
      />
    </div>
  )
})
