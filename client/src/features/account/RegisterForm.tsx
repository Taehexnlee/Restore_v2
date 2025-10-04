import { LockOutline } from "@mui/icons-material";
import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterMutation } from "./accountApi";
import { registerSchema, type RegisterSchema } from "../../lib/schema/registerSchema";

export default function RegisterForm() {
    const [registerUser, {isLoading}] = useRegisterMutation();
    const {register , handleSubmit,setError, formState:{errors}} = useForm<RegisterSchema>({
        mode:'onTouched' ,
        resolver: zodResolver(registerSchema )
    });
    const navigate = useNavigate();

    const onSubmit = async (data:RegisterSchema) => {
        try {
            await registerUser(data).unwrap();
        navigate('/catalog')
        } catch (error) {
           const apiError = error as {message:string}
           if(apiError.message && typeof apiError.message === 'string')
           {
            const errorArray = apiError.message.split(',');
            errorArray.forEach(e => {
                if(e.includes('Password')){
                    setError('password', {message:e})
                }
                else if(e.includes('Email'))
                {
                    setError('email' , {message:e})
                }
            })
           }
        }
        
    }

  return (

   <Container component={Paper} maxWidth ='sm' sx={{borderRadius:3}}
   >
    <Box display='flex' flexDirection='column' alignItems='center' marginTop='8'>
        <LockOutline sx={{mt:3, color:'secondary.main', fontSize:40}}/>
        <Typography variant="h5">Register</Typography>
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
            <Button disabled={isLoading} variant="contained" type="submit">Register</Button>
            <Typography sx={{textAlign:'center'}}>
                Already have an account
                <Typography sx={{ml:2}} component={Link} to='/login' color="primary">Log in</Typography>
            </Typography>

        </Box>
    </Box>
   </Container>
  )
}
