"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Wallet,
} from "lucide-react";

interface WalletTransaction {
  id: string;
  reference: string;
  type: string;
  status: string;
  amount: number | string;
  createdAt: string;
}

interface WalletData {
  balance: number | string;
  transactions: WalletTransaction[];
}

export default function WalletPage() {
  const [wallet, setWallet] = useState<WalletData>({
    balance: 0,
    transactions: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWallet() {
      try {
        const response = await fetch(
          "/api/wallet/transactions"
        );

        const data = await response.json();

        if (data.success) {
          setWallet({
            balance: Number(data.balance),
            transactions: data.transactions.map(
              (transaction: WalletTransaction) => ({
                ...transaction,
                amount: Number(transaction.amount),
              })
            ),
          });
        }
      } catch (error) {
        console.error(
          "Wallet loading error:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadWallet();
  }, []);

  return (
    <DashboardLayout title="Wallet">
      <div className="space-y-6">

        {/* Balance */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
              <Wallet
                size={28}
                className="text-blue-700"
              />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Available Balance
              </p>

              <h1 className="mt-1 text-3xl font-bold text-slate-900">
                ₦
                {loading
                  ? "0"
                  : Number(
                      wallet.balance
                    ).toLocaleString()}
              </h1>
            </div>
          </div>
        </div>

        {/* Transactions */}
        <div className="rounded-2xl bg-white shadow-sm">
          <div className="border-b border-slate-100 p-6">
            <h2 className="text-xl font-bold text-slate-900">
              Transaction History
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your recent wallet activity
            </p>
          </div>

          {loading ? (
            <div className="p-6 text-slate-500">
              Loading transactions...
            </div>
          ) : wallet.transactions.length === 0 ? (
            <div className="p-6 text-slate-500">
              No transactions yet.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {wallet.transactions.map(
                (transaction) => {
                  const isCredit =
                    transaction.type ===
                      "DEPOSIT" ||
                    transaction.type ===
                      "REFUND" ||
                    transaction.type ===
                      "COMMISSION";

                  return (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between gap-4 p-6"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex h-11 w-11 items-center justify-center rounded-full ${
                            isCredit
                              ? "bg-green-100"
                              : "bg-red-100"
                          }`}
                        >
                          {isCredit ? (
                            <ArrowDownLeft
                              size={20}
                              className="text-green-700"
                            />
                          ) : (
                            <ArrowUpRight
                              size={20}
                              className="text-red-700"
                            />
                          )}
                        </div>

                        <div>
                          <p className="font-semibold text-slate-900">
                            {transaction.type}
                          </p>

                          <p className="text-xs text-slate-500">
                            {transaction.reference}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {new Date(
                              transaction.createdAt
                            ).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p
                          className={`font-bold ${
                            isCredit
                              ? "text-green-700"
                              : "text-red-700"
                          }`}
                        >
                          {isCredit
                            ? "+"
                            : "-"}
                          ₦
                          {Number(
                            transaction.amount
                          ).toLocaleString()}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {transaction.status}
                        </p>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          )}
        </div>

      </div>
    </DashboardLayout>
  );
}