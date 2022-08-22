import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
export const NavButton = styled(Button)` 
    color: gray;
    font-size: 16px;
    margin-right: 20px;
    border-radius: 40px;
    margin: 0px 10px;
    height: 60px;
    width: 140px;

    &:hover {
        color: #5138EE;
        height: 60px;
        width: 140px;
    }
`;