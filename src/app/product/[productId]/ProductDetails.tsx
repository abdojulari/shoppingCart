'use client';

import SetColor from '@/app/components/products/SetColor';
import { SetQuantity } from '@/app/components/products/SetQuantity';
import { Rating } from '@mui/material';
import PreviousMap from 'postcss/lib/previous-map';
import React, { useCallback, useState } from 'react';

interface ProductDetailsProps {
  product: any;
}

export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  price: number;
  selectedImg: SelectedImgType;
  quantity: number;
};

export type SelectedImgType = {
  color: string;
  colorCode: string;
  image: string;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    price: product.price,
    selectedImg: { ...product.images[0] },
    quantity: product.quantity,
  });

  console.log('cartProduct', cartProduct);
  const productRating =
    product.reviews.reduce((total: number, item: any) => total + item.rating, 0) / product.reviews.length;

  const Horizontal = () => {
    return <hr className="w-[30%]"></hr>;
  };

  const handleColorSelect = useCallback(
    (value: SelectedImgType) => {
      setCartProduct((prev) => {
        return { ...prev, selectedImg: value };
      });
    },
    [cartProduct.selectedImg],
  );

  const handleQtyDecrease = useCallback(() => {
    if (cartProduct.quantity === 1) return;
    setCartProduct((prev) => {
      return { ...prev, quantity: --prev.quantity };
    });
  }, [cartProduct]);

  const handleQtyIncrease = useCallback(() => {
    if (cartProduct.quantity === 99) return;
    setCartProduct((prev) => {
      return { ...prev, quantity: ++prev.quantity };
    });
  }, [cartProduct]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div>images</div>
      <div className="text-slate-500 text-sm">
        <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
        <div className="flex items-center gap-2">
          <Rating value={productRating} readOnly />
          <div>{product.reviews.length} reviews</div>
        </div>
        <div className="text-justify">{product.description}</div>
        <Horizontal />
        <div className="pb-2">
          <span className="font-semibold">CATEGORY:</span>
          {product.category}
        </div>
        <div className="pb-2">
          <span className="font-semibold">BRAND:</span>
          {product.brand}
        </div>
        <div className={product.inStock ? 'text-teal-500' : 'text-rose-400'}>
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </div>
        <Horizontal />
        <SetColor cartProduct={cartProduct} images={product.images} handleColorSelect={handleColorSelect} />
        <Horizontal />
        <SetQuantity
          isQtyLabelNeeded={true}
          cartProduct={cartProduct}
          handleQtyDecrease={handleQtyDecrease}
          handleQtyIncrease={handleQtyIncrease}
        />
        <Horizontal />
      </div>
    </div>
  );
};

export default ProductDetails;
