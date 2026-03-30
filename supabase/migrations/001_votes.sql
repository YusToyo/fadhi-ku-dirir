create table if not exists debate_votes (
  id uuid default gen_random_uuid() primary key,
  debate_id text not null,
  voter_id text not null,
  vote_for text not null check (vote_for in ('debaterA', 'debaterB')),
  created_at timestamptz default now(),
  unique(debate_id, voter_id)
);

alter table debate_votes enable row level security;

create policy "Anyone can vote" on debate_votes
  for insert with check (true);

create policy "Anyone can read votes" on debate_votes
  for select using (true);
