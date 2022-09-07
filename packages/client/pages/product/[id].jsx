import React from "react";

import HeadPage from "../../src/Component/Head";
import { BreadCrumb } from "../../src/Component/BreadCrumb";
import { Layout } from "../../src/layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { ProductDetailContainer } from "../../Product/DetailContainer";

const ProductDetail = ({ val }) => {
  const router = useRouter();
  const url = `http://localhost:3000${router.pathname}`;
  const filter = useSelector((state) => state.filterReducer);
  console.log(val);

  return (
    <Layout>
      <HeadPage
        title={`Medicure || ${val.name}`}
        //   description={dataPost?.caption}
        image={val.image_product}
        url={url}
        type="website"
      />
      <BreadCrumb
        data={
          filter.category
            ? [
                ["#", "Homepage"],
                ["#", filter.category],
                ["#", val.name],
              ]
            : [
                ["#", "Homepage"],
                ["#", val.name],
              ]
        }
      />
      <ProductDetailContainer val={val} />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;
  const res = await axios.get(
    `http://localhost:3333/product/${id}/description`
  );
  return {
    props: {
      val: res.data.result[0],
    },
  };
}

export default ProductDetail;
