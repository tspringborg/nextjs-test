import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import React, {ChangeEvent, useEffect, useState} from "react";
import {use} from "ast-types";
import {IProduct} from "../interfaces/IProduct";
import {debounce} from 'lodash';
import {useRouter} from "next/router";
import SearchInput from "../SearchInput";

type ProductsQuery = {
  s: string;
}

const Home: NextPage = () => {
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const router = useRouter();
  const [searchValue, setSearchValue] = useState<string>('');
  useEffect(() => {
    const params = router.query as ProductsQuery;
    setSearchValue(params.s || '');
  }, [router.isReady]);
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
        .then(res=>res.json())
        .then(setProducts);
  }, []);

  useEffect(() => {
    setFilteredProducts(
        products.filter((p) => {
          return p.title.toLowerCase().includes(searchValue.toLowerCase());
        })
    )
  }, [searchValue, products]);

  const debouncedInputChange = debounce((str: string) => {
    setSearchValue(str);
    router.push({
      pathname: window.location.pathname,
      query: {s: str}
    });
  }, 10, {trailing: true});
  return (
    <div className={styles.container}>
      <SearchInput  value={searchValue} onValueChange={debouncedInputChange}/>
      {filteredProducts.map((product) => {
        return (
            <div className={styles.product} key={product.id}>
              <img src={product.image} alt=""/>
              <h2>{product.title}</h2>
            </div>
        )
      })}
    </div>
  )
};

export default Home
