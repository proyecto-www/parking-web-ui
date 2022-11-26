import { Button } from "@mui/material";
import { Search } from "@mui/icons-material";
export default function ButtonDefault({ text, color }) {
    return (
        <Button startIcon={<Search/>} variant="contained" style={{ backgroundColor: color }} >{text}</Button>
    );
}
