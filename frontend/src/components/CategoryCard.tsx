import Image from "next/image";
import Link from "next/link";

const CategoryCard = ({ title, imageSrc, count }: { title: string; imageSrc: string; count: number }) => {
  return (
    <Link href={`/category/${title.toLowerCase().replace(/\s+/g, "-")}`}>
      <div className="relative h-36 rounded-lg overflow-hidden group">
        <Image
          src={imageSrc || "/placeholder-category.jpg"}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-3 text-white">
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm opacity-80">{count} spaces</p>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
