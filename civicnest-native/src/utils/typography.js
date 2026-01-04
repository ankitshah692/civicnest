import { fontSizes } from "../theme.js";

export const getScale = (textScale) => {
  if (textScale === "large") {
    return 1.15;
  }
  if (textScale === "xlarge") {
    return 1.3;
  }
  return 1;
};

export const scaledSize = (size, scale) => Math.round(size * scale);

export const textStyles = (scale) => ({
  xs: { fontSize: scaledSize(fontSizes.xs, scale) },
  sm: { fontSize: scaledSize(fontSizes.sm, scale) },
  base: { fontSize: scaledSize(fontSizes.base, scale) },
  lg: { fontSize: scaledSize(fontSizes.lg, scale) },
  xl: { fontSize: scaledSize(fontSizes.xl, scale) },
  "2xl": { fontSize: scaledSize(fontSizes["2xl"], scale) },
  "3xl": { fontSize: scaledSize(fontSizes["3xl"], scale) },
});
