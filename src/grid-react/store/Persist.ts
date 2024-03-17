import { StateStorage } from "zustand/middleware";

const $store: Record<string, string> = {}

async function get(name: string): Promise<string | null> {
  return new Promise((resolve) => {
    const value = $store[name]
    resolve(value)
  })
}

async function set(name: string, value: string): Promise<void> {
  return new Promise((resolve) => {
    $store[name] = value
    resolve()
  })
}

async function del(name: string): Promise<void> {
  return new Promise((resolve) => {
    delete $store[name]
    resolve()
  })
}

export const Persist: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    // console.log(name, 'has been retrieved')
    return (await get(name)) || null
  },
  setItem: async (name: string, value: string): Promise<void> => {
    // console.log({ name, value }, 'has been saved')
    await set(name, value)
  },
  removeItem: async (name: string): Promise<void> => {
    // console.log(name, 'has been deleted')
    await del(name)
  },
}
