"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const WHATSAPP_NUMBER = "919699181372";

type FoodItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  category: string;
};

type Bill = {
  id: number;
  bill_number: number;
  customer_name: string;
  customer_mobile: string | null;
  order_type: string;
  table_number: string | null;
  grand_total: number;
  discount: number;
  payment_method: string | null;
  created_at: string;
};

type BillItem = {
  id?: number;
  bill_id?: number;
  item_name: string;
  quantity: number;
  price: number;
  total: number;
};

const initialItems: FoodItem[] = [
  {
    id: 1,
    name: "घावणे (Ghavane) - 2 pcs",
    price: 80,
    quantity: 0,
    category: "Breakfast",
  },
  {
    id: 2,
    name: "आलू पराठा (Aloo Paratha) - 2 pcs",
    price: 80,
    quantity: 0,
    category: "Breakfast",
  },
  {
    id: 3,
    name: "उपमा (Upma)",
    price: 50,
    quantity: 0,
    category: "Breakfast",
  },
  {
    id: 4,
    name: "पोहे (Poha)",
    price: 50,
    quantity: 0,
    category: "Breakfast",
  },
  {
    id: 5,
    name: "वडा पाव (Vada Pav) - 1 pc",
    price: 12,
    quantity: 0,
    category: "Breakfast",
  },
  {
    id: 6,
    name: "मिसळ पाव (Misal Pav)",
    price: 70,
    quantity: 0,
    category: "Breakfast",
  },
  {
    id: 7,
    name: "ऑम्लेट पाव डबल (Omelette Pav Double)",
    price: 50,
    quantity: 0,
    category: "Breakfast",
  },
  {
    id: 8,
    name: "शिरा (Sheera)",
    price: 70,
    quantity: 0,
    category: "Breakfast",
  },

  {
    id: 9,
    name: "व्हेज प्लेट (Veg Plate)",
    price: 200,
    quantity: 0,
    category: "Veg",
  },

  {
    id: 10,
    name: "चिकन प्लेट (Chicken Plate)",
    price: 230,
    quantity: 0,
    category: "Non-Veg",
  },
  {
    id: 11,
    name: "स्पेशल चिकन प्लेट (Special Chicken Plate)",
    price: 280,
    quantity: 0,
    category: "Non-Veg",
  },

  {
    id: 12,
    name: "फिश प्लेट (Fish Plate)",
    price: 400,
    quantity: 0,
    category: "Fish",
  },
  {
    id: 13,
    name: "सुरमई करी - 2 pcs (Surmai Curry)",
    price: 400,
    quantity: 0,
    category: "Fish",
  },
  {
    id: 14,
    name: "सुरमई फ्राय - 2 pcs (Surmai Fry)",
    price: 400,
    quantity: 0,
    category: "Fish",
  },
  {
    id: 15,
    name: "पापलेट करी - 1 Plate (Pomfret Curry)",
    price: 400,
    quantity: 0,
    category: "Fish",
  },
  {
    id: 16,
    name: "पापलेट फ्राय - 1 Plate (Pomfret Fry)",
    price: 300,
    quantity: 0,
    category: "Fish",
  },

  {
    id: 17,
    name: "सुरमई थाळी (Surmai Thali)",
    price: 400,
    quantity: 0,
    category: "Thali",
  },
  {
    id: 18,
    name: "पापलेट थाळी (Pomfret Thali)",
    price: 450,
    quantity: 0,
    category: "Thali",
  },

  {
    id: 19,
    name: "चिकन सुक्का - 10 pcs (Chicken Sukka)",
    price: 250,
    quantity: 0,
    category: "Specials",
  },
  {
    id: 20,
    name: "चिकन करी - 10 pcs (Chicken Curry)",
    price: 280,
    quantity: 0,
    category: "Specials",
  },
  {
    id: 21,
    name: "मटण प्लेट (Mutton Plate)",
    price: 500,
    quantity: 0,
    category: "Specials",
  },

  {
    id: 22,
    name: "डाळ (Dal)",
    price: 80,
    quantity: 0,
    category: "Extras",
  },
  {
    id: 23,
    name: "भात (Rice)",
    price: 80,
    quantity: 0,
    category: "Extras",
  },
  {
    id: 24,
    name: "मोदक (Modak)",
    price: 40,
    quantity: 0,
    category: "Extras",
  },
  {
    id: 25,
    name: "पुरण पोळी (Puran Poli) - 1 pc",
    price: 40,
    quantity: 0,
    category: "Extras",
  },
];

