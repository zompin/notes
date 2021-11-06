declare module '*.css' {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames;
  export = classNames;
}

declare interface Draft {
  innerText: string
  innerHTML: string
}

declare interface Note {
  contentText: string
  contentHTML: string
  timestamp: number
}
