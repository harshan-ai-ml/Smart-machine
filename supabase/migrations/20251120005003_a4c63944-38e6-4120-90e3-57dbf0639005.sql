-- Create app_role enum for role-based access control
CREATE TYPE public.app_role AS ENUM ('admin', 'operator', 'viewer');

-- Create profiles table linked to auth.users
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check user roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Profiles RLS Policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- User roles RLS Policies
CREATE POLICY "Users can view their own roles"
  ON public.user_roles
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
  ON public.user_roles
  FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles"
  ON public.user_roles
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Drop existing overly permissive policies on machines table
DROP POLICY IF EXISTS "Anyone can view machines" ON public.machines;
DROP POLICY IF EXISTS "Anyone can update machines" ON public.machines;
DROP POLICY IF EXISTS "Anyone can insert machines" ON public.machines;

-- Create secure RLS policies for machines table
CREATE POLICY "Authenticated users can view machines"
  ON public.machines
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Operators can update machines"
  ON public.machines
  FOR UPDATE
  TO authenticated
  USING (
    public.has_role(auth.uid(), 'operator') OR 
    public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Admins can insert machines"
  ON public.machines
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete machines"
  ON public.machines
  FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Drop existing policies on sensor_readings table
DROP POLICY IF EXISTS "Anyone can view sensor readings" ON public.sensor_readings;
DROP POLICY IF EXISTS "Anyone can insert sensor readings" ON public.sensor_readings;

-- Create secure RLS policies for sensor_readings table
CREATE POLICY "Authenticated users can view sensor readings"
  ON public.sensor_readings
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "System can insert sensor readings"
  ON public.sensor_readings
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create trigger function for new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  
  -- Assign viewer role by default to new users
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'viewer');
  
  RETURN NEW;
END;
$$;

-- Create trigger for automatic profile creation on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();