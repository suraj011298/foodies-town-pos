"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);

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
  status: string | null;
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

  const [items, setItems] =
    useState<FoodItem[]>(initialItems);

  const [bills, setBills] = useState<Bill[]>([]);
  const [pendingOrders, setPendingOrders] =
    useState<Bill[]>([]);

  const [loading, setLoading] = useState(false);
  const [loadingBills, setLoadingBills] =
    useState(false);
  const [loadingPending, setLoadingPending] =
    useState(false);
  const [dashboardLoading, setDashboardLoading] =
    useState(false);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] =
    useState<"success" | "error">("success");

  const [selectedBill, setSelectedBill] =
    useState<Bill | null>(null);

  const [selectedBillItems, setSelectedBillItems] =
    useState<BillItem[]>([]);

  const [showBillModal, setShowBillModal] =
    useState(false);

  const [pendingDiscount, setPendingDiscount] =
    useState("");

  const [pendingPaymentMethod, setPendingPaymentMethod] =
    useState("Cash");

  const [updatingPending, setUpdatingPending] =
    useState(false);

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
    loadPendingOrders();
    loadDashboard();

    const timer = setInterval(() => {
      loadPendingOrders();
      loadBills();
      loadDashboard();
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  async function loadBills() {
    setLoadingBills(true);

    try {
      const { data, error } = await supabase
        .from("bills")
        .select(
          "id, bill_number, customer_name, customer_mobile, order_type, table_number, grand_total, discount, payment_method, status, created_at"
        )
        .neq("status", "pending")
        .neq("status", "rejected")
        .order("created_at", {
          ascending: false,
        })
        .limit(100);

      if (error) {
        console.error("Bills error:", error);
        return;
      }

      setBills((data || []) as Bill[]);
    } finally {
      setLoadingBills(false);
    }
  }

  async function loadPendingOrders() {
    setLoadingPending(true);

    try {
      const { data, error } = await supabase
        .from("bills")
        .select(
          "id, bill_number, customer_name, customer_mobile, order_type, table_number, grand_total, discount, payment_method, status, created_at"
        )
        .eq("status", "pending")
        .order("created_at", {
          ascending: true,
        });

      if (error) {
        console.error(
          "Pending orders error:",
          error
        );
        return;
      }

      setPendingOrders((data || []) as Bill[]);
    } finally {
      setLoadingPending(false);
    }
  }

  async function loadDashboard() {
    setDashboardLoading(true);

    try {
      const start = new Date();
      start.setHours(0, 0, 0, 0);

      const end = new Date();
      end.setHours(23, 59, 59, 999);

      const { data, error } = await supabase
        .from("bills")
        .select(
          "id, grand_total, payment_method, customer_name, customer_mobile, status"
        )
        .gte(
          "created_at",
          start.toISOString()
        )
        .lte(
          "created_at",
          end.toISOString()
        )
        .neq("status", "pending")
        .neq("status", "rejected");

      if (error) {
        console.error(
          "Dashboard error:",
          error
        );
        return;
      }

      const rows = data || [];

      const todaySales = rows.reduce(
        (sum, bill) =>
          sum + Number(bill.grand_total || 0),
        0
      );

      const cash = rows
        .filter(
          (bill) =>
            String(
              bill.payment_method || ""
            ).toLowerCase() === "cash"
        )
        .reduce(
          (sum, bill) =>
            sum + Number(bill.grand_total || 0),
          0
        );

      const upi = rows
        .filter(
          (bill) =>
            String(
              bill.payment_method || ""
            ).toLowerCase() === "upi"
        )
        .reduce(
          (sum, bill) =>
            sum + Number(bill.grand_total || 0),
          0
        );

      const card = rows
        .filter(
          (bill) =>
            String(
              bill.payment_method || ""
            ).toLowerCase() === "card"
        )
        .reduce(
          (sum, bill) =>
            sum + Number(bill.grand_total || 0),
          0
        );

      const customers = new Set(
        rows
          .map(
            (bill) =>
              bill.customer_mobile ||
              bill.customer_name
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

  async function getBillItems(
    billId: number
  ) {
    const { data, error } = await supabase
      .from("bill_items")
      .select(
        "id, bill_id, item_name, quantity, price, total"
      )
      .eq("bill_id", billId)
      .order("id", {
        ascending: true,
      });

    if (error) {
      console.error(
        "Bill items error:",
        error
      );
      return [];
    }

    return (data || []) as BillItem[];
  }

  function calculateBillSubtotal(
    billItems: BillItem[]
  ) {
    return billItems.reduce(
      (sum, item) =>
        sum +
        Number(item.price || 0) *
          Number(item.quantity || 0),
      0
    );
  }

  /*
   * PENDING ORDER OPEN
   */
  async function viewPendingOrder(
    bill: Bill
  ) {
    const billItems = await getBillItems(
      bill.id
    );

    setSelectedBill(bill);
    setSelectedBillItems(billItems);

    setPendingDiscount(
      String(bill.discount || 0)
    );

    setPendingPaymentMethod(
      bill.payment_method || "Cash"
    );

    setShowBillModal(true);
  }

  /*
   * SAVE DISCOUNT ONLY
   */
  async function updatePendingDiscount() {
    if (!selectedBill) return;

    const subtotal =
      calculateBillSubtotal(
        selectedBillItems
      );

    const enteredDiscount =
      Number(pendingDiscount) || 0;

    if (enteredDiscount < 0) {
      setMessageType("error");
      setMessage(
        "Discount cannot be negative."
      );
      return;
    }

    if (enteredDiscount > subtotal) {
      setMessageType("error");
      setMessage(
        `Maximum discount is ₹${subtotal}.`
      );
      return;
    }

    const newTotal =
      Math.max(
        0,
        subtotal - enteredDiscount
      );

    setUpdatingPending(true);

    try {
      const { error } = await supabase
        .from("bills")
        .update({
          discount: enteredDiscount,
          grand_total: newTotal,
          payment_method:
            pendingPaymentMethod,
        })
        .eq("id", selectedBill.id);

      if (error) {
        throw new Error(error.message);
      }

      const updatedBill: Bill = {
        ...selectedBill,
        discount: enteredDiscount,
        grand_total: newTotal,
        payment_method:
          pendingPaymentMethod,
      };

      setSelectedBill(updatedBill);

      setMessageType("success");
      setMessage(
        `Order #${selectedBill.bill_number} updated successfully.`
      );

      await Promise.all([
        loadPendingOrders(),
        loadBills(),
        loadDashboard(),
      ]);
    } catch (error) {
      console.error(error);

      setMessageType("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Discount update failed."
      );
    } finally {
      setUpdatingPending(false);
    }
  }

  /*
   * ACCEPT = PAID
   */
  async function acceptOrder(
    bill: Bill,
    discountValue?: number,
    paymentValue?: string
  ) {
    setMessage("");

    const billItems =
      selectedBill?.id === bill.id
        ? selectedBillItems
        : await getBillItems(bill.id);

    const subtotal =
      calculateBillSubtotal(billItems);

    const finalDiscount =
      discountValue !== undefined
        ? discountValue
        : Number(bill.discount || 0);

    const finalPayment =
      paymentValue ||
      bill.payment_method ||
      "Cash";

    if (finalDiscount < 0) {
      setMessageType("error");
      setMessage(
        "Discount cannot be negative."
      );
      return;
    }

    if (finalDiscount > subtotal) {
      setMessageType("error");
      setMessage(
        `Discount cannot be greater than ₹${subtotal}.`
      );
      return;
    }

    const finalTotal =
      Math.max(
        0,
        subtotal - finalDiscount
      );

    setUpdatingPending(true);

    try {
      /*
       * IMPORTANT:
       * status = paid
       *
       * त्यामुळे customer ला bill दिल्यावर
       * order paid म्हणून save होईल.
       */
      const { error } = await supabase
        .from("bills")
        .update({
          status: "paid",
          discount: finalDiscount,
          grand_total: finalTotal,
          payment_method:
            finalPayment,
        })
        .eq("id", bill.id);

      if (error) {
        throw new Error(error.message);
      }

      const whatsappMessage =
        createWhatsAppMessage(
          bill.bill_number,
          billItems,
          finalTotal,
          finalDiscount,
          bill.customer_name,
          bill.customer_mobile || "",
          bill.order_type,
          bill.table_number || "",
          finalPayment,
          "PAID"
        );

      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`,
        "_blank"
      );

      setMessageType("success");
      setMessage(
        `Order #${bill.bill_number} accepted and marked as PAID.`
      );

      setShowBillModal(false);
      setSelectedBill(null);
      setSelectedBillItems([]);

      await Promise.all([
        loadPendingOrders(),
        loadBills(),
        loadDashboard(),
      ]);
    } catch (error) {
      console.error(error);

      setMessageType("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Order accept करताना error आला."
      );
    } finally {
      setUpdatingPending(false);
    }
  }

  async function rejectOrder(
    bill: Bill
  ) {
    const ok = window.confirm(
      `Order #${bill.bill_number} reject करायची आहे का?`
    );

    if (!ok) return;

    const { error } = await supabase
      .from("bills")
      .update({
        status: "rejected",
      })
      .eq("id", bill.id);

    if (error) {
      setMessageType("error");
      setMessage(
        "Order reject करताना error आला."
      );
      return;
    }

    setMessageType("success");
    setMessage(
      `Order #${bill.bill_number} rejected.`
    );

    setShowBillModal(false);

    await loadPendingOrders();
  }

  function increaseItem(id: number) {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                item.quantity + 1,
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
              quantity: Math.max(
                0,
                item.quantity - 1
              ),
            }
          : item
      )
    );
  }

  function resetItems() {
    setItems(
      initialItems.map((item) => ({
        ...item,
      }))
    );
  }

  const selectedItems = items.filter(
    (item) => item.quantity > 0
  );

  const subtotal = selectedItems.reduce(
    (sum, item) =>
      sum +
      item.price * item.quantity,
    0
  );

  const discountAmount = Math.min(
    Math.max(
      Number(discount) || 0,
      0
    ),
    subtotal
  );

  const total = Math.max(
    0,
    subtotal - discountAmount
  );

  const filteredBills = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    if (!query) return bills;

    return bills.filter((bill) => {
      return (
        String(
          bill.bill_number
        ).includes(query) ||
        String(
          bill.customer_name || ""
        )
          .toLowerCase()
          .includes(query) ||
        String(
          bill.customer_mobile || ""
        ).includes(query)
      );
    });
  }, [bills, search]);

  function createWhatsAppMessage(
    billNumber: number,
    finalItems:
      | FoodItem[]
      | BillItem[],
    finalTotal: number,
    finalDiscount = 0,
    customer = customerName,
    mobile = customerMobile,
    order = orderType,
    table = tableNumber,
    payment = paymentMethod,
    status = "PAID"
  ) {
    let text =
      `*FOODIES TOWN*\n` +
      `━━━━━━━━━━━━━━━━━━\n` +
      `*Restaurant Bill*\n` +
      `━━━━━━━━━━━━━━━━━━\n\n`;

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

    if (
      order === "Dine In" &&
      table
    ) {
      text += `*Table:* ${table}\n`;
    }

    text += `*Payment:* ${payment}\n`;
    text += `*Status:* ${status}\n\n`;

    const originalSubtotal =
      finalItems.reduce(
        (sum, item) => {
          const isBillItem =
            "item_name" in item;

          const price = Number(
            item.price || 0
          );

          const quantity = Number(
            item.quantity || 0
          );

          return (
            sum +
            price * quantity
          );
        },
        0
      );

    finalItems.forEach((item) => {
      const isBillItem =
        "item_name" in item;

      const itemName = isBillItem
        ? item.item_name
        : item.name;

      const itemPrice = Number(
        item.price
      );

      const itemQuantity = Number(
        item.quantity
      );

      const itemTotal = isBillItem
        ? Number(item.total)
        : itemPrice *
          itemQuantity;

      text += `${itemName}\n`;
      text += `${itemQuantity} x ₹${itemPrice} = *₹${itemTotal}*\n\n`;
    });

    text += `━━━━━━━━━━━━━━━━━━\n`;
    text += `Subtotal: ₹${originalSubtotal}\n`;

    if (finalDiscount > 0) {
      text += `Discount: -₹${finalDiscount}\n`;
    }

    text += `*GRAND TOTAL: ₹${finalTotal}*\n`;
    text += `*STATUS: ${status}*\n`;
    text += `━━━━━━━━━━━━━━━━━━\n\n`;
    text +=
      `Thank you for visiting *Foodies Town*! ❤️`;

    return encodeURIComponent(text);
  }

  async function saveBill() {
    setMessage("");

    if (selectedItems.length === 0) {
      setMessageType("error");
      setMessage(
        "Please select at least one food item."
      );
      return;
    }

    if (
      orderType === "Dine In" &&
      !tableNumber.trim()
    ) {
      setMessageType("error");
      setMessage(
        "Please enter table number."
      );
      return;
    }

    if (
      customerMobile.trim() &&
      customerMobile.trim().length !==
        10
    ) {
      setMessageType("error");
      setMessage(
        "Please enter a valid 10 digit mobile number."
      );
      return;
    }

    if (Number(discount) < 0) {
      setMessageType("error");
      setMessage(
        "Discount cannot be negative."
      );
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
      const { data: lastBill } =
        await supabase
          .from("bills")
          .select("bill_number")
          .order(
            "bill_number",
            {
              ascending: false,
            }
          )
          .limit(1)
          .maybeSingle();

      const nextBillNumber =
        lastBill?.bill_number
          ? Number(
              lastBill.bill_number
            ) + 1
          : 1;

      const finalCustomerName =
        customerName.trim() ||
        "Walk-in Customer";

      if (customerMobile.trim()) {
        const {
          data: existingCustomer,
        } = await supabase
          .from("customers")
          .select("id")
          .eq(
            "mobile",
            customerMobile.trim()
          )
          .maybeSingle();

        if (!existingCustomer) {
          await supabase
            .from("customers")
            .insert({
              name: finalCustomerName,
              mobile:
                customerMobile.trim(),
            });
        }
      }

      const { data: billData, error } =
        await supabase
          .from("bills")
          .insert({
            bill_number:
              nextBillNumber,
            customer_name:
              finalCustomerName,
            customer_mobile:
              customerMobile.trim() ||
              null,
            order_type: orderType,
            table_number:
              orderType === "Dine In"
                ? tableNumber.trim() ||
                  null
                : null,
            grand_total: total,
            discount:
              discountAmount,
            payment_method:
              paymentMethod,
            status: "paid",
          })
          .select()
          .single();

      if (error) {
        throw new Error(
          error.message
        );
      }

      const billItems =
        selectedItems.map((item) => ({
          bill_id: billData.id,
          item_name: item.name,
          quantity: item.quantity,
          price: item.price,
          total:
            item.price *
            item.quantity,
        }));

      const { error: itemError } =
        await supabase
          .from("bill_items")
          .insert(billItems);

      if (itemError) {
        throw new Error(
          itemError.message
        );
      }

      const whatsappMessage =
        createWhatsAppMessage(
          nextBillNumber,
          selectedItems,
          total,
          discountAmount,
          finalCustomerName,
          customerMobile,
          orderType,
          tableNumber,
          paymentMethod,
          "PAID"
        );

      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`,
        "_blank"
      );

      setMessageType("success");
      setMessage(
        `Bill #${nextBillNumber} saved successfully!`
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
    } catch (error) {
      console.error(error);

      setMessageType("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  function shareCurrentBill() {
    if (
      selectedItems.length === 0
    ) {
      setMessageType("error");
      setMessage(
        "Please select items first."
      );
      return;
    }

    const text =
      createWhatsAppMessage(
        0,
        selectedItems,
        total,
        discountAmount,
        customerName,
        customerMobile,
        orderType,
        tableNumber,
        paymentMethod,
        "PAID"
      );

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`,
      "_blank"
    );
  }

  async function viewBill(
    bill: Bill
  ) {
    const billItems =
      await getBillItems(
        bill.id
      );

    setSelectedBill(bill);
    setSelectedBillItems(
      billItems
    );

    setPendingDiscount(
      String(bill.discount || 0)
    );

    setPendingPaymentMethod(
      bill.payment_method ||
        "Cash"
    );

    setShowBillModal(true);
  }

  function formatDate(
    dateString: string
  ) {
    return new Date(
      dateString
    ).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const pendingSubtotal =
    calculateBillSubtotal(
      selectedBillItems
    );

  const pendingDiscountNumber =
    Math.min(
      Math.max(
        Number(
          pendingDiscount
        ) || 0,
        0
      ),
      pendingSubtotal
    );

  const pendingFinalTotal =
    Math.max(
      0,
      pendingSubtotal -
        pendingDiscountNumber
    );

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

          <div className="rounded-full bg-green-600 px-4 py-2 text-sm font-semibold">
            ● POS Online
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6">

        {/* PENDING ORDERS */}
        <section className="mb-8">

          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black">
                🔔 Pending Orders
              </h2>

              <p className="text-sm text-slate-500">
                Customer page वरून आलेल्या नवीन orders
              </p>
            </div>

            <button
              onClick={loadPendingOrders}
              className="rounded-xl border bg-white px-4 py-2 text-sm font-bold shadow-sm"
            >
              ↻ Refresh
            </button>
          </div>

          {loadingPending ? (
            <div className="rounded-2xl bg-white p-8 text-center text-slate-500 shadow-sm">
              Loading pending orders...
            </div>
          ) : pendingOrders.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-white p-10 text-center">
              <div className="text-5xl">
                🛎️
              </div>

              <p className="mt-3 font-bold text-slate-700">
                No Pending Orders
              </p>

              <p className="text-sm text-slate-500">
                नवीन customer order आली की इथे दिसेल.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

              {pendingOrders.map(
                (order) => (
                  <PendingOrderCard
                    key={order.id}
                    order={order}
                    formatDate={
                      formatDate
                    }
                    onView={() =>
                      viewPendingOrder(
                        order
                      )
                    }
                    onAccept={() =>
                      viewPendingOrder(
                        order
                      )
                    }
                    onReject={() =>
                      rejectOrder(
                        order
                      )
                    }
                  />
                )
              )}

            </div>
          )}

        </section>

        {/* MESSAGE */}
        {message && (
          <div
            className={`mb-5 rounded-xl border px-4 py-3 font-medium ${
              messageType ===
              "success"
                ? "border-green-200 bg-green-50 text-green-700"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        {/* DASHBOARD */}
        <section className="mb-6">

          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black">
                Dashboard
              </h2>

              <p className="text-sm text-slate-500">
                Today's restaurant performance
              </p>
            </div>

            <button
              onClick={() => {
                loadDashboard();
                loadBills();
                loadPendingOrders();
              }}
              className="rounded-xl border bg-white px-4 py-2 text-sm font-bold"
            >
              ↻ Refresh
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <DashboardCard
              title="Today's Sales"
              value={
                dashboardLoading
                  ? "..."
                  : `₹${dashboard.todaySales.toFixed(
                      0
                    )}`
              }
              className="text-orange-600"
            />

            <DashboardCard
              title="Today's Bills"
              value={
                dashboardLoading
                  ? "..."
                  : String(
                      dashboard.todayBills
                    )
              }
            />

            <DashboardCard
              title="Today's Customers"
              value={
                dashboardLoading
                  ? "..."
                  : String(
                      dashboard.todayCustomers
                    )
              }
            />

            <DashboardCard
              title="Average Bill"
              value={
                dashboard.todayBills >
                0
                  ? `₹${(
                      dashboard.todaySales /
                      dashboard.todayBills
                    ).toFixed(0)}`
                  : "₹0"
              }
              className="text-blue-600"
            />

          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">

            <DashboardCard
              title="💵 Cash Sales"
              value={`₹${dashboard.cash.toFixed(
                0
              )}`}
            />

            <DashboardCard
              title="📱 UPI Sales"
              value={`₹${dashboard.upi.toFixed(
                0
              )}`}
            />

            <DashboardCard
              title="💳 Card Sales"
              value={`₹${dashboard.card.toFixed(
                0
              )}`}
            />

          </div>
        </section>

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

            <div className="grid gap-4 md:grid-cols-2">

              <Input
                label="Customer Name"
                value={customerName}
                onChange={
                  setCustomerName
                }
                placeholder="Enter customer name"
              />

              <Input
                label="Customer Mobile"
                value={
                  customerMobile
                }
                onChange={(value) =>
                  setCustomerMobile(
                    value
                      .replace(
                        /\D/g,
                        ""
                      )
                      .slice(
                        0,
                        10
                      )
                  )
                }
                placeholder="10 digit mobile number"
              />

              <div>
                <label className="mb-1 block text-sm font-semibold">
                  Order Type
                </label>

                <div className="grid grid-cols-2 gap-2">

                  {[
                    "Dine In",
                    "Take Away",
                  ].map(
                    (type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() =>
                          setOrderType(
                            type
                          )
                        }
                        className={`rounded-xl border px-4 py-3 font-semibold ${
                          orderType ===
                          type
                            ? "border-orange-500 bg-orange-500 text-white"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {type ===
                        "Dine In"
                          ? "🍽️"
                          : "🥡"}{" "}
                        {type}
                      </button>
                    )
                  )}

                </div>
              </div>

              <Input
                label="Table Number"
                value={
                  tableNumber
                }
                onChange={
                  setTableNumber
                }
                placeholder={
                  orderType ===
                  "Dine In"
                    ? "Example: 1"
                    : "Not required"
                }
                disabled={
                  orderType !==
                  "Dine In"
                }
              />

              <div className="md:col-span-2">

                <label className="mb-2 block text-sm font-semibold">
                  Payment Method
                </label>

                <div className="grid grid-cols-3 gap-2">

                  {[
                    "Cash",
                    "UPI",
                    "Card",
                  ].map(
                    (method) => (
                      <button
                        key={
                          method
                        }
                        type="button"
                        onClick={() =>
                          setPaymentMethod(
                            method
                          )
                        }
                        className={`rounded-xl border px-4 py-3 font-bold ${
                          paymentMethod ===
                          method
                            ? "border-green-500 bg-green-500 text-white"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {method ===
                        "Cash"
                          ? "💵"
                          : method ===
                            "UPI"
                          ? "📱"
                          : "💳"}{" "}
                        {method}
                      </button>
                    )
                  )}

                </div>
              </div>

              <div className="md:col-span-2">

                <label className="mb-1 block text-sm font-semibold">
                  💸 Discount Amount
                </label>

                <input
                  value={
                    discount
                  }
                  onChange={(e) =>
                    setDiscount(
                      e.target.value.replace(
                        /[^\d.]/g,
                        ""
                      )
                    )
                  }
                  placeholder="Enter discount amount"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
                />

                <p className="mt-1 text-xs text-slate-500">
                  Maximum discount: ₹
                  {subtotal}
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
                  onClick={
                    resetItems
                  }
                  className="text-sm font-semibold text-red-600"
                >
                  Clear Items
                </button>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">

                {items.map(
                  (item) => (
                    <div
                      key={
                        item.id
                      }
                      className={`flex items-center justify-between rounded-xl border p-4 ${
                        item.quantity >
                        0
                          ? "border-orange-400 bg-orange-50"
                          : "border-slate-200 bg-white"
                      }`}
                    >

                      <div className="min-w-0 pr-3">
                        <p className="font-bold">
                          {
                            item.name
                          }
                        </p>

                        <p className="text-sm text-slate-500">
                          ₹
                          {
                            item.price
                          }
                        </p>
                      </div>

                      <div className="flex shrink-0 items-center gap-2">

                        <button
                          onClick={() =>
                            decreaseItem(
                              item.id
                            )
                          }
                          className="h-9 w-9 rounded-lg bg-slate-200 text-lg font-bold"
                        >
                          −
                        </button>

                        <span className="w-6 text-center font-bold">
                          {
                            item.quantity
                          }
                        </span>

                        <button
                          onClick={() =>
                            increaseItem(
                              item.id
                            )
                          }
                          className="h-9 w-9 rounded-lg bg-orange-500 text-lg font-bold text-white"
                        >
                          +
                        </button>

                      </div>
                    </div>
                  )
                )}

              </div>
            </div>

          </section>

          {/* BILL SUMMARY */}
          <aside className="h-fit rounded-2xl bg-white p-5 shadow-sm lg:sticky lg:top-24">

            <h2 className="text-xl font-bold">
              Bill Summary
            </h2>

            <p className="text-sm text-slate-500">
              Review before saving
            </p>

            <div className="mt-5 space-y-3">

              {selectedItems.length ===
              0 ? (
                <div className="rounded-xl bg-slate-50 p-8 text-center text-slate-500">
                  <div className="text-4xl">
                    🛒
                  </div>

                  <p className="mt-2">
                    No items selected
                  </p>
                </div>
              ) : (
                selectedItems.map(
                  (item) => (
                    <div
                      key={
                        item.id
                      }
                      className="flex justify-between border-b pb-3"
                    >
                      <div>
                        <p className="font-semibold">
                          {
                            item.name
                          }
                        </p>

                        <p className="text-xs text-slate-500">
                          {
                            item.quantity
                          }{" "}
                          × ₹
                          {
                            item.price
                          }
                        </p>
                      </div>

                      <p className="font-bold">
                        ₹
                        {item.quantity *
                          item.price}
                      </p>
                    </div>
                  )
                )
              )}

            </div>

            <div className="my-5 border-t pt-5">

              <div className="flex justify-between">
                <span>
                  Subtotal
                </span>

                <b>
                  ₹{subtotal}
                </b>
              </div>

              <div className="mt-2 flex justify-between text-green-600">
                <span>
                  Discount
                </span>

                <b>
                  -₹
                  {
                    discountAmount
                  }
                </b>
              </div>

              <div className="mt-4 flex justify-between border-t pt-4">
                <span className="font-semibold">
                  Grand Total
                </span>

                <span className="text-3xl font-black text-orange-600">
                  ₹{total}
                </span>
              </div>

            </div>

            <button
              onClick={
                saveBill
              }
              disabled={
                loading ||
                selectedItems.length ===
                  0
              }
              className="w-full rounded-xl bg-orange-500 px-5 py-4 text-lg font-bold text-white disabled:opacity-50"
            >
              {loading
                ? "Saving Bill..."
                : "💾 Save Bill & WhatsApp"}
            </button>

            <button
              onClick={
                shareCurrentBill
              }
              disabled={
                selectedItems.length ===
                0
              }
              className="mt-3 w-full rounded-xl bg-green-600 px-5 py-3 font-bold text-white disabled:opacity-50"
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
                View previous paid bills
              </p>
            </div>

            <div className="flex gap-2">

              <input
                value={
                  search
                }
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                placeholder="Search bill/customer/mobile"
                className="w-full rounded-xl border px-4 py-2 md:w-auto"
              />

              <button
                onClick={() => {
                  loadBills();
                  loadDashboard();
                }}
                className="rounded-xl border px-4 py-2 font-bold"
              >
                ↻
              </button>

            </div>
          </div>

          {loadingBills ? (
            <div className="py-8 text-center">
              Loading bills...
            </div>
          ) : filteredBills.length ===
            0 ? (
            <div className="rounded-xl bg-slate-50 py-8 text-center text-slate-500">
              No bills found
            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full min-w-[1100px] text-left">

                <thead>
                  <tr className="border-b bg-slate-50">

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
                      Status
                    </th>

                    <th className="px-4 py-3">
                      Action
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {filteredBills.map(
                    (bill) => (
                      <tr
                        key={
                          bill.id
                        }
                        className="border-b hover:bg-slate-50"
                      >

                        <td className="px-4 py-3 font-bold">
                          #
                          {
                            bill.bill_number
                          }
                        </td>

                        <td className="px-4 py-3 text-sm">
                          {formatDate(
                            bill.created_at
                          )}
                        </td>

                        <td className="px-4 py-3">
                          {
                            bill.customer_name
                          }
                        </td>

                        <td className="px-4 py-3">
                          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                            {
                              bill.order_type
                            }
                          </span>
                        </td>

                        <td className="px-4 py-3">
                          {
                            bill.payment_method ||
                            "-"
                          }
                        </td>

                        <td className="px-4 py-3 font-semibold text-green-600">
                          -₹
                          {
                            bill.discount ||
                            0
                          }
                        </td>

                        <td className="px-4 py-3 font-black">
                          ₹
                          {
                            bill.grand_total
                          }
                        </td>

                        <td className="px-4 py-3">

                          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                            {(
                              bill.status ||
                              "paid"
                            ).toUpperCase()}
                          </span>

                        </td>

                        <td className="px-4 py-3">

                          <button
                            onClick={() =>
                              viewBill(
                                bill
                              )
                            }
                            className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-bold text-white"
                          >
                            View
                          </button>

                        </td>

                      </tr>
                    )
                  )}

                </tbody>
              </table>
            </div>
          )}
        </section>

        <footer className="py-8 text-center text-sm text-slate-500">
          ©{" "}
          {new Date().getFullYear()}{" "}
          Foodies Town • Restaurant POS
        </footer>
      </div>

      {/* BILL / PENDING MODAL */}
      {showBillModal &&
        selectedBill && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">

            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white">

              {/* MODAL HEADER */}
              <div className="flex items-center justify-between border-b p-5">

                <div>
                  <h2 className="text-xl font-black">
                    Foodies Town
                  </h2>

                  <p className="text-sm text-slate-500">
                    Order #
                    {
                      selectedBill.bill_number
                    }
                  </p>
                </div>

                <button
                  onClick={() =>
                    setShowBillModal(
                      false
                    )
                  }
                  className="rounded-lg bg-slate-100 px-3 py-2 font-bold"
                >
                  ✕
                </button>

              </div>

              <div className="p-5">

                {/* CUSTOMER INFO */}
                <div className="grid gap-3 rounded-xl bg-slate-50 p-4 sm:grid-cols-2">

                  <p>
                    <b>
                      Customer:
                    </b>{" "}
                    {
                      selectedBill.customer_name
                    }
                  </p>

                  <p>
                    <b>
                      Mobile:
                    </b>{" "}
                    {
                      selectedBill.customer_mobile ||
                      "-"
                    }
                  </p>

                  <p>
                    <b>
                      Order:
                    </b>{" "}
                    {
                      selectedBill.order_type
                    }
                  </p>

                  <p>
                    <b>
                      Table:
                    </b>{" "}
                    {
                      selectedBill.table_number ||
                      "-"
                    }
                  </p>

                  <p>
                    <b>
                      Status:
                    </b>{" "}
                    <span
                      className={
                        selectedBill.status ===
                        "pending"
                          ? "font-bold text-orange-600"
                          : "font-bold text-green-600"
                      }
                    >
                      {(
                        selectedBill.status ||
                        ""
                      ).toUpperCase()}
                    </span>
                  </p>

                  <p>
                    <b>
                      Payment:
                    </b>{" "}
                    {
                      selectedBill.payment_method ||
                      "-"
                    }
                  </p>

                </div>

                {/* ITEMS */}
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
                        (
                          item,
                          index
                        ) => (
                          <tr
                            key={
                              item.id ??
                              index
                            }
                            className="border-b"
                          >

                            <td className="px-2 py-3 font-semibold">
                              {
                                item.item_name
                              }
                            </td>

                            <td className="px-2 py-3">
                              {
                                item.quantity
                              }
                            </td>

                            <td className="px-2 py-3">
                              ₹
                              {
                                item.price
                              }
                            </td>

                            <td className="px-2 py-3 font-bold">
                              ₹
                              {
                                item.total
                              }
                            </td>

                          </tr>
                        )
                      )}

                    </tbody>

                  </table>
                </div>

                {/* PENDING EDIT SECTION */}
                {selectedBill.status ===
                  "pending" && (
                  <div className="mt-6 rounded-2xl border-2 border-orange-200 bg-orange-50 p-4">

                    <h3 className="text-lg font-black text-orange-800">
                      💸 Order Payment / Discount
                    </h3>

                    <p className="mt-1 text-sm text-orange-700">
                      Customer ला bill देण्याआधी discount आणि payment method check करा.
                    </p>

                    {/* DISCOUNT */}
                    <div className="mt-4">

                      <label className="mb-1 block text-sm font-bold">
                        Discount Amount
                      </label>

                      <input
                        value={
                          pendingDiscount
                        }
                        onChange={(e) =>
                          setPendingDiscount(
                            e.target.value.replace(
                              /[^\d.]/g,
                              ""
                            )
                          )
                        }
                        className="w-full rounded-xl border border-orange-300 bg-white px-4 py-3 font-bold outline-none focus:border-orange-500"
                        placeholder="Enter discount"
                      />

                      <p className="mt-1 text-xs text-slate-500">
                        Subtotal: ₹
                        {
                          pendingSubtotal
                        }
                      </p>

                    </div>

                    {/* PAYMENT */}
                    <div className="mt-4">

                      <label className="mb-2 block text-sm font-bold">
                        Payment Method
                      </label>

                      <div className="grid grid-cols-3 gap-2">

                        {[
                          "Cash",
                          "UPI",
                          "Card",
                        ].map(
                          (method) => (
                            <button
                              key={
                                method
                              }
                              type="button"
                              onClick={() =>
                                setPendingPaymentMethod(
                                  method
                                )
                              }
                              className={`rounded-xl border px-3 py-3 font-bold ${
                                pendingPaymentMethod ===
                                method
                                  ? "border-green-500 bg-green-500 text-white"
                                  : "border-slate-300 bg-white"
                              }`}
                            >
                              {method ===
                              "Cash"
                                ? "💵"
                                : method ===
                                  "UPI"
                                ? "📱"
                                : "💳"}{" "}
                              {method}
                            </button>
                          )
                        )}

                      </div>
                    </div>

                    {/* TOTAL */}
                    <div className="mt-5 rounded-xl bg-white p-4">

                      <div className="flex justify-between">
                        <span>
                          Subtotal
                        </span>

                        <b>
                          ₹
                          {
                            pendingSubtotal
                          }
                        </b>
                      </div>

                      <div className="mt-2 flex justify-between text-green-600">
                        <span>
                          Discount
                        </span>

                        <b>
                          -₹
                          {
                            pendingDiscountNumber
                          }
                        </b>
                      </div>

                      <div className="mt-3 flex justify-between border-t pt-3">

                        <span className="font-bold">
                          GRAND TOTAL
                        </span>

                        <span className="text-2xl font-black text-orange-600">
                          ₹
                          {
                            pendingFinalTotal
                          }
                        </span>

                      </div>

                    </div>

                    {/* SAVE DISCOUNT */}
                    <button
                      onClick={() =>
                        updatePendingDiscount()
                      }
                      disabled={
                        updatingPending
                      }
                      className="mt-4 w-full rounded-xl border-2 border-orange-500 bg-white px-4 py-3 font-black text-orange-600 disabled:opacity-50"
                    >
                      {updatingPending
                        ? "Updating..."
                        : "💾 Update Discount & Total"}
                    </button>

                    {/* ACCEPT = PAID */}
                    <button
                      onClick={() =>
                        acceptOrder(
                          selectedBill,
                          pendingDiscountNumber,
                          pendingPaymentMethod
                        )
                      }
                      disabled={
                        updatingPending
                      }
                      className="mt-3 w-full rounded-xl bg-green-600 px-5 py-4 text-lg font-black text-white disabled:opacity-50"
                    >
                      {updatingPending
                        ? "Processing..."
                        : `✅ Give Bill & Mark PAID — ₹${pendingFinalTotal}`}
                    </button>

                    <button
                      onClick={() =>
                        rejectOrder(
                          selectedBill
                        )
                      }
                      disabled={
                        updatingPending
                      }
                      className="mt-3 w-full rounded-xl bg-red-600 px-5 py-3 font-bold text-white disabled:opacity-50"
                    >
                      ❌ Reject Order
                    </button>

                  </div>
                )}

                {/* NORMAL PAID BILL */}
                {selectedBill.status !==
                  "pending" && (
                  <div className="mt-5 border-t pt-5">

                    <div className="flex justify-between">

                      <span>
                        Discount
                      </span>

                      <span className="font-bold text-green-600">
                        -₹
                        {
                          selectedBill.discount ||
                          0
                        }
                      </span>

                    </div>

                    <div className="mt-3 flex justify-between">

                      <span className="font-semibold">
                        Grand Total
                      </span>

                      <span className="text-2xl font-black text-orange-600">
                        ₹
                        {
                          selectedBill.grand_total
                        }
                      </span>

                    </div>

                    <div className="mt-4 rounded-xl bg-green-50 p-4 text-center font-black text-green-700">
                      ✅ PAID
                    </div>

                  </div>
                )}

              </div>
            </div>
          </div>
        )}
    </main>
  );
}

