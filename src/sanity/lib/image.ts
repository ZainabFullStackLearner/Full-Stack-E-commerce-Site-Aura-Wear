import imageUrlBuilder from '@sanity/image-url';
import { client } from './client'; // replace with your sanity client
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
