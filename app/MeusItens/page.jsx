'use client'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  maxWidth: 400,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function MeusItens() {


//   let { user, setUser, dadosUser} = useContext(ProdutoContext);


//   const[idProduto, setIdProduto] = useState('')

  const message = `Truncation should be conditionally applicable on this long line of text
 as this is a much longer line than what the container can support.`;
  
  
  return (
    <main className="sm:ml-28 p-2">

          <Box display='flex' flexDirection='column' width='100%' height='100%' alignItems='center' justifyContent='center' >

             <strong className="text-2x1 mb-6  "> Em negociação </strong> 

                <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
                <Item sx={{ my: 1, mx: 'auto', p: 2 }}>
                    <Stack spacing={2} direction="row" sx={{ alignItems: 'center' }}>
                    <Avatar>W</Avatar>
                    <Typography noWrap>{message}</Typography>
                    </Stack>
                </Item>
                <Item sx={{ my: 1, mx: 'auto', p: 2 }}>
                    <Stack spacing={2} direction="row" sx={{ alignItems: 'center' }}>
                    <Stack>
                        <Avatar>W</Avatar>
                    </Stack>
                    <Stack sx={{ minWidth: 0 }}>
                        <Typography noWrap>{message}</Typography>
                    </Stack>
                    </Stack>
                </Item>
                </Box>
                                                           
         </Box>
      
    </main>
  );
}
