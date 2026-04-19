/**
 * Synthetic demo dataset. Shipped so the site can render a populated layout
 * before the pipeline has produced real flows. Every page that consumes this
 * also renders the <DemoBanner /> so nothing can be mistaken for live data.
 *
 * The shapes mirror the pipeline's docs/08-api-contract.md response bodies
 * exactly — when the real API is live, swap the route handlers to proxy it
 * and the demo JSON can be deleted in one commit.
 */

export const DEMO_AS_OF = "2026-04-18";

export const DEMO_WEEKLY = {
  count: 8,
  items: [
    {
      category: "broad_us_equity",
      etp_count: 42,
      total_aum_eur: 184_000_000_000,
      total_net_flow_eur_7d: 720_000_000,
      total_net_flow_eur_prior_7d: 240_000_000,
      week_over_week_delta_eur: 480_000_000,
    },
    {
      category: "thematic_ai_broad",
      etp_count: 11,
      total_aum_eur: 14_200_000_000,
      total_net_flow_eur_7d: -185_000_000,
      total_net_flow_eur_prior_7d: 62_000_000,
      week_over_week_delta_eur: -247_000_000,
    },
    {
      category: "commodity_gold",
      etp_count: 7,
      total_aum_eur: 41_000_000_000,
      total_net_flow_eur_7d: 128_000_000,
      total_net_flow_eur_prior_7d: -15_000_000,
      week_over_week_delta_eur: 143_000_000,
    },
    {
      category: "crypto_btc_spot",
      etp_count: 6,
      total_aum_eur: 11_800_000_000,
      total_net_flow_eur_7d: 74_000_000,
      total_net_flow_eur_prior_7d: 42_000_000,
      week_over_week_delta_eur: 32_000_000,
    },
    {
      category: "thematic_nuclear_energy",
      etp_count: 5,
      total_aum_eur: 3_100_000_000,
      total_net_flow_eur_7d: 58_000_000,
      total_net_flow_eur_prior_7d: 9_000_000,
      week_over_week_delta_eur: 49_000_000,
    },
    {
      category: "broad_europe_equity",
      etp_count: 28,
      total_aum_eur: 62_000_000_000,
      total_net_flow_eur_7d: -44_000_000,
      total_net_flow_eur_prior_7d: 12_000_000,
      week_over_week_delta_eur: -56_000_000,
    },
    {
      category: "thematic_defence",
      etp_count: 4,
      total_aum_eur: 8_400_000_000,
      total_net_flow_eur_7d: 92_000_000,
      total_net_flow_eur_prior_7d: 46_000_000,
      week_over_week_delta_eur: 46_000_000,
    },
    {
      category: "fixed_income_broad",
      etp_count: 39,
      total_aum_eur: 121_000_000_000,
      total_net_flow_eur_7d: 18_000_000,
      total_net_flow_eur_prior_7d: 31_000_000,
      week_over_week_delta_eur: -13_000_000,
    },
  ],
} as const;

export const DEMO_LATEST = {
  count: 6,
  items: [
    {
      isin: "IE00B4L5Y983",
      ticker: "SWDA",
      name: "iShares Core MSCI World UCITS ETF",
      issuer: "ishares",
      category: "broad_global_equity",
      asset_class: "equity",
      fund_currency: "USD",
      as_of_date: DEMO_AS_OF,
      aum_eur: 72_000_000_000,
      daily_return: 0.0048,
      estimated_net_flow_eur: 310_000_000,
      confidence: "high",
      anomaly_flag: false,
    },
    {
      isin: "IE00B3RBWM25",
      ticker: "VWRL",
      name: "Vanguard FTSE All-World UCITS ETF",
      issuer: "vanguard",
      category: "broad_global_equity",
      asset_class: "equity",
      fund_currency: "USD",
      as_of_date: DEMO_AS_OF,
      aum_eur: 18_500_000_000,
      daily_return: 0.0051,
      estimated_net_flow_eur: 195_000_000,
      confidence: "high",
      anomaly_flag: false,
    },
    {
      isin: "JE00BYDVNT50",
      ticker: "WTAI",
      name: "WisdomTree Artificial Intelligence UCITS ETF",
      issuer: "wisdomtree",
      category: "thematic_ai_broad",
      asset_class: "equity",
      fund_currency: "USD",
      as_of_date: DEMO_AS_OF,
      aum_eur: 620_000_000,
      daily_return: -0.0089,
      estimated_net_flow_eur: -87_000_000,
      confidence: "high",
      anomaly_flag: false,
    },
    {
      isin: "IE00B1VS3770",
      ticker: "SGLN",
      name: "iShares Physical Gold ETC",
      issuer: "ishares",
      category: "commodity_gold",
      asset_class: "commodity",
      fund_currency: "USD",
      as_of_date: DEMO_AS_OF,
      aum_eur: 19_300_000_000,
      daily_return: 0.0031,
      estimated_net_flow_eur: 92_000_000,
      confidence: "high",
      anomaly_flag: false,
    },
    {
      isin: "GB00BJYDH287",
      ticker: "BTCW",
      name: "WisdomTree Physical Bitcoin",
      issuer: "wisdomtree",
      category: "crypto_btc_spot",
      asset_class: "crypto",
      fund_currency: "USD",
      as_of_date: DEMO_AS_OF,
      aum_eur: 3_200_000_000,
      daily_return: 0.0112,
      estimated_net_flow_eur: 45_000_000,
      confidence: "high",
      anomaly_flag: false,
    },
    {
      isin: "IE00BYZK4883",
      ticker: "RBOT",
      name: "iShares Automation & Robotics UCITS ETF",
      issuer: "ishares",
      category: "thematic_ai_broad",
      asset_class: "equity",
      fund_currency: "USD",
      as_of_date: DEMO_AS_OF,
      aum_eur: 2_100_000_000,
      daily_return: -0.0071,
      estimated_net_flow_eur: -54_000_000,
      confidence: "medium",
      anomaly_flag: false,
    },
  ],
} as const;

export const DEMO_COMMENTARY = {
  as_of_date: DEMO_AS_OF,
  tldr_headline:
    "Allocators voted with their feet on thematic AI this week; broad US beta did the catching.",
  big_move_block: `The thematic AI bucket shed €185m in the week to 18 April — its first outflow in eight weeks — and every named product on the top-outflows list was a concentrated-mega-cap wrapper (WTAI, RBOT). Broad US equity, meanwhile, took in €720m, triple the prior week. If you squint at the aggregate, allocators didn't leave the factor; they rotated out of a €14.2b niche pricing it at thematic multiples and into a €184b pool pricing it at Nasdaq multiples.

The specific flow into SWDA and VWRL is also worth a look: €505m combined, both into passive cap-weighted global vehicles. That is not a bet on AI going away. It's the bet allocators make when they think the AI story has become the whole index.`,
  under_radar_block:
    "Thematic nuclear quietly added €58m, its fourth consecutive positive week, while clean-energy sat flat. Uranium is no longer the contrarian trade; it's the post-contrarian trade. Watch for it showing up in client portfolios as a core allocation rather than a tactical sleeve over the next two quarters.",
  published_at: "2026-04-19T07:14:22+00:00",
  prompt_version: "a1b2c3d4e5f6a7b8",
  model_used: "claude-sonnet-4-6",
} as const;
