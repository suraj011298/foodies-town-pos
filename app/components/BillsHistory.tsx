"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

type Bill = {
  id: number;
  bill_number: number;
  customer_name: string | null;
  customer_mobile: string | null;
  order_type: string | null;
  table_number: string | null;
  subtotal: number;
  gst: number;
  discount: number;
  grand_total: number;
  payment_method: string | null;
  created_at: string;
};

export default function BillsHistory() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedBill, setSelectedBill] =
    useState<Bill | null>(null);

  const loadBills = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("bills")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error("Bills loading error:", error);
      alert("Bills could not be loaded.");
      setBills([]);
    } else {
      setBills(data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadBills();
  }, []);

  const filteredBills = bills.filter((bill) => {
    const searchText = search.toLowerCase();

    return (
      String(bill.bill_number)
        .toLowerCase()
        .includes(searchText) ||
      (bill.customer_name || "")
        .toLowerCase()
        .includes(searchText) ||
      (bill.customer_mobile || "")
        .includes(searchText)
    );
  });

  const formatBillNumber = (
    number: number
  ) => {
    return `FT-${String(number).padStart(
      4,
      "0"
    )}`;
  };

  const formatDate = (
    date: string
  ) => {
    return new Date(date).toLocaleString(
      "en-IN",
      {
        dateStyle: "medium",
        timeStyle: "short",
      }
    );
  };

  const printBill = () => {
    window.print();
  };

  const shareWhatsApp = (
    bill: Bill
  ) => {
    if (!bill.customer_mobile) {
      alert(
        "This bill does not have a customer mobile number."
      );
      return;
    }

    const message =
      `*Foodies Town*\n` +
      `📞 9699181372\n` +
      `━━━━━━━━━━━━━━━━\n` +
      `🧾 *Bill:* ${formatBillNumber(
        bill.bill_number
      )}\n` +
      `👤 *Customer:* ${
        bill.customer_name ||
        "Walk-in Customer"
      }\n` +
      `📱 *Mobile:* ${bill.customer_mobile}\n` +
      `🍽️ *Order:* ${
        bill.order_type || "Dine In"
      }\n` +
      `${
        bill.table_number
          ? `🪑 *Table:* ${bill.table_number}\n`
          : ""
      }` +
      `━━━━━━━━━━━━━━━━\n` +
      `Subtotal: ₹${Number(
        bill.subtotal
      ).toFixed(2)}\n` +
      `GST: ₹${Number(
        bill.gst
      ).toFixed(2)}\n` +
      `Discount: ₹${Number(
        bill.discount
      ).toFixed(2)}\n` +
      `*Grand Total: ₹${Number(
        bill.grand_total
      ).toFixed(2)}*\n` +
      `💳 Payment: ${
        bill.payment_method || "Cash"
      }\n` +
      `━━━━━━━━━━━━━━━━\n` +
      `Thank you for visiting Foodies Town! 🙏`;

    const url =
      `https://wa.me/91${bill.customer_mobile}` +
      `?text=${encodeURIComponent(message)}`;

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
            Bills History
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            View all generated bills
          </p>
        </div>

        <button
          onClick={loadBills}
          className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800"
        >
          ↻ Refresh
        </button>

      </div>

      {/* SEARCH */}

      <div className="rounded-2xl border bg-white p-4 shadow-sm">

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search Bill No, Customer Name or Mobile..."
          className="h-12 w-full rounded-xl border px-4 text-sm outline-none focus:border-slate-950"
        />

      </div>

      {/* SUMMARY */}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">

        <div className="rounded-2xl border bg-white p-4 shadow-sm">

          <div className="text-xs text-slate-500">
            Total Bills
          </div>

          <div className="mt-2 text-2xl font-black">
            {bills.length}
          </div>

        </div>

        <div className="rounded-2xl border bg-white p-4 shadow-sm">

          <div className="text-xs text-slate-500">
            Total Sales
          </div>

          <div className="mt-2 text-2xl font-black">
            ₹
            {bills
              .reduce(
                (sum, bill) =>
                  sum +
                  Number(
                    bill.grand_total || 0
                  ),
                0
              )
              .toFixed(0)}
          </div>

        </div>

        <div className="hidden rounded-2xl border bg-white p-4 shadow-sm sm:block">

          <div className="text-xs text-slate-500">
            Showing
          </div>

          <div className="mt-2 text-2xl font-black">
            {filteredBills.length}
          </div>

        </div>

      </div>

      {/* BILL LIST */}

      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">

        {loading ? (
          <div className="p-12 text-center">

            <div className="text-lg font-semibold">
              Loading bills...
            </div>

            <div className="mt-2 text-sm text-slate-400">
              Please wait
            </div>

          </div>
        ) : filteredBills.length === 0 ? (
          <div className="p-12 text-center">

            <div className="text-4xl">
              🧾
            </div>

            <div className="mt-4 font-bold">
              No bills found
            </div>

            <div className="mt-1 text-sm text-slate-400">
              Generate a bill from Billing
              to see it here.
            </div>

          </div>
        ) : (
          <>

            {/* DESKTOP TABLE */}

            <div className="hidden overflow-x-auto md:block">

              <table className="w-full text-left">

                <thead className="border-b bg-slate-50">

                  <tr>

                    <th className="px-5 py-4 text-xs font-bold uppercase text-slate-500">
                      Bill
                    </th>

                    <th className="px-5 py-4 text-xs font-bold uppercase text-slate-500">
                      Customer
                    </th>

                    <th className="px-5 py-4 text-xs font-bold uppercase text-slate-500">
                      Date
                    </th>

                    <th className="px-5 py-4 text-xs font-bold uppercase text-slate-500">
                      Payment
                    </th>

                    <th className="px-5 py-4 text-right text-xs font-bold uppercase text-slate-500">
                      Total
                    </th>

                    <th className="px-5 py-4 text-right text-xs font-bold uppercase text-slate-500">
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody className="divide-y">

                  {filteredBills.map(
                    (bill) => (
                      <tr
                        key={bill.id}
                        className="hover:bg-slate-50"
                      >

                        <td className="px-5 py-4">

                          <div className="font-bold">
                            {formatBillNumber(
                              bill.bill_number
                            )}
                          </div>

                          <div className="mt-1 text-xs text-slate-400">
                            {bill.order_type}
                            {bill.table_number
                              ? ` · Table ${bill.table_number}`
                              : ""}
                          </div>

                        </td>

                        <td className="px-5 py-4">

                          <div className="font-semibold">
                            {bill.customer_name ||
                              "Walk-in Customer"}
                          </div>

                          {bill.customer_mobile && (
                            <div className="mt-1 text-xs text-slate-400">
                              {bill.customer_mobile}
                            </div>
                          )}

                        </td>

                        <td className="px-5 py-4 text-sm text-slate-500">
                          {formatDate(
                            bill.created_at
                          )}
                        </td>

                        <td className="px-5 py-4">

                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">
                            {bill.payment_method ||
                              "Cash"}
                          </span>

                        </td>

                        <td className="px-5 py-4 text-right font-black">
                          ₹
                          {Number(
                            bill.grand_total
                          ).toFixed(2)}
                        </td>

                        <td className="px-5 py-4">

                          <div className="flex justify-end gap-2">

                            <button
                              onClick={() =>
                                setSelectedBill(
                                  bill
                                )
                              }
                              className="rounded-lg border px-3 py-2 text-xs font-semibold hover:bg-slate-50"
                            >
                              View
                            </button>

                            <button
                              onClick={() =>
                                shareWhatsApp(
                                  bill
                                )
                              }
                              className="rounded-lg bg-green-600 px-3 py-2 text-xs font-bold text-white hover:bg-green-700"
                            >
                              WhatsApp
                            </button>

                          </div>

                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>

            {/* MOBILE CARDS */}

            <div className="divide-y md:hidden">

              {filteredBills.map(
                (bill) => (
                  <div
                    key={bill.id}
                    className="p-4"
                  >

                    <div className="flex items-start justify-between gap-3">

                      <div>

                        <div className="font-bold">
                          {formatBillNumber(
                            bill.bill_number
                          )}
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
                          ).toFixed(2)}
                        </div>

                        <div className="mt-1 text-xs text-slate-400">
                          {bill.payment_method ||
                            "Cash"}
                        </div>

                      </div>

                    </div>

                    <div className="mt-4 rounded-xl bg-slate-50 p-3">

                      <div className="font-semibold">
                        {bill.customer_name ||
                          "Walk-in Customer"}
                      </div>

                      {bill.customer_mobile && (
                        <div className="mt-1 text-xs text-slate-500">
                          📱{" "}
                          {bill.customer_mobile}
                        </div>
                      )}

                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-2">

                      <button
                        onClick={() =>
                          setSelectedBill(
                            bill
                          )
                        }
                        className="rounded-xl border py-3 text-xs font-bold"
                      >
                        View Bill
                      </button>

                      <button
                        onClick={() =>
                          shareWhatsApp(
                            bill
                          )
                        }
                        className="rounded-xl bg-green-600 py-3 text-xs font-bold text-white"
                      >
                        WhatsApp
                      </button>

                    </div>

                  </div>
                )
              )}

            </div>

          </>
        )}

      </div>

      {/* BILL DETAIL MODAL */}

      {selectedBill && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">

          <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl bg-white shadow-2xl">

            {/* MODAL HEADER */}

            <div className="flex items-center justify-between border-b p-5">

              <div>

                <div className="text-lg font-black">
                  Foodies Town
                </div>

                <div className="mt-1 text-xs text-slate-500">
                  Bill Details
                </div>

              </div>

              <button
                onClick={() =>
                  setSelectedBill(null)
                }
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-lg"
              >
                ×
              </button>

            </div>

            {/* BILL */}

            <div className="p-5">

              <div className="rounded-2xl bg-slate-50 p-4">

                <div className="flex justify-between">

                  <span className="text-xs text-slate-500">
                    Bill Number
                  </span>

                  <span className="font-bold">
                    {formatBillNumber(
                      selectedBill.bill_number
                    )}
                  </span>

                </div>

                <div className="mt-3 flex justify-between">

                  <span className="text-xs text-slate-500">
                    Date
                  </span>

                  <span className="text-xs font-semibold">
                    {formatDate(
                      selectedBill.created_at
                    )}
                  </span>

                </div>

              </div>

              <div className="mt-5">

                <div className="text-xs text-slate-500">
                  Customer
                </div>

                <div className="mt-1 font-bold">
                  {selectedBill.customer_name ||
                    "Walk-in Customer"}
                </div>

                {selectedBill.customer_mobile && (
                  <div className="mt-1 text-sm text-slate-500">
                    📱{" "}
                    {
                      selectedBill.customer_mobile
                    }
                  </div>
                )}

              </div>

              <div className="mt-5 border-t pt-5">

                <div className="flex justify-between text-sm">

                  <span className="text-slate-500">
                    Subtotal
                  </span>

                  <span>
                    ₹
                    {Number(
                      selectedBill.subtotal
                    ).toFixed(2)}
                  </span>

                </div>

                <div className="mt-3 flex justify-between text-sm">

                  <span className="text-slate-500">
                    GST
                  </span>

                  <span>
                    ₹
                    {Number(
                      selectedBill.gst
                    ).toFixed(2)}
                  </span>

                </div>

                <div className="mt-3 flex justify-between text-sm">

                  <span className="text-slate-500">
                    Discount
                  </span>

                  <span>
                    ₹
                    {Number(
                      selectedBill.discount
                    ).toFixed(2)}
                  </span>

                </div>

                <div className="my-5 border-t" />

                <div className="flex justify-between">

                  <span className="font-bold">
                    Grand Total
                  </span>

                  <span className="text-2xl font-black">
                    ₹
                    {Number(
                      selectedBill.grand_total
                    ).toFixed(2)}
                  </span>

                </div>

              </div>

              <div className="mt-5 rounded-xl bg-slate-100 p-3 text-center text-xs font-semibold">
                Payment:{" "}
                {selectedBill.payment_method ||
                  "Cash"}
              </div>

              {/* ACTIONS */}

              <div className="mt-5 grid grid-cols-2 gap-2">

                <button
                  onClick={printBill}
                  className="rounded-xl border py-3 text-sm font-bold"
                >
                  🖨️ Print
                </button>

                <button
                  onClick={() =>
                    shareWhatsApp(
                      selectedBill
                    )
                  }
                  className="rounded-xl bg-green-600 py-3 text-sm font-bold text-white"
                >
                  🟢 WhatsApp
                </button>

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
