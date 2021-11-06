import React, {useEffect, useState} from 'react';
import Header from './components/Header/Header'
import List from "./components/List/List";
import {browser} from "webextension-polyfill-ts";

const App = () => {
  const [notes, setNotes] = useState<Note[]>([])
  const [value, setValue] = useState<Draft>({ innerText: '', innerHTML: '' })

  function onAdd() {
    let tmp: Draft

    setValue(state => {
      tmp = state

      return { innerHTML: '', innerText: '' }
    })

    let tmpNotes: Note[] = []

    if (!tmp.innerHTML) {
      return
    }

    setNotes((notes) => {
      tmpNotes = [
        { contentText: tmp.innerText, contentHTML: tmp.innerHTML, timestamp: Date.now() },
        ...notes
      ]

      return tmpNotes
    })

    browser.storage.local.set({ list: {items: tmpNotes} })
  }

  function onRemove(timestamp: number) {
    let tmpNotes: Note[]

    setNotes((state) => {
      tmpNotes = state.filter(s => s.timestamp !== timestamp)

      return tmpNotes
    })

    browser.storage.local.set({list: {items: tmpNotes}})
  }

  useEffect(() => {
    browser.storage.local
      .get('list')
      .then((r) => {
        if (r.list && r.list.items && r.list.items.length) {
          setNotes(r.list.items)
        }
      })
  }, [])

  let filteredItems = notes.reduce<Note[]>((acc, item) => {
    let index = 0
    const searchText = value.innerText.toLowerCase()
    const content = item.contentText.toLowerCase()

    for (let i = 0; i < searchText.length; i++) {
      const char = searchText[i]

      index = content.indexOf(char, index)

      if (index === -1) {
        break
      } else {
        index++
      }
    }

    if (index !== -1) {
      acc.push(item)
    }

    return acc
  }, [])

  return (
    <>
      <Header value={value} onChange={setValue} onAdd={onAdd} />
      <List items={filteredItems} onRemove={onRemove} />
    </>
  );
};

export default App;
