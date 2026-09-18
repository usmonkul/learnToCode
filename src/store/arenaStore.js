import { create } from 'zustand'
import { supabase } from '@/lib/supabaseClient'
import { useAuthStore } from '@/store/authStore'
import { useProgressStore } from '@/store/progressStore'
import { todayLocalDate } from '@/lib/date'

export function solvedKey(topicId, slug) {
  return `${topicId}/${slug}`
}

export const useArenaStore = create((set, get) => ({
  solved: new Set(),
  solutions: new Map(),
  loading: false,

  fetchAll: async () => {
    const userId = useAuthStore.getState().user?.id
    if (!userId) return
    set({ loading: true })

    const { data } = await supabase
      .from('arena_solved_challenges')
      .select('topic_id, challenge_slug, solution_code')
      .eq('user_id', userId)

    set({
      solved: new Set((data ?? []).map((row) => solvedKey(row.topic_id, row.challenge_slug))),
      solutions: new Map(
        (data ?? [])
          .filter((row) => row.solution_code)
          .map((row) => [solvedKey(row.topic_id, row.challenge_slug), row.solution_code])
      ),
      loading: false,
    })
  },

  markSolved: async (topicId, slug, code) => {
    const userId = useAuthStore.getState().user?.id
    if (!userId) return

    const key = solvedKey(topicId, slug)
    const isFirstSolve = !get().solved.has(key)
    set((state) => ({
      solved: new Set(state.solved).add(key),
      solutions: new Map(state.solutions).set(key, code),
    }))

    // activity_date is only sent on the first solve, mirroring how solved_at
    // (default now(), never in this payload) already survives a resubmit —
    // re-solving an already-solved challenge shouldn't move its streak date,
    // and only an insert (not the upsert's conflict-update path) fires the
    // streak trigger anyway.
    await supabase.from('arena_solved_challenges').upsert(
      {
        user_id: userId,
        topic_id: topicId,
        challenge_slug: slug,
        solution_code: code,
        ...(isFirstSolve && { activity_date: todayLocalDate() }),
      },
      { onConflict: 'user_id,topic_id,challenge_slug' }
    )

    if (isFirstSolve) {
      await useProgressStore.getState().refreshStreak()
    }
  },

  isSolved: (topicId, slug) => get().solved.has(solvedKey(topicId, slug)),
  getSolution: (topicId, slug) => get().solutions.get(solvedKey(topicId, slug)),
}))

useAuthStore.subscribe((state, prevState) => {
  if (state.status === 'signedIn' && prevState.status !== 'signedIn') {
    useArenaStore.getState().fetchAll()
  }
  if (state.status === 'signedOut' && prevState.status !== 'signedOut') {
    useArenaStore.setState({ solved: new Set() })
  }
})
