// Mock product and coupon data
export const PRODUCTS = [
  { id: 1, name: "Wireless Headphones", image: "/images/WirelessHeadphones.jpg", price: 2999, desc: "Premium noise-cancelling sound" },
  { id: 2, name: "Mechanical Keyboard", image: "/images/MechanicalKeyboard.jpg", price: 4500, desc: "Tactile RGB backlit switches" },
  { id: 3, name: "4K Webcam", image: "/images/4kWebcam.jpg", price: 3200, desc: "Crystal-clear video calls" },
  { id: 4, name: "USB-C Hub", image: "/images/USB-C Hub.jpg", price: 1800, desc: "7-in-1 multiport adapter" },
  { id: 5, name: "LED Desk Lamp", image: "/images/LedDeskLamp.jpg", price: 1200, desc: "Eye-care dimmable light" },
  { id: 6, name: "Mouse Pad XL", image: "/images/MousePad.jpg", price: 800, desc: "Stitched edges, smooth glide" },
];

export const COUPONS = {
  SAVE10: { type: "percent", value: 10, label: "10% off" },
  FLAT200: { type: "flat", value: 200, label: "Rs. 200 off" },
  URBA50: { type: "percent", value: 50, label: "50% off" },
};