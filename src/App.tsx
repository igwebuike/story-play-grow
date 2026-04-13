import { useEffect, useMemo, useState } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { supabase } from './lib/supabase'

type ViewMode = 'home' | 'library' | 'profile' | 'admin'
type AuthMode = 'signup' | 'login'

type Profile = {
  id: string
  email: string | null
  full_name: string | null
  role: string | null
  country: string | null
  preferred_language: string | null
  child_age_band: string | null
  is_admin: boolean | null
}

type Resource = {
  source: string
  externalId: string
  title: string
  author: string
  description: string
  coverUrl: string
  sourceUrl: string
  previewUrl?: string
  language?: string
  format?: string
  category?: string
}

type AuthFormState = {
  full_name: string
  email: string
  password: string
  role: string
  country: string
  preferred_language: string
  child_age_band: string
}

type NewsletterState = {
  email: string
  role: string
}

type AdminRow = Record<string, unknown>

const initialAuthForm: AuthFormState = {
  full_name: '',
  email: '',
  password: '',
  role: 'parent',
  country: 'Nigeria',
  preferred_language: 'English',
  child_age_band: '4-7',
}

const initialNewsletter: NewsletterState = {
  email: '',
  role: 'parent',
}

const curatedBookSources: Resource[] = [
  {
    source: 'African Storybook',
    externalId: 'african-storybook-home',
    title: 'African Storybook Collection',
    author: 'African Storybook',
    description: 'Open access African language stories for children, families, and schools.',
    coverUrl: '',
    sourceUrl: 'https://www.africanstorybook.org/',
    previewUrl: 'https://www.africanstorybook.org/',
    language: 'Multilingual',
    format: 'External Library',
    category: 'African Stories',
  },
  {
    source: 'StoryWeaver',
    externalId: 'storyweaver-home',
    title: 'StoryWeaver',
    author: 'Pratham Books',
    description: 'Free multilingual children’s stories and reading resources.',
    coverUrl: '',
    sourceUrl: 'https://storyweaver.org.in/',
    previewUrl: 'https://storyweaver.org.in/',
    language: 'Multilingual',
    format: 'External Library',
    category: 'Children Books',
  },
  {
    source: 'Unite for Literacy',
    externalId: 'unite-for-literacy',
    title: 'Unite for Literacy',
    author: 'Unite for Literacy',
    description: 'Free picture books with read-aloud audio support.',
    coverUrl: '',
    sourceUrl: 'https://www.uniteforliteracy.com/free-books-online/home',
    previewUrl: 'https://www.uniteforliteracy.com/free-books-online/home',
    language: 'Multilingual',
    format: 'Read-Aloud',
    category: 'Beginner Readers',
  },
  {
    source: 'ICDL',
    externalId: 'icdl-home',
    title: 'International Children’s Digital Library',
    author: 'ICDL',
    description: 'Global children’s books for reading and discovery.',
    coverUrl: '',
    sourceUrl: 'https://www.childrenslibrary.org/',
    previewUrl: 'https://www.childrenslibrary.org/',
    language: 'Multilingual',
    format: 'External Library',
    category: 'Children Books',
  },
  {
    source: 'Project Gutenberg',
    externalId: 'gutenberg-children',
    title: 'Project Gutenberg Children’s Literature',
    author: 'Project Gutenberg',
    description: 'Public-domain classics and children’s literature.',
    coverUrl: '',
    sourceUrl: 'https://www.gutenberg.org/ebooks/bookshelf/20',
    previewUrl: 'https://www.gutenberg.org/ebooks/bookshelf/20',
    language: 'English',
    format: 'Public Domain',
    category: 'Classics',
  },
  {
    source: 'Read.gov',
    externalId: 'readgov-kids',
    title: 'Read.gov Kids',
    author: 'Library of Congress',
    description: 'Classic reading resources and children’s book materials.',
    coverUrl: '',
    sourceUrl: 'https://read.gov/kids/',
    previewUrl: 'https://read.gov/kids/',
    language: 'English',
    format: 'External Library',
    category: 'Parent & Teacher',
  },
  {
    source: 'Open Library',
    externalId: 'openlibrary-home',
    title: 'Open Library',
    author: 'Internet Archive',
    description: 'Search millions of books and reading records.',
    coverUrl: '',
    sourceUrl: 'https://openlibrary.org/',
    previewUrl: 'https://openlibrary.org/',
    language: 'Multilingual',
    format: 'Search Catalog',
    category: 'General Library',
  },
  {
    source: 'Internet Archive',
    externalId: 'internet-archive-home',
    title: 'Internet Archive Children’s Library',
    author: 'Internet Archive',
    description: 'Digital library and archival reading materials.',
    coverUrl: '',
    sourceUrl: 'https://archive.org/details/iacl',
    previewUrl: 'https://archive.org/details/iacl',
    language: 'English',
    format: 'Digital Library',
    category: 'General Library',
  },
]

const curatedLearningLinks = [
  {
    title: 'Letterland',
    url: 'https://www.letterland.com/',
    description: 'External learning platform for literacy support.',
  },
  {
    title: 'Education.com',
    url: 'https://www.education.com/',
    description: 'External learning resource platform for worksheets and learning activities.',
  },
  {
    title: 'IXL',
    url: 'https://www.ixl.com/',
    description: 'External learning practice platform for children and schools.',
  },
]

