import { Button, CircularProgress } from "@mui/material";
import { Search } from "@mui/icons-material";
export default function Loading({ text, color }) {
    return (

        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}>
            <CircularProgress />
        </div>
    );
}
