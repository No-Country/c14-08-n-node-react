import { create } from 'zustand'
import { CreateUser } from './user'

export const useStore = create((...a) => ({
    ...CreateUser(...a),
}))