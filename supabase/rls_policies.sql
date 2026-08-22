-- ====================================================================
-- COACHIFY.OS — DATABASE SECURITY & ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

-- 1. Enable RLS on all core tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE trainings ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- 2. USERS Policies
CREATE POLICY "Users can view users within same team"
  ON users FOR SELECT
  USING (team_id IN (SELECT team_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Users can update their own profile"
  ON users FOR UPDATE
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- 3. PLAYERS Policies (Viewable by team, manageable by Coach and President)
CREATE POLICY "Team members can view players"
  ON players FOR SELECT
  USING (team_id IN (SELECT team_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Coaches and Presidents can mutate players"
  ON players FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
        AND users.team_id = players.team_id
        AND users.role IN ('coach', 'president', 'assistant')
    )
  );

-- 4. FINANCIAL RECORDS Policies (Strictly restricted to President)
CREATE POLICY "Only Club President can view financial ledger"
  ON financial_records FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
        AND users.team_id = financial_records.team_id
        AND users.role = 'president'
    )
  );

CREATE POLICY "Only Club President can create or update financial records"
  ON financial_records FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
        AND users.team_id = financial_records.team_id
        AND users.role = 'president'
    )
  );

-- 5. MESSAGES Policies
CREATE POLICY "Users can view messages sent to them or their team"
  ON messages FOR SELECT
  USING (
    recipient_id = auth.uid() 
    OR sender_id = auth.uid()
    OR (team_id IN (SELECT team_id FROM users WHERE id = auth.uid()) AND recipient_id IS NULL)
  );

CREATE POLICY "Users can insert their own messages"
  ON messages FOR INSERT
  WITH CHECK (sender_id = auth.uid());
