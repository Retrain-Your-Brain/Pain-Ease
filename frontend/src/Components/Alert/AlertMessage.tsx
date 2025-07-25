import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import { useAppDispatch, useAppSelector } from "../../store/store";
import { removeError } from '../../store/errorSlice';

export function DescriptionAlerts() {
    const messages = useAppSelector((state)=> state.error.messages);
    const dispatch = useAppDispatch();
    const handleClose = (index:number) => {
        dispatch(removeError(index))
    }
    return (
        <div>
            <Stack sx={{ width: '100%' }} spacing={2}>
            { messages.map ((message,index)=> (
                <Alert severity="error" onClose={() => handleClose(index)}>
                    <AlertTitle>Error</AlertTitle>
                   {message}
                </Alert>
            ))}
            </Stack>
        </div>
    );
}
