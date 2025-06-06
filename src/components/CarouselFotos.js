import Slider from "react-slick";
import { Image } from "semantic-ui-react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

// Importando as imagens diretamente do assets
import foto1 from "../assets/livro1.jpeg";
import foto3 from "../assets/livro2.jpeg";
import foto2 from "../assets/livro3.jpeg";
// Adicione mais conforme necessário

export default function CarouselFotos() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const imagens = [foto1, foto2, foto3];

  return (
    <Slider {...settings}>
      {imagens.map((src, index) => (
        <div key={index}>
          <Image
            src={src}
            alt={`Foto ${index + 1}`}
            style={{
              width: "300px",
              height: "400px",
              margin: "0 auto",
            }}
          />
        </div>
      ))}
    </Slider>
  );
}
