
-- Fix overly permissive activity_log insert policy
DROP POLICY "Authenticated insert activity" ON public.activity_log;
CREATE POLICY "Authenticated insert own activity" ON public.activity_log 
  FOR INSERT TO authenticated 
  WITH CHECK (user_id = (SELECT id FROM public.profiles WHERE user_id = auth.uid()));
