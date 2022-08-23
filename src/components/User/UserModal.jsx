
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { NavButton } from '../../styledComponents/Button'
import toast from "react-hot-toast";

function UserModal({action, header, close, open}) {
    const [form, setForm] = useState({
        username: "",
        password: ""
    })
    
    useEffect(() => {
      setForm(
        {
            username: "",
            password: ""
        }
      )
    }, [close])
    
    const handleSubmit = () => {
        let isErr = false;

        if(form.username.length == 0){
            toast.error("Username is required")

            isErr = true;
        }

        if(form.password.length == 0){
            toast.error("Password is required")

            isErr = true;
        }


        if(!isErr){
            action(form)
        }

    }

    return (
    <>
        <Dialog
            fullWidth={true}
            maxWidth={"sm"}
            open={open}
            onClose={close}
        >
            <DialogTitle>Form {header}</DialogTitle>
            <DialogContent>
            <Box display={'flex'} flexDirection={'column'} alignItems="center" gap={3} style={{padding: "40px"}}>
                <TextField
                    label="username"
                    value={form.username}
                    onChange={(e) => setForm({...form, username: e.target.value})}
                    variant="standard"
                    fullWidth
                    size='medium'
                    required
                />

                <TextField
                    label="password"
                    value={form.password}
                    onChange={(e) => setForm({...form, password: e.target.value})}
                    variant="standard"
                    type="password"
                    fullWidth
                    size='medium'
                    style={{fontSize: "40px"}}
                    required
                />
            </Box>
            </DialogContent>
            <DialogActions>
                <NavButton onClick={handleSubmit}>Submit</NavButton>
            </DialogActions>
        </Dialog>
    </>
  )
}

export default UserModal