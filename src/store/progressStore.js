import { create } from 'zustand'
import { supabase } from '@/lib/supabaseClient'
import { useAuthStore } from '@/store/authStore'

function completionKey(courseId, slug) {
  return `${courseId}/${slug}`
}

// The student's own local calendar date — never derived server-side, so the
// streak trigger in Postgres never has to guess a timezone.
function todayLocalDate() {
  return new Date().toLocaleDateString('en-CA')
}

export const useProgressStore = create((set, get) => ({
  completions: new Set(),
  streak: { current: 0, longest: 0 },
  loading: false,

  fetchAll: async () => {
    const userId = useAuthStore.getState().user?.id
    if (!userId) return
    set({ loading: true })

    const [{ data: completionsData }, { data: streakData }] = await Promise.all([
      supabase.from('lesson_completions').select('course_id, lesson_slug').eq('user_id', userId),
      supabase
        .from('streaks')
        .select('current_streak, longest_streak')
        .eq('user_id', userId)
        .maybeSingle(),
    ])

    set({
      completions: new Set(
        (completionsData ?? []).map((row) => completionKey(row.course_id, row.lesson_slug))
      ),
      streak: {
        current: streakData?.current_streak ?? 0,
        longest: streakData?.longest_streak ?? 0,
      },
      loading: false,
    })
  },

  markComplete: async (courseId, slug) => {
    const userId = useAuthStore.getState().user?.id
    if (!userId) return

    const key = completionKey(courseId, slug)
    set((state) => ({ completions: new Set(state.completions).add(key) }))

    await supabase.from('lesson_completions').upsert(
      {
        user_id: userId,
        course_id: courseId,
        lesson_slug: slug,
        activity_date: todayLocalDate(),
      },
      { onConflict: 'user_id,course_id,lesson_slug' }
    )

    const { data: streakData } = await supabase
      .from('streaks')
      .select('current_streak, longest_streak')
      .eq('user_id', userId)
      .maybeSingle()

    set({
      streak: {
        current: streakData?.current_streak ?? 0,
        longest: streakData?.longest_streak ?? 0,
      },
    })
  },

  markIncomplete: async (courseId, slug) => {
    const userId = useAuthStore.getState().user?.id
    if (!userId) return

    const key = completionKey(courseId, slug)
    set((state) => {
      const completions = new Set(state.completions)
      completions.delete(key)
      return { completions }
    })

    await supabase
      .from('lesson_completions')
      .delete()
      .match({ user_id: userId, course_id: courseId, lesson_slug: slug })
  },

  isComplete: (courseId, slug) => get().completions.has(completionKey(courseId, slug)),
}))

useAuthStore.subscribe((state, prevState) => {
  if (state.status === 'signedIn' && prevState.status !== 'signedIn') {
    useProgressStore.getState().fetchAll()
  }
  if (state.status === 'signedOut' && prevState.status !== 'signedOut') {
    useProgressStore.setState({ completions: new Set(), streak: { current: 0, longest: 0 } })
  }
})
