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

/* =========================================================
MENU
========================================================= */

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

const categories = [
  {
    key: "All",
    label: "सर्व / All",
    icon: "🍽️",
  },
  {
    key: "Breakfast",
    label: "नाश्ता",
    icon: "🌅", 
  },
  {
    key: "Veg",
    label: "शाकाहारी",
    icon: "🥗",
  },
  {
    key: "Non-Veg",
    label: "नॉन-व्हेज",
    icon: "🍗",
  },
  {
    key: "Fish",
    label: "मासे",
    icon: "🐟",
  },
  {
    key: "Thali",
    label: "थाळी",
    icon: "🍛",
  },
  {
    key: "Specials",
    label: "स्पेशल",
    icon: "⭐",
  },
  {
    key: "Extras",
    label: "अॅड-ऑन्स",
    icon: "➕",
  },
];

/* =========================================================
PAGE
========================================================= */

export default function OrderPage() {
  const [mounted, setMounted] = useState(false);
  const [timeText, setTimeText] = useState("");
  const [dateText, setDateText] = useState("");

  const [customerName, setCustomerName] = useState("");
  const [customerMobile, setCustomerMobile] = useState("");

  const [orderType, setOrderType] = useState("Dine In");

  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const [discount, setDiscount] = useState("");

  const [items, setItems] = useState<FoodItem[]>(
    initialItems.map((item) => ({
      ...item,
    }))
  );

  const [activeCategory, setActiveCategory] = useState("All");

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [messageType, setMessageType] = useState<
    "success" | "error"
  >("success");

  /* =========================================================
  HYDRATION SAFE CLOCK
  ========================================================= */

  useEffect(() => {
    setMounted(true);

    const updateClock = () => {
      const now = new Date();

      setTimeText(
        now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );

      setDateText(
        now.toLocaleDateString("en-IN", {
          weekday: "long",
          day: "2-digit",
          month: "long",
          year: "numeric",
        })
      );
    };

    updateClock();

    const timer = window.setInterval(updateClock, 1000);

    return () => window.clearInterval(timer);
  }, []);

  /* =========================================================
  ITEMS
  ========================================================= */

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
    setItems(
      initialItems.map((item) => ({
        ...item,
      }))
    );
  }

  /* =========================================================
  CALCULATIONS
  ========================================================= */

  const selectedItems = items.filter(
    (item) => item.quantity > 0
  );

  const subtotal = selectedItems.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
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

  /* =========================================================
  SEARCH
  ========================================================= */

  const filteredFoodItems = useMemo(() => {
    const query = search.trim().toLowerCase();

    return items.filter((item) => {
      const categoryMatch =
        activeCategory === "All" ||
        item.category === activeCategory;

      const searchMatch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);

      return categoryMatch && searchMatch;
    });
  }, [items, activeCategory, search]);

  /* =========================================================
  WHATSAPP MESSAGE
  ========================================================= */

  function createWhatsAppMessage() {
    let text = `*FOODIES TOWN*\n`;

    text += `🌴 Pure Athentic Taste 🌴\n`;

    text += `====================\n`;

    text += `*ORDER DETAILS*\n`;

    text += `====================\n\n`;

    text += `*Customer:* ${
      customerName.trim() || "Walk-in Customer"
    }\n`;

    if (customerMobile.trim()) {
      text += `*Mobile:* ${customerMobile.trim()}\n`;
    }

    text += `*Order:* ${orderType}\n`;

    text += `*Payment:* ${paymentMethod}\n\n`;

    selectedItems.forEach((item) => {
      const itemTotal =
        item.price * item.quantity;

      text += `${item.name}\n`;

      text += `${item.quantity} x Rs.${item.price} = *Rs.${itemTotal}*\n\n`;
    });

    text += `====================\n`;

    text += `*SUBTOTAL: Rs.${subtotal}*\n`;

    if (discountAmount > 0) {
      text += `*DISCOUNT: -Rs.${discountAmount}*\n`;
    }

    text += `*GRAND TOTAL: Rs.${total}*\n`;

    text += `====================\n\n`;

    text += `🙏 Thank you for visiting *Foodies Town*!\n`;

    text += `❤️ Pure Athentic Taste • Authentic Konkan Taste • Family Service`;

    return encodeURIComponent(text);
  }

  /* =========================================================
  SAVE BILL
  ========================================================= */

  async function saveBill() {
    setMessage("");

    if (selectedItems.length === 0) {
      setMessageType("error");

      setMessage(
        "किमान एक dish select करा / Please select at least one food item."
      );

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
      /* Get next bill number */

      const {
        data: lastBill,
        error: lastBillError,
      } = await supabase
        .from("bills")
        .select("bill_number")
        .order("bill_number", {
          ascending: false,
        })
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

      /* Save customer */

      if (customerMobile.trim()) {
        const {
          data: existingCustomer,
        } = await supabase
          .from("customers")
          .select("id")
          .eq("mobile", customerMobile.trim())
          .maybeSingle();

        if (!existingCustomer) {
          const {
            error: customerError,
          } = await supabase
            .from("customers")
            .insert({
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

      /* Save bill */

      const {
        data: billData,
        error: billError,
      } = await supabase
        .from("bills")
        .insert({
          bill_number: nextBillNumber,
          customer_name: finalCustomerName,
          customer_mobile:
            customerMobile.trim() || null,
          order_type: orderType,
          table_number: null,
          grand_total: total,
          discount: discountAmount,
          payment_method: paymentMethod,
        })
        .select()
        .single();

      if (billError) {
        throw new Error(billError.message);
      }

      /* Save bill items */

      const billItems = selectedItems.map((item) => ({
        bill_id: billData.id,
        item_name: item.name,
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity,
      }));

      const {
        error: itemError,
      } = await supabase
        .from("bill_items")
        .insert(billItems);

      if (itemError) {
        throw new Error(itemError.message);
      }

      /* WhatsApp */

      const whatsappMessage =
        createWhatsAppMessage();

      const whatsappUrl =
        `https://wa.me/${WHATSAPP_NUMBER}` +
        `?text=${whatsappMessage}`;

      window.open(
        whatsappUrl,
        "_blank"
      );

      setMessageType("success");

      setMessage(
        `Order #${nextBillNumber} confirmed successfully! ❤️`
      );

      /* Reset */

      setCustomerName("");
      setCustomerMobile("");
      setOrderType("Dine In");
      setPaymentMethod("Cash");
      setDiscount("");

      resetItems();
    } catch (error: unknown) {
      console.error(error);

      setMessageType("error");

      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage(
          "Something went wrong while saving order."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  /* =========================================================
  SHARE CURRENT ORDER
  ========================================================= */

  function shareCurrentOrder() {
    if (selectedItems.length === 0) {
      setMessageType("error");

      setMessage(
        "Please select items first."
      );

      return;
    }

    const text = createWhatsAppMessage();

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`,
      "_blank"
    );
  }

  /* =========================================================
  PAGE
  ========================================================= */

  return (
    <main className="min-h-screen bg-[#fffaf0] text-[#3d281b]">

      <style jsx>{`
        @keyframes royalGlow {
          0%,
          100% {
            box-shadow: 0 0 0
              rgba(212, 175, 55, 0);
          }

          50% {
            box-shadow: 0 0 28px
              rgba(212, 175, 55, 0.18);
          }
        }

        @keyframes floatSlow {
          0%,
          100% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-7px);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -500px 0;
          }

          100% {
            background-position: 500px 0;
          }
        }

        .royal-card {
          animation:
            royalGlow 5s ease-in-out infinite;
        }

        .floating {
          animation:
            floatSlow 4s ease-in-out infinite;
        }

        .gold-shimmer {
          background-image: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.16) 50%,
            rgba(255, 255, 255, 0) 100%
          );

          background-size: 500px 100%;

          animation:
            shimmer 6s linear infinite;
        }
      `}</style>

      {/* =====================================================
      HEADER
      ===================================================== */}

      <header className="sticky top-0 z-50 overflow-hidden border-b border-[#d4af37]/60 bg-[#4a0909] text-white shadow-2xl">

        <div className="gold-shimmer pointer-events-none absolute inset-0" />

        <div className="relative mx-auto max-w-6xl px-4 py-3">

          <div className="flex items-center justify-between gap-3">

            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#d4af37] bg-[#691010] text-2xl shadow-lg">
                🪔
              </div>

              <div>

                <h1 className="text-xl font-black tracking-wide sm:text-3xl">
                  🍴 FOODIES TOWN
                </h1>

                <p className="text-xs font-semibold text-[#f7d98a] sm:text-sm">
                  अस्सल कोकणी चव • Authentic Konkan Taste
                </p>

              </div>

            </div>

            <div className="text-right">

              {mounted ? (
                <>
                  <div className="text-sm font-black text-[#f7d98a] sm:text-lg">
                    🕐{" "}
                    {timeText}
                  </div>

                  <div className="hidden text-xs text-orange-100 sm:block">
                    📅{" "}
                    {dateText}
                  </div>
                </>
              ) : (
                <div className="text-sm font-black text-[#f7d98a]">
                  🕐 --:--:--
                </div>
              )}

              <div className="mt-1 inline-flex rounded-full border border-green-300/50 bg-green-600/20 px-2 py-1 text-[10px] font-black text-green-200">
                ● ONLINE
              </div>

            </div>

          </div>

        </div>

      </header>

      {/* =====================================================
      KONKAN STRIP
      ===================================================== */}

      <div className="border-b border-[#d4af37]/40 bg-[#7a1515] px-4 py-2 text-center text-xs font-bold text-[#ffe7a3] sm:text-sm">

        🌴 🥥 🌺 🐟 🪔

        <span className="mx-2">
          कोकणची माती • घरची चव • आपुलकीची सेवा
        </span>

        🪔 🐟 🌺 🥥 🌴

      </div>

      <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">

        {/* =====================================================
        WELCOME
        ===================================================== */}

        <section className="royal-card relative mb-6 overflow-hidden rounded-[2rem] border border-[#d4af37]/50 bg-gradient-to-br from-[#fff8df] via-[#fffdf5] to-[#f0dfb7] p-5 shadow-xl sm:p-7">

          <div className="pointer-events-none absolute -right-8 -top-8 text-8xl opacity-10">
            🌴
          </div>

          <div className="pointer-events-none absolute -bottom-8 -left-8 text-8xl opacity-10">
            🥥
          </div>

          <div className="relative flex flex-col items-center justify-between gap-5 md:flex-row">

            <div className="text-center md:text-left">

              <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-[#8b1e1e] sm:text-sm">
                🙏 नमस्कार / Welcome
              </p>

              <h2 className="text-2xl font-black leading-tight text-[#4a0909] sm:text-4xl">
                स्वादिष्ट जेवणासाठी
                <br className="hidden sm:block" />
                आपले मनःपूर्वक स्वागत!
              </h2>

              <p className="mt-3 text-sm font-medium text-[#70533b]">
                Fresh food • Family taste • Konkan tradition
              </p>

              <div className="mt-4 flex flex-wrap justify-center gap-2 md:justify-start">

                <span className="rounded-full bg-[#8b1e1e] px-4 py-2 text-xs font-bold text-white">
                  🌴 Konkan
                </span>

                <span className="rounded-full bg-[#d4af37] px-4 py-2 text-xs font-bold text-[#4a0909]">
                  👑 Royal Taste
                </span>

                <span className="rounded-full bg-[#1f6b45] px-4 py-2 text-xs font-bold text-white">
                  🌿 Traditional
                </span>

              </div>

            </div>

            <div className="floating text-6xl sm:text-8xl">
              🌴🍛🐟
            </div>

          </div>

        </section>

        {/* =====================================================
        MESSAGE
        ===================================================== */}

        {message && (
          <div
            className={`mb-5 rounded-2xl border px-4 py-4 font-bold shadow-sm ${
              messageType === "success"
                ? "border-green-200 bg-green-50 text-green-700"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        {/* =====================================================
        ORDER AREA
        ===================================================== */}

        <div className="grid gap-6 lg:grid-cols-3">

          {/* ===================================================
          MENU + CUSTOMER
          =================================================== */}

          <section className="rounded-[2rem] border border-[#d4af37]/30 bg-[#fffdf7] p-5 shadow-xl lg:col-span-2 sm:p-6">

            {/* CUSTOMER */}

            <div className="mb-7">

              <div className="mb-4">

                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8b1e1e]">
                  YOUR DETAILS
                </p>

                <h2 className="mt-1 text-2xl font-black text-[#4a0909]">
                  👤 ग्राहक माहिती
                </h2>

                <p className="text-sm text-[#80654d]">
                  Order complete करण्यासाठी basic माहिती भरा
                </p>

              </div>

              <div className="grid gap-4 md:grid-cols-2">

                <div>

                  <label className="mb-1 block text-sm font-black">
                    ग्राहकाचे नाव / Customer Name
                  </label>

                  <input
                    value={customerName}
                    onChange={(e) =>
                      setCustomerName(
                        e.target.value
                      )
                    }
                    placeholder="तुमचे नाव / Your Name"
                    className="w-full rounded-xl border-2 border-[#ead9b2] bg-[#fffaf0] px-4 py-3 outline-none transition focus:border-[#8b1e1e]"
                  />

                </div>

                <div>

                  <label className="mb-1 block text-sm font-black">
                    मोबाईल / Mobile Number
                  </label>

                  <input
                    value={customerMobile}
                    onChange={(e) =>
                      setCustomerMobile(
                        e.target.value
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
                    inputMode="numeric"
                    className="w-full rounded-xl border-2 border-[#ead9b2] bg-[#fffaf0] px-4 py-3 outline-none transition focus:border-[#8b1e1e]"
                  />

                </div>

              </div>

            </div>

            {/* ORDER TYPE */}

            <div className="mb-7">

              <label className="mb-2 block text-sm font-black">
                ऑर्डर प्रकार / Order Type
              </label>

              <div className="grid grid-cols-2 gap-3">

                <button
                  type="button"
                  onClick={() =>
                    setOrderType(
                      "Dine In"
                    )
                  }
                  className={`rounded-xl border-2 px-4 py-4 font-black transition ${
                    orderType ===
                    "Dine In"
                      ? "border-[#8b1e1e] bg-[#8b1e1e] text-white shadow-lg"
                      : "border-[#ead9b2] bg-white hover:bg-[#fff6df]"
                  }`}
                >
                  🍽️ Dine In

                  <span className="mt-1 block text-xs opacity-70">
                    रेस्टॉरंटमध्ये जेवण
                  </span>

                </button>

                <button
                  type="button"
                  onClick={() =>
                    setOrderType(
                      "Take Away"
                    )
                  }
                  className={`rounded-xl border-2 px-4 py-4 font-black transition ${
                    orderType ===
                    "Take Away"
                      ? "border-[#8b1e1e] bg-[#8b1e1e] text-white shadow-lg"
                      : "border-[#ead9b2] bg-white hover:bg-[#fff6df]"
                  }`}
                >
                  🥡 Take Away

                  <span className="mt-1 block text-xs opacity-70">
                    पार्सल / Takeaway
                  </span>

                </button>

              </div>

            </div>

            {/* MENU */}

            <div>

              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8b1e1e]">
                    FOOD MENU
                  </p>

                  <h3 className="mt-1 text-2xl font-black text-[#4a0909]">
                    🍛 Menu / मेनू
                  </h3>

                  <p className="text-sm text-[#80654d]">
                    तुमची आवडती dish निवडा
                  </p>

                </div>

                <button
                  type="button"
                  onClick={resetItems}
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-black text-red-600 hover:bg-red-100"
                >
                  🗑️ Clear All
                </button>

              </div>

              {/* CATEGORY */}

              <div className="mb-4 flex gap-2 overflow-x-auto pb-2">

                {categories.map(
                  (category) => (
                    <button
                      key={
                        category.key
                      }
                      type="button"
                      onClick={() =>
                        setActiveCategory(
                          category.key
                        )
                      }
                      className={`whitespace-nowrap rounded-full border-2 px-4 py-2 text-sm font-black transition ${
                        activeCategory ===
                        category.key
                          ? "border-[#8b1e1e] bg-[#8b1e1e] text-white shadow-md"
                          : "border-[#ead9b2] bg-white text-[#59432f] hover:bg-[#fff6df]"
                      }`}
                    >
                      {
                        category.icon
                      }{" "}
                      {
                        category.label
                      }
                    </button>
                  )
                )}

              </div>

              {/* SEARCH */}

              <div className="mb-5">

                <div className="relative">

                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg">
                    🔎
                  </span>

                  <input
                    value={search}
                    onChange={(e) =>
                      setSearch(
                        e.target.value
                      )
                    }
                    placeholder="Dish search करा / Search dish..."
                    className="w-full rounded-xl border-2 border-[#ead9b2] bg-[#fffaf0] px-4 py-3 pl-11 outline-none focus:border-[#1f6b45]"
                  />

                </div>

              </div>

              {/* FOOD GRID */}

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">

                {filteredFoodItems.map(
                  (item) => (
                    <div
                      key={
                        item.id
                      }
                      className={`relative overflow-hidden rounded-2xl border-2 p-4 transition ${
                        item.quantity > 0
                          ? "border-[#1f6b45] bg-[#eff9f1] shadow-lg"
                          : "border-[#ead9b2] bg-white hover:border-[#d4af37] hover:shadow-md"
                      }`}
                    >

                      {item.quantity >
                        0 && (
                        <div className="absolute right-2 top-2 rounded-full bg-[#1f6b45] px-2 py-1 text-xs font-black text-white">
                          ×
                          {
                            item.quantity
                          }
                        </div>
                      )}

                      <div className="mb-3 pr-8">

                        <p className="font-black leading-snug text-[#3d281b]">
                          {
                            item.name
                          }
                        </p>

                        <p className="mt-1 text-xl font-black text-[#8b1e1e]">
                          ₹
                          {
                            item.price
                          }
                        </p>

                        <p className="text-xs font-bold text-[#a0876d]">
                          {
                            item.category
                          }
                        </p>

                      </div>

                      <div className="flex items-center justify-between rounded-xl bg-[#fffaf0] p-2 shadow-sm">

                        <button
                          type="button"
                          onClick={() =>
                            decreaseItem(
                              item.id
                            )
                          }
                          className="h-10 w-10 rounded-xl bg-slate-100 text-xl font-black hover:bg-slate-200"
                        >
                          −
                        </button>

                        <span className="text-lg font-black">
                          {
                            item.quantity
                          }
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            increaseItem(
                              item.id
                            )
                          }
                          className="h-10 w-10 rounded-xl bg-[#1f6b45] text-xl font-black text-white hover:bg-[#155536]"
                        >
                          +
                        </button>

                      </div>

                    </div>
                  )
                )}

              </div>

              {filteredFoodItems.length ===
                0 && (
                <div className="rounded-2xl bg-[#fff5df] p-8 text-center text-[#80654d]">

                  <div className="text-4xl">
                    🍽️
                  </div>

                  <p className="mt-2 font-black">
                    Dish सापडली नाही
                  </p>

                  <p className="text-sm">
                    No dish found
                  </p>

                </div>
              )}

            </div>

          </section>

          {/* ===================================================
          ORDER SUMMARY
          =================================================== */}

          <aside className="h-fit rounded-[2rem] border border-[#d4af37]/40 bg-[#fffdf7] p-5 shadow-xl lg:sticky lg:top-24">

            <div className="mb-5 flex items-center justify-between">

              <div>

                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8b1e1e]">
                  YOUR ORDER
                </p>

                <h2 className="mt-1 text-xl font-black text-[#4a0909]">
                  🧾 Order Summary
                </h2>

              </div>

              <div className="rounded-2xl border border-[#d4af37] bg-[#fff4d0] px-3 py-2 text-lg font-black text-[#691010]">
                ₹{total}
              </div>

            </div>

            {/* SELECTED ITEMS */}

            {selectedItems.length ===
            0 ? (
              <div className="rounded-2xl bg-[#faf4e5] p-8 text-center text-[#80654d]">

                <div className="mb-2 text-5xl">
                  🛒
                </div>

                <p className="font-black">
                  No items selected
                </p>

                <p className="mt-1 text-sm">
                  अजून dish select केलेली नाही
                </p>

              </div>
            ) : (
              <div className="max-h-[360px] space-y-3 overflow-y-auto pr-1">

                {selectedItems.map(
                  (item) => (
                    <div
                      key={
                        item.id
                      }
                      className="flex items-start justify-between border-b border-[#eee2c8] pb-3"
                    >

                      <div className="pr-3">

                        <p className="font-bold leading-snug">
                          {
                            item.name
                          }
                        </p>

                        <p className="mt-1 text-xs text-[#80654d]">
                          {
                            item.quantity
                          }{" "}
                          × ₹
                          {
                            item.price
                          }
                        </p>

                      </div>

                      <p className="whitespace-nowrap font-black">
                        ₹
                        {item.quantity *
                          item.price}
                      </p>

                    </div>
                  )
                )}

              </div>
            )}

            {/* DISCOUNT */}

            <div className="mt-5">

              <label className="mb-1 block text-sm font-black">
                💸 Discount / सवलत
              </label>

              <div className="relative">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-slate-500">
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

                    setDiscount(
                      value
                    );
                  }}
                  placeholder="Discount amount"
                  inputMode="decimal"
                  className="w-full rounded-xl border-2 border-green-100 bg-[#fffaf0] px-4 py-3 pl-9 outline-none focus:border-green-500"
                />

              </div>

              <p className="mt-1 text-xs text-[#80654d]">
                Maximum: ₹
                {
                  subtotal
                }
              </p>

            </div>

            {/* PAYMENT */}

            <div className="mt-5">

              <label className="mb-2 block text-sm font-black">
                पेमेंट / Payment
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
                      className={`rounded-xl border-2 px-2 py-3 text-xs font-black transition ${
                        paymentMethod ===
                        method
                          ? "border-[#1f6b45] bg-[#1f6b45] text-white shadow-md"
                          : "border-green-100 bg-white hover:bg-green-50"
                      }`}
                    >
                      {method ===
                      "Cash"
                        ? "💵 Cash"
                        : method ===
                          "UPI"
                        ? "📱 UPI"
                        : "💳 Card"}
                    </button>
                  )
                )}

              </div>

            </div>

            {/* TOTALS */}

            <div className="my-5 border-t pt-5">

              <div className="flex items-center justify-between text-[#80654d]">

                <span>
                  Subtotal
                </span>

                <span className="font-bold">
                  ₹
                  {
                    subtotal
                  }
                </span>

              </div>

              <div className="mt-2 flex items-center justify-between text-green-600">

                <span>
                  Discount
                </span>

                <span className="font-bold">
                  -₹
                  {
                    discountAmount
                  }
                </span>

              </div>

              <div className="mt-4 flex items-center justify-between border-t border-[#ead9b2] pt-4">

                <span className="text-lg font-bold">
                  Grand Total
                </span>

                <span className="text-3xl font-black text-[#8b1e1e]">
                  ₹{total}
                </span>

              </div>

            </div>

            {/* SAVE */}

            <button
              type="button"
              onClick={saveBill}
              disabled={
                loading ||
                selectedItems.length ===
                  0
              }
              className="w-full rounded-xl bg-[#8b1e1e] px-5 py-4 text-lg font-black text-white shadow-lg transition hover:bg-[#6f1414] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "⏳ Processing..."
                : "✅ Confirm Order"}
            </button>

            {/* WHATSAPP */}

            <button
              type="button"
              onClick={
                shareCurrentOrder
              }
              disabled={
                selectedItems.length ===
                0
              }
              className="mt-3 w-full rounded-xl bg-[#1f6b45] px-5 py-3 font-black text-white transition hover:bg-[#155536] disabled:cursor-not-allowed disabled:opacity-50"
            >
              📱 WhatsApp Order
            </button>

            <p className="mt-4 text-center text-xs leading-5 text-[#80654d]">
              🔒 तुमची माहिती सुरक्षित आहे
              <br />
              🙏 Thank you for choosing Foodies Town
            </p>

          </aside>

        </div>

        {/* =====================================================
        NEW 3 COLUMN TRENDING SECTION
        ===================================================== */}

        <section className="mt-8">

          <div className="mb-5 text-center">

            <p className="text-xs font-black uppercase tracking-[0.25em] text-[#8b1e1e]">
              DAILY UPDATE • TRENDING • ENTERTAINMENT
            </p>

            <h2 className="mt-2 text-2xl font-black text-[#4a0909] sm:text-3xl">
              🌟 आजचे खास अपडेट्स
            </h2>

            <p className="mt-1 text-sm text-[#80654d]">
              जगातील घडामोडी • आजच्या शुभेच्छा • Trending Music
            </p>

          </div>

          <div className="grid gap-5 md:grid-cols-3">

            {/* =================================================
            WORLD TRENDING AFFAIRS
            ================================================= */}

            <div className="overflow-hidden rounded-[2rem] border border-[#d4af37]/40 bg-gradient-to-br from-[#fffdf7] to-[#f4e5c1] shadow-xl">

              <div className="bg-[#4a0909] p-5 text-white">

                <div className="flex items-center gap-3">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d4af37] text-2xl">
                    🌍
                  </div>

                  <div>

                    <p className="text-xs font-bold text-[#f7d98a]">
                      WORLD UPDATE
                    </p>

                    <h3 className="text-xl font-black">
                      Trending Affairs
                    </h3>

                  </div>

                </div>

              </div>

              <div className="space-y-3 p-5">

                <div className="rounded-2xl border border-[#ead9b2] bg-white p-4">

                  <div className="mb-2 flex items-center justify-between">

                    <span className="text-lg">
                      🌐
                    </span>

                    <span className="rounded-full bg-red-100 px-2 py-1 text-[10px] font-black text-red-600">
                      TRENDING
                    </span>

                  </div>

                  <p className="font-black text-[#4a0909]">
                    Global News & Updates
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#80654d]">
                    जगभरातील महत्त्वाच्या आणि चर्चेत असलेल्या घडामोडी येथे पाहा.
                  </p>

                </div>

                <div className="rounded-2xl border border-[#ead9b2] bg-white p-4">

                  <div className="flex gap-3">

                    <span className="text-2xl">
                      📈
                    </span>

                    <div>

                      <p className="font-black">
                        Business & Technology
                      </p>

                      <p className="mt-1 text-xs text-[#80654d]">
                        नवीन technology, business आणि digital world trends.
                      </p>

                    </div>

                  </div>

                </div>

                <div className="rounded-2xl border border-[#ead9b2] bg-white p-4">

                  <div className="flex gap-3">

                    <span className="text-2xl">
                      🏆
                    </span>

                    <div>

                      <p className="font-black">
                        Sports & World
                      </p>

                      <p className="mt-1 text-xs text-[#80654d]">
                        Sports आणि international world मधील चर्चेतील विषय.
                      </p>

                    </div>

                  </div>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    window.open(
                      "https://www.google.com/search?q=world+trending+news",
                      "_blank"
                    )
                  }
                  className="w-full rounded-xl bg-[#8b1e1e] px-4 py-3 text-sm font-black text-white transition hover:bg-[#6f1414]"
                >
                  🌍 Explore World Trends
                </button>

              </div>

            </div>

            {/* =================================================
            DAILY OCCASION WISH
            ================================================= */}

            <div className="overflow-hidden rounded-[2rem] border border-[#d4af37]/40 bg-gradient-to-br from-[#fffdf7] to-[#f4e5c1] shadow-xl">

              <div className="bg-[#1f6b45] p-5 text-white">

                <div className="flex items-center gap-3">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d4af37] text-2xl">
                    🎉
                  </div>

                  <div>

                    <p className="text-xs font-bold text-green-100">
                      TODAY'S SPECIAL
                    </p>

                    <h3 className="text-xl font-black">
                      Daily Occasion Wish
                    </h3>

                  </div>

                </div>

              </div>

              <div className="space-y-3 p-5">

                <div className="rounded-2xl border border-[#ead9b2] bg-white p-5 text-center">

                  <div className="text-5xl">
                    🌸
                  </div>

                  <p className="mt-3 text-xs font-black uppercase tracking-widest text-[#1f6b45]">
                    TODAY
                  </p>

                  <h4 className="mt-2 text-xl font-black text-[#4a0909]">
                    शुभ दिवस! 🙏
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-[#80654d]">
                    तुमचा आजचा दिवस आनंद,
                    आरोग्य, प्रेम आणि
                    यशाने भरलेला जावो!
                  </p>

                </div>

                <div className="rounded-2xl border border-[#ead9b2] bg-[#fffaf0] p-4">

                  <p className="font-black text-[#8b1e1e]">
                    💐 Special Wish
                  </p>

                  <p className="mt-2 text-sm leading-6 text-[#80654d]">
                    नवीन आशा, नवीन ऊर्जा
                    आणि नवीन संधींसह
                    प्रत्येक दिवस सुंदर होवो.
                  </p>

                </div>

                <button
                  type="button"
                  onClick={() => {
                    const wish =
                      encodeURIComponent(
                        "🌸 शुभ दिवस! 🙏 तुमचा आजचा दिवस आनंद, आरोग्य, प्रेम आणि यशाने भरलेला जावो! ❤️ - Foodies Town"
                      );

                    window.open(
                      `https://wa.me/?text=${wish}`,
                      "_blank"
                    );
                  }}
                  className="w-full rounded-xl bg-[#1f6b45] px-4 py-3 text-sm font-black text-white transition hover:bg-[#155536]"
                >
                  💚 Share Today's Wish
                </button>

              </div>

            </div>

            {/* =================================================
            TRENDING SONG
            ================================================= */}

            <div className="overflow-hidden rounded-[2rem] border border-[#d4af37]/40 bg-gradient-to-br from-[#fffdf7] to-[#f4e5c1] shadow-xl">

              <div className="bg-[#691010] p-5 text-white">

                <div className="flex items-center gap-3">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d4af37] text-2xl">
                    🎵
                  </div>

                  <div>

                    <p className="text-xs font-bold text-[#f7d98a]">
                      MUSIC ZONE
                    </p>

                    <h3 className="text-xl font-black">
                      Trending Song
                    </h3>

                  </div>

                </div>

              </div>

              <div className="space-y-3 p-5">

                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#4a0909] to-[#8b1e1e] p-6 text-center text-white">

                  <div className="absolute -right-5 -top-5 text-7xl opacity-10">
                    🎧
                  </div>

                  <div className="relative">

                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-4 border-[#d4af37] bg-[#691010] text-4xl shadow-xl">
                      🎵
                    </div>

                    <p className="mt-4 text-xs font-bold uppercase tracking-widest text-[#f7d98a]">
                      Now Trending
                    </p>

                    <h4 className="mt-2 text-xl font-black">
                      Today's Trending Music
                    </h4>

                    <p className="mt-2 text-xs leading-5 text-orange-100">
                      आजचे popular songs,
                      viral music आणि
                      trending tracks शोधा.
                    </p>

                  </div>

                </div>

                <div className="rounded-2xl border border-[#ead9b2] bg-white p-4">

                  <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff0d0] text-xl">
                      🔥
                    </div>

                    <div>

                      <p className="font-black">
                        Viral Music
                      </p>

                      <p className="text-xs text-[#80654d]">
                        Latest trending songs & reels music
                      </p>

                    </div>

                  </div>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    window.open(
                      "https://www.youtube.com/results?search_query=trending+songs",
                      "_blank"
                    )
                  }
                  className="w-full rounded-xl bg-[#691010] px-4 py-3 text-sm font-black text-white transition hover:bg-[#4a0909]"
                >
                  ▶️ Listen to Trending Songs
                </button>

              </div>

            </div>

          </div>

        </section>

        {/* =====================================================
        KONKAN FOOTER DECORATION
        ===================================================== */}

        <section className="mt-8 overflow-hidden rounded-[2rem] border border-[#d4af37]/40 bg-gradient-to-r from-[#4a0909] via-[#691010] to-[#4a0909] p-6 text-center text-white shadow-xl">

          <div className="mb-3 text-3xl">
            🌴 🥥 🪔 🐟 🌺
          </div>

          <h3 className="text-xl font-black text-[#f7d98a]">
            FOODIES TOWN
          </h3>

          <p className="mt-1 text-sm text-orange-100">
            अस्सल कोकणी चव • घरची आठवण • मनापासून सेवा
          </p>

          <div className="mt-4 text-xs text-orange-200/70">
            ©{" "}
            {mounted
              ? new Date().getFullYear()
              : 2026}{" "}
            Foodies Town
          </div>

        </section>

        <footer className="py-6 text-center">

          <p className="text-xs font-bold text-[#8b1e1e]">
            🌺 © 2026 Athena Creations. All rights reserved. 🌺
          </p>

        </footer>

      </div>

    </main>
  );
}