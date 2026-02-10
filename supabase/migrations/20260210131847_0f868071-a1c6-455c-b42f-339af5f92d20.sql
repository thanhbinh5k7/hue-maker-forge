-- Drop restrictive policies on payment_info
DROP POLICY IF EXISTS "Only authenticated can view payment" ON public.payment_info;

-- Allow anyone to view payment info (public profile page)
CREATE POLICY "Anyone can view payment info"
ON public.payment_info
FOR SELECT
USING (true);