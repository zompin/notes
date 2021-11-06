import React, {ComponentProps, forwardRef, Ref} from 'react'
import cs from 'classnames'
import * as style from './Button.module.css'

export default forwardRef(function Button(props: ComponentProps<'button'> & { secondary?: boolean }, ref: Ref<HTMLButtonElement>) {
  return (
    <button {...props} className={cs(props.className, style.button, { [style.secondary]: props.secondary })} ref={ref} />
  )
})
