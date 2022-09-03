import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../sanity/sanity";

const builder = imageUrlBuilder(sanityClient);

export default function urlFor(src) {
  return builder.image(src);
}
