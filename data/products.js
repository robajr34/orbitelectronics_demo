import { initialProducts, initialCategories } from "@/lib/adminData";

export const categories = [
  ...initialCategories,
  { id: "small-appliances", name: "Small Appliances", slug: "small-appliances", image: "/images/categories/small-appliances.jpg" },
];

export const products = initialProducts.map((p) => ({
  ...p,
  reviews: p.reviewsCount || 45,
  availability: p.stock > 10 ? "In Stock" : p.stock > 0 ? "Low Stock" : "Out of Stock",
  previousPrice: p.previousPrice || (p.discount ? Math.round(p.price * 1.15) : null),
  discount: p.discount || 0,
}));
