"use client";

import {
  useState,
} from "react";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

const frequencies = [
  {
    id: "daily",
    title: "Daily",
    subtitle: "Every day",
  },
  {
    id: "weekly",
    title: "Weekly",
    subtitle: "Every week",
  },
  {
    id: "monthly",
    title: "Monthly",
    subtitle: "Every month",
  },
];

type DonationType =
  | "one-time"
  | "auto";

type PaymentMethod =
  | "upi"
  | "card"
  | "netbanking";

export default function DonatePage() {
  const router = useRouter();

  const searchParams =
    useSearchParams();

  const seva =
    searchParams.get("seva") ||
    "Go Seva";

  const urlAmount =
    searchParams.get("amount") ||
    "1001";

  const [amount, setAmount] =
    useState(urlAmount);

  const [
    type,
    setType,
  ] = useState<DonationType>(
    "one-time"
  );

  const [
    frequency,
    setFrequency,
  ] = useState("monthly");

  const [
    customAmount,
    setCustomAmount,
  ] = useState("");

  const [
    paymentMethod,
    setPaymentMethod,
  ] =
    useState<PaymentMethod>(
      "upi"
    );

  const finalAmount =
    amount === "custom"
      ? customAmount
      : amount;

  const formattedAmount =
    Number(
      finalAmount || 0
    ).toLocaleString(
      "en-IN"
    );

  const handleCustomAmount = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value =
      e.target.value.replace(
        /\D/g,
        ""
      );

    setCustomAmount(value);
  };

  const handlePayment = () => {
    if (
      !finalAmount ||
      Number(finalAmount) <= 0
    ) {
      alert(
        "Please enter a valid amount"
      );

      return;
    }

    /*
      TEMPORARY DEMO FLOW

      Later:

      One Time
      → Backend creates payment order
      → Open payment gateway
      → Verify payment
      → Success / Failed

      Auto Seva
      → Backend creates mandate/subscription
      → User authorizes AutoPay
      → Recurring payment starts
      → Success / Failed
    */

    router.push(
      `/donation/success?seva=${encodeURIComponent(
        seva
      )}&amount=${encodeURIComponent(
        finalAmount
      )}&type=${type}&frequency=${frequency}&method=${paymentMethod}`
    );
  };

  return (
    <main className="screen">
      {/* =========================
          HEADER
      ========================== */}

      <header className="header">
        <button
          type="button"
          className="back"
          onClick={() =>
            router.back()
          }
          aria-label="Back"
        >
          ‹
        </button>

        <div className="headerTitle">
          <span>
            Secure Donation
          </span>

          <h1>
            Payment
          </h1>
        </div>

        <div className="headerSpace" />
      </header>

      {/* =========================
          DESKTOP HERO
      ========================== */}

      <section className="desktopHero">
        <div>
          <span className="heroLabel">
            Shri Govardhannath
            Haveli
          </span>

          <h1>
            Complete Your
            Seva
          </h1>

          <p>
            Make your offering
            securely and continue
            your seva.
          </p>
        </div>

        <div className="heroIcon">
          🛕
        </div>
      </section>

      {/* =========================
          MAIN CONTENT
      ========================== */}

      <section className="content">
        {/* LEFT / MAIN */}

        <div className="mainColumn">
          {/* SEVA SUMMARY */}

          <div className="sevaCard">
            <div className="sevaIcon">
              🛕
            </div>

            <div className="sevaInfo">
              <span>
                Selected Seva
              </span>

              <h2>
                {seva}
              </h2>

              <p>
                ₹
                {
                  formattedAmount
                }
              </p>
            </div>
          </div>

          {/* DONATION TYPE */}

          <h3 className="sectionTitle">
            Choose Donation Type
          </h3>

          <div className="typeTabs">
            <button
              type="button"
              className={
                type ===
                "one-time"
                  ? "typeActive"
                  : ""
              }
              onClick={() =>
                setType(
                  "one-time"
                )
              }
            >
              <div className="typeIcon">
                ₹
              </div>

              <div>
                <strong>
                  One Time
                </strong>

                <span>
                  Make a single
                  donation
                </span>
              </div>
            </button>

            <button
              type="button"
              className={
                type === "auto"
                  ? "typeActive"
                  : ""
              }
              onClick={() =>
                setType(
                  "auto"
                )
              }
            >
              <div className="typeIcon">
                ↻
              </div>

              <div>
                <strong>
                  Auto Seva
                </strong>

                <span>
                  Automatic
                  recurring seva
                </span>
              </div>
            </button>
          </div>

          {/* AUTO SEVA */}

          {type === "auto" && (
            <div className="autoBox">
              <div className="autoTitle">
                <div className="autoIcon">
                  🔄
                </div>

                <div>
                  <strong>
                    Start Auto
                    Seva
                  </strong>

                  <p>
                    Your selected
                    amount will be
                    automatically
                    debited.
                  </p>
                </div>
              </div>

              <h3>
                Select Frequency
              </h3>

              <div className="frequency">
                {frequencies.map(
                  (item) => (
                    <button
                      type="button"
                      key={
                        item.id
                      }
                      className={
                        frequency ===
                        item.id
                          ? "frequencyActive"
                          : ""
                      }
                      onClick={() =>
                        setFrequency(
                          item.id
                        )
                      }
                    >
                      <strong>
                        {
                          item.title
                        }
                      </strong>

                      <span>
                        {
                          item.subtitle
                        }
                      </span>
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {/* AMOUNT */}

          <h3 className="sectionTitle">
            Donation Amount
          </h3>

          <div className="amountGrid">
            {[
              "101",
              "501",
              "1001",
              "5001",
            ].map(
              (value) => (
                <button
                  type="button"
                  key={value}
                  className={
                    amount ===
                    value
                      ? "amountActive"
                      : ""
                  }
                  onClick={() => {
                    setAmount(
                      value
                    );

                    setCustomAmount(
                      ""
                    );
                  }}
                >
                  ₹
                  {Number(
                    value
                  ).toLocaleString(
                    "en-IN"
                  )}
                </button>
              )
            )}

            <button
              type="button"
              className={
                amount ===
                "custom"
                  ? "amountActive"
                  : ""
              }
              onClick={() =>
                setAmount(
                  "custom"
                )
              }
            >
              Custom
            </button>
          </div>

          {/* CUSTOM */}

          {amount ===
            "custom" && (
            <div className="customBox">
              <span>
                ₹
              </span>

              <input
                type="text"
                inputMode="numeric"
                placeholder="Enter amount"
                value={
                  customAmount
                }
                onChange={
                  handleCustomAmount
                }
              />
            </div>
          )}

          {/* PAYMENT */}

          <h3 className="sectionTitle">
            Select Payment Method
          </h3>

          <div className="methods">
            <button
              type="button"
              className={
                paymentMethod ===
                "upi"
                  ? "methodSelected"
                  : ""
              }
              onClick={() =>
                setPaymentMethod(
                  "upi"
                )
              }
            >
              <span className="methodIcon">
                ✓
              </span>

              <div>
                <strong>
                  UPI
                </strong>

                <small>
                  GPay, PhonePe,
                  Paytm
                </small>
              </div>

              <span className="methodRadio">
                {paymentMethod ===
                "upi"
                  ? "●"
                  : "○"}
              </span>
            </button>

            <button
              type="button"
              className={
                paymentMethod ===
                "card"
                  ? "methodSelected"
                  : ""
              }
              onClick={() =>
                setPaymentMethod(
                  "card"
                )
              }
            >
              <span className="methodIcon">
                ▣
              </span>

              <div>
                <strong>
                  Credit /
                  Debit Card
                </strong>

                <small>
                  Visa,
                  Mastercard &
                  more
                </small>
              </div>

              <span className="methodRadio">
                {paymentMethod ===
                "card"
                  ? "●"
                  : "○"}
              </span>
            </button>

            <button
              type="button"
              className={
                paymentMethod ===
                "netbanking"
                  ? "methodSelected"
                  : ""
              }
              onClick={() =>
                setPaymentMethod(
                  "netbanking"
                )
              }
            >
              <span className="methodIcon">
                ▤
              </span>

              <div>
                <strong>
                  Net Banking
                </strong>

                <small>
                  All major banks
                </small>
              </div>

              <span className="methodRadio">
                {paymentMethod ===
                "netbanking"
                  ? "●"
                  : "○"}
              </span>
            </button>
          </div>
        </div>

        {/* =========================
            DESKTOP SUMMARY
        ========================== */}

        <aside className="summaryColumn">
          <div className="summaryCard">
            <span className="summaryLabel">
              Donation Summary
            </span>

            <h2>
              {seva}
            </h2>

            <div className="summaryRow">
              <span>
                Donation Type
              </span>

              <strong>
                {type ===
                "auto"
                  ? "Auto Seva"
                  : "One Time"}
              </strong>
            </div>

            {type ===
              "auto" && (
              <div className="summaryRow">
                <span>
                  Frequency
                </span>

                <strong>
                  {frequency
                    .charAt(0)
                    .toUpperCase() +
                    frequency.slice(
                      1
                    )}
                </strong>
              </div>
            )}

            <div className="summaryRow">
              <span>
                Payment
              </span>

              <strong>
                {paymentMethod ===
                "upi"
                  ? "UPI"
                  : paymentMethod ===
                      "card"
                    ? "Card"
                    : "Net Banking"}
              </strong>
            </div>

            <div className="summaryDivider" />

            <div className="totalRow">
              <span>
                Total Amount
              </span>

              <strong>
                ₹
                {
                  formattedAmount
                }
              </strong>
            </div>

            <button
              type="button"
              className="pay desktopPay"
              onClick={
                handlePayment
              }
            >
              {type ===
              "auto"
                ? `Start Auto Seva ₹${formattedAmount}`
                : `Pay ₹${formattedAmount}`}
            </button>

            <div className="secure">
              🔒 100% Secure
              Payment
            </div>

            {type ===
              "auto" && (
              <p className="mandateNote">
                By continuing,
                you authorize the
                recurring payment
                mandate for your
                selected seva and
                frequency. You
                can cancel your
                Auto Seva later.
              </p>
            )}
          </div>
        </aside>

        {/* MOBILE PAY */}

        <div className="mobilePayment">
          <button
            type="button"
            className="pay"
            onClick={
              handlePayment
            }
          >
            {type === "auto"
              ? `Start Auto Seva ₹${formattedAmount}`
              : `Pay ₹${formattedAmount}`}
          </button>

          <div className="secure">
            🔒 100% Secure
            Payment
          </div>

          {type ===
            "auto" && (
            <p className="mandateNote">
              By continuing, you
              authorize the
              recurring payment
              mandate for your
              selected seva and
              frequency. You can
              cancel your Auto
              Seva later.
            </p>
          )}
        </div>
      </section>

      <style jsx global>{`
        /* ==========================================
           PAGE
        ========================================== */

        .screen {
          min-height:
            100dvh;

          background:
            #fff9ed;

          color:
            #4b4039;
        }

        .desktopHero,
        .summaryColumn {
          display: none;
        }

        /* ==========================================
           HEADER
        ========================================== */

        .header {
          position: relative;

          height: 72px;

          display: flex;

          align-items: center;

          justify-content:
            space-between;

          padding:
            0 15px;

          border-bottom:
            1px solid
            #eadbc5;

          background:
            rgba(
              255,
              253,
              248,
              0.98
            );
        }

        .headerTitle {
          flex: 1;

          text-align:
            center;
        }

        .headerTitle span {
          display: none;
        }

        .header h1 {
          margin: 0;

          color: #641010;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 23px;
        }

        .headerSpace {
          width: 38px;

          flex-shrink: 0;
        }

        /* ==========================================
           BACK
        ========================================== */

        .back {
          width: 38px;
          height: 38px;

          display: grid;

          place-items:
            center;

          flex-shrink: 0;

          padding: 0;

          border:
            1px solid
            #eadbc5;

          border-radius:
            50%;

          background:
            #fffdf8;

          color:
            #a71919;

          font-size: 29px;

          line-height: 1;

          box-shadow:
            0 3px 10px
            rgba(
              70,
              40,
              10,
              0.05
            );
        }

        /* ==========================================
           CONTENT
        ========================================== */

        .content {
          padding:
            12px 17px
            calc(
              30px +
              env(
                safe-area-inset-bottom
              )
            );
        }

        .mainColumn {
          min-width: 0;
        }

        /* ==========================================
           SEVA CARD
        ========================================== */

        .sevaCard {
          display: flex;

          align-items: center;

          gap: 12px;

          padding: 12px;

          border:
            1px solid
            #eadbc5;

          border-radius:
            12px;

          background:
            #fffdf8;

          box-shadow:
            0 4px 15px
            rgba(
              82,
              48,
              18,
              0.04
            );
        }

        .sevaIcon {
          width: 58px;
          height: 58px;

          display: grid;

          place-items:
            center;

          flex-shrink: 0;

          border-radius:
            10px;

          background:
            #f4e5c8;

          font-size: 27px;
        }

        .sevaInfo > span {
          display: none;
        }

        .sevaCard h2 {
          margin:
            0 0 4px;

          color: #332820;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 18px;
        }

        .sevaCard p {
          margin: 0;

          color: #a71919;

          font-size: 14px;

          font-weight: 700;
        }

        /* ==========================================
           SECTION
        ========================================== */

        .sectionTitle {
          margin:
            17px 0 9px;

          color: #3d332c;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 16px;
        }

        /* ==========================================
           TYPE
        ========================================== */

        .typeTabs {
          display: grid;

          grid-template-columns:
            repeat(
              2,
              minmax(0, 1fr)
            );

          gap: 9px;
        }

        .typeTabs button {
          min-height: 67px;

          display: flex;

          align-items:
            center;

          gap: 9px;

          padding:
            10px 11px;

          border:
            1px solid
            #eadbc5;

          border-radius:
            10px;

          background:
            #fffdf8;

          color: #443932;

          text-align: left;

          transition:
            border-color
              0.18s ease,
            background
              0.18s ease,
            transform
              0.18s ease;
        }

        .typeIcon {
          width: 29px;
          height: 29px;

          display: grid;

          place-items:
            center;

          flex-shrink: 0;

          border-radius:
            50%;

          background:
            #f6ead5;

          color: #a71919;

          font-size: 14px;

          font-weight: 700;
        }

        .typeTabs button > div:last-child {
          display: flex;

          flex-direction:
            column;

          gap: 4px;

          min-width: 0;
        }

        .typeTabs strong {
          font-size: 13px;
        }

        .typeTabs span {
          color: #8a8077;

          font-size: 9px;

          line-height: 1.3;
        }

        .typeTabs button.typeActive {
          border-color:
            #a71919;

          background:
            #fff1e7;

          color: #a71919;
        }

        .typeTabs button.typeActive
          .typeIcon {
          background:
            #a71919;

          color: #fff;
        }

        /* ==========================================
           AUTO SEVA
        ========================================== */

        .autoBox {
          margin-top:
            12px;

          padding: 13px;

          border:
            1px solid
            #e7cf9e;

          border-radius:
            11px;

          background:
            #fff8e9;
        }

        .autoTitle {
          display: flex;

          align-items:
            flex-start;

          gap: 10px;
        }

        .autoIcon {
          width: 35px;
          height: 35px;

          display: grid;

          place-items:
            center;

          flex-shrink: 0;

          border-radius:
            50%;

          background:
            #f2e0bf;

          font-size: 17px;
        }

        .autoTitle strong {
          color: #641010;

          font-size: 14px;
        }

        .autoTitle p {
          margin:
            3px 0 0;

          color: #776d65;

          font-size: 10px;

          line-height: 1.35;
        }

        .autoBox h3 {
          margin:
            14px 0 8px;

          color: #4b4039;

          font-size: 12px;
        }

        /* ==========================================
           FREQUENCY
        ========================================== */

        .frequency {
          display: grid;

          grid-template-columns:
            repeat(
              3,
              minmax(0, 1fr)
            );

          gap: 7px;
        }

        .frequency button {
          min-height: 52px;

          display: flex;

          flex-direction:
            column;

          align-items:
            center;

          justify-content:
            center;

          gap: 3px;

          padding:
            6px 4px;

          border:
            1px solid
            #eadbc5;

          border-radius:
            8px;

          background:
            white;

          color: #443932;
        }

        .frequency strong {
          font-size: 12px;
        }

        .frequency span {
          color: #8a8077;

          font-size: 9px;
        }

        .frequency button.frequencyActive {
          border-color:
            #a71919;

          background:
            #a71919;

          color: white;
        }

        .frequency button.frequencyActive
          span {
          color: #f9e8df;
        }

        /* ==========================================
           AMOUNT
        ========================================== */

        .amountGrid {
          display: grid;

          grid-template-columns:
            repeat(
              3,
              minmax(0, 1fr)
            );

          gap: 8px;
        }

        .amountGrid button {
          height: 45px;

          padding:
            0 6px;

          border:
            1px solid
            #eadbc5;

          border-radius:
            9px;

          background:
            #fffdf8;

          color: #433932;

          font-size: 14px;

          font-weight: 700;
        }

        .amountGrid button.amountActive {
          border-color:
            #a71919;

          background:
            #fff1e7;

          color: #a71919;
        }

        /* ==========================================
           CUSTOM
        ========================================== */

        .customBox {
          height: 47px;

          display: flex;

          align-items:
            center;

          gap: 5px;

          margin-top: 8px;

          padding:
            0 12px;

          border:
            1px solid
            #d9c6ad;

          border-radius:
            9px;

          background: white;
        }

        .customBox:focus-within {
          border-color:
            #a71919;

          box-shadow:
            0 0 0 3px
            rgba(
              167,
              25,
              25,
              0.06
            );
        }

        .customBox span {
          color: #a71919;

          font-size: 17px;

          font-weight: 700;
        }

        .customBox input {
          width: 100%;

          border: 0;

          outline: 0;

          background:
            transparent;

          color: #332820;

          font-size: 15px;
        }

        /* ==========================================
           METHODS
        ========================================== */

        .methods {
          display: flex;

          flex-direction:
            column;

          gap: 7px;
        }

        .methods button {
          min-height: 58px;

          display: flex;

          align-items:
            center;

          gap: 10px;

          padding:
            9px 11px;

          border:
            1px solid
            #eadbc5;

          border-radius:
            9px;

          background:
            #fffdf8;

          color: #443932;

          text-align: left;

          transition:
            border-color
              0.18s ease,
            background
              0.18s ease,
            transform
              0.18s ease;
        }

        .methods button.methodSelected {
          border-color:
            #a71919;

          background:
            #fff8f2;
        }

        .methodIcon {
          width: 30px;
          height: 30px;

          display: grid;

          place-items:
            center;

          flex-shrink: 0;

          border-radius:
            50%;

          background:
            #e4f4e8;

          color: #14945f;

          font-size: 12px;

          font-weight: 700;
        }

        .methods div {
          flex: 1;

          display: flex;

          flex-direction:
            column;

          gap: 2px;

          min-width: 0;
        }

        .methods strong {
          font-size: 12px;
        }

        .methods small {
          color: #8a8077;

          font-size: 9px;
        }

        .methodRadio {
          color: #a71919;

          font-size: 18px;
        }

        /* ==========================================
           PAY
        ========================================== */

        .pay {
          width: 100%;
          height: 50px;

          margin-top:
            16px;

          border: 0;

          border-radius:
            10px;

          background:
            #a71919;

          color: white;

          font-size: 15px;

          font-weight: 700;

          box-shadow:
            0 7px 18px
            rgba(
              113,
              17,
              17,
              0.14
            );

          transition:
            transform
              0.18s ease,
            background
              0.18s ease;
        }

        .pay:active {
          transform:
            scale(0.985);
        }

        /* ==========================================
           SECURITY
        ========================================== */

        .secure {
          margin-top:
            12px;

          text-align: center;

          color: #9b762f;

          font-size: 10px;

          font-weight: 600;
        }

        .mandateNote {
          margin:
            10px 10px 0;

          color: #8a8077;

          text-align:
            center;

          font-size: 9px;

          line-height: 1.4;
        }

        .desktopPay {
          display: none;
        }

        /* ==========================================
           SMALL MOBILE
        ========================================== */

        @media (
          max-width: 359px
        ) {
          .header {
            height: 64px;

            padding:
              0 10px;
          }

          .back,
          .headerSpace {
            width: 34px;
          }

          .back {
            height: 34px;

            font-size: 26px;
          }

          .header h1 {
            font-size: 20px;
          }

          .content {
            padding:
              10px 10px
              25px;
          }

          .sevaIcon {
            width: 50px;
            height: 50px;

            font-size: 23px;
          }

          .sevaCard h2 {
            font-size: 16px;
          }

          .sectionTitle {
            margin:
              14px 0 8px;

            font-size: 14px;
          }

          .typeTabs {
            gap: 6px;
          }

          .typeTabs button {
            min-height: 62px;

            padding:
              8px 7px;
          }

          .typeIcon {
            width: 25px;
            height: 25px;
          }

          .typeTabs strong {
            font-size: 11px;
          }

          .typeTabs span {
            font-size: 8px;
          }

          .amountGrid {
            gap: 6px;
          }

          .amountGrid button {
            font-size: 12px;
          }

          .frequency {
            gap: 5px;
          }

          .frequency strong {
            font-size: 10px;
          }
        }

        /* ==========================================
           LARGE MOBILE
        ========================================== */

        @media (
          min-width: 430px
        ) and (
          max-width: 599px
        ) {
          .header {
            height: 78px;
          }

          .header h1 {
            font-size: 25px;
          }

          .content {
            padding:
              16px 22px
              35px;
          }

          .sevaCard {
            padding: 15px;
          }

          .sevaIcon {
            width: 64px;
            height: 64px;

            font-size: 30px;
          }

          .sevaCard h2 {
            font-size: 20px;
          }

          .sectionTitle {
            font-size: 17px;
          }

          .typeTabs button {
            min-height: 74px;

            padding:
              12px 14px;
          }

          .typeTabs strong {
            font-size: 14px;
          }

          .typeTabs span {
            font-size: 10px;
          }

          .amountGrid button {
            height: 48px;
          }

          .methods button {
            min-height: 62px;
          }

          .pay {
            height: 53px;
          }
        }

        /* ==========================================
           TABLET
        ========================================== */

        @media (
          min-width: 600px
        ) and (
          max-width: 1023px
        ) {
          .screen {
            min-height:
              100vh;
          }

          .header {
            height: 82px;

            padding:
              0 28px;
          }

          .back,
          .headerSpace {
            width: 42px;
          }

          .back {
            height: 42px;
          }

          .header h1 {
            font-size: 27px;
          }

          .content {
            width: 100%;

            max-width: 760px;

            margin: 0 auto;

            padding:
              25px 35px
              45px;
          }

          .sevaCard {
            padding: 18px;

            border-radius:
              16px;
          }

          .sevaIcon {
            width: 70px;
            height: 70px;

            font-size: 33px;
          }

          .sevaInfo > span {
            display: block;

            margin-bottom:
              3px;

            color: #9a762f;

            font-size: 10px;

            font-weight: 700;

            text-transform:
              uppercase;

            letter-spacing:
              1px;
          }

          .sevaCard h2 {
            font-size: 22px;
          }

          .sevaCard p {
            font-size: 16px;
          }

          .sectionTitle {
            margin:
              23px 0 11px;

            font-size: 18px;
          }

          .typeTabs {
            gap: 13px;
          }

          .typeTabs button {
            min-height: 84px;

            padding:
              15px 16px;
          }

          .typeIcon {
            width: 36px;
            height: 36px;
          }

          .typeTabs strong {
            font-size: 15px;
          }

          .typeTabs span {
            font-size: 11px;
          }

          .autoBox {
            padding: 18px;
          }

          .frequency button {
            min-height: 62px;
          }

          .amountGrid {
            grid-template-columns:
              repeat(
                5,
                minmax(0, 1fr)
              );

            gap: 10px;
          }

          .amountGrid button {
            height: 50px;
          }

          .customBox {
            height: 52px;
          }

          .methods {
            gap: 10px;
          }

          .methods button {
            min-height: 66px;

            padding:
              11px 15px;
          }

          .methodIcon {
            width: 36px;
            height: 36px;
          }

          .methods strong {
            font-size: 14px;
          }

          .methods small {
            font-size: 10px;
          }

          .pay {
            height: 55px;

            font-size: 16px;
          }
        }

        /* ==========================================
           DESKTOP WEBSITE
        ========================================== */

        @media (
          min-width: 1024px
        ) {
          .screen {
            min-height:
              100vh;

            padding-bottom:
              60px;

            background:
              radial-gradient(
                circle at top right,
                rgba(
                  201,
                  148,
                  53,
                  0.12
                ),
                transparent
                  30%
              ),
              #fff9ed;
          }

          .header {
            height: 84px;

            justify-content:
              flex-start;

            gap: 18px;

            padding:
              0 42px;

            background:
              #fffdf8;
          }

          .back {
            width: 44px;
            height: 44px;

            font-size: 31px;
          }

          .headerTitle {
            flex: none;

            text-align: left;
          }

          .headerTitle span {
            display: block;

            margin-bottom:
              2px;

            color: #9a762f;

            font-size: 10px;

            font-weight: 700;

            letter-spacing:
              1.3px;

            text-transform:
              uppercase;
          }

          .header h1 {
            font-size: 26px;
          }

          .headerSpace {
            display: none;
          }

          /* HERO */

          .desktopHero {
            width:
              calc(
                100% - 80px
              );

            max-width:
              1320px;

            min-height:
              145px;

            display: flex;

            align-items:
              center;

            justify-content:
              space-between;

            gap: 30px;

            margin:
              32px auto 0;

            padding:
              26px 32px;

            border:
              1px solid
              #eadbc5;

            border-radius:
              22px;

            background:
              linear-gradient(
                135deg,
                #fffdf8,
                #fff2dc
              );

            box-shadow:
              0 10px 30px
              rgba(
                80,
                45,
                15,
                0.06
              );
          }

          .heroLabel {
            display: block;

            margin-bottom:
              7px;

            color: #c99435;

            font-size: 11px;

            font-weight: 700;

            letter-spacing:
              1.4px;

            text-transform:
              uppercase;
          }

          .desktopHero h1 {
            margin: 0;

            color: #641010;

            font-family:
              Georgia,
              "Times New Roman",
              serif;

            font-size: 34px;
          }

          .desktopHero p {
            margin:
              8px 0 0;

            color: #776d65;

            font-size: 14px;
          }

          .heroIcon {
            width: 84px;
            height: 84px;

            display: grid;

            place-items:
              center;

            flex-shrink: 0;

            border:
              1px solid
              #dec182;

            border-radius:
              50%;

            background:
              #fffdf8;

            font-size: 41px;
          }

          /* TWO COLUMN */

          .content {
            width:
              calc(
                100% - 80px
              );

            max-width:
              1320px;

            display: grid;

            grid-template-columns:
              minmax(
                0,
                1fr
              )
              360px;

            align-items:
              start;

            gap: 28px;

            margin: 0 auto;

            padding:
              28px 0 0;
          }

          .mainColumn {
            padding: 26px;

            border:
              1px solid
              #eadbc5;

            border-radius:
              20px;

            background:
              #fffdf8;

            box-shadow:
              0 8px 26px
              rgba(
                82,
                48,
                18,
                0.05
              );
          }

          .sevaCard {
            padding: 17px;

            border-radius:
              14px;
          }

          .sevaIcon {
            width: 68px;
            height: 68px;

            font-size: 33px;
          }

          .sevaInfo > span {
            display: block;

            margin-bottom:
              3px;

            color: #9a762f;

            font-size: 10px;

            font-weight: 700;

            letter-spacing:
              1px;

            text-transform:
              uppercase;
          }

          .sevaCard h2 {
            font-size: 22px;
          }

          .sevaCard p {
            font-size: 16px;
          }

          .sectionTitle {
            margin:
              25px 0 11px;

            font-size: 18px;
          }

          .typeTabs {
            gap: 13px;
          }

          .typeTabs button {
            min-height: 88px;

            padding:
              15px 17px;

            border-radius:
              12px;
          }

          .typeTabs button:hover {
            transform:
              translateY(-2px);

            border-color:
              #d6b77d;
          }

          .typeIcon {
            width: 39px;
            height: 39px;

            font-size: 16px;
          }

          .typeTabs strong {
            font-size: 15px;
          }

          .typeTabs span {
            font-size: 11px;
          }

          .autoBox {
            padding: 18px;

            border-radius:
              13px;
          }

          .autoIcon {
            width: 40px;
            height: 40px;
          }

          .autoTitle strong {
            font-size: 15px;
          }

          .autoTitle p {
            font-size: 11px;
          }

          .autoBox h3 {
            font-size: 13px;
          }

          .frequency button {
            min-height: 64px;

            border-radius:
              10px;
          }

          .frequency button:hover {
            border-color:
              #a71919;
          }

          .frequency strong {
            font-size: 13px;
          }

          .frequency span {
            font-size: 10px;
          }

          .amountGrid {
            grid-template-columns:
              repeat(
                5,
                minmax(0, 1fr)
              );

            gap: 10px;
          }

          .amountGrid button {
            height: 52px;

            border-radius:
              10px;

            font-size: 15px;
          }

          .amountGrid button:hover {
            border-color:
              #a71919;
          }

          .customBox {
            height: 54px;
          }

          .methods {
            gap: 10px;
          }

          .methods button {
            min-height: 68px;

            padding:
              11px 15px;

            border-radius:
              11px;
          }

          .methods button:hover {
            transform:
              translateY(-1px);

            border-color:
              #d7b97f;
          }

          .methodIcon {
            width: 38px;
            height: 38px;

            font-size: 14px;
          }

          .methods strong {
            font-size: 14px;
          }

          .methods small {
            font-size: 10px;
          }

          /* SUMMARY */

          .summaryColumn {
            display: block;

            position: sticky;

            top: 28px;
          }

          .summaryCard {
            padding:
              26px 24px;

            border:
              1px solid
              #eadbc5;

            border-radius:
              20px;

            background:
              #fffdf8;

            box-shadow:
              0 10px 30px
              rgba(
                80,
                45,
                15,
                0.07
              );
          }

          .summaryLabel {
            display: block;

            margin-bottom:
              7px;

            color: #c99435;

            font-size: 10px;

            font-weight: 700;

            letter-spacing:
              1.2px;

            text-transform:
              uppercase;
          }

          .summaryCard h2 {
            margin:
              0 0 23px;

            color: #641010;

            font-family:
              Georgia,
              "Times New Roman",
              serif;

            font-size: 23px;
          }

          .summaryRow {
            display: flex;

            align-items:
              center;

            justify-content:
              space-between;

            gap: 12px;

            margin-top:
              14px;

            color: #776d65;

            font-size: 12px;
          }

          .summaryRow strong {
            color: #433932;

            text-align:
              right;

            font-size: 12px;
          }

          .summaryDivider {
            height: 1px;

            margin:
              22px 0 18px;

            background:
              #eadbc5;
          }

          .totalRow {
            display: flex;

            align-items:
              center;

            justify-content:
              space-between;

            gap: 15px;
          }

          .totalRow span {
            color: #776d65;

            font-size: 13px;
          }

          .totalRow strong {
            color: #a71919;

            font-family:
              Georgia,
              "Times New Roman",
              serif;

            font-size: 25px;
          }

          .desktopPay {
            display: block;

            height: 55px;

            margin-top:
              24px;

            border-radius:
              12px;

            font-size: 15px;
          }

          .pay:hover {
            background:
              #7f1111;

            transform:
              translateY(-1px);
          }

          .mobilePayment {
            display: none;
          }

          .secure {
            margin-top:
              14px;

            font-size: 10px;
          }

          .mandateNote {
            margin:
              12px 0 0;

            font-size: 9px;
          }
        }

        /* ==========================================
           LARGE DESKTOP
        ========================================== */

        @media (
          min-width: 1440px
        ) {
          .desktopHero,
          .content {
            max-width:
              1420px;
          }

          .desktopHero {
            min-height:
              155px;

            padding:
              30px 38px;
          }

          .desktopHero h1 {
            font-size: 38px;
          }

          .heroIcon {
            width: 92px;
            height: 92px;

            font-size: 45px;
          }

          .content {
            grid-template-columns:
              minmax(
                0,
                1fr
              )
              390px;

            gap: 32px;
          }

          .mainColumn {
            padding: 30px;
          }

          .summaryCard {
            padding:
              30px 28px;
          }
        }
      `}</style>
    </main>
  );
}