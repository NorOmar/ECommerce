/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let WishlistContext = createContext()

export default function WishlistContextProvider(props) {
    const [WishId, setWishId] = useState(0)
    const [numderItemsWish, setnumderItemsWish] = useState(0)

    let headers = {
        token: localStorage.getItem("userToken"),
    };

    function addProductToWishlist(productId) {
        return axios
            .post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
                {
                    productId: productId,
                },
                {
                    headers,
                }
            )
            .then((res) => res)
            .catch((res) => res);
    }

    function getLoggedUserWishlist() {
        return axios
            .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers })
            .then((res) => {
                console.log(res.data.count)
                setnumderItemsWish(res.data.count);
                setWishId(res.data.data._id)
                return res;
            })
            .catch((err) => err)
    }

    function deleteProductToWishlist(productId) {
        return axios
            .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { headers })
            .then((res) => res)
            .catch((err) => err)
    }

    useEffect(() => {
        getLoggedUserWishlist();
    }, [])

    return <WishlistContext.Provider value={{
        addProductToWishlist,
        getLoggedUserWishlist,
        deleteProductToWishlist,
        WishId,
        numderItemsWish,
        setnumderItemsWish
    }}>
        {props.children}
    </WishlistContext.Provider>
}