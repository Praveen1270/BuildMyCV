CREATE TABLE IF NOT EXISTS public.resumes (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
    title text NOT NULL DEFAULT 'My Resume',
    personal_info jsonb DEFAULT '{}',
    education jsonb DEFAULT '[]',
    experience jsonb DEFAULT '[]',
    skills jsonb DEFAULT '[]',
    projects jsonb DEFAULT '[]',
    awards jsonb DEFAULT '[]',
    created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS resumes_user_id_idx ON public.resumes(user_id);

alter publication supabase_realtime add table resumes;