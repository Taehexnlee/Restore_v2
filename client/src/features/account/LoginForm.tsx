import { LockOutline } from "@mui/icons-material";
import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginSchema, type LoginSchema } from "../../lib/schema/logincSchema";
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import { useLazyUserInfoQuery, useLoginMutation } from "./accountApi";

export default function LoginForm() {
    const [login, {isLoading}] = useLoginMutation();
    const [fetchUserInfo] = useLazyUserInfoQuery();
    const location = useLocation();
    const {register , handleSubmit, formState:{errors}} = useForm<LoginSchema>({
        mode:'onTouched' ,
        resolver: zodResolver(loginSchema )
    });
    const navigate = useNavigate();
    const onSubmit = async (data:LoginSchema) => {
        await login(data);
        await fetchUserInfo();
        navigate(location.state?.from  || '/catalog')
    }

  return (

   <Container component={Paper} maxWidth ='sm' sx={{borderRadius:3}}
   >
    <Box display='flex' flexDirection='column' alignItems='center' marginTop='8'>
        <LockOutline sx={{mt:3, color:'secondary.main', fontSize:40}}/>
        <Typography variant="h5">Sing In</Typography>
        <Box
            component='form'
            width='100%'
            display='flex'
            flexDirection='column'
            gap={3}
            marginY={3}
            onSubmit={handleSubmit(onSubmit)}
        >
            <TextField 
                fullWidth 
                label='Email' 
                autoFocus 
                {...register('email', {required:'Email is required'})} 
                error={!!errors.email} 
                helperText={errors.email?.message}
            /> 
            <TextField 
                fullWidth 
                label='Password' 
                type="password"
                autoFocus
                {...register('password', {required:'Password is required'})} 
                error={!!errors.password} 
                helperText={errors.password?.message}
            />
            <Button disabled={isLoading} variant="contained" type="submit">Sign in</Button>
            <Typography sx={{textAlign:'center'}}>
                Dont have an account?
                <Typography sx={{ml:2}} component={Link} to='/register' color="primary">Sign Up</Typography>
            </Typography>

        </Box>
    </Box>
   </Container>
  )
}
