export interface Transaction {
    curatorName?: string;
    date: string;
    amount: number;
    percent?: number;
    paid?: number;
    status: string;
    eps?: "Tether (TRC20)";
    type?: string;
    transactionType?: string;
    [key: string]: any;
}