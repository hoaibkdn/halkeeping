import styled from "styled-components"


import home from "../../assets/images/home.png"
import company from "../../assets/images/company.png"
import roller_rush from "../../assets/images/roller-brush.png"
import people from "../../assets/images/people.png"
import calendar from "../../assets/images/calendar.png"

const Section = styled.section`
  & > div {
    max-width: 80%;
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

      & > div {
        width: 45%;
        display: flex;
        justify-content: flex-end;
        & > img {
          width: 80%;
          height: 580px;
          object-fit: contain;
        }
      }

      & > .services {
        width: 55%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
      }
    }
  }
`

const Service = styled.div`
  width: 49%;
  border: 1px solid #C0C0C0;
  margin-bottom: 20px;
  padding: 10px 30px;
  text-align: center;

  & > img {
    width: auto;
    height: auto;
    object-fit: cover;
  }

  & > h4 {
    color: #757575;
    font-size: 16px;
    font-weight: 500;
  }

  & > p {
    color: #757575;
    font-weight: 300;
  }
`

const Services = () => {
  return <Section>
    <div>
      <h4>HALKEEPING CUNG CAP DICH VU GI</h4>
      <div>
        <div className="services">
          <Service>
            <img src={home}/>
            <h4>Dọn nhà ở, can ho</h4>
            <p>Bạn đi làm cả tuần và muốn có người dọn vệ sinh nhà ở giúp, HalKeeping nhận dọn đơn lẻ mỗi lần</p>
          </Service>
          <Service>
            <img src={company}/>
            <h4>Dọn nhà ở, can ho</h4>
            <p>Bạn đi làm cả tuần và muốn có người dọn vệ sinh nhà ở giúp, HalKeeping nhận dọn đơn lẻ mỗi lần</p>
          </Service>
          <Service>
            <img src={calendar}/>
            <h4>Dọn nhà ở, can ho</h4>
            <p>Bạn đi làm cả tuần và muốn có người dọn vệ sinh nhà ở giúp, HalKeeping nhận dọn đơn lẻ mỗi lần</p>
          </Service>
          <Service>
            <img src={roller_rush}/>
            <h4>Dọn nhà ở, can ho</h4>
            <p>Bạn đi làm cả tuần và muốn có người dọn vệ sinh nhà ở giúp, HalKeeping nhận dọn đơn lẻ mỗi lần</p>
          </Service>
        </div>
        <div>
          <img src={people}/>

        </div>
      </div>
    </div>
  </Section>
}

export default Services
