// https://medium.com/@kavindumadushanka972/learn-how-to-create-dynamic-blur-data-urls-for-images-in-next-js-bc4eb5d04ec6

// export async function dynamicBlurDataUrl(url: string): Promise<string> {
//   const baseUrl =
//     process.env.NODE_ENV === "development"
//       ? "http://localhost:3000"
//       : process.env.NEXT_PUBLIC_DOMAIN ?? ""; // Ensure there is a fallback if the environment variable is undefined

//   const response = await fetch(
//     `${baseUrl}/_next/image?url=${encodeURIComponent(url)}&w=16&q=75`
//   );
//   const blob = await response.blob();
//   return new Promise<string>((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onloadend = function () {
//       const base64data = reader.result as string; // Cast result to string
//       resolve(base64data);
//     };
//     reader.readAsDataURL(blob);
//   });
// }

// utils/dynamicBlurDataUrl.ts
export async function dynamicBlurDataUrl(url: string): Promise<string> {
  // Assuming your base URL setup checks if environment variables are correctly set.
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.NEXT_PUBLIC_DOMAIN ?? "";

  const targetUrl = url.startsWith("http") ? url : `${baseUrl}${url}`;

  try {
    const response = await fetch(`${targetUrl}&w=16&q=75`); // Use small size for blurDataURL
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    const blob = await response.blob();
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = function () {
        const base64data = reader.result as string;
        resolve(base64data);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Error fetching and processing image:", error);
    return ""; // Return an empty string or handle accordingly
  }
}
