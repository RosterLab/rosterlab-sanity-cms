'use client'

import { useEffect, useId, useState } from 'react'
import type { ChecklistGroup } from '@/lib/posts/interactive-checklist'
import styles from './BuyersChecklist.module.css'

interface BuyersChecklistProps {
  intro: string[]
  groups: ChecklistGroup[]
}

const storageKey = 'rosterlab:healthcare-buyers-checklist:v1'

export default function BuyersChecklist({ intro, groups }: BuyersChecklistProps) {
  const id = useId()
  const [checked, setChecked] = useState<string[]>([])
  const [loaded, setLoaded] = useState(false)
  const [saved, setSaved] = useState(false)
  const items = groups.flatMap((group) => group.items)
  const completed = items.filter((item) => checked.includes(item.id)).length

  useEffect(() => {
    try {
      const stored: unknown = JSON.parse(localStorage.getItem(storageKey) || '[]')
      if (Array.isArray(stored)) setChecked(stored.filter((item): item is string => typeof item === 'string'))
    } catch {
      // The checklist still works when browser storage is unavailable.
    }
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded) return
    try {
      localStorage.setItem(storageKey, JSON.stringify(checked))
      setSaved(true)
    } catch {
      setSaved(false)
    }
  }, [checked, loaded])

  return (
    <section className={`not-prose ${styles.checklist}`} aria-label="Interactive buyer's checklist" data-interactive-checklist>
      <div className={styles.intro}>
        {intro.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
      </div>

      <div className={styles.controls}>
        <span role="status" aria-live="polite" aria-atomic="true">
          <strong>{completed} of {items.length}</strong> checked
        </span>
        <button type="button" onClick={() => setChecked([])} disabled={!completed} className={styles.reset}>
          Clear ticks
        </button>
      </div>

      <div className={styles.groups}>
        {groups.map((group) => (
          <fieldset key={group.id} className={styles.group}>
            <legend>
              {group.title}
            </legend>
            <div className={styles.items}>
              {group.items.map((item) => (
                <label key={item.id} className={styles.item} htmlFor={`${id}-${item.id}`}>
                  <input
                    id={`${id}-${item.id}`}
                    type="checkbox"
                    checked={checked.includes(item.id)}
                    onChange={() => setChecked((current) => current.includes(item.id)
                      ? current.filter((key) => key !== item.id)
                      : [...current, item.id])}
                  />
                  <span>{item.text}</span>
                </label>
              ))}
            </div>
          </fieldset>
        ))}
      </div>
      <p className={styles.storageNote}>
        {saved ? 'Your ticks are saved in this browser.' : 'Your ticks will stay selected while this page is open.'}
      </p>
    </section>
  )
}
