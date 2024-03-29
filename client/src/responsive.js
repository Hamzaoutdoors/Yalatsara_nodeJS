import { css } from 'styled-components';

export const mobile = (props) => css`
        @media only screen and (max-width: 380px) {
        ${props};
        }
    `;

export const desktop = (props) => css`
        @media only screen and (min-width: 400px) {
        ${props};
        }
    `;