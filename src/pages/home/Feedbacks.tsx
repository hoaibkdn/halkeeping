
import styled from "styled-components"
import { Carousel } from "react-bootstrap"
import review1 from "../../assets/images/review_1.png"
const Section = styled.section`
  & > div {
    max-width: 70%;
    margin: 50px auto;
    & > h4 {
      font-size: 30px;
      line-height: 35px;
      letter-spacing: 5%;
      color: #444;
      text-align: center;
      margin-bottom: 50px;
    }

    & > div {
      display: flex;
      justify-content: space-between;
      
    }

    & > .slide {
      & > .carousel-inner {
        width: 80%;
        margin: auto;
      }

      & > a {
        width: 50px;
        height: 50px;
        background-color: #EEAD4B;
        border-radius: 50%;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
`

const Feedbacks = () => {
  return <Section>
    <div>
      <h4>NHẬN XÉT TỪ KHÁCH HÀNG</h4>
      <Carousel>
          <Carousel.Item interval={1000}>
            <img className="d-block w-100" src={review1} alt="First slide"/>
          </Carousel.Item>
          <Carousel.Item interval={1000}>
            <img className="d-block w-100" src={review1} alt="First slide"/>
          </Carousel.Item>
      </Carousel>
    </div>
  </Section>
}
export default Feedbacks
