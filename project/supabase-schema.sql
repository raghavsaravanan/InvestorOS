-- Create user_profiles table to store onboarding data
CREATE TABLE user_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  trader_type TEXT NOT NULL CHECK (trader_type IN ('day', 'swing', 'long-term')),
  risk_level TEXT NOT NULL CHECK (risk_level IN ('low', 'medium', 'high')),
  risk_reward_ratio TEXT NOT NULL CHECK (risk_reward_ratio IN ('1:2', '1:3', '1:4', '1:5')),
  portfolio_styles TEXT[] DEFAULT '{}',
  market_universe TEXT[] DEFAULT '{}',
  custom_watchlist TEXT[] DEFAULT '{}',
  liquidity_level TEXT NOT NULL CHECK (liquidity_level IN ('high', 'moderate', 'flexible')),
  max_trades INTEGER NOT NULL DEFAULT 5 CHECK (max_trades >= 1 AND max_trades <= 10),
  explanation_style TEXT NOT NULL CHECK (explanation_style IN ('simple', 'trader', 'quant')),
  account_size DECIMAL,
  preferred_sectors TEXT[] DEFAULT '{}',
  leverage INTEGER CHECK (leverage IN (1, 2, 5)),
  volatility_filter BOOLEAN DEFAULT false,
  onboarding_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to access only their own profile
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Create function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create profile
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
