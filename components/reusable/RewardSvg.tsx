import React from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 40rem;
  display: flex;
  align-items: center;
  justify-content: center;
  & svg {
    height: 500px;
    width: 500px;
  }
  @media screen and (max-width: 760px) {
    max-width: 90%;
    & svg {
      height: 200px;
      width: 400px;
    }
  }
`;

export const RewardSvg = ({ code }) => {
  const svg = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
      <defs>
        <style>
          {` .cls-6{stroke:#f8f0fb;stroke-width:1px}.cls-5,.cls-6{fill-rule:evenodd}.cls-6{fill:#fff}.cls-5{fill:none;stroke:#119da4;stroke-width:10px}`}
        </style>
      </defs>
      <rect
        x="128"
        y="450"
        width="744"
        height="399"
        rx="15"
        ry="15"
        fill="#119da4"
      />
      <path
        d="M142.618 217.571l711.564-58.927a15 15 0 0116.187 13.711l2.724 32.887a15 15 0 01-13.711 16.187l-711.564 58.927a15 15 0 01-16.187-13.711l-2.724-32.887a15 15 0 0113.711-16.187z"
        fillRule="evenodd"
        fill="#119da4"
      />
      <text
        id="_4234n4nfm3d"
        x="119.5"
        y="419.5"
        fontSize="154.167"
        fill="#5eeb5b"
        fontFamily="Bebas Neue"
      >
        {code}
      </text>
      <path fill="#fff" d="M475 450h50v399h-50z" />
      <path
        className="cls-5"
        d="M314 133c41.586-40.811 206.845 35.047 202 78-2.769 24.548-61.153 38.709-100 39-51.273.384-83.781-13.424-100-39-14.937-23.554-19.407-60.918-2-78z"
      />
      <path
        className="cls-5"
        d="M592.776 121.725c11.329 57.154-142.718 153.769-175.983 126.167-19.012-15.775 1.156-72.365 22.212-105.013 27.79-43.089 57.161-62.705 87.443-62.247 27.887.423 61.586 17.168 66.328 41.093z"
      />
      <path
        className="cls-6"
        d="M473.486 190.171l49.829-4.127 5.2 62.785-49.829 4.127zM872 517v50H128v-50h744z"
      />
    </svg>
  );
  return <Container>{svg}</Container>;
};
