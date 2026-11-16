
import type { Computer } from "#lib/types.ts";

const Computers: Computer[] = [
  {
    brand: "Apple",
    model: "Macbook Pro 2024 November",
    url: "https://www.apple.com/au/newsroom/2024/10/new-macbook-pro-features-m4-family-of-chips-and-apple-intelligence/",
    price: 2499,
    operatingSystem: "macOS Seqouia",
    description: "Base-model with M4 chip",
  },
  {
    brand: "Asus",
    model: "VivoBook TP1400KA",
    url: "https://www.asus.com/au/laptops/for-home/vivobook/vivobook-go-14-flip-tp1400/",
    price: 499,
    operatingSystem: "NixOS",
    description: "A laptop used for a backup server",
  },
  {
    brand: "Custom Build",
    model: "Custom Build",
    price: 1700,
    description: "A custom built computer which is currently broken",
    operatingSystem: "NixOS",
    url: "https://au.pcpartpicker.com/user/InvraNet/saved/#view=B3hV4D",
    parts: [
      {
        brand: "Intel",
        model: "15-10400",
        price: 345,
      },
      {
        brand: "Cooler Master",
        model: "Hyper H412R",
        price: 25,
      },
      {
        brand: "MSi",
        model: "Z490-A PRO LGA1200",
        price: 250,
      },
      {
        brand: "G.Skill",
        model: "Ripjaws V 64GB (2 x 32GB)",
        price: 179,
      },
      {
        brand: "Seagate",
        model: "Barracuda Computer 8TB (ST8000DM003)",
        price: 249,
      },
      {
        brand: "Micron (Crucial)",
        model: "P3 2TB NVMe",
        price: 159,
      },
      {
        brand: "Western Digital",
        model: "SN570 500GB NVMe",
        price: 99,
      },
      {
        brand: "Sapphire",
        model: "PULSE Radeon RX 6700XT 12GB",
        price: 229,
      },
      {
        brand: "Deepcool",
        model: "MATREXX 50 ADD-RGB ATX Case",
        price: 129,
      },
      {
        brand: "Gigabyte",
        model: "UD850GM 850W 80+ Gold PSU",
        price: 159,
      },
    ],
  },
];

export default Computers;
