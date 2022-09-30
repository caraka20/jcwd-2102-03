import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddProductForm from "../../component/admin/Forms/AddProductForm";
import TableProduct from "../../component/admin/Tables/TableProduct";

export default function Testing(){

    return(
        // <AddProductForm></AddProductForm>
        <TableProduct></TableProduct>
    )
}