function normalizeText(value: unknown) {
  if (typeof value !== 'string') return ''
  return value.trim()
}

function truncate(text: string, max = 180) {
  if (!text) return ''
  return text.length <= max ? text : `${text.slice(0, max)}...`
}

async function searchOpenLibrary(query: string): Promise<Resource[]> {
  const res = await fetch(
    `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=12`,
  )
  if (!res.ok) return []

  const json = await res.json()
  const docs = Array.isArray(json.docs) ? json.docs : []

  return docs.map((item: any, index: number) => ({
    source: 'Open Library',
    externalId: item.key || `openlibrary-${index}`,
    title: item.title || 'Untitled',
    author: Array.isArray(item.author_name) ? item.author_name.join(', ') : 'Unknown author',
    description: Array.isArray(item.subject)
      ? `Subjects: ${item.subject.slice(0, 6).join(', ')}`
      : 'Book metadata from Open Library.',
    coverUrl: item.cover_i
      ? `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`
      : '',
    sourceUrl: item.key ? `https://openlibrary.org${item.key}` : 'https://openlibrary.org/',
    previewUrl: item.key ? `https://openlibrary.org${item.key}` : 'https://openlibrary.org/',
    language: Array.isArray(item.language) ? item.language.slice(0, 3).join(', ') : '',
    format: 'Catalog',
    category: 'Books',
  }))
}

async function searchGoogleBooks(query: string): Promise<Resource[]> {
  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
      query,
    )}&maxResults=12&printType=books`,
  )
  if (!res.ok) return []

  const json = await res.json()
  const items = Array.isArray(json.items) ? json.items : []

  return items.map((item: any, index: number) => {
    const volume = item.volumeInfo || {}
    return {
      source: 'Google Books',
      externalId: item.id || `googlebooks-${index}`,
      title: volume.title || 'Untitled',
      author: Array.isArray(volume.authors) ? volume.authors.join(', ') : 'Unknown author',
      description: volume.description || 'Book metadata from Google Books.',
      coverUrl:
        volume.imageLinks?.thumbnail ||
        volume.imageLinks?.smallThumbnail ||
        '',
      sourceUrl: volume.infoLink || 'https://books.google.com/',
      previewUrl: volume.previewLink || volume.infoLink || 'https://books.google.com/',
      language: volume.language || '',
      format: 'Catalog',
      category: 'Books',
    }
  })
}

async function searchInternetArchive(query: string): Promise<Resource[]> {
  const archiveQuery = `(title:(${query}) OR subject:(${query})) AND mediatype:texts`
  const res = await fetch(
    `https://archive.org/advancedsearch.php?q=${encodeURIComponent(
      archiveQuery,
    )}&fl[]=identifier&fl[]=title&fl[]=creator&fl[]=description&rows=8&page=1&output=json`,
  )

  if (!res.ok) return []

  const json = await res.json()
  const docs = Array.isArray(json.response?.docs) ? json.response.docs : []

  return docs.map((item: any, index: number) => ({
    source: 'Internet Archive',
    externalId: item.identifier || `archive-${index}`,
    title: item.title || 'Untitled',
    author: Array.isArray(item.creator) ? item.creator.join(', ') : item.creator || 'Unknown author',
    description: Array.isArray(item.description)
      ? item.description[0]
      : item.description || 'Archive item metadata.',
    coverUrl: item.identifier
      ? `https://archive.org/services/img/${item.identifier}`
      : '',
    sourceUrl: item.identifier
      ? `https://archive.org/details/${item.identifier}`
      : 'https://archive.org/',
    previewUrl: item.identifier
      ? `https://archive.org/details/${item.identifier}`
      : 'https://archive.org/',
    language: '',
    format: 'Archive',
    category: 'Books',
  }))
}

async function searchLibraryOfCongress(query: string): Promise<Resource[]> {
  const res = await fetch(
    `https://www.loc.gov/books/?q=${encodeURIComponent(query)}&fo=json`,
  )

  if (!res.ok) return []

  const json = await res.json()
  const results = Array.isArray(json.results) ? json.results : []

  return results.slice(0, 8).map((item: any, index: number) => ({
    source: 'Library of Congress',
    externalId: item.id || item.url || `loc-${index}`,
    title: item.title || item.item?.title || 'Untitled',
    author:
      normalizeText(item.contributor_names?.[0]) ||
      normalizeText(item.item?.contributor_names?.[0]) ||
      'Library of Congress',
    description:
      normalizeText(item.description) ||
      normalizeText(item.item?.description) ||
      'Library of Congress resource.',
    coverUrl: item.image_url?.[0] || '',
    sourceUrl: item.url || 'https://www.loc.gov/books/',
    previewUrl: item.url || 'https://www.loc.gov/books/',
    language: '',
    format: 'Library Resource',
    category: 'Books',
  }))
}

