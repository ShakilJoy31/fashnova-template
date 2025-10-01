import Marquee from "react-fast-marquee";

interface NavberMarqueProps {
  items: string[];
  speed?: number;
}

export function NavberMarque({ items, speed = 50 }: NavberMarqueProps) {
  return (
    <Marquee speed={speed} gradient={false}>
      {items.map((item, index) => (
        <span key={index} style={{ marginRight: "2rem" }}>
          {item}
        </span>
      ))}
    </Marquee>
  );
}
