CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  requested public.app_role;
  existing_count INT;
BEGIN
  INSERT INTO public.profiles (id, full_name, email, avatar_emoji)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'name', split_part(COALESCE(NEW.email, 'Foydalanuvchi'), '@', 1)),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'avatar_emoji', '🧑‍🚀')
  )
  ON CONFLICT (id) DO NOTHING;

  BEGIN
    requested := (NEW.raw_user_meta_data ->> 'role')::public.app_role;
  EXCEPTION WHEN others THEN
    requested := NULL;
  END;

  IF requested IS NULL OR requested IN ('superadmin', 'manager') THEN
    requested := 'student';
  END IF;

  SELECT count(*) INTO existing_count FROM public.user_roles;
  IF existing_count = 0 THEN
    requested := 'superadmin';
  END IF;

  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, requested)
  ON CONFLICT (user_id, role) DO NOTHING;

  RETURN NEW;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;