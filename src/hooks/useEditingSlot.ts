import { useCallback, useSyncExternalStore } from "react";

// Module-level singleton so only one EditableText dialog is ever open at once,
// regardless of where in the tree it was triggered from.
let activeId: string | null = null;
const listeners = new Set<() => void>();

function notify() {
  for (const l of listeners) l();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return activeId;
}

export function useEditingSlot(id: string) {
  const current = useSyncExternalStore(subscribe, getSnapshot);
  const isOpen = current === id;

  const open = useCallback(() => {
    activeId = id;
    notify();
  }, [id]);

  const close = useCallback(() => {
    if (activeId === id) {
      activeId = null;
      notify();
    }
  }, [id]);

  // If another editor opens while this one is open, this one closes implicitly
  // (isOpen simply becomes false); nothing further to do here.

  return [isOpen, open, close] as const;
}