async function searchAllSources(query: string): Promise<Resource[]> {
  if (!query.trim()) return []

  const [openLibrary, googleBooks, internetArchive, loc] = await Promise.allSettled([
    searchOpenLibrary(query),
    searchGoogleBooks(query),
    searchInternetArchive(query),
    searchLibraryOfCongress(query),
  ])

  const all = [
    ...(openLibrary.status === 'fulfilled' ? openLibrary.value : []),
    ...(googleBooks.status === 'fulfilled' ? googleBooks.value : []),
    ...(internetArchive.status === 'fulfilled' ? internetArchive.value : []),
    ...(loc.status === 'fulfilled' ? loc.value : []),
  ]

  const seen = new Set<string>()
  return all.filter((item) => {
    const key = `${item.source}:${item.externalId}:${item.title}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [activeView, setActiveView] = useState<ViewMode>('home')
  const [authMode, setAuthMode] = useState<AuthMode>('signup')
  const [showAuth, setShowAuth] = useState(false)
  const [loadingAuth, setLoadingAuth] = useState(false)
  const [message, setMessage] = useState('')
  const [authForm, setAuthForm] = useState<AuthFormState>(initialAuthForm)
  const [newsletter, setNewsletter] = useState<NewsletterState>(initialNewsletter)
  const [savingNewsletter, setSavingNewsletter] = useState(false)
  const [libraryQuery, setLibraryQuery] = useState('children stories')
  const [libraryResults, setLibraryResults] = useState<Resource[]>([])
  const [searchingLibrary, setSearchingLibrary] = useState(false)
  const [savingResourceId, setSavingResourceId] = useState('')
  const [profileSaving, setProfileSaving] = useState(false)
  const [adminProfiles, setAdminProfiles] = useState<AdminRow[]>([])
  const [adminNewsletter, setAdminNewsletter] = useState<AdminRow[]>([])
  const [adminPartners, setAdminPartners] = useState<AdminRow[]>([])
  const [loadingAdmin, setLoadingAdmin] = useState(false)

  useEffect(() => {
    const boot = async () => {
      const { data } = await supabase.auth.getSession()
      setSession(data.session)
      setUser(data.session?.user ?? null)

      if (data.session?.user) {
        await loadProfile(data.session.user.id)
      }
    }

    void boot()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, currentSession) => {
      setSession(currentSession)
      setUser(currentSession?.user ?? null)

      if (currentSession?.user) {
        await loadProfile(currentSession.user.id)
      } else {
        setProfile(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (activeView === 'library' && libraryResults.length === 0) {
      void handleSearchLibrary('children stories')
    }
  }, [activeView, libraryResults.length])

  useEffect(() => {
    if (activeView === 'admin' && profile?.is_admin) {
      void loadAdminData()
    }
  }, [activeView, profile?.is_admin])

  const headlineName = useMemo(() => {
    if (profile?.full_name) return profile.full_name
    if (user?.email) return user.email
    return 'BeautifulMinds Reader'
  }, [profile?.full_name, user?.email])

  async function loadProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle()

    if (error) {
      console.error(error)
      return
    }

    if (data) {
      setProfile(data as Profile)
      setAuthForm((prev) => ({
        ...prev,
        full_name: data.full_name || '',
        email: data.email || prev.email,
        role: data.role || prev.role,
        country: data.country || prev.country,
        preferred_language: data.preferred_language || prev.preferred_language,
        child_age_band: data.child_age_band || prev.child_age_band,
      }))
    }
  }

  async function loadAdminData() {
    setLoadingAdmin(true)
    setMessage('')

    const [profilesRes, newsletterRes, partnersRes] = await Promise.all([
      supabase
        .from('profiles')
        .select('id, email, full_name, role, country, preferred_language, child_age_band, is_admin, created_at')
        .order('created_at', { ascending: false })
        .limit(50),
      supabase
        .from('newsletter_signups')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100),
      supabase
        .from('partner_applications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100),
    ])

    if (profilesRes.error || newsletterRes.error || partnersRes.error) {
      setMessage(
        'Admin data could not load yet. Run the extra admin SQL at the end of my message so Angela can manage users from the browser.',
      )
      setLoadingAdmin(false)
      return
    }

    setAdminProfiles(profilesRes.data || [])
    setAdminNewsletter(newsletterRes.data || [])
    setAdminPartners(partnersRes.data || [])
    setLoadingAdmin(false)
  }

  function openSignup() {
    setAuthMode('signup')
    setShowAuth(true)
    setMessage('')
  }

  function openLogin() {
    setAuthMode('login')
    setShowAuth(true)
    setMessage('')
  }

  async function handleSignUp(event: React.FormEvent) {
    event.preventDefault()
    setLoadingAuth(true)
    setMessage('')

    const email = authForm.email.trim()
    const password = authForm.password.trim()

    if (!email || !password || !authForm.full_name.trim()) {
      setLoadingAuth(false)
      setMessage('Please enter full name, email, and password.')
      return
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: {
          full_name: authForm.full_name.trim(),
          role: authForm.role,
          country: authForm.country.trim(),
          preferred_language: authForm.preferred_language.trim(),
          child_age_band: authForm.child_age_band.trim(),
        },
      },
    })

    setLoadingAuth(false)

    if (error) {
      setMessage(error.message)
      return
    }

    setMessage(
      'Account created. Please check your email to confirm your account, then log in.',
    )
    setShowAuth(false)
    setAuthForm((prev) => ({ ...prev, password: '' }))
  }

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault()
    setLoadingAuth(true)
    setMessage('')

    const { error } = await supabase.auth.signInWithPassword({
      email: authForm.email.trim(),
      password: authForm.password.trim(),
    })

    setLoadingAuth(false)

    if (error) {
      setMessage(error.message)
      return
    }

    setMessage('You are now logged in.')
    setShowAuth(false)
    setActiveView('profile')
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    setMessage('Signed out.')
    setActiveView('home')
  }

  async function handleNewsletterSubmit(event: React.FormEvent) {
    event.preventDefault()
    setSavingNewsletter(true)
    setMessage('')

    const { error } = await supabase.from('newsletter_signups').insert({
      email: newsletter.email.trim(),
      role: newsletter.role,
      source_page: 'home',
    })

    setSavingNewsletter(false)

    if (error) {
      setMessage(error.message)
      return
    }

    setNewsletter(initialNewsletter)
    setMessage('You have joined the BeautifulMinds waitlist successfully.')
  }

  async function handleSearchLibrary(queryOverride?: string) {
    const searchText = (queryOverride ?? libraryQuery).trim()
    if (!searchText) return

    setLibraryQuery(searchText)
    setSearchingLibrary(true)
    setMessage('')

    try {
      const results = await searchAllSources(searchText)
      setLibraryResults(results)
      if (results.length === 0) {
        setMessage('No books were found for that search yet. Try a broader keyword.')
      }
    } catch (error) {
      console.error(error)
      setMessage('Library search failed. Please try again.')
    } finally {
      setSearchingLibrary(false)
    }
  }

  async function ensureResourceRecord(resource: Resource) {
    const existing = await supabase
      .from('resources')
      .select('id')
      .eq('source_name', resource.source)
      .eq('external_id', resource.externalId)
      .limit(1)
      .maybeSingle()

    if (existing.data?.id) return existing.data.id

    const inserted = await supabase
      .from('resources')
      .insert({
        external_id: resource.externalId,
        source_name: resource.source,
        title: resource.title,
        author: resource.author,
        description: resource.description,
        cover_url: resource.coverUrl,
        source_url: resource.sourceUrl,
        preview_url: resource.previewUrl,
        language: resource.language,
        age_band: '4-10',
        category: resource.category || 'Books',
        format: resource.format || 'External Resource',
        subjects: [],
        license_label: 'External source',
        is_public_domain: false,
        is_featured: false,
        is_active: true,
        raw_json: resource,
      })
      .select('id')
      .single()

    if (inserted.error) throw inserted.error
    return inserted.data.id as string
  }

  async function handleSaveResource(resource: Resource) {
    if (!user) {
      setMessage('Please create an account or log in before saving books.')
      openLogin()
      return
    }

    setSavingResourceId(resource.externalId)
    setMessage('')

    try {
      const resourceId = await ensureResourceRecord(resource)

      const { error } = await supabase.from('saved_resources').insert({
        user_id: user.id,
        resource_id: resourceId,
      })

      if (error && !error.message.toLowerCase().includes('duplicate')) {
        throw error
      }

      await supabase.from('reading_history').insert({
        user_id: user.id,
        resource_id: resourceId,
        event_type: 'saved',
      })

      setMessage(`Saved "${resource.title}" to your shelf.`)
    } catch (error: any) {
      setMessage(error.message || 'Could not save this resource.')
    } finally {
      setSavingResourceId('')
    }
  }

  async function handleOpenResource(resource: Resource) {
    try {
      if (user) {
        const resourceId = await ensureResourceRecord(resource)
        await supabase.from('reading_history').insert({
          user_id: user.id,
          resource_id: resourceId,
          event_type: 'clicked_out',
        })
      }
    } catch (error) {
      console.error(error)
    }

    window.open(resource.previewUrl || resource.sourceUrl, '_blank', 'noopener,noreferrer')
  }

  async function handleProfileSave(event: React.FormEvent) {
    event.preventDefault()

    if (!user) return

    setProfileSaving(true)
    setMessage('')

    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: authForm.full_name.trim(),
        role: authForm.role.trim(),
        country: authForm.country.trim(),
        preferred_language: authForm.preferred_language.trim(),
        child_age_band: authForm.child_age_band.trim(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id)

    setProfileSaving(false)

    if (error) {
      setMessage(error.message)
      return
    }

    await loadProfile(user.id)
    setMessage('Profile updated successfully.')
  }

  return (
    <div className="min-h-screen bg-[#f8f5ef] text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <button
            type="button"
            className="text-left"
            onClick={() => setActiveView('home')}
          >
            <div className="text-xl font-bold tracking-tight text-slate-900">
              BeautifulMinds
            </div>
            <div className="text-xs text-slate-500">Read with joy, grow with confidence</div>
          </button>

          <nav className="hidden gap-2 md:flex">
            <NavButton active={activeView === 'home'} onClick={() => setActiveView('home')}>
              Home
            </NavButton>
            <NavButton
              active={activeView === 'library'}
              onClick={() => setActiveView('library')}
            >
              Free Library
            </NavButton>
            <NavButton
              active={activeView === 'profile'}
              onClick={() => setActiveView('profile')}
            >
              Profile
            </NavButton>
            {profile?.is_admin ? (
              <NavButton
                active={activeView === 'admin'}
                onClick={() => setActiveView('admin')}
              >
                Admin
              </NavButton>
            ) : null}
          </nav>

          <div className="flex items-center gap-2">
            {user ? (
              <>
                <div className="hidden text-right md:block">
                  <div className="text-sm font-semibold">{headlineName}</div>
                  <div className="text-xs text-slate-500">{user.email}</div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveView('profile')}
                  className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Dashboard
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={openLogin}
                  className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Log in
                </button>
                <button
                  type="button"
                  onClick={openSignup}
                  className="rounded-full bg-[#33c8c0] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#2bb0a9]"
                >
                  Create account
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {message ? (
        <div className="border-b border-emerald-200 bg-emerald-50">
          <div className="mx-auto max-w-7xl px-4 py-3 text-sm text-emerald-800">{message}</div>
        </div>
      ) : null}

      {activeView === 'home' ? (
        <HomeView
          onOpenSignup={openSignup}
          onOpenLibrary={() => setActiveView('library')}
          onSubmitNewsletter={handleNewsletterSubmit}
          newsletter={newsletter}
          setNewsletter={setNewsletter}
          savingNewsletter={savingNewsletter}
          curatedBookSources={curatedBookSources}
          curatedLearningLinks={curatedLearningLinks}
        />
      ) : null}

      {activeView === 'library' ? (
        <LibraryView
          query={libraryQuery}
          setQuery={setLibraryQuery}
          onSearch={() => void handleSearchLibrary()}
          searching={searchingLibrary}
          searchResults={libraryResults}
          curatedBookSources={curatedBookSources}
          curatedLearningLinks={curatedLearningLinks}
          onSave={handleSaveResource}
          onOpen={handleOpenResource}
          savingResourceId={savingResourceId}
        />
      ) : null}

      {activeView === 'profile' ? (
        <ProfileView
          user={user}
          authForm={authForm}
          setAuthForm={setAuthForm}
          onSave={handleProfileSave}
          profileSaving={profileSaving}
          onOpenSignup={openSignup}
          onOpenLogin={openLogin}
          onBrowseLibrary={() => setActiveView('library')}
        />
      ) : null}

      {activeView === 'admin' ? (
        <AdminView
          isAdmin={!!profile?.is_admin}
          loading={loadingAdmin}
          profiles={adminProfiles}
          newsletter={adminNewsletter}
          partners={adminPartners}
        />
      ) : null}

      {showAuth ? (
        <AuthModal
          mode={authMode}
          setMode={setAuthMode}
          form={authForm}
          setForm={setAuthForm}
          loading={loadingAuth}
          onClose={() => setShowAuth(false)}
          onSignUp={handleSignUp}
          onLogin={handleLogin}
        />
      ) : null}
    </div>
  )
}

function NavButton({
  active,
  children,
  onClick,
}: {
  active: boolean
  children: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
        active
          ? 'bg-slate-900 text-white'
          : 'text-slate-700 hover:bg-slate-100'
      }`}
    >
      {children}
    </button>
  )
}

