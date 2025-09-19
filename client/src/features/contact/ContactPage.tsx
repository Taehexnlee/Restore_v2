import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup, Typography } from "@mui/material";
import { decrement, increment, type CounterState } from "../catalog/counterReducer";

export default function ContactPage() {
    const data = useSelector((state: CounterState) => state.data);
    const dispatch = useDispatch();
    return (
        <>
            <Typography variant="h2">Contact Page</Typography>
            <Typography variant="body1">
                The data is: {data}
            </Typography>
            <ButtonGroup>
                <Button onClick={() => dispatch(decrement())} color="error" >Decre</Button>
                <Button onClick={() => dispatch(increment())} color="secondary" >incre</Button>
                <Button onClick={() => dispatch({type: 'decrement'})} color="error" >Incre +5 </Button>
            </ButtonGroup>
        </>
    )
}