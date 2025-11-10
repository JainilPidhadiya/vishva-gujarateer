import { DestinationCard } from "./DestinationCard";
import somnathImg from "@/assets/somnath.jpg";
import statueUnityImg from "@/assets/statue-unity.jpg";
import girImg from "@/assets/gir-lions.jpg";
import dwarkaImg from "@/assets/dwarka.jpg";
import diuBeachImg from "@/assets/diu-beach.jpg";
import raniKiVavImg from "@/assets/rani-ki-vav.jpg";
import sabarmatiImg from "@/assets/sabarmati.jpg";
import rannKutchImg from "@/assets/rann-kutch.jpg";

export const DiscoverSection = () => {
  const destinations = [
    {
      image: somnathImg,
      title: "Somnath Temple",
      description: "One of the twelve Jyotirlinga shrines of Lord Shiva, beautifully situated by the Arabian Sea with stunning sunset views.",
      category: "Religious",
      duration: "2-3 hours",
      rating: 4.8,
    },
    {
      image: statueUnityImg,
      title: "Statue of Unity",
      description: "World's tallest statue at 182 meters, honoring Sardar Vallabhbhai Patel with spectacular valley views and attractions.",
      category: "Monument",
      duration: "Half day",
      rating: 4.9,
    },
    {
      image: girImg,
      title: "Gir National Park",
      description: "The only natural habitat of Asiatic lions in the world. Safari experiences through rich wildlife and diverse ecosystems.",
      category: "Wildlife",
      duration: "Full day",
      rating: 4.7,
    },
    {
      image: dwarkaImg,
      title: "Dwarka",
      description: "Ancient city and one of the seven most sacred Hindu pilgrimage sites, known for the magnificent Dwarkadhish Temple.",
      category: "Religious",
      duration: "Full day",
      rating: 4.8,
    },
    {
      image: diuBeachImg,
      title: "Diu Beaches",
      description: "Pristine coastal paradise with turquoise waters, palm-fringed beaches, and Portuguese colonial architecture.",
      category: "Beach",
      duration: "Full day",
      rating: 4.6,
    },
    {
      image: raniKiVavImg,
      title: "Rani ki Vav",
      description: "UNESCO World Heritage stepwell with intricate stone carvings, showcasing ancient Indian architecture and engineering.",
      category: "Heritage",
      duration: "2-3 hours",
      rating: 4.9,
    },
    {
      image: sabarmatiImg,
      title: "Sabarmati Ashram",
      description: "Mahatma Gandhi's residence during the freedom struggle, now a peaceful museum preserving India's independence history.",
      category: "Historical",
      duration: "2-3 hours",
      rating: 4.7,
    },
    {
      image: rannKutchImg,
      title: "Rann of Kutch",
      description: "Vast white salt desert offering breathtaking sunset views, cultural festivals, and unique desert experiences.",
      category: "Natural",
      duration: "Full day",
      rating: 4.9,
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Discover Gujarat
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From ancient temples to pristine beaches, from wildlife sanctuaries to architectural wonders — discover the diverse beauty of Gujarat
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest, index) => (
            <DestinationCard key={index} {...dest} />
          ))}
        </div>
      </div>
    </section>
  );
};