function HomeView({
  onOpenSignup,
  onOpenLibrary,
  onSubmitNewsletter,
  newsletter,
  setNewsletter,
  savingNewsletter,
  curatedBookSources,
  curatedLearningLinks,
}: {
  onOpenSignup: () => void
  onOpenLibrary: () => void
  onSubmitNewsletter: (event: React.FormEvent) => Promise<void>
  newsletter: NewsletterState
  setNewsletter: React.Dispatch<React.SetStateAction<NewsletterState>>
  savingNewsletter: boolean
  curatedBookSources: Resource[]
  curatedLearningLinks: { title: string; url: string; description: string }[]
}) {
  return (
    <>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-2 md:items-center">
        <div>
          <div className="mb-4 inline-block rounded-full bg-[#eefcfb] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#1a8d87]">
            Early Access • Built for readers
          </div>
          <h1 className="max-w-xl text-4xl font-bold leading-tight text-slate-900 md:text-6xl">
            Help Your Child Learn To Read With <span className="text-[#33c8c0]">Joy</span> — Not Pressure
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
            BeautifulMinds is becoming a real reading hub for families, schools, and literacy
            partners — with accounts, saved books, free library access, and curated story discovery.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onOpenSignup}
              className="rounded-full bg-[#33c8c0] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#2bb0a9]"
            >
              Create Free Account
            </button>
            <button
              type="button"
              onClick={onOpenLibrary}
              className="rounded-full border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-800 transition hover:bg-slate-50"
            >
              Browse Free Library
            </button>
          </div>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-[#fff8ef] via-[#fdfcf9] to-[#eefcfb] p-6 shadow-sm ring-1 ring-slate-200">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="mb-3 text-sm font-semibold text-slate-500">What users can now do</div>
            <div className="grid gap-4 md:grid-cols-2">
              <FeatureCard title="Create accounts" text="Parents, teachers, and schools can sign up and save resources." />
              <FeatureCard title="Search books" text="Search Open Library, Google Books, Internet Archive, and LOC." />
              <FeatureCard title="Save favorites" text="Readers can save books and build a simple personal shelf." />
              <FeatureCard title="Explore African stories" text="Direct links to African Storybook and other curated literacy sources." />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white/70 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow="Featured free sources"
            title="A Growing Library for Young Readers"
            subtitle="These are the first trusted sources already exposed in the site."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {curatedBookSources.map((item) => (
              <ResourceCard
                key={item.externalId}
                resource={item}
                onOpen={() => window.open(item.sourceUrl, '_blank', 'noopener,noreferrer')}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow="Learning resources"
            title="External Literacy & Learning Platforms"
            subtitle="These are linked as external resources so families can reach them directly."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {curatedLearningLinks.map((item) => (
              <a
                key={item.title}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="text-lg font-semibold">{item.title}</div>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                <div className="mt-4 text-sm font-semibold text-[#1a8d87]">Open resource →</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid gap-10 rounded-[2rem] border border-slate-200 bg-[#fbfaf7] p-8 md:grid-cols-2">
            <div>
              <div className="text-sm font-semibold uppercase tracking-wide text-[#1a8d87]">
                Join Early Access
              </div>
              <h2 className="mt-3 text-3xl font-bold text-slate-900">
                Start with the waitlist
              </h2>
              <p className="mt-3 text-slate-600">
                This now saves directly into Supabase, so it is no longer a dead form.
              </p>
            </div>

            <form onSubmit={onSubmitNewsletter} className="space-y-4">
              <input
                type="email"
                required
                value={newsletter.email}
                onChange={(e) =>
                  setNewsletter((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="Email address"
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-[#33c8c0]"
              />
              <select
                value={newsletter.role}
                onChange={(e) =>
                  setNewsletter((prev) => ({ ...prev, role: e.target.value }))
                }
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-[#33c8c0]"
              >
                <option value="parent">Parent</option>
                <option value="teacher">Teacher</option>
                <option value="school">School</option>
                <option value="partner">Partner</option>
              </select>
              <button
                type="submit"
                disabled={savingNewsletter}
                className="w-full rounded-2xl bg-[#33c8c0] px-4 py-3 font-semibold text-white transition hover:bg-[#2bb0a9] disabled:opacity-60"
              >
                {savingNewsletter ? 'Saving...' : 'Join Early Access'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

function LibraryView({
  query,
  setQuery,
  onSearch,
  searching,
  searchResults,
  curatedBookSources,
  curatedLearningLinks,
  onSave,
  onOpen,
  savingResourceId,
}: {
  query: string
  setQuery: React.Dispatch<React.SetStateAction<string>>
  onSearch: () => void
  searching: boolean
  searchResults: Resource[]
  curatedBookSources: Resource[]
  curatedLearningLinks: { title: string; url: string; description: string }[]
  onSave: (resource: Resource) => Promise<void>
  onOpen: (resource: Resource) => Promise<void>
  savingResourceId: string
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <SectionHeading
        eyebrow="Free Library Search"
        title="Search children’s book sources"
        subtitle="This search currently pulls from Open Library, Google Books, Internet Archive, and the Library of Congress."
      />

      <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-3 md:grid-cols-[1fr_auto]">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onSearch()
            }}
            placeholder="Search children stories, alphabet books, beginner readers..."
            className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#33c8c0]"
          />
          <button
            type="button"
            onClick={onSearch}
            disabled={searching}
            className="rounded-2xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
          >
            {searching ? 'Searching...' : 'Search'}
          </button>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {searchResults.map((resource) => (
            <SearchResultCard
              key={`${resource.source}-${resource.externalId}`}
              resource={resource}
              onSave={onSave}
              onOpen={onOpen}
              saving={savingResourceId === resource.externalId}
            />
          ))}
        </div>
      </div>

      <div className="mt-14 grid gap-10 xl:grid-cols-2">
        <div>
          <h3 className="text-2xl font-bold text-slate-900">Curated free book links</h3>
          <div className="mt-5 grid gap-4">
            {curatedBookSources.map((item) => (
              <ResourceCard
                key={item.externalId}
                resource={item}
                onOpen={() => window.open(item.sourceUrl, '_blank', 'noopener,noreferrer')}
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-slate-900">Learning platforms</h3>
          <div className="mt-5 grid gap-4">
            {curatedLearningLinks.map((item) => (
              <a
                key={item.title}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <div className="text-lg font-semibold">{item.title}</div>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                <div className="mt-3 text-sm font-semibold text-[#1a8d87]">Visit site →</div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ProfileView({
  user,
  authForm,
  setAuthForm,
  onSave,
  profileSaving,
  onOpenSignup,
  onOpenLogin,
  onBrowseLibrary,
}: {
  user: User | null
  authForm: AuthFormState
  setAuthForm: React.Dispatch<React.SetStateAction<AuthFormState>>
  onSave: (event: React.FormEvent) => Promise<void>
  profileSaving: boolean
  onOpenSignup: () => void
  onOpenLogin: () => void
  onBrowseLibrary: () => void
}) {
  if (!user) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-20">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-sm">
          <h2 className="text-3xl font-bold text-slate-900">Create your BeautifulMinds account</h2>
          <p className="mt-3 text-slate-600">
            Sign up or log in to save books, build a reading shelf, and manage your profile.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={onOpenSignup}
              className="rounded-full bg-[#33c8c0] px-6 py-3 font-semibold text-white transition hover:bg-[#2bb0a9]"
            >
              Create account
            </button>
            <button
              type="button"
              onClick={onOpenLogin}
              className="rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-800 transition hover:bg-slate-50"
            >
              Log in
            </button>
            <button
              type="button"
              onClick={onBrowseLibrary}
              className="rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-800 transition hover:bg-slate-50"
            >
              Browse library
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-16">
      <SectionHeading
        eyebrow="Profile"
        title="Manage your account"
        subtitle="This updates the profile row stored in Supabase."
      />

      <form onSubmit={onSave} className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2">
          <FormInput
            label="Full name"
            value={authForm.full_name}
            onChange={(value) => setAuthForm((prev) => ({ ...prev, full_name: value }))}
          />
          <FormInput label="Email" value={user.email || ''} disabled onChange={() => undefined} />
          <FormInput
            label="Country"
            value={authForm.country}
            onChange={(value) => setAuthForm((prev) => ({ ...prev, country: value }))}
          />
          <FormInput
            label="Preferred language"
            value={authForm.preferred_language}
            onChange={(value) =>
              setAuthForm((prev) => ({ ...prev, preferred_language: value }))
            }
          />
          <FormInput
            label="Child age band"
            value={authForm.child_age_band}
            onChange={(value) => setAuthForm((prev) => ({ ...prev, child_age_band: value }))}
          />
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Role</label>
            <select
              value={authForm.role}
              onChange={(e) => setAuthForm((prev) => ({ ...prev, role: e.target.value }))}
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#33c8c0]"
            >
              <option value="parent">Parent</option>
              <option value="teacher">Teacher</option>
              <option value="school">School</option>
              <option value="partner">Partner</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={profileSaving}
          className="mt-6 rounded-2xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
        >
          {profileSaving ? 'Saving...' : 'Save profile'}
        </button>
      </form>
    </section>
  )
}

function AdminView({
  isAdmin,
  loading,
  profiles,
  newsletter,
  partners,
}: {
  isAdmin: boolean
  loading: boolean
  profiles: AdminRow[]
  newsletter: AdminRow[]
  partners: AdminRow[]
}) {
  if (!isAdmin) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-20">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-sm">
          <h2 className="text-3xl font-bold text-slate-900">Admin access required</h2>
          <p className="mt-3 text-slate-600">
            Angela’s account must have <code>is_admin = true</code> in the profiles table.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <SectionHeading
        eyebrow="Admin dashboard"
        title="Manage users and leads"
        subtitle="This browser dashboard can show members, newsletter signups, and partner requests."
      />

      {loading ? (
        <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-sm">
          Loading admin data...
        </div>
      ) : (
        <div className="mt-8 grid gap-8">
          <AdminTable
            title="Members"
            rows={profiles}
            emptyText="No member rows loaded yet."
          />
          <AdminTable
            title="Newsletter signups"
            rows={newsletter}
            emptyText="No newsletter signups yet."
          />
          <AdminTable
            title="Partner applications"
            rows={partners}
            emptyText="No partner applications yet."
          />
        </div>
      )}
    </section>
  )
}

function AuthModal({
  mode,
  setMode,
  form,
  setForm,
  loading,
  onClose,
  onSignUp,
  onLogin,
}: {
  mode: AuthMode
  setMode: React.Dispatch<React.SetStateAction<AuthMode>>
  form: AuthFormState
  setForm: React.Dispatch<React.SetStateAction<AuthFormState>>
  loading: boolean
  onClose: () => void
  onSignUp: (event: React.FormEvent) => Promise<void>
  onLogin: (event: React.FormEvent) => Promise<void>
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-[2rem] bg-white p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-slate-900">
              {mode === 'signup' ? 'Create your account' : 'Log in'}
            </div>
            <div className="mt-1 text-sm text-slate-500">
              {mode === 'signup'
                ? 'Create a free BeautifulMinds account with email and password.'
                : 'Log into your BeautifulMinds account.'}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Close
          </button>
        </div>

        <div className="mb-6 flex gap-2">
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              mode === 'signup'
                ? 'bg-slate-900 text-white'
                : 'border border-slate-300 text-slate-700'
            }`}
          >
            Sign up
          </button>
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              mode === 'login'
                ? 'bg-slate-900 text-white'
                : 'border border-slate-300 text-slate-700'
            }`}
          >
            Log in
          </button>
        </div>

        {mode === 'signup' ? (
          <form onSubmit={onSignUp} className="grid gap-4 md:grid-cols-2">
            <FormInput
              label="Full name"
              value={form.full_name}
              onChange={(value) => setForm((prev) => ({ ...prev, full_name: value }))}
            />
            <FormInput
              label="Email"
              value={form.email}
              onChange={(value) => setForm((prev) => ({ ...prev, email: value }))}
              type="email"
            />
            <FormInput
              label="Password"
              value={form.password}
              onChange={(value) => setForm((prev) => ({ ...prev, password: value }))}
              type="password"
            />
            <FormInput
              label="Country"
              value={form.country}
              onChange={(value) => setForm((prev) => ({ ...prev, country: value }))}
            />
            <FormInput
              label="Preferred language"
              value={form.preferred_language}
              onChange={(value) =>
                setForm((prev) => ({ ...prev, preferred_language: value }))
              }
            />
            <FormInput
              label="Child age band"
              value={form.child_age_band}
              onChange={(value) => setForm((prev) => ({ ...prev, child_age_band: value }))}
            />
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-700">Role</label>
              <select
                value={form.role}
                onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value }))}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#33c8c0]"
              >
                <option value="parent">Parent</option>
                <option value="teacher">Teacher</option>
                <option value="school">School</option>
                <option value="partner">Partner</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-[#33c8c0] px-4 py-3 font-semibold text-white transition hover:bg-[#2bb0a9] disabled:opacity-60"
              >
                {loading ? 'Creating account...' : 'Create account'}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={onLogin} className="grid gap-4">
            <FormInput
              label="Email"
              value={form.email}
              onChange={(value) => setForm((prev) => ({ ...prev, email: value }))}
              type="email"
            />
            <FormInput
              label="Password"
              value={form.password}
              onChange={(value) => setForm((prev) => ({ ...prev, password: value }))}
              type="password"
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
            >
              {loading ? 'Logging in...' : 'Log in'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

function FeatureCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-[#fbfaf7] p-5">
      <div className="text-lg font-semibold text-slate-900">{title}</div>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  )
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string
  title: string
  subtitle: string
}) {
  return (
    <div className="max-w-3xl">
      <div className="text-sm font-semibold uppercase tracking-wide text-[#1a8d87]">
        {eyebrow}
      </div>
      <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">{title}</h2>
      <p className="mt-3 text-lg leading-8 text-slate-600">{subtitle}</p>
    </div>
  )
}

function ResourceCard({
  resource,
  onOpen,
}: {
  resource: Resource
  onOpen: () => void
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div className="rounded-full bg-[#eefcfb] px-3 py-1 text-xs font-semibold text-[#1a8d87]">
          {resource.source}
        </div>
        <div className="text-xs text-slate-500">{resource.format}</div>
      </div>
      <div className="text-lg font-semibold text-slate-900">{resource.title}</div>
      <p className="mt-2 text-sm leading-6 text-slate-600">{truncate(resource.description)}</p>
      <button
        type="button"
        onClick={onOpen}
        className="mt-4 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
      >
        Open resource
      </button>
    </div>
  )
}

function SearchResultCard({
  resource,
  onSave,
  onOpen,
  saving,
}: {
  resource: Resource
  onSave: (resource: Resource) => Promise<void>
  onOpen: (resource: Resource) => Promise<void>
  saving: boolean
}) {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      {resource.coverUrl ? (
        <img
          src={resource.coverUrl}
          alt={resource.title}
          className="mb-4 h-56 w-full rounded-2xl object-cover"
        />
      ) : (
        <div className="mb-4 flex h-56 items-center justify-center rounded-2xl bg-[#fbfaf7] text-sm font-semibold text-slate-500">
          No cover available
        </div>
      )}

      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="rounded-full bg-[#eefcfb] px-3 py-1 text-xs font-semibold text-[#1a8d87]">
          {resource.source}
        </span>
        <span className="text-xs text-slate-500">{resource.language || resource.format}</span>
      </div>

      <div className="text-lg font-semibold text-slate-900">{resource.title}</div>
      <div className="mt-1 text-sm text-slate-500">{resource.author}</div>
      <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
        {truncate(resource.description)}
      </p>

      <div className="mt-5 flex gap-2">
        <button
          type="button"
          onClick={() => void onOpen(resource)}
          className="flex-1 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Read
        </button>
        <button
          type="button"
          disabled={saving}
          onClick={() => void onSave(resource)}
          className="flex-1 rounded-2xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 disabled:opacity-60"
        >
          {saving ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  )
}

function FormInput({
  label,
  value,
  onChange,
  type = 'text',
  disabled = false,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
  disabled?: boolean
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">{label}</label>
      <input
        type={type}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#33c8c0] disabled:bg-slate-100"
      />
    </div>
  )
}

function AdminTable({
  title,
  rows,
  emptyText,
}: {
  title: string
  rows: AdminRow[]
  emptyText: string
}) {
  const firstRow = rows[0]
  const columns = firstRow ? Object.keys(firstRow) : []

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-2xl font-bold text-slate-900">{title}</h3>
      {rows.length === 0 ? (
        <p className="mt-4 text-slate-600">{emptyText}</p>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th
                    key={column}
                    className="border-b border-slate-200 px-3 py-3 font-semibold uppercase tracking-wide text-slate-500"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={`${title}-${index}`} className="align-top">
                  {columns.map((column) => (
                    <td key={column} className="border-b border-slate-100 px-3 py-3 text-slate-700">
                      {String(row[column] ?? '')}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default App