export default function Home() {
  const [customerName, setCustomerName] = useState("");
  const [customerMobile, setCustomerMobile] = useState("");
  const [orderType, setOrderType] = useState("Dine In");
  const [tableNumber, setTableNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [discount, setDiscount] = useState("");

  const [items, setItems] = useState<FoodItem[]>(initialItems);

  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingBills, setLoadingBills] = useState(false);
  const [dashboardLoading, setDashboardLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] =
    useState<"success" | "error">("success");

  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [selectedBillItems, setSelectedBillItems] = useState<BillItem[]>([]);
  const [showBillModal, setShowBillModal] = useState(false);

  const [search, setSearch] = useState("");

  const [dashboard, setDashboard] = useState({
    todaySales: 0,
    todayBills: 0,
    todayCustomers: 0,
    cash: 0,
    upi: 0,
    card: 0,
  });

  useEffect(() => {
    loadBills();
    loadDashboard();
  }, []);

  async function loadBills() {
    setLoadingBills(true);

    try {
      const { data, error } = await supabase
        .from("bills")
        .select(
          "id, bill_number, customer_name, customer_mobile, order_type, table_number, grand_total, discount, payment_method, created_at"
        )
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) {
        console.error("Bills error:", error);
        return;
      }

      if (data) {
        setBills(data as Bill[]);
      }
    } finally {
      setLoadingBills(false);
    }
  }

  async function loadDashboard() {
    setDashboardLoading(true);

    try {
      const start = new Date();
      start.setHours(0, 0, 0, 0);

      const end = new Date();
      end.setHours(23, 59, 59, 999);

      const { data: todayBills, error } = await supabase
        .from("bills")
        .select(
          "id, grand_total, payment_method, customer_name, customer_mobile"
        )
        .gte("created_at", start.toISOString())
        .lte("created_at", end.toISOString());

      if (error) {
        console.error("Dashboard error:", error);
        return;
      }

      const rows = todayBills || [];

      const todaySales = rows.reduce(
        (sum, bill) => sum + Number(bill.grand_total || 0),
        0
      );

      const cash = rows
        .filter(
          (bill) =>
            String(bill.payment_method || "").toLowerCase() === "cash"
        )
        .reduce(
          (sum, bill) => sum + Number(bill.grand_total || 0),
          0
        );

      const upi = rows
        .filter(
          (bill) =>
            String(bill.payment_method || "").toLowerCase() === "upi"
        )
        .reduce(
          (sum, bill) => sum + Number(bill.grand_total || 0),
          0
        );

      const card = rows
        .filter(
          (bill) =>
            String(bill.payment_method || "").toLowerCase() === "card"
        )
        .reduce(
          (sum, bill) => sum + Number(bill.grand_total || 0),
          0
        );

      const customers = new Set(
        rows
          .map(
            (bill) => bill.customer_mobile || bill.customer_name
          )
          .filter(Boolean)
      );

      setDashboard({
        todaySales,
        todayBills: rows.length,
        todayCustomers: customers.size,
        cash,
        upi,
        card,
      });
    } finally {
      setDashboardLoading(false);
    }
  }

  function increaseItem(id: number) {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  }

  function decreaseItem(id: number) {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(0, item.quantity - 1),
            }
          : item
      )
    );
  }

  function resetItems() {
    setItems(initialItems.map((item) => ({ ...item })));
  }

  const selectedItems = items.filter(
    (item) => item.quantity > 0
  );

  const subtotal = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const discountAmount = Math.min(
    Math.max(Number(discount) || 0, 0),
    subtotal
  );

  const total = Math.max(
    0,
    subtotal - discountAmount
  );

  const filteredBills = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return bills;
    }

    return bills.filter((bill) => {
      return (
        String(bill.bill_number).includes(query) ||
        String(bill.customer_name || "")
          .toLowerCase()
          .includes(query) ||
        String(bill.customer_mobile || "").includes(query)
      );
    });
  }, [bills, search]);

  function createWhatsAppMessage(
    billNumber: number,
    finalItems: FoodItem[] | BillItem[],
    finalTotal: number,
    finalDiscount = 0,
    customer = customerName,
    mobile = customerMobile,
    order = orderType,
    table = tableNumber,
    payment = paymentMethod
  ) {
    let text = `*FOODIES TOWN*\n`;
    text += `━━━━━━━━━━━━━━━━━━\n`;
    text += `*Restaurant Bill*\n`;
    text += `━━━━━━━━━━━━━━━━━━\n\n`;

    if (billNumber > 0) {
      text += `*Bill No:* ${billNumber}\n`;
    }

    text += `*Customer:* ${
      customer || "Walk-in Customer"
    }\n`;

    if (mobile) {
      text += `*Mobile:* ${mobile}\n`;
    }

    text += `*Order:* ${order}\n`;

    if (order === "Dine In" && table) {
      text += `*Table:* ${table}\n`;
    }

    text += `*Payment:* ${payment}\n\n`;

    finalItems.forEach((item) => {
      const isBillItem = "item_name" in item;

      const itemName = isBillItem
        ? item.item_name
        : item.name;

      const itemPrice = Number(item.price);
      const itemQuantity = Number(item.quantity);

      const itemTotal = isBillItem
        ? Number(item.total)
        : itemPrice * itemQuantity;

      text += `${itemName}\n`;
      text += `${itemQuantity} x ₹${itemPrice} = *₹${itemTotal}*\n\n`;
    });

    const calculatedSubtotal =
      finalItems.reduce((sum, item) => {
        const quantity = Number(item.quantity);
        const price = Number(item.price);

        if ("item_name" in item) {
          return sum + Number(item.total);
        }

        return sum + price * quantity;
      }, 0);

    text += `━━━━━━━━━━━━━━━━━━\n`;
    text += `*SUBTOTAL: ₹${calculatedSubtotal}*\n`;

    if (finalDiscount > 0) {
      text += `*DISCOUNT: -₹${finalDiscount}*\n`;
    }

    text += `*GRAND TOTAL: ₹${finalTotal}*\n`;
    text += `━━━━━━━━━━━━━━━━━━\n\n`;
    text += `Thank you for visiting *Foodies Town*! ❤️`;

    return encodeURIComponent(text);
  }

  async function saveBill() {
    setMessage("");

    if (selectedItems.length === 0) {
      setMessageType("error");
      setMessage("Please select at least one food item.");
      return;
    }

    if (orderType === "Dine In" && !tableNumber.trim()) {
      setMessageType("error");
      setMessage("Please enter table number.");
      return;
    }

    if (
      customerMobile.trim() &&
      customerMobile.trim().length !== 10
    ) {
      setMessageType("error");
      setMessage(
        "Please enter a valid 10 digit mobile number."
      );
      return;
    }

    if (Number(discount) < 0) {
      setMessageType("error");
      setMessage("Discount cannot be negative.");
      return;
    }

    if (Number(discount) > subtotal) {
      setMessageType("error");
      setMessage(
        "Discount cannot be greater than subtotal."
      );
      return;
    }

    setLoading(true);

    try {
      const { data: lastBill, error: lastBillError } =
        await supabase
          .from("bills")
          .select("bill_number")
          .order("bill_number", { ascending: false })
          .limit(1)
          .maybeSingle();

      if (lastBillError) {
        throw new Error(lastBillError.message);
      }

      const nextBillNumber = lastBill?.bill_number
        ? Number(lastBill.bill_number) + 1
        : 1;

      const finalCustomerName =
        customerName.trim() || "Walk-in Customer";

      if (customerMobile.trim()) {
        const { data: existingCustomer } =
          await supabase
            .from("customers")
            .select("id")
            .eq("mobile", customerMobile.trim())
            .maybeSingle();

        if (!existingCustomer) {
          const { error: customerError } =
            await supabase.from("customers").insert({
              name: finalCustomerName,
              mobile: customerMobile.trim(),
            });

          if (customerError) {
            console.warn(
              "Customer save:",
              customerError.message
            );
          }
        }
      }

      const { data: billData, error: billError } =
        await supabase
          .from("bills")
          .insert({
            bill_number: nextBillNumber,
            customer_name: finalCustomerName,
            customer_mobile:
              customerMobile.trim() || null,
            order_type: orderType,
            table_number:
              orderType === "Dine In"
                ? tableNumber.trim() || null
                : null,
            grand_total: total,
            discount: discountAmount,
            payment_method: paymentMethod,
          })
          .select()
          .single();

      if (billError) {
        throw new Error(billError.message);
      }

      const billItems = selectedItems.map((item) => ({
        bill_id: billData.id,
        item_name: item.name,
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity,
      }));

      const { error: itemError } = await supabase
        .from("bill_items")
        .insert(billItems);

      if (itemError) {
        throw new Error(itemError.message);
      }

      const whatsappMessage = createWhatsAppMessage(
        nextBillNumber,
        selectedItems,
        total,
        discountAmount
      );

      const whatsappUrl =
        `https://wa.me/${WHATSAPP_NUMBER}` +
        `?text=${whatsappMessage}`;

      window.open(whatsappUrl, "_blank");

      setMessageType("success");
      setMessage(
        `Bill #${nextBillNumber} saved successfully! WhatsApp opening...`
      );

      setCustomerName("");
      setCustomerMobile("");
      setTableNumber("");
      setOrderType("Dine In");
      setPaymentMethod("Cash");
      setDiscount("");

      resetItems();

      await Promise.all([
        loadBills(),
        loadDashboard(),
      ]);
    } catch (error: unknown) {
      console.error(error);

      setMessageType("error");

      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage(
          "Something went wrong while saving bill."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  function shareCurrentBill() {
    if (selectedItems.length === 0) {
      setMessageType("error");
      setMessage("Please select items first.");
      return;
    }

    const text = createWhatsAppMessage(
      0,
      selectedItems,
      total,
      discountAmount
    );

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`,
      "_blank"
    );
  }

  async function viewBill(bill: Bill) {
    setSelectedBill(bill);
    setSelectedBillItems([]);
    setShowBillModal(true);

    const { data, error } = await supabase
      .from("bill_items")
      .select(
        "id, bill_id, item_name, quantity, price, total"
      )
      .eq("bill_id", bill.id)
      .order("id", { ascending: true });

    if (!error && data) {
      setSelectedBillItems(data as BillItem[]);
    } else {
      setSelectedBillItems([]);
    }
  }

  function shareSavedBill() {
    if (!selectedBill) {
      return;
    }

    const text = createWhatsAppMessage(
      selectedBill.bill_number,
      selectedBillItems,
      Number(selectedBill.grand_total || 0),
      Number(selectedBill.discount || 0),
      selectedBill.customer_name,
      selectedBill.customer_mobile || "",
      selectedBill.order_type,
      selectedBill.table_number || "",
      selectedBill.payment_method || "Cash"
    );

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`,
      "_blank"
    );
  }

  function printSavedBill() {
    if (!selectedBill) {
      return;
    }

    const printWindow = window.open("", "_blank");

    if (!printWindow) {
      alert(
        "Please allow pop-ups to print the bill."
      );
      return;
    }

    const itemsHtml = selectedBillItems
      .map(
        (item) => `
          <tr>
            <td>${item.item_name}</td>
            <td>${item.quantity}</td>
            <td>₹${item.price}</td>
            <td>₹${item.total}</td>
          </tr>
        `
      )
      .join("");

    const subtotalForPrint =
      Number(selectedBill.grand_total || 0) +
      Number(selectedBill.discount || 0);

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>
            Foodies Town Bill #${selectedBill.bill_number}
          </title>

          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 30px;
              color: #111;
            }

            .center {
              text-align: center;
            }

            h1 {
              margin-bottom: 4px;
            }

            .line {
              border-top: 1px dashed #777;
              margin: 15px 0;
            }

            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }

            th,
            td {
              padding: 8px;
              border-bottom: 1px solid #ddd;
              text-align: left;
            }

            .amounts {
              margin-top: 20px;
              margin-left: auto;
              width: 280px;
            }

            .row {
              display: flex;
              justify-content: space-between;
              padding: 5px 0;
            }

            .grand {
              font-size: 22px;
              font-weight: bold;
              border-top: 1px solid #111;
              padding-top: 10px;
              margin-top: 8px;
            }
          </style>
        </head>

        <body>
          <div class="center">
            <h1>FOODIES TOWN</h1>
            <div>Restaurant Bill</div>
          </div>

          <div class="line"></div>

          <p>
            <b>Bill No:</b>
            #${selectedBill.bill_number}
          </p>

          <p>
            <b>Customer:</b>
            ${selectedBill.customer_name}
          </p>

          <p>
            <b>Mobile:</b>
            ${selectedBill.customer_mobile || "-"}
          </p>

          <p>
            <b>Order:</b>
            ${selectedBill.order_type}
          </p>

          <p>
            <b>Table:</b>
            ${selectedBill.table_number || "-"}
          </p>

          <p>
            <b>Payment:</b>
            ${selectedBill.payment_method || "-"}
          </p>

          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <div class="amounts">
            <div class="row">
              <span>Subtotal:</span>
              <b>₹${subtotalForPrint}</b>
            </div>

            <div class="row">
              <span>Discount:</span>
              <b>
                -₹${Number(
                  selectedBill.discount || 0
                )}
              </b>
            </div>

            <div class="row grand">
              <span>Grand Total:</span>
              <span>
                ₹${Number(
                  selectedBill.grand_total || 0
                )}
              </span>
            </div>
          </div>

          <div class="line"></div>

          <div class="center">
            Thank you for visiting Foodies Town!
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();

    setTimeout(() => {
      printWindow.print();
    }, 300);
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  }

  return (
    <main className="min-h-screen bg-slate-100">
      {/* HEADER */}

      <header className="bg-slate-900 text-white shadow-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5">
          <div>
            <h1 className="text-2xl font-black">
              🍴 Foodies Town
            </h1>

            <p className="text-sm text-slate-300">
              Restaurant Billing System
            </p>
          </div>

          <div className="hidden rounded-full bg-green-600 px-4 py-2 text-sm font-semibold sm:block">
            ● POS Online
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* DASHBOARD */}

        <section className="mb-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black">
                Dashboard
              </h2>

              <p className="text-sm text-slate-500">
                Today&apos;s restaurant performance
              </p>
            </div>

            <button
              onClick={() => {
                loadDashboard();
                loadBills();
              }}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold hover:bg-slate-50"
            >
              ↻ Refresh
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-slate-500">
                Today&apos;s Sales
              </p>

              <p className="mt-2 text-3xl font-black text-orange-600">
                {dashboardLoading
                  ? "..."
                  : `₹${dashboard.todaySales.toFixed(0)}`}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-slate-500">
                Today&apos;s Bills
              </p>

              <p className="mt-2 text-3xl font-black">
                {dashboardLoading
                  ? "..."
                  : dashboard.todayBills}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-slate-500">
                Today&apos;s Customers
              </p>

              <p className="mt-2 text-3xl font-black">
                {dashboardLoading
                  ? "..."
                  : dashboard.todayCustomers}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-slate-500">
                Average Bill
              </p>

              <p className="mt-2 text-3xl font-black text-blue-600">
                {dashboard.todayBills > 0
                  ? `₹${(
                      dashboard.todaySales /
                      dashboard.todayBills
                    ).toFixed(0)}`
                  : "₹0"}
              </p>
            </div>
          </div>

          {/* PAYMENT CARDS */}

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-slate-500">
                💵 Cash Sales
              </p>

              <p className="mt-2 text-2xl font-black">
                ₹{dashboard.cash.toFixed(0)}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-slate-500">
                📱 UPI Sales
              </p>

              <p className="mt-2 text-2xl font-black">
                ₹{dashboard.upi.toFixed(0)}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-slate-500">
                💳 Card Sales
              </p>

              <p className="mt-2 text-2xl font-black">
                ₹{dashboard.card.toFixed(0)}
              </p>
            </div>
          </div>
        </section>

        {/* MESSAGE */}

        {message && (
          <div
            className={`mb-5 rounded-xl border px-4 py-3 font-medium ${
              messageType === "success"
                ? "border-green-200 bg-green-50 text-green-700"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        {/* NEW BILL */}

        <div className="grid gap-6 lg:grid-cols-3">
          <section className="rounded-2xl bg-white p-5 shadow-sm lg:col-span-2">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">
                  New Bill
                </h2>

                <p className="text-sm text-slate-500">
                  Enter customer and order details
                </p>
              </div>

              <div className="rounded-lg bg-orange-100 px-3 py-2 text-sm font-bold text-orange-700">
                ₹{total}
              </div>
            </div>

            {/* CUSTOMER */}

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-semibold">
                  Customer Name
                </label>

                <input
                  value={customerName}
                  onChange={(e) =>
                    setCustomerName(e.target.value)
                  }
                  placeholder="Enter customer name"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold">
                  Customer Mobile
                </label>

                <input
                  value={customerMobile}
                  onChange={(e) =>
                    setCustomerMobile(
                      e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 10)
                    )
                  }
                  placeholder="10 digit mobile number"
                  inputMode="numeric"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold">
                  Order Type
                </label>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setOrderType("Dine In")
                    }
                    className={`rounded-xl border px-4 py-3 font-semibold ${
                      orderType === "Dine In"
                        ? "border-orange-500 bg-orange-500 text-white"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    🍽️ Dine In
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setOrderType("Take Away")
                    }
                    className={`rounded-xl border px-4 py-3 font-semibold ${
                      orderType === "Take Away"
                        ? "border-orange-500 bg-orange-500 text-white"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    🥡 Take Away
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold">
                  Table Number
                </label>

                <input
                  value={tableNumber}
                  onChange={(e) =>
                    setTableNumber(e.target.value)
                  }
                  disabled={orderType !== "Dine In"}
                  placeholder={
                    orderType === "Dine In"
                      ? "Example: 1"
                      : "Not required"
                  }
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500 disabled:bg-slate-100"
                />
              </div>

              {/* PAYMENT */}

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold">
                  Payment Method
                </label>

                <div className="grid grid-cols-3 gap-2">
                  {["Cash", "UPI", "Card"].map(
                    (method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() =>
                          setPaymentMethod(method)
                        }
                        className={`rounded-xl border px-4 py-3 font-bold ${
                          paymentMethod === method
                            ? "border-green-500 bg-green-500 text-white"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {method === "Cash"
                          ? "💵 Cash"
                          : method === "UPI"
                          ? "📱 UPI"
                          : "💳 Card"}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* DISCOUNT */}

              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-semibold">
                  💸 Discount Amount
                </label>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-500">
                    ₹
                  </span>

                  <input
                    value={discount}
                    onChange={(e) => {
                      const value =
                        e.target.value.replace(
                          /[^\d.]/g,
                          ""
                        );

                      setDiscount(value);
                    }}
                    placeholder="Enter discount amount"
                    inputMode="decimal"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 pl-9 outline-none focus:border-green-500"
                  />
                </div>

                <p className="mt-1 text-xs text-slate-500">
                  Maximum discount: ₹{subtotal}
                </p>
              </div>
            </div>

            {/* FOOD ITEMS */}

            <div className="mt-7">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold">
                  Food Items
                </h3>

                <button
                  type="button"
                  onClick={resetItems}
                  className="text-sm font-semibold text-red-600 hover:underline"
                >
                  Clear Items
                </button>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between rounded-xl border p-4 ${
                      item.quantity > 0
                        ? "border-orange-400 bg-orange-50"
                        : "border-slate-200 bg-white"
                    }`}
                  >
                    <div className="min-w-0 pr-3">
                      <p className="font-bold">
                        {item.name}
                      </p>

                      <p className="text-sm text-slate-500">
                        ₹{item.price}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          decreaseItem(item.id)
                        }
                        className="h-9 w-9 rounded-lg bg-slate-200 text-lg font-bold"
                      >
                        −
                      </button>

                      <span className="w-6 text-center font-bold">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          increaseItem(item.id)
                        }
                        className="h-9 w-9 rounded-lg bg-orange-500 text-lg font-bold text-white"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* BILL SUMMARY */}

          <aside className="h-fit rounded-2xl bg-white p-5 shadow-sm lg:sticky lg:top-24">
            <div className="mb-5">
              <h2 className="text-xl font-bold">
                Bill Summary
              </h2>

              <p className="text-sm text-slate-500">
                Review before saving
              </p>
            </div>

            {selectedItems.length === 0 ? (
              <div className="rounded-xl bg-slate-50 p-8 text-center text-slate-500">
                <div className="mb-2 text-4xl">
                  🛒
                </div>

                <p>No items selected</p>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between border-b border-slate-100 pb-3"
                  >
                    <div className="pr-3">
                      <p className="font-semibold">
                        {item.name}
                      </p>

                      <p className="text-xs text-slate-500">
                        {item.quantity} × ₹{item.price}
                      </p>
                    </div>

                    <p className="font-bold">
                      ₹{item.quantity * item.price}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div className="my-5 border-t pt-5">
              <div className="flex items-center justify-between text-slate-600">
                <span>Subtotal</span>

                <span className="font-bold">
                  ₹{subtotal}
                </span>
              </div>

              <div className="mt-2 flex items-center justify-between text-green-600">
                <span>Discount</span>

                <span className="font-bold">
                  -₹{discountAmount}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between border-t pt-4">
                <span className="text-lg font-semibold">
                  Grand Total
                </span>

                <span className="text-3xl font-black text-orange-600">
                  ₹{total}
                </span>
              </div>

              <p className="mt-2 text-right text-sm text-slate-500">
                Payment: <b>{paymentMethod}</b>
              </p>
            </div>

            <button
              type="button"
              onClick={saveBill}
              disabled={
                loading ||
                selectedItems.length === 0
              }
              className="w-full rounded-xl bg-orange-500 px-5 py-4 text-lg font-bold text-white shadow-md hover:bg-orange-600 disabled:opacity-50"
            >
              {loading
                ? "Saving Bill..."
                : "💾 Save Bill & WhatsApp"}
            </button>

            <button
              type="button"
              onClick={shareCurrentBill}
              disabled={selectedItems.length === 0}
              className="mt-3 w-full rounded-xl bg-green-600 px-5 py-3 font-bold text-white hover:bg-green-700 disabled:opacity-50"
            >
              📱 Share on WhatsApp
            </button>
          </aside>
        </div>

        {/* BILL HISTORY */}

        <section className="mt-8 rounded-2xl bg-white p-5 shadow-sm">
          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-bold">
                Bill History
              </h2>

              <p className="text-sm text-slate-500">
                View, print and share previous bills
              </p>
            </div>

            <div className="flex gap-2">
              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search bill/customer/mobile"
                className="w-full rounded-xl border border-slate-300 px-4 py-2 text-sm outline-none focus:border-orange-500 md:w-auto"
              />

              <button
                type="button"
                onClick={() => {
                  loadBills();
                  loadDashboard();
                }}
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-bold hover:bg-slate-50"
              >
                ↻
              </button>
            </div>
          </div>

          {loadingBills ? (
            <div className="py-8 text-center text-slate-500">
              Loading bills...
            </div>
          ) : filteredBills.length === 0 ? (
            <div className="rounded-xl bg-slate-50 py-8 text-center text-slate-500">
              No bills found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1150px] text-left">
                <thead>
                  <tr className="border-b bg-slate-50 text-sm">
                    <th className="px-4 py-3">
                      Bill
                    </th>

                    <th className="px-4 py-3">
                      Date
                    </th>

                    <th className="px-4 py-3">
                      Customer
                    </th>

                    <th className="px-4 py-3">
                      Mobile
                    </th>

                    <th className="px-4 py-3">
                      Order
                    </th>

                    <th className="px-4 py-3">
                      Payment
                    </th>

                    <th className="px-4 py-3">
                      Discount
                    </th>

                    <th className="px-4 py-3">
                      Total
                    </th>

                    <th className="px-4 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredBills.map((bill) => (
                    <tr
                      key={bill.id}
                      className="border-b last:border-0 hover:bg-slate-50"
                    >
                      <td className="px-4 py-3 font-bold">
                        #{bill.bill_number}
                      </td>

                      <td className="px-4 py-3 text-sm">
                        {formatDate(
                          bill.created_at
                        )}
                      </td>

                      <td className="px-4 py-3">
                        {bill.customer_name}
                      </td>

                      <td className="px-4 py-3">
                        {bill.customer_mobile || "-"}
                      </td>

                      <td className="px-4 py-3">
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                          {bill.order_type}
                        </span>
                      </td>

                      <td className="px-4 py-3 font-semibold">
                        {bill.payment_method || "-"}
                      </td>

                      <td className="px-4 py-3 font-semibold text-green-600">
                        -₹
                        {Number(
                          bill.discount || 0
                        )}
                      </td>

                      <td className="px-4 py-3 font-black">
                        ₹
                        {Number(
                          bill.grand_total || 0
                        )}
                      </td>

                      <td className="px-4 py-3">
                        <button
                          type="button"
                          onClick={() =>
                            viewBill(bill)
                          }
                          className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-bold text-white hover:bg-slate-700"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <footer className="py-8 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Foodies Town •
          Restaurant POS
        </footer>
      </div>

      {/* BILL MODAL */}

      {showBillModal && selectedBill && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b p-5">
              <div>
                <h2 className="text-xl font-black">
                  Foodies Town
                </h2>

                <p className="text-sm text-slate-500">
                  Bill #{selectedBill.bill_number}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowBillModal(false)
                }
                className="rounded-lg bg-slate-100 px-3 py-2 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-5">
              <div className="grid gap-3 rounded-xl bg-slate-50 p-4 sm:grid-cols-2">
                <p>
                  <b>Customer:</b>{" "}
                  {selectedBill.customer_name}
                </p>

                <p>
                  <b>Mobile:</b>{" "}
                  {selectedBill.customer_mobile ||
                    "-"}
                </p>

                <p>
                  <b>Order:</b>{" "}
                  {selectedBill.order_type}
                </p>

                <p>
                  <b>Table:</b>{" "}
                  {selectedBill.table_number ||
                    "-"}
                </p>

                <p>
                  <b>Payment:</b>{" "}
                  {selectedBill.payment_method ||
                    "-"}
                </p>

                <p>
                  <b>Date:</b>{" "}
                  {formatDate(
                    selectedBill.created_at
                  )}
                </p>
              </div>

              <div className="mt-5 overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b">
                      <th className="px-2 py-3">
                        Item
                      </th>

                      <th className="px-2 py-3">
                        Qty
                      </th>

                      <th className="px-2 py-3">
                        Price
                      </th>

                      <th className="px-2 py-3">
                        Total
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {selectedBillItems.map(
                      (item, index) => (
                        <tr
                          key={
                            item.id ??
                            `${item.item_name}-${index}`
                          }
                          className="border-b"
                        >
                          <td className="px-2 py-3 font-semibold">
                            {item.item_name}
                          </td>

                          <td className="px-2 py-3">
                            {item.quantity}
                          </td>

                          <td className="px-2 py-3">
                            ₹{item.price}
                          </td>

                          <td className="px-2 py-3 font-bold">
                            ₹{item.total}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>

              <div className="mt-5 space-y-2 border-t pt-5">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>

                  <span className="font-bold">
                    ₹
                    {Number(
                      selectedBill.grand_total || 0
                    ) +
                      Number(
                        selectedBill.discount || 0
                      )}
                  </span>
                </div>

                <div className="flex items-center justify-between text-green-600">
                  <span>Discount</span>

                  <span className="font-bold">
                    -₹
                    {Number(
                      selectedBill.discount || 0
                    )}
                  </span>
                </div>

                <div className="flex items-center justify-between border-t pt-4">
                  <span className="text-lg font-bold">
                    Grand Total
                  </span>

                  <span className="text-3xl font-black text-orange-600">
                    ₹
                    {Number(
                      selectedBill.grand_total || 0
                    )}
                  </span>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={printSavedBill}
                  className="rounded-xl bg-slate-900 px-5 py-3 font-bold text-white hover:bg-slate-700"
                >
                  🖨️ Print Bill
                </button>

                <button
                  type="button"
                  onClick={shareSavedBill}
                  className="rounded-xl bg-green-600 px-5 py-3 font-bold text-white hover:bg-green-700"
                >
                  📱 WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}