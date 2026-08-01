import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getProductBySlug, getProductsByIds, getReviews, getAllProducts,
} from "@/lib/data/repository";
import { ProductDetail } from "@/components/product/ProductDetail";
import { formatPrice } from "@/lib/utils/cn";

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Not found" };
  return {
    title: product.seo.title,
    description: product.seo.description,
    openGraph: { title: product.title, description: product.subtitle, images: [product.image] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const completes = getProductsByIds(product.completesWith);
  const alsoBought = getProductsByIds(product.alsoBought);
  const reviews = getReviews(product);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.seo.description,
    image: product.images,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "INR",
      availability: product.signals.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.reviews.avg,
      reviewCount: product.reviews.count,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <span className="sr-only">{formatPrice(product.price)}</span>
      <ProductDetail product={product} completes={completes} alsoBought={alsoBought} reviews={reviews} />
    </>
  );
}
