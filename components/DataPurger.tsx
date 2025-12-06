"use client";

import { useEffect } from "react";

export function DataPurger() {
    useEffect(() => {
        try {
            // 1. Purge Cart Storage if corrupt
            const cartRaw = localStorage.getItem("sadec-cart-storage");
            if (cartRaw) {
                const cart = JSON.parse(cartRaw);
                if (cart && cart.state && Array.isArray(cart.state.items)) {
                    const hasNulls = cart.state.items.some((i: any) => i === null || i === undefined);
                    if (hasNulls) {
                        console.error("DataPurger: Found null items in cart. PURGING.");
                        localStorage.removeItem("sadec-cart-storage");
                        window.location.reload();
                    }
                }
            }

            // 2. Purge Wishlist if corrupt
            const wishlistRaw = localStorage.getItem("sadec_wishlist");
            if (wishlistRaw) {
                const wishlist = JSON.parse(wishlistRaw);
                if (Array.isArray(wishlist)) {
                    const hasNulls = wishlist.some((i: any) => i === null || i === undefined);
                    if (hasNulls) {
                        console.error("DataPurger: Found null items in wishlist. PURGING.");
                        localStorage.removeItem("sadec_wishlist");
                        window.location.reload();
                    }
                }
            }

        } catch (e) {
            console.error("DataPurger error:", e);
            // If JSON parse fails, data is definitely corrupt. Wipe it.
            localStorage.removeItem("sadec-cart-storage");
            localStorage.removeItem("sadec_wishlist");
            window.location.reload();
        }
    }, []);

    return null;
}
