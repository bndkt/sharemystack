CREATE TABLE tools (
  id uuid NOT NULL default gen_random_uuid(),
  PRIMARY KEY (id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL default NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL default NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE default NULL,
  server_created_at TIMESTAMP WITH TIME ZONE default NOW(),
  last_modified_at TIMESTAMP WITH TIME ZONE default NOW(),
  name CHARACTER varying NOT NULL,
  slug CHARACTER varying NOT NULL,
  CONSTRAINT tools_slug_key unique (slug),
  color CHARACTER varying NULL,
  icon TEXT NULL,
  website CHARACTER varying NULL,
  twitter CHARACTER varying NULL
);
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Tools are viewable by everyone." ON tools for
SELECT USING (true);