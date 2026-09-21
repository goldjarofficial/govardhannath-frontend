"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useRouter } from "next/navigation";

type Cart = Record<number, number>;

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Makhana Prasadam",
    price: 200,
    image: "/images/makhana-prasadam.jpg",
  },
  {
    id: 2,
    name: "Peda",
    price: 180,
    image: "/images/peda.jpg",
  },
  {
    id: 3,
    name: "Dry Prasadam",
    price: 250,
    image: "/images/dry-prasadam.jpg",
  },
  {
    id: 4,
    name: "Panchamrit",
    price: 300,
    image: "/images/panchamrit.jpg",
  },
];

export default function CartPage() {
  const router = useRouter();

  const [cart, setCart] =
    useState<Cart>({});

  const [loaded, setLoaded] =
    useState(false);

  /* =====================================================
     LOAD CART
  ===================================================== */

  useEffect(() => {
    try {
      const savedCart =
        localStorage.getItem(
          "prasadam-cart"
        );

      if (savedCart) {
        const parsed =
          JSON.parse(
            savedCart
          ) as Cart;

        setCart(parsed);
      }
    } catch (error) {
      console.error(
        "Failed to load cart:",
        error
      );
    } finally {
      setLoaded(true);
    }
  }, []);

  /* =====================================================
     SAVE CART
  ===================================================== */

  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem(
      "prasadam-cart",
      JSON.stringify(cart)
    );

    window.dispatchEvent(
      new Event(
        "prasadam-cart-updated"
      )
    );
  }, [cart, loaded]);

  /* =====================================================
     CART ITEMS
  ===================================================== */

  const cartItems =
    useMemo(() => {
      return products
        .filter(
          (product) =>
            (cart[product.id] ??
              0) > 0
        )
        .map((product) => ({
          ...product,

          quantity:
            cart[product.id] ??
            0,
        }));
    }, [cart]);

  /* =====================================================
     TOTAL ITEMS
  ===================================================== */

  const totalItems =
    useMemo(() => {
      return cartItems.reduce(
        (total, item) =>
          total +
          item.quantity,
        0
      );
    }, [cartItems]);

  /* =====================================================
     SUBTOTAL
  ===================================================== */

  const subtotal =
    useMemo(() => {
      return cartItems.reduce(
        (total, item) =>
          total +
          item.price *
            item.quantity,
        0
      );
    }, [cartItems]);

  /* =====================================================
     DELIVERY
  ===================================================== */

  const deliveryCharge =
    subtotal > 0 ? 50 : 0;

  const totalAmount =
    subtotal +
    deliveryCharge;

  /* =====================================================
     INCREASE
  ===================================================== */

  const increase = (
    id: number
  ) => {
    setCart(
      (previousCart) => ({
        ...previousCart,

        [id]:
          (previousCart[id] ??
            0) + 1,
      })
    );
  };

  /* =====================================================
     DECREASE
  ===================================================== */

  const decrease = (
    id: number
  ) => {
    setCart(
      (previousCart) => {
        const quantity =
          previousCart[id] ??
          0;

        if (quantity <= 1) {
          const updatedCart = {
            ...previousCart,
          };

          delete updatedCart[
            id
          ];

          return updatedCart;
        }

        return {
          ...previousCart,

          [id]:
            quantity - 1,
        };
      }
    );
  };

  /* =====================================================
     REMOVE
  ===================================================== */

  const removeItem = (
    id: number
  ) => {
    setCart(
      (previousCart) => {
        const updatedCart = {
          ...previousCart,
        };

        delete updatedCart[id];

        return updatedCart;
      }
    );
  };

  const formatPrice = (
    price: number
  ) =>
    price.toLocaleString(
      "en-IN"
    );

  /* =====================================================
     LOADING
  ===================================================== */

  if (!loaded) {
    return (
      <main
        className="
          min-h-[100dvh]
          bg-[#fffaf3]

          lg:ml-[92px]
          lg:w-[calc(100%-92px)]
        "
      />
    );
  }

  /* =====================================================
     EMPTY CART
  ===================================================== */

  if (
    cartItems.length === 0
  ) {
    return (
      <main
        className="
          min-h-[100dvh]
          bg-[#fffaf3]
          pb-[100px]

          lg:ml-[92px]
          lg:w-[calc(100%-92px)]
        "
      >
        <CartHeader
          totalItems={0}
          onBack={() =>
            router.back()
          }
        />

        <section
          className="
            flex
            min-h-[calc(100dvh-170px)]
            items-center
            justify-center
            px-4
          "
        >
          <div
            className="
              w-full
              max-w-[430px]
              text-center
            "
          >
            <div
              className="
                mx-auto
                grid
                h-[90px]
                w-[90px]
                place-items-center
                rounded-full
                border
                border-[#eadbc5]
                bg-[#fffdf8]
                shadow-sm
              "
            >
              <CartIcon />
            </div>

            <h2
              className="
                mt-6
                font-serif
                text-2xl
                font-bold
                text-[#561010]
              "
            >
              Your cart is empty
            </h2>

            <p
              className="
                mx-auto
                mt-2
                max-w-[330px]
                text-sm
                leading-6
                text-[#81756c]
              "
            >
              Add your favourite
              prasadam before
              placing an order.
            </p>

            <button
              type="button"
              onClick={() =>
                router.push(
                  "/prasadam"
                )
              }
              className="
                mt-7
                min-h-[48px]
                rounded-xl
                bg-[#a71919]
                px-8
                text-sm
                font-bold
                text-white
                shadow-md
                transition

                hover:bg-[#861414]
                active:scale-[0.98]
              "
            >
              Explore Prasadam
            </button>
          </div>
        </section>
      </main>
    );
  }

  /* =====================================================
     MAIN CART
  ===================================================== */

  return (
    <main
      className="
        min-h-[100dvh]
        bg-[#fffaf3]
        pb-[185px]

        md:pb-[120px]

        lg:ml-[92px]
        lg:w-[calc(100%-92px)]
        lg:pb-12
      "
    >
      <CartHeader
        totalItems={
          totalItems
        }
        onBack={() =>
          router.back()
        }
      />

      <div
        className="
          mx-auto
          w-full
          max-w-[1400px]
          px-3
          py-4

          sm:px-5
          sm:py-6

          lg:px-8
          lg:py-8
        "
      >
        {/* DESKTOP TITLE */}

        <div
          className="
            mb-6
            hidden

            lg:block
          "
        >
          <span
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[1.4px]
              text-[#c18b32]
            "
          >
            Blessed Offerings
          </span>

          <h2
            className="
              mt-1
              font-serif
              text-[30px]
              font-bold
              text-[#561010]
            "
          >
            Your Prasadam Cart
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-[#81756c]
            "
          >
            Review your selected
            prasadam before placing
            your order.
          </p>
        </div>

        <div
          className="
            grid
            grid-cols-1
            gap-5

            lg:grid-cols-[minmax(0,1fr)_360px]
            lg:items-start
            lg:gap-7

            xl:grid-cols-[minmax(0,1fr)_390px]
          "
        >
          {/* =========================================
              CART ITEMS
          ========================================= */}

          <section>
            <div
              className="
                mb-3
                flex
                items-center
                justify-between

                lg:hidden
              "
            >
              <h2
                className="
                  font-serif
                  text-lg
                  font-bold
                  text-[#561010]
                "
              >
                Cart Items
              </h2>

              <button
                type="button"
                onClick={() =>
                  router.push(
                    "/prasadam"
                  )
                }
                className="
                  text-xs
                  font-bold
                  text-[#a71919]
                "
              >
                + Add More
              </button>
            </div>

            <div
              className="
                overflow-hidden
                rounded-[18px]
                border
                border-[#eadbc5]
                bg-[#fffdf8]
                shadow-[0_8px_25px_rgba(80,45,15,0.05)]
              "
            >
              {cartItems.map(
                (
                  item,
                  index
                ) => (
                  <article
                    key={item.id}
                    className={`
                      p-3

                      sm:p-4

                      lg:p-5

                      ${
                        index !==
                        cartItems.length -
                          1
                          ? "border-b border-[#eee1cf]"
                          : ""
                      }
                    `}
                  >
                    <div
                      className="
                        flex
                        items-start
                        gap-3

                        sm:gap-4
                      "
                    >
                      {/* IMAGE */}

                      <div
                        className="
                          h-[82px]
                          w-[82px]
                          shrink-0
                          overflow-hidden
                          rounded-xl
                          border
                          border-[#eee1cf]
                          bg-[#f7eddf]

                          sm:h-[100px]
                          sm:w-[100px]

                          lg:h-[120px]
                          lg:w-[120px]
                        "
                      >
                        <img
                          src={
                            item.image
                          }
                          alt={
                            item.name
                          }
                          className="
                            h-full
                            w-full
                            object-cover
                          "
                        />
                      </div>

                      {/* INFO */}

                      <div
                        className="
                          min-w-0
                          flex-1
                        "
                      >
                        <div
                          className="
                            flex
                            items-start
                            justify-between
                            gap-2
                          "
                        >
                          <div
                            className="
                              min-w-0
                            "
                          >
                            <span
                              className="
                                text-[9px]
                                font-bold
                                uppercase
                                tracking-[1px]
                                text-[#c18b32]
                              "
                            >
                              Prasadam
                            </span>

                            <h3
                              className="
                                mt-1
                                truncate
                                font-serif
                                text-[15px]
                                font-bold
                                text-[#4d1616]

                                sm:text-lg
                              "
                            >
                              {
                                item.name
                              }
                            </h3>
                          </div>

                          {/* REMOVE */}

                          <button
                            type="button"
                            onClick={() =>
                              removeItem(
                                item.id
                              )
                            }
                            aria-label="Remove item"
                            className="
                              grid
                              h-8
                              w-8
                              shrink-0
                              place-items-center
                              rounded-full
                              text-[#9a8b7e]
                              transition

                              hover:bg-[#fff0e8]
                              hover:text-[#a71919]
                            "
                          >
                            <TrashIcon />
                          </button>
                        </div>

                        {/* PRICE */}

                        <p
                          className="
                            mt-1
                            text-[13px]
                            font-bold
                            text-[#a71919]

                            sm:text-base
                          "
                        >
                          ₹
                          {formatPrice(
                            item.price
                          )}
                        </p>

                        {/* QUANTITY */}

                        <div
                          className="
                            mt-3
                            flex
                            items-center
                            justify-between
                            gap-3
                          "
                        >
                          <div
                            className="
                              flex
                              h-9
                              items-center
                              overflow-hidden
                              rounded-lg
                              border
                              border-[#dfcdb4]
                              bg-white

                              sm:h-10
                            "
                          >
                            <button
                              type="button"
                              onClick={() =>
                                decrease(
                                  item.id
                                )
                              }
                              className="
                                grid
                                h-full
                                w-9
                                place-items-center
                                text-lg
                                font-bold
                                text-[#a71919]

                                hover:bg-[#fff3df]
                              "
                            >
                              −
                            </button>

                            <span
                              className="
                                grid
                                h-full
                                min-w-[38px]
                                place-items-center
                                border-x
                                border-[#eee1cf]
                                px-2
                                text-xs
                                font-bold
                              "
                            >
                              {
                                item.quantity
                              }
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                increase(
                                  item.id
                                )
                              }
                              className="
                                grid
                                h-full
                                w-9
                                place-items-center
                                bg-[#e74b18]
                                text-lg
                                font-bold
                                text-white

                                hover:bg-[#d83f11]
                              "
                            >
                              +
                            </button>
                          </div>

                          <strong
                            className="
                              text-sm
                              text-[#4d1616]

                              sm:text-base
                            "
                          >
                            ₹
                            {formatPrice(
                              item.price *
                                item.quantity
                            )}
                          </strong>
                        </div>
                      </div>
                    </div>
                  </article>
                )
              )}
            </div>

            {/* ADD MORE */}

            <button
              type="button"
              onClick={() =>
                router.push(
                  "/prasadam"
                )
              }
              className="
                mt-4
                flex
                min-h-[46px]
                w-full
                items-center
                justify-center
                rounded-xl
                border
                border-dashed
                border-[#d5b97f]
                bg-[#fffaf0]
                text-xs
                font-bold
                text-[#a71919]
                transition

                hover:bg-[#fff3df]
              "
            >
              + Add More Prasadam
            </button>
          </section>

          {/* =========================================
              ORDER SUMMARY
          ========================================= */}

          <aside
            className="
              hidden

              md:block

              lg:sticky
              lg:top-[100px]
            "
          >
            <div
              className="
                rounded-[18px]
                border
                border-[#eadbc5]
                bg-[#fffdf8]
                p-5
                shadow-[0_10px_30px_rgba(80,45,15,0.07)]

                lg:p-6
              "
            >
              <span
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[1.3px]
                  text-[#c18b32]
                "
              >
                Order Details
              </span>

              <h2
                className="
                  mt-1
                  font-serif
                  text-[22px]
                  font-bold
                  text-[#561010]
                "
              >
                Order Summary
              </h2>

              <div
                className="
                  mt-5
                  space-y-3
                  border-b
                  border-[#eee1cf]
                  pb-5
                "
              >
                <SummaryRow
                  label={`Subtotal (${totalItems} ${
                    totalItems ===
                    1
                      ? "item"
                      : "items"
                  })`}
                  value={`₹${formatPrice(
                    subtotal
                  )}`}
                />

                <SummaryRow
                  label="Delivery"
                  value={`₹${formatPrice(
                    deliveryCharge
                  )}`}
                />
              </div>

              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-4
                  py-5
                "
              >
                <div>
                  <p
                    className="
                      text-xs
                      font-semibold
                      text-[#4c4037]
                    "
                  >
                    Total Amount
                  </p>

                  <p
                    className="
                      mt-0.5
                      text-[9px]
                      text-[#97897d]
                    "
                  >
                    Inclusive of all
                    charges
                  </p>
                </div>

                <strong
                  className="
                    text-xl
                    font-bold
                    text-[#a71919]
                  "
                >
                  ₹
                  {formatPrice(
                    totalAmount
                  )}
                </strong>
              </div>

              {/* PLACE ORDER */}

              <button
                type="button"
                onClick={() =>
                  router.push(
                    "/prasadam/checkout"
                  )
                }
                className="
                  flex
                  min-h-[50px]
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[#a71919]
                  px-5
                  text-sm
                  font-bold
                  text-white
                  shadow-[0_8px_20px_rgba(167,25,25,0.18)]
                  transition

                  hover:bg-[#821313]
                  active:scale-[0.99]
                "
              >
                Place Order
                <span>
                  →
                </span>
              </button>

              <p
                className="
                  mt-4
                  text-center
                  text-[10px]
                  text-[#8b7d72]
                "
              >
                🔒 Secure checkout
              </p>
            </div>
          </aside>
        </div>
      </div>

      {/* =============================================
          MOBILE ORDER BAR
      ============================================= */}

      <div
        className="
          fixed
          bottom-[calc(76px+env(safe-area-inset-bottom))]
          left-0
          right-0
          z-50
          border-t
          border-[#eadbc5]
          bg-[#fffdf8]/95
          p-3
          shadow-[0_-8px_25px_rgba(70,40,15,0.08)]
          backdrop-blur-md

          sm:px-5

          md:hidden
        "
      >
        <div
          className="
            mx-auto
            flex
            max-w-[600px]
            items-center
            gap-3
          "
        >
          <div
            className="
              min-w-0
              flex-1
            "
          >
            <p
              className="
                text-[9px]
                text-[#85776d]
              "
            >
              Total Amount
            </p>

            <strong
              className="
                block
                text-lg
                font-bold
                text-[#641010]
              "
            >
              ₹
              {formatPrice(
                totalAmount
              )}
            </strong>

            <span
              className="
                text-[9px]
                text-[#9b8e84]
              "
            >
              {totalItems}{" "}
              {totalItems === 1
                ? "item"
                : "items"}
            </span>
          </div>

          <button
            type="button"
            onClick={() =>
              router.push(
                "/prasadam/checkout"
              )
            }
            className="
              flex
              min-h-[50px]
              min-w-[165px]
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[#a71919]
              px-5
              text-sm
              font-bold
              text-white
              shadow-md

              active:scale-[0.98]
            "
          >
            Place Order
            <span>
              →
            </span>
          </button>
        </div>
      </div>
    </main>
  );
}

/* =====================================================
   HEADER
===================================================== */

function CartHeader({
  totalItems,
  onBack,
}: {
  totalItems: number;
  onBack: () => void;
}) {
  return (
    <header
      className="
        sticky
        top-0
        z-40
        border-b
        border-[#eee1cf]
        bg-[#fffaf3]/95
        backdrop-blur-md
      "
    >
      <div
        className="
          mx-auto
          flex
          min-h-[64px]
          max-w-[1400px]
          items-center
          justify-between
          gap-3
          px-4

          sm:min-h-[70px]
          sm:px-6

          lg:min-h-[78px]
          lg:px-8
        "
      >
        <div
          className="
            flex
            items-center
            gap-3
          "
        >
          <button
            type="button"
            onClick={onBack}
            className="
              grid
              h-9
              w-9
              place-items-center
              rounded-full
              border
              border-[#eadbc5]
              bg-white
              text-[#a71919]

              lg:h-11
              lg:w-11
            "
          >
            ←
          </button>

          <div>
            <span
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[1px]
                text-[#c18b32]
              "
            >
              Shri Govardhannath
            </span>

            <h1
              className="
                font-serif
                text-xl
                font-bold
                text-[#561010]

                lg:text-2xl
              "
            >
              My Cart
            </h1>
          </div>
        </div>

        {totalItems > 0 && (
          <span
            className="
              rounded-full
              border
              border-[#eadbc5]
              bg-white
              px-3
              py-1.5
              text-[11px]
              font-bold
              text-[#75685e]
            "
          >
            {totalItems}{" "}
            {totalItems === 1
              ? "Item"
              : "Items"}
          </span>
        )}
      </div>
    </header>
  );
}

/* =====================================================
   SUMMARY ROW
===================================================== */

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        gap-4
        text-xs
      "
    >
      <span
        className="
          text-[#81756c]
        "
      >
        {label}
      </span>

      <strong
        className="
          text-[#4b4038]
        "
      >
        {value}
      </strong>
    </div>
  );
}

/* =====================================================
   CART ICON
===================================================== */

function CartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="
        h-10
        w-10
        text-[#a71919]
      "
    >
      <circle
        cx="9"
        cy="20"
        r="1"
      />

      <circle
        cx="18"
        cy="20"
        r="1"
      />

      <path d="M3 4h2l2.4 10.4a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 8H6" />
    </svg>
  );
}

/* =====================================================
   TRASH
===================================================== */

function TrashIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="
        h-4
        w-4
      "
    >
      <path d="M3 6h18" />

      <path d="M8 6V4h8v2" />

      <path d="M19 6l-1 14H6L5 6" />

      <path d="M10 11v5" />

      <path d="M14 11v5" />
    </svg>
  );
}