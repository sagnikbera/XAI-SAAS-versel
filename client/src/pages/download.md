```js
const downloadImage = async () => {
  try {
    // 1. Fetch the image from the URL in "content"
    const response = await fetch(content);

    // 2. Turn that response into a "blob" (a raw file object)
    const blob = await response.blob();

    // 3. Create a temporary local link (like "blob:http://...")
    const url = window.URL.createObjectURL(blob);

    // 4. Create an invisible <a> (anchor) element
    const link = document.createElement("a");
    link.href = url; // point it to the blob URL
    link.download = "processed-image.png"; // file name when saved

    // 5. Add that <a> into the page, "click" it programmatically
    document.body.appendChild(link);
    link.click();

    // 6. Remove the <a> after download so it doesn’t clutter the page
    document.body.removeChild(link);

    // 7. Release the temporary URL from memory
    window.URL.revokeObjectURL(url);
  } catch (error) {
    toast.error("Failed to download image");
  }
};
```