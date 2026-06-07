/**
 * Product metadata for the Blueprint.
 *
 * This is the single place a new product sets its name/description. Replace
 * these values (or run scripts/factory/new-product.sh) when instantiating the
 * blueprint for a real product.
 */
export const SITE = {
  name: "Blueprint App",
  description:
    "A product scaffold built with the Development Factory. Replace this with your product.",
  tagline: "Built with the Development Factory",
} as const;
