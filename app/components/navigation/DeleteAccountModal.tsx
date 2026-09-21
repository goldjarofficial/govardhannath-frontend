"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  onClose: () => void;
  onDrawerClose: () => void;
};

export default function DeleteAccountModal({
  onClose,
  onDrawerClose,
}: Props) {
  const router = useRouter();

  const [deleting, setDeleting] =
    useState(false);

  const [confirmText, setConfirmText] =
    useState("");

  const canDelete =
    confirmText.trim().toUpperCase() ===
    "DELETE";

  /* =========================================================
     ESCAPE CLOSE
  ========================================================= */

  useEffect(() => {
    const handleEscape = (
      event: KeyboardEvent
    ) => {
      if (
        event.key === "Escape" &&
        !deleting
      ) {
        onClose();
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [deleting, onClose]);

  /* =========================================================
     DELETE ACCOUNT
  ========================================================= */

  const handleDeleteAccount =
    async () => {
      if (!canDelete || deleting) {
        return;
      }

      try {
        setDeleting(true);

        const token =
          localStorage.getItem(
            "auth-token"
          );

        /*
        ======================================================
        REAL BACKEND DELETE ACCOUNT API
        ======================================================

        Backend endpoint milne ke baad
        ye code enable karna:

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/account`,
          {
            method: "DELETE",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const data =
            await response
              .json()
              .catch(() => null);

          throw new Error(
            data?.message ||
              "Unable to delete account"
          );
        }

        ======================================================
        IMPORTANT
        ======================================================

        Backend successful response ke
        BAAD hi token remove karna:

        localStorage.removeItem(
          "auth-token"
        );

        onClose();
        onDrawerClose();

        router.replace("/login");

        ======================================================
        */

        console.log(
          "Delete Account requested",
          {
            tokenExists: Boolean(token),
          }
        );

        /*
          TEMPORARY:

          Backend API abhi connected nahi hai,
          isliye actual account delete nahi
          kar rahe.

          Backend connect hone par upar ka
          fetch enable karna.
        */

        alert(
          "Delete Account API is not connected yet."
        );
      } catch (error) {
        console.error(
          "Delete account error:",
          error
        );

        alert(
          error instanceof Error
            ? error.message
            : "Unable to delete account"
        );
      } finally {
        setDeleting(false);
      }
    };

  /* =========================================================
     UI
  ========================================================= */

  return (
    <div
      className="
        fixed
        inset-0
        z-[1200]

        flex
        items-center
        justify-center

        bg-[#21150f]/60

        px-4
        py-6

        backdrop-blur-[5px]
      "
      onClick={() => {
        if (!deleting) {
          onClose();
        }
      }}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-title"
        aria-describedby="delete-description"
        onClick={(event) =>
          event.stopPropagation()
        }
        className="
          w-full
          max-w-[410px]

          overflow-hidden

          rounded-[22px]

          border
          border-[#ead1cc]

          bg-[#fffaf7]

          shadow-[0_25px_80px_rgba(42,16,12,0.32)]
        "
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            relative

            border-b
            border-[#f0ddd8]

            bg-[linear-gradient(135deg,#fff4f1,#fffaf7)]

            px-5
            pb-5
            pt-6

            text-center

            sm:px-6
          "
        >
          {/* CLOSE */}

          <button
            type="button"
            disabled={deleting}
            onClick={onClose}
            aria-label="Close delete account"
            className="
              absolute
              right-4
              top-4

              grid
              h-8
              w-8
              place-items-center

              rounded-full

              border
              border-[#ead6d1]

              bg-white

              text-[20px]
              leading-none
              text-[#856d67]

              transition

              hover:bg-[#fff0ed]

              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            ×
          </button>

          {/* DELETE ICON */}

          <div
            className="
              mx-auto

              grid
              h-[68px]
              w-[68px]
              place-items-center

              rounded-full

              border
              border-[#f2ccc5]

              bg-[#ffe8e3]

              text-[#b42318]

              shadow-[0_6px_18px_rgba(180,35,24,0.08)]
            "
          >
            <DeleteIcon />
          </div>

          <p
            className="
              mt-4

              text-[8px]
              font-bold
              uppercase
              tracking-[0.13em]

              text-[#ba655c]
            "
          >
            ACCOUNT ACTION
          </p>

          <h2
            id="delete-title"
            className="
              mt-1

              font-serif
              text-[22px]
              font-bold

              text-[#761c17]

              sm:text-[24px]
            "
          >
            Delete Account?
          </h2>

          <p
            id="delete-description"
            className="
              mx-auto
              mt-2
              max-w-[330px]

              text-[10px]
              leading-5

              text-[#84736b]

              sm:text-[11px]
            "
          >
            This permanently removes your
            account after the server confirms
            the deletion. This action cannot
            be undone.
          </p>
        </div>

        {/* =================================================
            CONTENT
        ================================================= */}

        <div className="p-5 sm:p-6">
          {/* WARNING */}

          <div
            className="
              rounded-[14px]

              border
              border-[#efcec8]

              bg-[#fff1ef]

              p-4
            "
          >
            <div
              className="
                flex
                items-start
                gap-3
              "
            >
              <span
                className="
                  grid
                  h-8
                  w-8
                  shrink-0
                  place-items-center

                  rounded-full

                  bg-[#ffe0da]

                  text-[14px]
                  text-[#b42318]
                "
              >
                !
              </span>

              <div>
                <h3
                  className="
                    text-[10px]
                    font-bold
                    text-[#9e2b22]
                  "
                >
                  This action is permanent
                </h3>

                <p
                  className="
                    mt-1

                    text-[9px]
                    leading-[17px]

                    text-[#9a625c]
                  "
                >
                  Your profile and other
                  account-related information
                  may no longer be accessible
                  after deletion.
                </p>
              </div>
            </div>
          </div>

          {/* ===============================================
              CONFIRMATION
          =============================================== */}

          <div className="mt-5">
            <label
              htmlFor="delete-confirm"
              className="
                block

                text-[10px]
                font-semibold

                text-[#66574f]
              "
            >
              Type{" "}
              <strong className="text-[#b42318]">
                DELETE
              </strong>{" "}
              to confirm
            </label>

            <input
              id="delete-confirm"
              type="text"
              value={confirmText}
              disabled={deleting}
              onChange={(event) =>
                setConfirmText(
                  event.target.value
                )
              }
              autoComplete="off"
              placeholder="Type DELETE"
              className="
                mt-2

                h-[46px]
                w-full

                rounded-xl

                border
                border-[#dfd1ca]

                bg-white

                px-3

                text-[12px]
                font-semibold
                text-[#51453e]

                outline-none

                transition

                placeholder:text-[#b5a8a1]

                focus:border-[#bd6259]
                focus:ring-2
                focus:ring-[#bd6259]/10

                disabled:bg-[#f7f2ef]
                disabled:opacity-60
              "
            />
          </div>

          {/* ===============================================
              BUTTONS
          =============================================== */}

          <div
            className="
              mt-5

              grid
              grid-cols-2
              gap-3
            "
          >
            <button
              type="button"
              disabled={deleting}
              onClick={onClose}
              className="
                min-h-[45px]

                rounded-xl

                border
                border-[#ddd0c8]

                bg-white

                px-4

                text-[11px]
                font-bold

                text-[#62554d]

                transition

                hover:bg-[#f8f3ef]

                active:scale-[0.98]

                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={
                !canDelete ||
                deleting
              }
              onClick={
                handleDeleteAccount
              }
              className="
                min-h-[45px]

                rounded-xl

                bg-[#b42318]

                px-4

                text-[11px]
                font-bold

                text-white

                shadow-[0_6px_16px_rgba(180,35,24,0.18)]

                transition

                hover:bg-[#941e16]

                active:scale-[0.98]

                disabled:cursor-not-allowed
                disabled:bg-[#d8aaa5]
                disabled:shadow-none
              "
            >
              {deleting
                ? "Deleting..."
                : "Delete Account"}
            </button>
          </div>

          {/* INFO */}

          <p
            className="
              mt-4

              text-center
              text-[8px]
              leading-4

              text-[#a09289]
            "
          >
            If you do not want to permanently
            delete your account, select Cancel
            and use Logout instead.
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   DELETE ICON
========================================================= */

function DeleteIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-7 w-7"
      aria-hidden="true"
    >
      <path d="M3 6h18" />

      <path d="M8 6V4h8v2" />

      <path d="M19 6l-1 14H6L5 6" />

      <path d="M10 11v5" />

      <path d="M14 11v5" />
    </svg>
  );
}