/* =========================
   DASHBOARD CARD
========================= */

function DashboardCard({
  title,
  value,
  className = "",
}: {
  title: string;
  value: string;
  className?: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold text-slate-500">
        {title}
      </p>

      <p
        className={`mt-2 text-3xl font-black ${className}`}
      >
        {value}
      </p>
    </div>
  );
}

/* =========================
   INPUT
========================= */

function Input({
  label,
  value,
  onChange,
  placeholder,
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-semibold">
        {label}
      </label>

      <input
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        disabled={disabled}
        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500 disabled:bg-slate-100"
      />
    </div>
  );
}

/* =========================
   PENDING ORDER CARD
========================= */

function PendingOrderCard({
  order,
  formatDate,
  onView,
  onAccept,
  onReject,
}: {
  order: Bill;
  formatDate: (
    date: string
  ) => string;
  onView: () => void;
  onAccept: () => void;
  onReject: () => void;
}) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">

      <div className="flex items-start justify-between">

        <div>
          <p className="text-lg font-black">
            Order #
            {order.bill_number}
          </p>

          <p className="text-xs text-slate-500">
            {formatDate(
              order.created_at
            )}
          </p>
        </div>

        <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700">
          PENDING
        </span>

      </div>

      <div className="mt-4 space-y-2 text-sm">

        <p>
          👤{" "}
          <b>
            {order.customer_name}
          </b>
        </p>

        {order.customer_mobile && (
          <p>
            📱{" "}
            {order.customer_mobile}
          </p>
        )}

        <p>
          {order.order_type ===
          "Dine In"
            ? "🍽️"
            : "🥡"}{" "}
          {order.order_type}
        </p>

        {order.table_number && (
          <p>
            🪑 Table{" "}
            {
              order.table_number
            }
          </p>
        )}

      </div>

      <div className="mt-4 border-t pt-4">

        <div className="flex items-center justify-between">

          <div>
            <span className="text-sm font-semibold">
              Total
            </span>

            {Number(
              order.discount || 0
            ) > 0 && (
              <p className="text-xs font-semibold text-green-600">
                Discount: -₹
                {
                  order.discount
                }
              </p>
            )}
          </div>

          <span className="text-2xl font-black text-orange-600">
            ₹
            {
              order.grand_total
            }
          </span>

        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">

        <button
          onClick={onView}
          className="rounded-xl bg-slate-900 px-2 py-3 text-sm font-bold text-white"
        >
          👁 View
        </button>

        <button
          onClick={onAccept}
          className="rounded-xl bg-green-600 px-2 py-3 text-sm font-bold text-white"
        >
          💳 Bill
        </button>

        <button
          onClick={onReject}
          className="rounded-xl bg-red-600 px-2 py-3 text-sm font-bold text-white"
        >
          ✕ Reject
        </button>

      </div>
    </div>
  );
}