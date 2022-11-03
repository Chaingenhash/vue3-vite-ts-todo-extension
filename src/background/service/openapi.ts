// import { INITIAL_OPENAPI_URL } from '@/constant';
// import { OpenApiService } from '@debank/rabby-api';
// import { createPersistStore } from 'background/utils';
// export * from '@debank/rabby-api/dist/types';

// const service = new OpenApiService({
//   store: await createPersistStore({
//     name: 'openapi',
//     template: {
//       host: INITIAL_OPENAPI_URL,
//     },
//   }),
// });

// console.log(service);
export type Token = {
  price: number;
  decimals: number;
  chain: string;
  symbol: string;
};

export type NFT = {
  id: string;
  price: number;
  decimals: number;
  raw_amount: number;
  amount: number;
  usd_value: number;
  symbol: string;
  logo_url: string;
  name: string;
  content_type: string;
  content: string;
};

export type TokenItem = {
  price: number;
  symbol: string;
  token_amount: number;
  token: TokenItem;
  spender: string;
  raw_amount_hex_str: string;
  decimals: number;
  token_symbol: string;
  spender_protocol_logo_url: string;
  spender_protocol_name: string;
  chain: string;
  id: string;
  raw_amount: number;
  logo_url: string;
  amount: number;
  usd_value: number;
};

export type Tx = {
  name: string;
  data: string;
};
export type ExplainTxResponse = {
  abi_str: string;
  type_token_approval: TokenItem;
  token: TokenItem;
  balance_change: BalanceChange;
  pre_exec_version: 'v0' | 'v1' | 'v2';
  support_balance_change: boolean;
  type_deploy_contract: string;
  type_cancel_tx: string;
  type_call: string;
  type_cancel_token_approval: string;
  type_cancel_single_nft_approval: string;
  type_cancel_nft_collection_approval: string;
  type_send: string;
  type_single_nft_approval: string;
  type_nft_collection_approval: string;
  type_nft_send: string;
};

export type ContentProps = {
  token: TokenItem;
};
export type BalanceChange = {
  send_nft_list: Array<NFT>;
  receive_nft_list: Array<NFT>;
  receive_token_list: Array<TokenItem>;
  send_token_list: Array<TokenItem>;
  success: boolean;
  error: Error;
  usd_value_change: number;
};

export type Error = {
  msg: string;
  code: string;
};
