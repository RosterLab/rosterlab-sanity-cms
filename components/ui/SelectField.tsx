"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { HiCheck, HiChevronDown, HiSearch } from "react-icons/hi";
import { cn } from "@/lib/utils";

/** Matches the `max-h-60` on the list; used to decide which way it opens. */
const LIST_MAX_HEIGHT_PX = 240;

/** Height the filter row adds to the panel above that list. */
const SEARCH_ROW_HEIGHT_PX = 48;

export interface SelectGroup {
  /** Rendered as a header above its options. */
  label: string;
  options: readonly string[];
}

interface SelectFieldProps {
  label: string;
  /** Written into a hidden input, so plain `FormData` submits keep working. */
  name: string;
  value: string;
  onChange: (value: string) => void;
  /** Flat option list. Pass this or `groups`, not both. */
  options?: readonly string[];
  /** Options under category headers, in the order given. */
  groups?: readonly SelectGroup[];
  /** Adds a filter box above the list. Worth it past roughly ten options. */
  searchable?: boolean;
  placeholder?: string;
  required?: boolean;
  error?: string;
  className?: string;
}

function matches(option: string, query: string): boolean {
  return option.toLowerCase().includes(query.trim().toLowerCase());
}

/**
 * A listbox styled to the brand, in place of a native `<select>` — the native
 * control renders in the OS's own chrome, which reads as unfinished next to
 * the rest of a form.
 *
 * Keyboard support mirrors a native select closely enough to be familiar:
 * arrows move the highlight, Enter or Space commits it, Escape closes without
 * choosing, Home and End jump to the ends. When `searchable`, opening the list
 * puts the caret in the filter box and those same keys work from there.
 */
