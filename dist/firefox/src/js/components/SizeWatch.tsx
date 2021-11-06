import React, {useEffect, useRef} from "react";

interface Props {
  children?: any
}

export default function SizeWatch(props: Props) {
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
        container.style.setProperty('max-height', `${entries[0].target.clientHeight}px`)
      }
    })

    observer.observe(inner)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{ overflow: 'hidden', transition: 'height 0.3s, max-height 0.3s' }}
    >
      <div ref={innerRef}>{props.children}</div>
    </div>
  )
}
