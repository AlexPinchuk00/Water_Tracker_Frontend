import styled from '@emotion/styled';

export const Wrapper = styled.div``;

export const Container = styled.div`
  padding-left: 12px;
  padding-right: 12px;
  padding-bottom: 24px;

  @media screen and (min-width: 767px and max-with: 1439px) {
    width: 704px;
    padding-left: 24px;
    padding-right: 24px;
    padding-bottom: 32px;
  }

  @media screen and (min-width: 1440px) {
    padding-left: 24px;
    padding-right: 24px;
    width: 592px;
  }
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  // padding: 0 12px;
  // max-with: 280px;
  color: #2f2f2f;
`;

export const Formula = styled.div`
  display: flex;
  flex-direction: column;

  color: #2f2f2f;

  div:not(:last-child) {
    margin-bottom: 16px;
  }

  span {
    color: #407bff;
  }

  @media screen and (min-width: 767px) {
    flex-direction: row;
    gap: 24px;
  }
`;

export const FormSubTitle = styled.h3`
  margin-bottom: 16px;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.1;

  color: #000000;
`;

export const Paragraph = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 1.25;
  color: #2f2f2f;
`;

export const Description = styled.div`
  border: 1px solid #d7e3ff;
  border-radius: 10px;
  margin: 12px 0 24px 0;
  padding: 10px;

  p {
    font-size: 12px;
    line-height: 1.33333;
    color: #8f8f8f;
  }

  span {
    color: #407bff;
  }
`;

export const FormRadio = styled.div`
  gap: 16px;

  span {
    margin-right: 24px;
    font-size: 16px;
  }
`;

export const InputRadio = styled.input`
  opacity: 0;
  position: absolute;

  + span {
    display: inline-block;
    padding-left: 25px;
    position: relative;
    cursor: pointer;

    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 14px;
      height: 14px;
      border-radius: 50%;
      border: 1px solid #407bff;
      background-color: #ffffff;
    }

    &:after {
      content: '';
      position: absolute;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #407bff;
      top: 50%;
      left: 4px;
      transform: translate(0, -50%);
      opacity: 0;
    }
  }

  &:checked + span:after {
    opacity: 1;
  }
`;

export const Input = styled.input`
  border: 1px solid #d7e3ff;
  border-radius: 6px;
  display: flex;
  padding: 12px 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  font-size: 16px;
  width: 100%;
  margin-top: 8px;
  color: #407bff;
  background-color: #ffffff;

  &::placeholder {
    color: #d7e3ff;
  }

  &:hover {
    color: #407bff'
    border: 1px solid #407bff;
  }

  &:focus {
    outline: none;
    border: 1px solid #407bff;
  }

  &:not(:placeholder-shown) {
    color: #407bff;
  }

  &[type='number'] {
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`;

export const CalculateWater = styled.div`
  display: flex;

  span {
    font-size: 18px;
    font-weight: 700;
    color: #407bff;
  }
`;

export const Result = styled.p`
  width: 190px;

  @media screen and (min-width: 768px) {
    width: 342px;
  }

  @media screen and (min-width: 1440px) {
    width: 342px;
  }
`;

export const ButtonSave = styled.button`
  background-color: #407bff;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding: 10px 30px;
  border-radius: 10px;
  font-size: 18px;
  width: 100%;
  height: 44px;
  margin-left: auto;
  box-shadow: 0px 4px 8px 0px rgba(64, 123, 255, 0.34);
  transition: background-color ${({ theme }) => theme.transition.main};

  &:hover {
    box-shadow: 0px 4px 14px 0px rgba(64, 123, 255, 0.54);
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoint.tablet}) {
    width: 160px;
  }
`;