export default function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  groups,
  searchable = false,
  placeholder = "Select one",
  required = false,
  error,
  className,
}: SelectFieldProps) {
  const [open, setOpen] = useState(false);
  // Which option the keyboard is on, which is not yet the chosen one. Indexes
  // into `visibleOptions`, so it follows the list as the filter narrows it.
  const [activeIndex, setActiveIndex] = useState(0);
  const [openUpward, setOpenUpward] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listboxId = useId();
  const labelId = useId();
  const errorId = useId();
  const optionId = (index: number) => `${listboxId}-option-${index}`;

  const allGroups = useMemo<readonly SelectGroup[]>(
    () => groups ?? [{ label: "", options: options ?? [] }],
    [groups, options],
  );

  // Groups keep their headers while filtering, but drop out once nothing in
  // them matches.
  const visibleGroups = useMemo(
    () =>
      query.trim()
        ? allGroups
            .map((group) => ({
              ...group,
              options: group.options.filter((option) => matches(option, query)),
            }))
            .filter((group) => group.options.length > 0)
        : allGroups,
    [allGroups, query],
  );

  const visibleOptions = useMemo(
    () => visibleGroups.flatMap((group) => group.options),
    [visibleGroups],
  );

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent | TouchEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [open]);

  // Keep the highlighted option in view when the list is longer than its box.
  useEffect(() => {
    if (!open) return;
    listRef.current
      ?.querySelector(`#${CSS.escape(`${listboxId}-option-${activeIndex}`)}`)
      ?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, listboxId, open, visibleOptions]);

  function openList() {
    setQuery("");
    setActiveIndex(Math.max(0, visibleOptions.indexOf(value)));
    // Drop upward when the list would otherwise run off the bottom of the
    // viewport, which it does for the last row of fields on a phone.
    const button = buttonRef.current?.getBoundingClientRect();
    const panelHeight =
      LIST_MAX_HEIGHT_PX + (searchable ? SEARCH_ROW_HEIGHT_PX : 0);
    setOpenUpward(
      button
        ? button.bottom + panelHeight > window.innerHeight &&
            button.top > panelHeight
        : false,
    );
    setOpen(true);
    if (searchable) {
      // Once the panel has rendered, so there is something to focus.
      requestAnimationFrame(() => searchRef.current?.focus());
    }
  }

  function close() {
    setOpen(false);
    setQuery("");
  }

  function commit(index: number) {
    const option = visibleOptions[index];
    if (option === undefined) return;
    onChange(option);
    close();
    buttonRef.current?.focus();
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    switch (event.key) {
      case "ArrowDown":
      case "ArrowUp": {
        event.preventDefault();
        if (!open) {
          openList();
          return;
        }
        const step = event.key === "ArrowDown" ? 1 : -1;
        setActiveIndex((current) =>
          Math.min(visibleOptions.length - 1, Math.max(0, current + step)),
        );
        return;
      }
      case "Home":
        if (open) {
          event.preventDefault();
          setActiveIndex(0);
        }
        return;
      case "End":
        if (open) {
          event.preventDefault();
          setActiveIndex(visibleOptions.length - 1);
        }
        return;
      case "Enter":
        event.preventDefault();
        if (open) commit(activeIndex);
        else openList();
        return;
      case " ":
        // In a filter box a space is a space; only the trigger reads it as
        // "open me".
        if (open && searchable) return;
        event.preventDefault();
        if (open) commit(activeIndex);
        else openList();
        return;
      case "Escape":
        if (open) {
          event.preventDefault();
          close();
          buttonRef.current?.focus();
        }
        return;
      case "Tab":
        if (open) close();
    }
  }

  // Options are numbered across the whole visible list rather than per group,
  // so the arrows run straight through the headers.
  let renderIndex = -1;

  return (
    <div
      className={cn("relative flex h-full flex-col", className)}
      ref={containerRef}
    >
      <span
        id={labelId}
        className="mb-1.5 block text-sm font-semibold text-neutral-900"
      >
        {label}
        {required && (
          <span className="ml-0.5 text-[#0A71FF]" aria-hidden="true">
            *
          </span>
        )}
      </span>

      <input type="hidden" name={name} value={value} />

      <button
        ref={buttonRef}
        type="button"
        // ARIA 1.2's combobox pattern: the button holds the value and owns the
        // popup. `role="button"` would not accept aria-invalid or aria-expanded.
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
        aria-labelledby={labelId}
        aria-describedby={error ? errorId : undefined}
        aria-invalid={error ? true : undefined}
        onClick={() => (open ? close() : openList())}
        onKeyDown={handleKeyDown}
        className={cn(
          // `mt-auto` keeps the control on the row's baseline when a
          // neighbouring field's label wraps to a second line.
          "mt-auto flex w-full items-center justify-between gap-2 rounded-xl border px-4 py-3 text-left transition-colors",
          "focus:outline-none focus:ring-4",
          error
            ? "border-red-300 bg-red-50/40 focus:border-red-400 focus:ring-red-100"
            : "border-neutral-200 bg-neutral-50 hover:border-neutral-300 focus:border-[#0A71FF] focus:bg-white focus:ring-blue-100",
          open && !error && "border-[#0A71FF] bg-white ring-4 ring-blue-100",
        )}
      >
        <span
          className={cn(
            "truncate text-[15px]",
            value ? "text-neutral-900" : "text-neutral-400",
          )}
        >
          {value || placeholder}
        </span>
        <HiChevronDown
          aria-hidden="true"
          className={cn(
            "h-5 w-5 shrink-0 text-neutral-400 transition-transform",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <div
          className={cn(
            "absolute z-50 w-full overflow-hidden rounded-xl border border-neutral-100 bg-white shadow-xl shadow-neutral-900/10",
            openUpward ? "bottom-full mb-2" : "top-full mt-2",
          )}
        >
          {searchable && (
            <div className="flex items-center gap-2 border-b border-neutral-100 px-3 py-2.5">
              <HiSearch
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-neutral-400"
              />
              <input
                ref={searchRef}
                type="text"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActiveIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Type to search…"
                aria-label={`Search ${label}`}
                aria-controls={listboxId}
                aria-activedescendant={
                  visibleOptions.length ? optionId(activeIndex) : undefined
                }
                autoComplete="off"
                className="w-full border-0 bg-transparent p-0 text-[15px] text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-0"
              />
            </div>
          )}

          <ul
            ref={listRef}
            id={listboxId}
            role="listbox"
            aria-labelledby={labelId}
            tabIndex={-1}
            className="max-h-60 overflow-y-auto overscroll-contain p-1"
          >
            {visibleGroups.map((group) => (
              <li key={group.label || "all"} role="presentation">
                {group.label && (
                  <p className="px-3 pb-1 pt-2 text-xs font-bold uppercase tracking-wider text-[#0A71FF]">
                    {group.label}
                  </p>
                )}
                <ul role="group" aria-label={group.label || undefined}>
                  {group.options.map((option) => {
                    renderIndex += 1;
                    const index = renderIndex;
                    const selected = option === value;
                    return (
                      <li
                        key={option}
                        id={optionId(index)}
                        role="option"
                        aria-selected={selected}
                        onMouseEnter={() => setActiveIndex(index)}
                        onClick={() => commit(index)}
                        className={cn(
                          "flex cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-[15px] text-neutral-700",
                          index === activeIndex &&
                            "bg-blue-50 text-neutral-900",
                          selected && "font-semibold text-[#0A71FF]",
                        )}
                      >
                        <span>{option}</span>
                        {selected && (
                          <HiCheck
                            aria-hidden="true"
                            className="h-4 w-4 shrink-0"
                          />
                        )}
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
            {visibleOptions.length === 0 && (
              <li
                role="presentation"
                className="px-3 py-3 text-[15px] text-neutral-500"
              >
                No matches for “{query.trim()}”
              </li>
            )}
          </ul>
        </div>
      )}

      {error && (
        <p id={errorId} className="mt-1.5 text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
