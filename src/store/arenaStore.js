import { create } from 'zustand'
import { supabase } from '@/lib/supabaseClient'
import { useAuthStore } from '@/store/authStore'

export function solvedKey(topicId, slug) {
  return `${topicId}/${slug}`
}

export const useArenaStore = create((set, get) => ({
  solved: new Set(),
  loading: false,

  fetchAll: async () => {
    const userId = useAuthStore.getState().user?.id
    if (!userId) return
    set({ loading: true })

    const { data } = await supabase
      .from('arena_solved_challenges')
      .select('topic_id, challenge_slug')
      .eq('user_id', userId)

    set({
      solved: new Set((data ?? []).map((row) => solvedKey(row.topic_id, row.challenge_slug))),
      loading: false,
    })
  },

  markSolved: async (topicId, slug) => {
    const userId = useAuthStore.getState().user?.id
    if (!userId) return

    const key = solvedKey(topicId, slug)
    if (get().solved.has(key)) return
    set((state) => ({ solved: new Set(state.solved).add(key) }))

    await supabase.from('arena_solved_challenges').upsert(
      { user_id: userId, topic_id: topicId, challenge_slug: slug },
      { onConflict: 'user_id,topic_id,challenge_slug', ignoreDuplicates: true }
    )
  },

  isSolved: (topicId, slug) => get().solved.has(solvedKey(topicId, slug)),
}))

useAuthStore.subscribe((state, prevState) => {
  if (state.status === 'signedIn' && prevState.status !== 'signedIn') {
    useArenaStore.getState().fetchAll()
  }
  if (state.status === 'signedOut' && prevState.status !== 'signedOut') {
    useArenaStore.setState({ solved: new Set() })
  }
})
