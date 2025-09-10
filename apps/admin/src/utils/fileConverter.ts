export const fileToBuffer = (file: File): Promise<ArrayBuffer> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });

export const bufferToFile = (
  buffer: ArrayBuffer,
  fileName: string,
  mimeType: string,
): File => {
  const blob = new Blob([buffer], { type: mimeType });
  return new File([blob], fileName, { type: mimeType });
};
