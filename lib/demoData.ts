/**
 * Synthetic demo dataset. Shipped so the site can render a populated layout
 * before the pipeline has produced real flows. Every page that consumes this
 * also renders the <DemoBanner /> so nothing can be mistaken for live data.
 *
 * Shapes mirror the pipeline's docs/08-api-contract.md response bodies. When
 * NEXT_PUBLIC_API_BASE points at a live host, lib/api.ts proxies the real
 * endpoints instead; no consumer needs to change.
 */

export const DEMO_AS_OF = "2026-04-18";

export type Confidence = "high" | "medium" | "low";

export interface DemoProduct {
  isin: string;
  ticker: string;
  name: string;
  issuer: string;
  category: string;
  asset_class: "equity" | "bond" | "commodity" | "crypto" | "multi_asset";
  fund_currency: string;
  domicile: string;
  ter_bps: number;
  aum_eur: number;
  nav_native: number;
  daily_return: number;
  net_flow_eur_7d: number;
  net_flow_eur_today: number;
  confidence: Confidence;
  anomaly_flag: boolean;
  flow_history_30d: readonly number[];
}

function seedRand(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

function makeHistory(
  seed: number,
  headline: number,
  volatility: number,
): readonly number[] {
  const rand = seedRand(seed);
  const dailyScale = headline / 7;
  const out: number[] = [];
  let prev = dailyScale * 0.5;
  for (let i = 0; i < 30; i++) {
    const shock = (rand() - 0.5) * volatility * Math.abs(dailyScale || 1_000_000);
    const revert = (dailyScale - prev) * 0.2;
    prev = prev + revert + shock;
    out.push(Math.round(prev));
  }
  return out;
}

export const DEMO_PRODUCTS: readonly DemoProduct[] = [
  // broad_global_equity
  { isin: "IE00B4L5Y983", ticker: "SWDA", name: "iShares Core MSCI World UCITS ETF", issuer: "ishares", category: "broad_global_equity", asset_class: "equity", fund_currency: "USD", domicile: "IE", ter_bps: 20, aum_eur: 72_000_000_000, nav_native: 102.45, daily_return: 0.0048, net_flow_eur_7d: 310_000_000, net_flow_eur_today: 48_000_000, confidence: "high", anomaly_flag: false, flow_history_30d: makeHistory(1, 310_000_000, 0.8) },
  { isin: "IE00B3RBWM25", ticker: "VWRL", name: "Vanguard FTSE All-World UCITS ETF", issuer: "vanguard", category: "broad_global_equity", asset_class: "equity", fund_currency: "USD", domicile: "IE", ter_bps: 22, aum_eur: 18_500_000_000, nav_native: 124.18, daily_return: 0.0051, net_flow_eur_7d: 195_000_000, net_flow_eur_today: 28_000_000, confidence: "high", anomaly_flag: false, flow_history_30d: makeHistory(2, 195_000_000, 0.9) },
  { isin: "IE00BK5BQT80", ticker: "VWCE", name: "Vanguard FTSE All-World UCITS ETF (Acc)", issuer: "vanguard", category: "broad_global_equity", asset_class: "equity", fund_currency: "USD", domicile: "IE", ter_bps: 22, aum_eur: 14_200_000_000, nav_native: 128.91, daily_return: 0.0052, net_flow_eur_7d: 142_000_000, net_flow_eur_today: 22_000_000, confidence: "high", anomaly_flag: false, flow_history_30d: makeHistory(3, 142_000_000, 0.85) },
  // broad_us_equity
  { isin: "IE00B5BMR087", ticker: "CSPX", name: "iShares Core S&P 500 UCITS ETF", issuer: "ishares", category: "broad_us_equity", asset_class: "equity", fund_currency: "USD", domicile: "IE", ter_bps: 7, aum_eur: 95_000_000_000, nav_native: 612.34, daily_return: 0.0061, net_flow_eur_7d: 485_000_000, net_flow_eur_today: 71_000_000, confidence: "high", anomaly_flag: false, flow_history_30d: makeHistory(4, 485_000_000, 0.7) },
  { isin: "IE00B3XXRP09", ticker: "VUSA", name: "Vanguard S&P 500 UCITS ETF", issuer: "vanguard", category: "broad_us_equity", asset_class: "equity", fund_currency: "USD", domicile: "IE", ter_bps: 7, aum_eur: 52_000_000_000, nav_native: 95.42, daily_return: 0.006, net_flow_eur_7d: 240_000_000, net_flow_eur_today: 38_000_000, confidence: "high", anomaly_flag: false, flow_history_30d: makeHistory(5, 240_000_000, 0.75) },
  { isin: "IE0032077012", ticker: "EQQQ", name: "Invesco EQQQ NASDAQ-100 UCITS ETF", issuer: "invesco", category: "broad_us_equity", asset_class: "equity", fund_currency: "USD", domicile: "IE", ter_bps: 30, aum_eur: 10_500_000_000, nav_native: 488.21, daily_return: 0.0079, net_flow_eur_7d: -18_000_000, net_flow_eur_today: 4_000_000, confidence: "high", anomaly_flag: false, flow_history_30d: makeHistory(6, -18_000_000, 1.4) },
  // broad_europe_equity
  { isin: "IE00B4K48X80", ticker: "IMEU", name: "iShares Core MSCI Europe UCITS ETF", issuer: "ishares", category: "broad_europe_equity", asset_class: "equity", fund_currency: "EUR", domicile: "IE", ter_bps: 12, aum_eur: 8_400_000_000, nav_native: 68.41, daily_return: -0.0021, net_flow_eur_7d: -22_000_000, net_flow_eur_today: -5_000_000, confidence: "high", anomaly_flag: false, flow_history_30d: makeHistory(7, -22_000_000, 1.1) },
  { isin: "GB00B810F091", ticker: "VUKE", name: "Vanguard FTSE 100 UCITS ETF", issuer: "vanguard", category: "broad_europe_equity", asset_class: "equity", fund_currency: "GBP", domicile: "IE", ter_bps: 9, aum_eur: 5_100_000_000, nav_native: 38.14, daily_return: -0.0008, net_flow_eur_7d: -6_000_000, net_flow_eur_today: -1_200_000, confidence: "high", anomaly_flag: false, flow_history_30d: makeHistory(8, -6_000_000, 0.9) },
  { isin: "LU0274211217", ticker: "EXSA", name: "Xtrackers STOXX Europe 600 UCITS ETF", issuer: "xtrackers", category: "broad_europe_equity", asset_class: "equity", fund_currency: "EUR", domicile: "LU", ter_bps: 20, aum_eur: 3_900_000_000, nav_native: 118.72, daily_return: -0.0015, net_flow_eur_7d: -16_000_000, net_flow_eur_today: -3_200_000, confidence: "medium", anomaly_flag: false, flow_history_30d: makeHistory(9, -16_000_000, 1.0) },
  // broad_emerging_markets
  { isin: "IE00BKM4GZ66", ticker: "EIMI", name: "iShares Core MSCI Emerging Markets IMI UCITS ETF", issuer: "ishares", category: "broad_emerging_markets", asset_class: "equity", fund_currency: "USD", domicile: "IE", ter_bps: 18, aum_eur: 21_800_000_000, nav_native: 38.27, daily_return: 0.0034, net_flow_eur_7d: 88_000_000, net_flow_eur_today: 14_500_000, confidence: "high", anomaly_flag: false, flow_history_30d: makeHistory(10, 88_000_000, 1.0) },
  { isin: "LU1681045370", ticker: "AEEM", name: "Amundi MSCI Emerging Markets UCITS ETF", issuer: "amundi", category: "broad_emerging_markets", asset_class: "equity", fund_currency: "EUR", domicile: "LU", ter_bps: 20, aum_eur: 3_200_000_000, nav_native: 15.02, daily_return: 0.0031, net_flow_eur_7d: 19_000_000, net_flow_eur_today: 3_800_000, confidence: "high", anomaly_flag: false, flow_history_30d: makeHistory(11, 19_000_000, 1.1) },
  // thematic_ai_broad
  { isin: "JE00BYDVNT50", ticker: "WTAI", name: "WisdomTree Artificial Intelligence UCITS ETF", issuer: "wisdomtree", category: "thematic_ai_broad", asset_class: "equity", fund_currency: "USD", domicile: "JE", ter_bps: 40, aum_eur: 620_000_000, nav_native: 68.94, daily_return: -0.0089, net_flow_eur_7d: -87_000_000, net_flow_eur_today: -14_000_000, confidence: "high", anomaly_flag: false, flow_history_30d: makeHistory(12, -87_000_000, 1.3) },
  { isin: "IE00BYZK4883", ticker: "RBOT", name: "iShares Automation & Robotics UCITS ETF", issuer: "ishares", category: "thematic_ai_broad", asset_class: "equity", fund_currency: "USD", domicile: "IE", ter_bps: 40, aum_eur: 2_100_000_000, nav_native: 15.38, daily_return: -0.0071, net_flow_eur_7d: -54_000_000, net_flow_eur_today: -9_000_000, confidence: "high", anomaly_flag: false, flow_history_30d: makeHistory(13, -54_000_000, 1.4) },
  { isin: "LU1861132840", ticker: "GOAI", name: "Amundi MSCI Robotics & AI ESG Screened UCITS ETF", issuer: "amundi", category: "thematic_ai_broad", asset_class: "equity", fund_currency: "EUR", domicile: "LU", ter_bps: 40, aum_eur: 980_000_000, nav_native: 45.12, daily_return: -0.0064, net_flow_eur_7d: -28_000_000, net_flow_eur_today: -4_200_000, confidence: "medium", anomaly_flag: false, flow_history_30d: makeHistory(14, -28_000_000, 1.5) },
  // thematic_ai_infrastructure
  { isin: "IE000I8KRLL9", ticker: "SMGB", name: "VanEck Semiconductor UCITS ETF", issuer: "vaneck", category: "thematic_ai_infrastructure", asset_class: "equity", fund_currency: "USD", domicile: "IE", ter_bps: 35, aum_eur: 3_800_000_000, nav_native: 52.81, daily_return: -0.0042, net_flow_eur_7d: -38_000_000, net_flow_eur_today: -6_000_000, confidence: "high", anomaly_flag: false, flow_history_30d: makeHistory(15, -38_000_000, 1.6) },
  { isin: "IE00BMC38736", ticker: "SEMI", name: "iShares MSCI Global Semiconductor UCITS ETF", issuer: "ishares", category: "thematic_ai_infrastructure", asset_class: "equity", fund_currency: "USD", domicile: "IE", ter_bps: 35, aum_eur: 1_450_000_000, nav_native: 18.42, daily_return: -0.0039, net_flow_eur_7d: 12_000_000, net_flow_eur_today: 2_100_000, confidence: "high", anomaly_flag: false, flow_history_30d: makeHistory(16, 12_000_000, 1.5) },
  // thematic_defence
  { isin: "IE000OJ5TQP4", ticker: "NATO", name: "HANetf Future of Defence UCITS ETF", issuer: "hanetf", category: "thematic_defence", asset_class: "equity", fund_currency: "USD", domicile: "IE", ter_bps: 49, aum_eur: 2_800_000_000, nav_native: 24.17, daily_return: 0.0098, net_flow_eur_7d: 62_000_000, net_flow_eur_today: 11_000_000, confidence: "high", anomaly_flag: false, flow_history_30d: makeHistory(17, 62_000_000, 1.0) },
  { isin: "IE0002PG6CA6", ticker: "DFNS", name: "VanEck Defense UCITS ETF", issuer: "vaneck", category: "thematic_defence", asset_class: "equity", fund_currency: "USD", domicile: "IE", ter_bps: 55, aum_eur: 1_600_000_000, nav_native: 32.71, daily_return: 0.0102, net_flow_eur_7d: 28_000_000, net_flow_eur_today: 5_200_000, confidence: "high", anomaly_flag: false, flow_history_30d: makeHistory(18, 28_000_000, 1.1) },
  // thematic_nuclear_energy
  { isin: "IE000M7V94E1", ticker: "URNM", name: "HANetf Sprott Uranium Miners UCITS ETF", issuer: "hanetf", category: "thematic_nuclear_energy", asset_class: "equity", fund_currency: "USD", domicile: "IE", ter_bps: 85, aum_eur: 1_200_000_000, nav_native: 28.42, daily_return: 0.014, net_flow_eur_7d: 42_000_000, net_flow_eur_today: 8_000_000, confidence: "high", anomaly_flag: false, flow_history_30d: makeHistory(19, 42_000_000, 1.2) },
  { isin: "IE000NDWFGA5", ticker: "URNU", name: "Global X Uranium UCITS ETF", issuer: "globalx", category: "thematic_nuclear_energy", asset_class: "equity", fund_currency: "USD", domicile: "IE", ter_bps: 65, aum_eur: 710_000_000, nav_native: 18.91, daily_return: 0.0132, net_flow_eur_7d: 16_000_000, net_flow_eur_today: 2_800_000, confidence: "high", anomaly_flag: false, flow_history_30d: makeHistory(20, 16_000_000, 1.3) },
  // thematic_clean_energy
  { isin: "IE00B1XNHC34", ticker: "INRG", name: "iShares Global Clean Energy UCITS ETF", issuer: "ishares", category: "thematic_clean_energy", asset_class: "equity", fund_currency: "USD", domicile: "IE", ter_bps: 65, aum_eur: 2_100_000_000, nav_native: 9.84, daily_return: 0.0012, net_flow_eur_7d: -8_000_000, net_flow_eur_today: -1_400_000, confidence: "medium", anomaly_flag: false, flow_history_30d: makeHistory(21, -8_000_000, 1.2) },
  { isin: "IE00BYTRRF94", ticker: "ISUN", name: "Invesco Solar Energy UCITS ETF", issuer: "invesco", category: "thematic_clean_energy", asset_class: "equity", fund_currency: "USD", domicile: "IE", ter_bps: 60, aum_eur: 180_000_000, nav_native: 12.41, daily_return: 0.002, net_flow_eur_7d: -4_200_000, net_flow_eur_today: -800_000, confidence: "medium", anomaly_flag: false, flow_history_30d: makeHistory(22, -4_200_000, 1.4) },
  // thematic_cybersecurity_biotech_robotics
  { isin: "IE00BG0J4C88", ticker: "LOCK", name: "iShares Cybersecurity and Tech UCITS ETF", issuer: "ishares", category: "thematic_cybersecurity_biotech_robotics", asset_class: "equity", fund_currency: "USD", domicile: "IE", ter_bps: 40, aum_eur: 2_400_000_000, nav_native: 14.62, daily_return: 0.0031, net_flow_eur_7d: 21_000_000, net_flow_eur_today: 3_800_000, confidence: "high", anomaly_flag: false, flow_history_30d: makeHistory(23, 21_000_000, 1.0) },
  // commodity_gold
  { isin: "IE00B4ND3602", ticker: "SGLN", name: "iShares Physical Gold ETC", issuer: "ishares", category: "commodity_gold", asset_class: "commodity", fund_currency: "USD", domicile: "JE", ter_bps: 12, aum_eur: 19_300_000_000, nav_native: 48.12, daily_return: 0.0031, net_flow_eur_7d: 92_000_000, net_flow_eur_today: 14_800_000, confidence: "high", anomaly_flag: false, flow_history_30d: makeHistory(24, 92_000_000, 0.8) },
  { isin: "JE00B1VS3770", ticker: "PHAU", name: "WisdomTree Physical Gold", issuer: "wisdomtree", category: "commodity_gold", asset_class: "commodity", fund_currency: "USD", domicile: "JE", ter_bps: 39, aum_eur: 8_600_000_000, nav_native: 245.38, daily_return: 0.003, net_flow_eur_7d: 24_000_000, net_flow_eur_today: 4_200_000, confidence: "high", anomaly_flag: false, flow_history_30d: makeHistory(25, 24_000_000, 0.9) },
  { isin: "IE00B579F325", ticker: "SGLD", name: "Invesco Physical Gold ETC", issuer: "invesco", category: "commodity_gold", asset_class: "commodity", fund_currency: "USD", domicile: "IE", ter_bps: 12, aum_eur: 13_100_000_000, nav_native: 243.11, daily_return: 0.003, net_flow_eur_7d: 12_000_000, net_flow_eur_today: 2_100_000, confidence: "high", anomaly_flag: false, flow_history_30d: makeHistory(26, 12_000_000, 0.8) },
  // commodity_silver
  { isin: "IE00B4NCWG09", ticker: "SSLN", name: "iShares Physical Silver ETC", issuer: "ishares", category: "commodity_silver", asset_class: "commodity", fund_currency: "USD", domicile: "JE", ter_bps: 20, aum_eur: 1_200_000_000, nav_native: 32.61, daily_return: 0.0042, net_flow_eur_7d: 18_000_000, net_flow_eur_today: 3_000_000, confidence: "high", anomaly_flag: false, flow_history_30d: makeHistory(27, 18_000_000, 1.1) },
  { isin: "JE00B1VS3333", ticker: "PHAG", name: "WisdomTree Physical Silver", issuer: "wisdomtree", category: "commodity_silver", asset_class: "commodity", fund_currency: "USD", domicile: "JE", ter_bps: 49, aum_eur: 680_000_000, nav_native: 31.42, daily_return: 0.004, net_flow_eur_7d: 4_800_000, net_flow_eur_today: 820_000, confidence: "high", anomaly_flag: false, flow_history_30d: makeHistory(28, 4_800_000, 1.2) },
  // commodity_industrial_metals
  { isin: "JE00B2QY0310", ticker: "COPA", name: "WisdomTree Copper", issuer: "wisdomtree", category: "commodity_industrial_metals", asset_class: "commodity", fund_currency: "USD", domicile: "JE", ter_bps: 49, aum_eur: 420_000_000, nav_native: 52.18, daily_return: 0.0028, net_flow_eur_7d: 9_200_000, net_flow_eur_today: 1_600_000, confidence: "high", anomaly_flag: false, flow_history_30d: makeHistory(29, 9_200_000, 1.1) },
  { isin: "JE00B2NFTL39", ticker: "AIGI", name: "WisdomTree Industrial Metals", issuer: "wisdomtree", category: "commodity_industrial_metals", asset_class: "commodity", fund_currency: "USD", domicile: "JE", ter_bps: 49, aum_eur: 210_000_000, nav_native: 14.82, daily_return: 0.0015, net_flow_eur_7d: 3_200_000, net_flow_eur_today: 600_000, confidence: "medium", anomaly_flag: false, flow_history_30d: makeHistory(30, 3_200_000, 1.3) },
  // commodity_broad_energy
  { isin: "JE00B78CGV99", ticker: "BRNT", name: "WisdomTree Brent Crude Oil", issuer: "wisdomtree", category: "commodity_broad_energy", asset_class: "commodity", fund_currency: "USD", domicile: "JE", ter_bps: 49, aum_eur: 680_000_000, nav_native: 24.18, daily_return: -0.0018, net_flow_eur_7d: -6_000_000, net_flow_eur_today: -1_200_000, confidence: "high", anomaly_flag: false, flow_history_30d: makeHistory(31, -6_000_000, 1.2) },
  { isin: "JE00B6TK3K30", ticker: "NGAS", name: "WisdomTree Natural Gas", issuer: "wisdomtree", category: "commodity_broad_energy", asset_class: "commodity", fund_currency: "USD", domicile: "JE", ter_bps: 49, aum_eur: 190_000_000, nav_native: 2.42, daily_return: 0.008, net_flow_eur_7d: 4_800_000, net_flow_eur_today: 800_000, confidence: "medium", anomaly_flag: false, flow_history_30d: makeHistory(32, 4_800_000, 1.8) },
  // crypto_btc_spot
  { isin: "GB00BJYDH287", ticker: "BTCW", name: "WisdomTree Physical Bitcoin", issuer: "wisdomtree", category: "crypto_btc_spot", asset_class: "crypto", fund_currency: "USD", domicile: "JE", ter_bps: 95, aum_eur: 3_200_000_000, nav_native: 41.78, daily_return: 0.0112, net_flow_eur_7d: 45_000_000, net_flow_eur_today: 8_400_000, confidence: "high", anomaly_flag: false, flow_history_30d: makeHistory(33, 45_000_000, 1.4) },
  { isin: "CH1199067674", ticker: "CBTC", name: "21Shares Bitcoin Core ETP", issuer: "twentyoneshares", category: "crypto_btc_spot", asset_class: "crypto", fund_currency: "USD", domicile: "CH", ter_bps: 21, aum_eur: 1_800_000_000, nav_native: 42.11, daily_return: 0.0109, net_flow_eur_7d: 18_000_000, net_flow_eur_today: 3_800_000, confidence: "high", anomaly_flag: false, flow_history_30d: makeHistory(34, 18_000_000, 1.5) },
  { isin: "GB00BLD4ZM24", ticker: "BITC", name: "CoinShares Physical Bitcoin", issuer: "coinshares", category: "crypto_btc_spot", asset_class: "crypto", fund_currency: "USD", domicile: "JE", ter_bps: 25, aum_eur: 980_000_000, nav_native: 38.92, daily_return: 0.011, net_flow_eur_7d: 11_000_000, net_flow_eur_today: 2_200_000, confidence: "high", anomaly_flag: false, flow_history_30d: makeHistory(35, 11_000_000, 1.5) },
  // crypto_eth_spot
  { isin: "CH0454664043", ticker: "ETHW", name: "WisdomTree Physical Ethereum", issuer: "wisdomtree", category: "crypto_eth_spot", asset_class: "crypto", fund_currency: "USD", domicile: "JE", ter_bps: 95, aum_eur: 480_000_000, nav_native: 28.14, daily_return: 0.0098, net_flow_eur_7d: 12_000_000, net_flow_eur_today: 2_100_000, confidence: "high", anomaly_flag: false, flow_history_30d: makeHistory(36, 12_000_000, 1.6) },
  { isin: "CH0454664068", ticker: "CETH", name: "21Shares Ethereum Core ETP", issuer: "twentyoneshares", category: "crypto_eth_spot", asset_class: "crypto", fund_currency: "USD", domicile: "CH", ter_bps: 21, aum_eur: 620_000_000, nav_native: 31.82, daily_return: 0.0095, net_flow_eur_7d: 8_400_000, net_flow_eur_today: 1_600_000, confidence: "high", anomaly_flag: false, flow_history_30d: makeHistory(37, 8_400_000, 1.6) },
  // crypto_eth_staking
  { isin: "CH1218369033", ticker: "AETH", name: "21Shares Ethereum Staking ETP", issuer: "twentyoneshares", category: "crypto_eth_staking", asset_class: "crypto", fund_currency: "USD", domicile: "CH", ter_bps: 149, aum_eur: 320_000_000, nav_native: 29.14, daily_return: 0.0103, net_flow_eur_7d: 18_000_000, net_flow_eur_today: 3_200_000, confidence: "high", anomaly_flag: false, flow_history_30d: makeHistory(38, 18_000_000, 1.7) },
  { isin: "GB00BMTPL908", ticker: "ETHY", name: "CoinShares Physical Staked Ethereum", issuer: "coinshares", category: "crypto_eth_staking", asset_class: "crypto", fund_currency: "USD", domicile: "JE", ter_bps: 135, aum_eur: 180_000_000, nav_native: 31.02, daily_return: 0.0104, net_flow_eur_7d: 6_200_000, net_flow_eur_today: 1_200_000, confidence: "high", anomaly_flag: false, flow_history_30d: makeHistory(39, 6_200_000, 1.8) },
  // crypto_altcoin_basket
  { isin: "CH1146882308", ticker: "HODLX", name: "21Shares Crypto Basket Index ETP", issuer: "twentyoneshares", category: "crypto_altcoin_basket", asset_class: "crypto", fund_currency: "USD", domicile: "CH", ter_bps: 250, aum_eur: 610_000_000, nav_native: 42.18, daily_return: -0.0042, net_flow_eur_7d: -42_000_000, net_flow_eur_today: -8_000_000, confidence: "high", anomaly_flag: false, flow_history_30d: makeHistory(40, -42_000_000, 1.9) },
  { isin: "CH1218627236", ticker: "WSOL", name: "WisdomTree Physical Solana", issuer: "wisdomtree", category: "crypto_altcoin_basket", asset_class: "crypto", fund_currency: "USD", domicile: "JE", ter_bps: 95, aum_eur: 220_000_000, nav_native: 18.91, daily_return: -0.0051, net_flow_eur_7d: -12_000_000, net_flow_eur_today: -2_400_000, confidence: "medium", anomaly_flag: false, flow_history_30d: makeHistory(41, -12_000_000, 2.0) },
  // factor_smart_beta
  { isin: "IE00BP3QZ601", ticker: "IWQU", name: "iShares Edge MSCI World Quality Factor UCITS ETF", issuer: "ishares", category: "factor_smart_beta", asset_class: "equity", fund_currency: "USD", domicile: "IE", ter_bps: 30, aum_eur: 6_200_000_000, nav_native: 51.82, daily_return: 0.0042, net_flow_eur_7d: 38_000_000, net_flow_eur_today: 7_200_000, confidence: "high", anomaly_flag: false, flow_history_30d: makeHistory(42, 38_000_000, 0.9) },
  { isin: "IE00B3YLTY66", ticker: "SPEW", name: "Invesco S&P 500 Equal Weight UCITS ETF", issuer: "invesco", category: "factor_smart_beta", asset_class: "equity", fund_currency: "USD", domicile: "IE", ter_bps: 20, aum_eur: 3_100_000_000, nav_native: 42.18, daily_return: 0.0038, net_flow_eur_7d: 22_000_000, net_flow_eur_today: 4_200_000, confidence: "high", anomaly_flag: false, flow_history_30d: makeHistory(43, 22_000_000, 0.95) },
  { isin: "IE00BZ56RN96", ticker: "GGRA", name: "WisdomTree Global Quality Dividend Growth UCITS ETF", issuer: "wisdomtree", category: "factor_smart_beta", asset_class: "equity", fund_currency: "USD", domicile: "IE", ter_bps: 38, aum_eur: 1_400_000_000, nav_native: 38.42, daily_return: 0.0031, net_flow_eur_7d: 9_800_000, net_flow_eur_today: 1_800_000, confidence: "high", anomaly_flag: false, flow_history_30d: makeHistory(44, 9_800_000, 1.0) },
  // fixed_income_broad
  { isin: "IE00B3DKXQ41", ticker: "IEAG", name: "iShares Core EUR Govt Bond UCITS ETF", issuer: "ishares", category: "fixed_income_broad", asset_class: "bond", fund_currency: "EUR", domicile: "IE", ter_bps: 9, aum_eur: 4_800_000_000, nav_native: 138.21, daily_return: -0.0012, net_flow_eur_7d: 14_000_000, net_flow_eur_today: 2_400_000, confidence: "high", anomaly_flag: false, flow_history_30d: makeHistory(45, 14_000_000, 0.7) },
  { isin: "IE00B4WXJJ64", ticker: "ISXF", name: "iShares £ Corp Bond ex-Financials UCITS ETF", issuer: "ishares", category: "fixed_income_broad", asset_class: "bond", fund_currency: "GBP", domicile: "IE", ter_bps: 20, aum_eur: 1_200_000_000, nav_native: 101.42, daily_return: -0.0008, net_flow_eur_7d: -8_200_000, net_flow_eur_today: -1_400_000, confidence: "high", anomaly_flag: false, flow_history_30d: makeHistory(46, -8_200_000, 0.8) },
  { isin: "IE00BZ163L38", ticker: "VDCP", name: "Vanguard USD Corporate Bond UCITS ETF", issuer: "vanguard", category: "fixed_income_broad", asset_class: "bond", fund_currency: "USD", domicile: "IE", ter_bps: 11, aum_eur: 8_200_000_000, nav_native: 48.12, daily_return: 0.0014, net_flow_eur_7d: 12_000_000, net_flow_eur_today: 2_100_000, confidence: "high", anomaly_flag: false, flow_history_30d: makeHistory(47, 12_000_000, 0.75) },
];

// --------------------------------------------------------------------------- //
// Derived views
// --------------------------------------------------------------------------- //

function aggregateByCategory() {
  const map = new Map<string, { etp_count: number; total_aum_eur: number; total_net_flow_eur_7d: number }>();
  for (const p of DEMO_PRODUCTS) {
    const cur = map.get(p.category) ?? { etp_count: 0, total_aum_eur: 0, total_net_flow_eur_7d: 0 };
    cur.etp_count += 1;
    cur.total_aum_eur += p.aum_eur;
    cur.total_net_flow_eur_7d += p.net_flow_eur_7d;
    map.set(p.category, cur);
  }
  return Array.from(map.entries()).map(([category, v]) => ({
    category,
    etp_count: v.etp_count,
    total_aum_eur: v.total_aum_eur,
    total_net_flow_eur_7d: v.total_net_flow_eur_7d,
    total_net_flow_eur_prior_7d: Math.round(v.total_net_flow_eur_7d * 0.4),
    week_over_week_delta_eur: Math.round(v.total_net_flow_eur_7d * 0.6),
  }));
}

const weeklyItems = aggregateByCategory().sort(
  (a, b) => Math.abs(b.total_net_flow_eur_7d) - Math.abs(a.total_net_flow_eur_7d),
);
export const DEMO_WEEKLY = { count: weeklyItems.length, items: weeklyItems };

export const DEMO_LATEST = {
  count: DEMO_PRODUCTS.length,
  items: [...DEMO_PRODUCTS]
    .sort((a, b) => Math.abs(b.net_flow_eur_7d) - Math.abs(a.net_flow_eur_7d))
    .map((p) => ({
      isin: p.isin,
      ticker: p.ticker,
      name: p.name,
      issuer: p.issuer,
      category: p.category,
      asset_class: p.asset_class,
      fund_currency: p.fund_currency,
      as_of_date: DEMO_AS_OF,
      aum_eur: p.aum_eur,
      daily_return: p.daily_return,
      estimated_net_flow_eur: p.net_flow_eur_today,
      confidence: p.confidence,
      anomaly_flag: p.anomaly_flag,
    })),
};

export const DEMO_COMMENTARY = {
  as_of_date: DEMO_AS_OF,
  tldr_headline:
    "Allocators voted with their feet on thematic AI this week; broad US beta did the catching.",
  big_move_block: `The thematic AI bucket shed €169m in the week to 18 April — its first outflow in eight weeks — and every named product on the top-outflows list was a concentrated-mega-cap wrapper (WTAI, RBOT, GOAI). Broad US equity, meanwhile, took in €707m, almost entirely through CSPX and VUSA. If you squint at the aggregate, allocators didn't leave the factor; they rotated out of a €3.7b thematic niche pricing it at 40bps into a €147b pool pricing it at 7bps.

The specific flow into SWDA, VWRL and VWCE is also worth a look: €647m combined, all three passive cap-weighted global vehicles. That is not a bet on AI going away. It's the bet allocators make when they think the AI story has become the whole index.`,
  under_radar_block:
    "Thematic nuclear quietly added €58m this week (URNM + URNU), its fourth consecutive positive week, while clean energy sat flat. Uranium is no longer the contrarian trade; it's the post-contrarian trade. Watch for it appearing in client portfolios as a core allocation rather than a tactical sleeve over the next two quarters.",
  published_at: "2026-04-19T07:14:22+00:00",
  prompt_version: "a1b2c3d4e5f6a7b8",
  model_used: "claude-sonnet-4-6",
};

// --------------------------------------------------------------------------- //
// Lookup helpers
// --------------------------------------------------------------------------- //

export function getProduct(isin: string): DemoProduct | null {
  return DEMO_PRODUCTS.find((p) => p.isin === isin) ?? null;
}

export function getProductsByIssuer(issuer: string): DemoProduct[] {
  return DEMO_PRODUCTS.filter((p) => p.issuer === issuer).sort(
    (a, b) => b.aum_eur - a.aum_eur,
  );
}

export function getProductsByCategory(category: string): DemoProduct[] {
  return DEMO_PRODUCTS.filter((p) => p.category === category).sort(
    (a, b) => b.aum_eur - a.aum_eur,
  );
}

export function getTopMovers(direction: "inflow" | "outflow", limit = 10): DemoProduct[] {
  const sorted = [...DEMO_PRODUCTS].sort((a, b) =>
    direction === "inflow" ? b.net_flow_eur_7d - a.net_flow_eur_7d : a.net_flow_eur_7d - b.net_flow_eur_7d,
  );
  return sorted.slice(0, limit);
}

export function listIssuers(): string[] {
  return Array.from(new Set(DEMO_PRODUCTS.map((p) => p.issuer))).sort();
}

export function listCategories(): string[] {
  return Array.from(new Set(DEMO_PRODUCTS.map((p) => p.category))).sort();
}
