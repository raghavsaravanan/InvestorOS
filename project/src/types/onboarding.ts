export type TraderType = 'day' | 'swing' | 'long-term';

export type RiskLevel = 'low' | 'medium' | 'high';

export type RiskRewardRatio = '1:2' | '1:3' | '1:4' | '1:5';

export type PortfolioStyle = 'momentum' | 'value' | 'ai-mix' | 'custom';

export type MarketUniverse = 'nasdaq' | 'sp500' | 'russell2000' | 'custom';

export type LiquidityLevel = 'high' | 'moderate' | 'flexible';

export type ExplanationStyle = 'simple' | 'trader' | 'quant';

export interface AdvancedSettings {
  accountSize?: number;
  preferredSectors?: string[];
  leverage?: 1 | 2 | 5;
  volatilityFilter?: boolean;
}

export interface OnboardingData {
  traderType: TraderType;
  riskLevel: RiskLevel;
  riskRewardRatio: RiskRewardRatio;
  portfolioStyles: PortfolioStyle[];
  marketUniverse: MarketUniverse[];
  customWatchlist?: string[];
  liquidityLevel: LiquidityLevel;
  maxTrades: number;
  explanationStyle: ExplanationStyle;
  advancedSettings?: AdvancedSettings;
}

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  component: React.ComponentType<any>;
}
