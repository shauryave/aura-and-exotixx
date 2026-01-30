
import { useState, useEffect } from 'react';
import { Product, SiteConfig, CartItem, User } from '../types';
import { INITIAL_PRODUCTS, INITIAL_CONFIG } from '../constants';

const PRODUCTS_KEY = 'aura_exotixx_products';
const CONFIG_KEY = 'aura_exotixx_config';
const CART_KEY = 'aura_exotixx_cart';
const USER_KEY = 'aura_exotixx_user';

export function useStore() {
  const [products, setProducts] = useState<Product[]>([]);
  const [config, setConfig] = useState<SiteConfig>(INITIAL_CONFIG);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedProducts = localStorage.getItem(PRODUCTS_KEY);
    const savedConfig = localStorage.getItem(CONFIG_KEY);
    const savedCart = localStorage.getItem(CART_KEY);
    const savedUser = localStorage.getItem(USER_KEY);

    if (savedProducts) setProducts(JSON.parse(savedProducts));
    else setProducts(INITIAL_PRODUCTS);

    if (savedConfig) setConfig(JSON.parse(savedConfig));
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedUser) setUser(JSON.parse(savedUser));

    setLoading(false);
  }, []);

  const login = (email: string) => {
    // Admin check for your specific email
    const isAdmin = email.toLowerCase() === 'shauryave1717@gmail.com';
    const newUser = { email, isAdmin };
    setUser(newUser);
    localStorage.setItem(USER_KEY, JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(USER_KEY);
  };

  const updateProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(newProducts));
  };

  const updateConfig = (newConfig: SiteConfig) => {
    setConfig(newConfig);
    localStorage.setItem(CONFIG_KEY, JSON.stringify(newConfig));
  };

  const addToCart = (product: Product, size: string) => {
    const existingIndex = cart.findIndex(item => item.id === product.id && item.selectedSize === size);
    let newCart;
    if (existingIndex > -1) {
      newCart = cart.map((item, index) => 
        index === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      newCart = [...cart, { ...product, selectedSize: size, quantity: 1 }];
    }
    setCart(newCart);
    localStorage.setItem(CART_KEY, JSON.stringify(newCart));
  };

  const removeFromCart = (productId: string, size: string) => {
    const newCart = cart.filter(item => !(item.id === productId && item.selectedSize === size));
    setCart(newCart);
    localStorage.setItem(CART_KEY, JSON.stringify(newCart));
  };

  const updateQuantity = (productId: string, size: string, delta: number) => {
    const newCart = cart.map(item => {
      if (item.id === productId && item.selectedSize === size) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    });
    setCart(newCart);
    localStorage.setItem(CART_KEY, JSON.stringify(newCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem(CART_KEY);
  };

  return { 
    products, config, cart, user,
    login, logout,
    updateProducts, updateConfig, 
    addToCart, removeFromCart, updateQuantity, clearCart,
    loading 
  };
}
