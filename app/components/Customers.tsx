"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabase";

type Customer = {
  id: number;
  name: string;
  mobile: string | null;
  created_at: string;
};

type Bill = {
  id: number;
  customer_name: string | null;
  customer_mobile: string | null;
  grand_total: number;
  payment_method: string | null;
  created_at: string;
};

type CustomerSummary = Customer & {
  totalBills: number;
  totalSpent: number;
  lastVisit: string | null;
};

export default function Customers() {
  const [customers, setCustomers] =
    useState<Customer[]>([]);

  const [bills, setBills] =
    useState<Bill[]>([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [selectedCustomer, setSelectedCustomer] =
    useState<CustomerSummary | null>(null);

  const loadCustomers = async () => {
    setLoading(true);

    const [
      customersResponse,
      billsResponse,
    ] = await Promise.all([
      supabase
        .from("customers")
        .select("*")
        .order("created_at", {
          ascending: false,
        }),

      supabase
        .from("bills")
        .select(
          "id, customer_name, customer_mobile, grand_total, payment_method, created_at"
        )
        .order("created_at", {
          ascending: false,
        }),
    ]);

    if (customersResponse.error) {
      console.error(
        "Customers error:",
        customersResponse.error
      );
    }

    if (billsResponse.error) {
      console.error(
        "Bills error:",
        billsResponse.error
      );
    }

    setCustomers(
      customersResponse.data || []
    );

    setBills(
      billsResponse.data || []
    );

    setLoading(false);
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const customerSummaries =
    useMemo<CustomerSummary[]>(() => {
      return customers.map(
        (customer) => {
          const customerBills =
            bills.filter(
              (bill) => {
                if (
                  customer.mobile &&
                  bill.customer_mobile
                ) {
                  return (
                    customer.mobile ===
                    bill.customer_mobile
                  );
                }

                return (
                  customer.name ===
                  bill.customer_name
                );
              }
            );

          const totalSpent =
            customerBills.reduce(
              (sum, bill) =>
                sum +
                Number(
                  bill.grand_total || 0
                ),
              0
            );

          return {
            ...customer,
            totalBills:
              customerBills.length,
            totalSpent,
            lastVisit:
              customerBills.length > 0
                ? customerBills[0]
                    .created_at
                : null,
          };
        }
      );
    }, [customers, bills]);

  const filteredCustomers =
    customerSummaries.filter(
      (customer) => {
        const text =
          search.toLowerCase();

        return (
          customer.name
            .toLowerCase()
            .includes(text) ||
          (customer.mobile || "")
            .includes(text)
        );
      }
    );

  const totalCustomers =
    customerSummaries.length;

  const totalRevenue =
    customerSummaries.reduce(
      (sum, customer) =>
        sum + customer.totalSpent,
      0
    );

  const totalBills =
    customerSummaries.reduce(
      (sum, customer) =>
        sum + customer.totalBills,
      0
    );

  const formatDate = (
    date: string | null
  ) => {
    if (!date) {
      return "-";
    }

    return new Date(
      date
    ).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const getCustomerBills = (
    customer: CustomerSummary
  ) => {
    return bills.filter(
      (bill) => {
        if (
          customer.mobile &&
          bill.customer_mobile
        ) {
          return (
            customer.mobile ===
            bill.customer_mobile
          );
        }

        return (
          customer.name ===
          bill.customer_name
        );
      }
    );
  };

  const shareCustomerWhatsApp = (
    customer: CustomerSummary
  ) => {
    if (!customer.mobile) {
      alert(
        "Customer mobile number is not available."
      );
      return;
    }

    const message =
      `*Foodies Town*\n` +
      `━━━━━━━━━━━━━━━━\n` +
      `👤 Customer: ${customer.name}\n` +
      `📱 Mobile: ${customer.mobile}\n` +
      `🧾 Total Bills: ${customer.totalBills}\n` +
      `💰 Total Spent: ₹${customer.totalSpent.toFixed(
        2
      )}\n` +
      `━━━━━━━━━━━━━━━━\n` +
      `Thank you for visiting Foodies Town! 🙏`;

    const url =
      `https://wa.me/91${customer.mobile}` +
      `?text=${encodeURIComponent(
        message
      )}`;

    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="space-y-5">

      {/* HEADER */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <h2 className="text-2xl font-bold">
            Customers
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Manage your restaurant customers
          </p>

        </div>

        <button
          onClick={loadCustomers}
          className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800"
        >
          ↻ Refresh
        </button>

      </div>

      {/* SUMMARY */}

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">

        <div className="rounded-2xl border bg-white p-5 shadow-sm">

          <div className="text-xs text-slate-500">
            Total Customers
          </div>

          <div className="mt-2 text-2xl font-black">
            {totalCustomers}
          </div>

        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">

          <div className="text-xs text-slate-500">
            Total Bills
          </div>

          <div className="mt-2 text-2xl font-black">
            {totalBills}
          </div>

        </div>

        <div className="col-span-2 rounded-2xl border bg-white p-5 shadow-sm lg:col-span-1">

          <div className="text-xs text-slate-500">
            Customer Sales
          </div>

          <div className="mt-2 text-2xl font-black">
            ₹{totalRevenue.toFixed(0)}
          </div>

        </div>

      </div>

      {/* SEARCH */}

      <div className="rounded-2xl border bg-white p-4 shadow-sm">

        <div className="relative">

          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
            🔍
          </span>

          <input
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
            placeholder="Search customer name or mobile..."
            className="h-12 w-full rounded-xl border px-11 text-sm outline-none focus:border-slate-950"
          />

        </div>

      </div>

      {/* CUSTOMER LIST */}

      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">

        {loading ? (
          <div className="p-12 text-center">

            <div className="text-lg font-bold">
              Loading customers...
            </div>

            <div className="mt-2 text-sm text-slate-400">
              Please wait
            </div>

          </div>
        ) : filteredCustomers.length ===
          0 ? (
          <div className="p-12 text-center">

            <div className="text-4xl">
              👤
            </div>

            <div className="mt-4 font-bold">
              No customers found
            </div>

            <div className="mt-1 text-sm text-slate-400">
              Customers will appear here after
              generating bills.
            </div>

          </div>
        ) : (
          <>
            {/* DESKTOP */}

            <div className="hidden overflow-x-auto md:block">

              <table className="w-full text-left">

                <thead className="border-b bg-slate-50">

                  <tr>

                    <th className="px-5 py-4 text-xs font-bold uppercase text-slate-500">
                      Customer
                    </th>

                    <th className="px-5 py-4 text-xs font-bold uppercase text-slate-500">
                      Mobile
                    </th>

                    <th className="px-5 py-4 text-center text-xs font-bold uppercase text-slate-500">
                      Bills
                    </th>

                    <th className="px-5 py-4 text-right text-xs font-bold uppercase text-slate-500">
                      Total Spent
                    </th>

                    <th className="px-5 py-4 text-xs font-bold uppercase text-slate-500">
                      Last Visit
                    </th>

                    <th className="px-5 py-4 text-right text-xs font-bold uppercase text-slate-500">
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody className="divide-y">

                  {filteredCustomers.map(
                    (customer) => (
                      <tr
                        key={
                          customer.id
                        }
                        className="hover:bg-slate-50"
                      >

                        <td className="px-5 py-4">

                          <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 font-bold">
                              {customer.name
                                .charAt(0)
                                .toUpperCase()}
                            </div>

                            <div className="font-semibold">
                              {
                                customer.name
                              }
                            </div>

                          </div>

                        </td>

                        <td className="px-5 py-4 text-sm text-slate-500">
                          {customer.mobile ||
                            "-"}
                        </td>

                        <td className="px-5 py-4 text-center">

                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold">
                            {
                              customer.totalBills
                            }
                          </span>

                        </td>

                        <td className="px-5 py-4 text-right font-black">
                          ₹
                          {customer.totalSpent.toFixed(
                            2
                          )}
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-500">
                          {formatDate(
                            customer.lastVisit
                          )}
                        </td>

                        <td className="px-5 py-4">

                          <div className="flex justify-end gap-2">

                            <button
                              onClick={() =>
                                setSelectedCustomer(
                                  customer
                                )
                              }
                              className="rounded-lg border px-3 py-2 text-xs font-bold hover:bg-slate-50"
                            >
                              View
                            </button>

                            {customer.mobile && (
                              <button
                                onClick={() =>
                                  shareCustomerWhatsApp(
                                    customer
                                  )
                                }
                                className="rounded-lg bg-green-600 px-3 py-2 text-xs font-bold text-white hover:bg-green-700"
                              >
                                WhatsApp
                              </button>
                            )}

                          </div>

                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>

            {/* MOBILE */}

            <div className="divide-y md:hidden">

              {filteredCustomers.map(
                (customer) => (
                  <div
                    key={
                      customer.id
                    }
                    className="p-4"
                  >

                    <div className="flex items-start justify-between gap-3">

                      <div className="flex min-w-0 items-center gap-3">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100 font-bold">
                          {customer.name
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div className="min-w-0">

                          <div className="truncate font-bold">
                            {
                              customer.name
                            }
                          </div>

                          <div className="mt-1 text-xs text-slate-500">
                            📱{" "}
                            {customer.mobile ||
                              "No mobile"}
                          </div>

                        </div>

                      </div>

                      <div className="text-right">

                        <div className="font-black">
                          ₹
                          {customer.totalSpent.toFixed(
                            0
                          )}
                        </div>

                        <div className="mt-1 text-xs text-slate-400">
                          {
                            customer.totalBills
                          }{" "}
                          bills
                        </div>

                      </div>

                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2">

                      <button
                        onClick={() =>
                          setSelectedCustomer(
                            customer
                          )
                        }
                        className="rounded-xl border py-3 text-xs font-bold"
                      >
                        View Customer
                      </button>

                      {customer.mobile ? (
                        <button
                          onClick={() =>
                            shareCustomerWhatsApp(
                              customer
                            )
                          }
                          className="rounded-xl bg-green-600 py-3 text-xs font-bold text-white"
                        >
                          WhatsApp
                        </button>
                      ) : (
                        <button
                          disabled
                          className="rounded-xl bg-slate-100 py-3 text-xs font-bold text-slate-400"
                        >
                          No Number
                        </button>
                      )}

                    </div>

                  </div>
                )
              )}

            </div>

          </>
        )}

      </div>

      {/* CUSTOMER DETAILS MODAL */}

      {selectedCustomer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">

          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white shadow-2xl">

            {/* HEADER */}

            <div className="flex items-center justify-between border-b p-5">

              <div>

                <div className="text-lg font-black">
                  {
                    selectedCustomer.name
                  }
                </div>

                <div className="mt-1 text-xs text-slate-500">
                  Customer Profile
                </div>

              </div>

              <button
                onClick={() =>
                  setSelectedCustomer(
                    null
                  )
                }
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-lg"
              >
                ×
              </button>

            </div>

            <div className="p-5">

              {/* CUSTOMER INFO */}

              <div className="rounded-2xl bg-slate-50 p-4">

                <div className="text-xs text-slate-500">
                  Mobile
                </div>

                <div className="mt-1 font-bold">
                  {selectedCustomer.mobile ||
                    "Not available"}
                </div>

              </div>

              {/* SUMMARY */}

              <div className="mt-4 grid grid-cols-2 gap-3">

                <div className="rounded-2xl border p-4">

                  <div className="text-xs text-slate-500">
                    Total Bills
                  </div>

                  <div className="mt-2 text-xl font-black">
                    {
                      selectedCustomer.totalBills
                    }
                  </div>

                </div>

                <div className="rounded-2xl border p-4">

                  <div className="text-xs text-slate-500">
                    Total Spent
                  </div>

                  <div className="mt-2 text-xl font-black">
                    ₹
                    {selectedCustomer.totalSpent.toFixed(
                      0
                    )}
                  </div>

                </div>

              </div>

              {/* LAST VISIT */}

              <div className="mt-4 rounded-2xl border p-4">

                <div className="text-xs text-slate-500">
                  Last Visit
                </div>

                <div className="mt-1 text-sm font-semibold">
                  {formatDate(
                    selectedCustomer.lastVisit
                  )}
                </div>

              </div>

              {/* BILL HISTORY */}

              <div className="mt-6">

                <div className="mb-3 font-bold">
                  Bill History
                </div>

                <div className="space-y-2">

                  {getCustomerBills(
                    selectedCustomer
                  ).map(
                    (bill) => (
                      <div
                        key={
                          bill.id
                        }
                        className="flex items-center justify-between rounded-xl border p-3"
                      >

                        <div>

                          <div className="text-sm font-semibold">
                            Bill #
                            {
                              bill.id
                            }
                          </div>

                          <div className="mt-1 text-xs text-slate-400">
                            {formatDate(
                              bill.created_at
                            )}
                          </div>

                        </div>

                        <div className="text-right">

                          <div className="font-black">
                            ₹
                            {Number(
                              bill.grand_total
                            ).toFixed(
                              2
                            )}
                          </div>

                          <div className="mt-1 text-[10px] text-slate-400">
                            {
                              bill.payment_method ||
                              "Cash"
                            }
                          </div>

                        </div>

                      </div>
                    )
                  )}

                </div>

              </div>

              {/* ACTION */}

              <div className="mt-5">

                <button
                  onClick={() =>
                    shareCustomerWhatsApp(
                      selectedCustomer
                    )
                  }
                  disabled={
                    !selectedCustomer.mobile
                  }
                  className="w-full rounded-xl bg-green-600 py-3 text-sm font-bold text-white disabled:bg-slate-200 disabled:text-slate-400"
                >
                  🟢 WhatsApp Customer
                </button>

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
