import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
export const NavButton = styled(Button)` 
    color: gray;
    font-size: 13px;
    margin-right: 20px;
    border-radius: 40px;
    margin: 0px 10px;
    height: 40px;
    min-width: 120px;

    &:hover {
        color: #5138EE;
        height: 40px;
        min-width: 120px;
    }
`;