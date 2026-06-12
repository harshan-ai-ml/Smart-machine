-- Create maintenance_logs table
CREATE TABLE public.maintenance_logs (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  machine_id text NOT NULL,
  machine_name text NOT NULL,
  repair_type text NOT NULL,
  description text NOT NULL,
  technician_name text NOT NULL,
  status text NOT NULL DEFAULT 'completed',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  completed_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.maintenance_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users to view logs
CREATE POLICY "Authenticated users can view maintenance logs"
ON public.maintenance_logs
FOR SELECT
USING (true);

-- Create policy for operators and admins to insert logs
CREATE POLICY "Operators can insert maintenance logs"
ON public.maintenance_logs
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'operator'::app_role) OR has_role(auth.uid(), 'admin'::app_role));

-- Create index for faster queries
CREATE INDEX idx_maintenance_logs_machine_id ON public.maintenance_logs(machine_id);
CREATE INDEX idx_maintenance_logs_created_at ON public.maintenance_logs(created_at DESC);