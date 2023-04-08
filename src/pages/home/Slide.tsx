import styled from "styled-components";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import slide1 from "../../assets/images/slide/before_1.jpg";
import slide2 from "../../assets/images/slide/after_1.jpg";
import slide3 from "../../assets/images/slide/before_2.jpg";
import slide4 from "../../assets/images/slide/after_2.jpg";
import slide5 from "../../assets/images/slide/before_4.jpg";
import slide6 from "../../assets/images/slide/after_4.jpg";
import slide7 from "../../assets/images/slide/before_5.jpg";
import slide8 from "../../assets/images/slide/after_5.jpg";
import slide9 from "../../assets/images/slide/before_6.jpg";
import slide10 from "../../assets/images/slide/after_6.jpg";

const Section = styled.section`
  & > div {
    margin: 50px auto;
    & > h4 {
      font-size: 30px;
      line-height: 35px;
      letter-spacing: 5%;
      color: #444;
      text-align: center;
      margin-bottom: 50px;
    }
  }

  & img {
    width: 100%;
    height: 450px;
    object-fit: cover;
  }

  & .image-item {
    padding-right: 10px;
  }
`;

const Slide = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3.5,
      paritialVisibilityGutter: 60,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2.5,
      paritialVisibilityGutter: 50,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      paritialVisibilityGutter: 30,
    },
  };
  const image = [
    slide1,
    slide2,
    slide3,
    slide4,
    slide5,
    slide6,
    slide7,
    slide8,
    slide9,
    slide10,
  ];

  return (
    <Section>
      <div>
        <h4>HALKEEPING CÂN HẾT MỌI RÁC BẨN</h4>

        <Carousel responsive={responsive} itemClass='image-item'>
          {image.map((item) => (
            <img src={item} />
          ))}
        </Carousel>
      </div>
    </Section>
  );
};

export default Slide;
