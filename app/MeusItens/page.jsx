'use client'
import * as React from 'react';
import { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Button } from "@/components/ui/button";
import Image from "next/image";

import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

import * as BiIcons from 'react-icons/bi';


import mouse from '../img/mouse.png'

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


  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };


    const names = [
      'Negocio fechou',
      'Negocio não fechou',
      'Desisti da compra',
    ];

  function getStyles(name, personName, theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

// type Status = 'idle' | 'loading' | 'success';

export default function MeusItens() {

       const theme = useTheme();
       
      const [personName, setPersonName] = React.useState([]);
      const [isLike, setIsLike] = useState('neutro');
      const [selectedOption, setSelectedOption] = useState('');

      console.log('select', selectedOption)


       const handleChangeSelect = useCallback((event) => {
              const value = event.target.value;
              setSelectedOption(value);

              if (value === 'opcao1') {
                setIsLike('ok');
              } else if (value === 'opcao2') {
                setIsLike('no');
              } else {
                setIsLike('neutro');
            }
        }, []);


      const handleChange = (event) => {
        const {
          target: { value },
        } = event;
        setPersonName(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
      );
    };
  
  return (
   <main className="sm:ml-28 p-2">
        <Box
          display="flex"
          flexDirection="column"
          width="100%"
          alignItems="center"
          justifyContent="center"
        >
          <strong className="text-2x1 mb-6">Em negociação</strong>

          <Box
            sx={{
              flexGrow: 1,
              overflow: 'hidden',
              px: 3,
              mb: 1,
              width: '100%',
            }}
          >
            <Item
              sx={{
                my: 1,
                p: 1,
                width: '100%', // Largura total da tela
              }}
            >
              <Box display="flex" flexDirection="row" alignItems='center' justifyContent='space-between'>
                <Box display='flex' width="50px">
                  <Image
                    src={mouse}
                    width={60}
                    height={60}
                    alt="Imagem do produto"
                  />

                   <Box display='flex' flexDirection='column' marginLeft='5px' alignItems="flex-start" justifyContent="flex-start">
                  <Typography fontWeight='bold' noWrap> Mouse sem fio</Typography>

                  <Box display='flex' flexDirection='row'>
                      <Typography fontWeight='bold' htmlFor="my-select">Status:</Typography>
                      
                        <select id="my-select" value={selectedOption} onChange={handleChangeSelect}>
                          <option value="">Selecione</option>
                          <option value="opcao1">Negócio fechou</option>
                          <option value="opcao2">Negócio não fechou</option>
                        </select>
                  </Box>
                </Box>
                </Box>
                  <BiIcons.BiSolidLike  className='icon' color={isLike == 'ok' ? 'green' : isLike == 'no' ? 'red' : 'gray'} size={22}/>
              </Box>

              <Stack spacing={2} direction="row" sx={{ alignItems: 'center' }}>
                
              </Stack>
            </Item>
          </Box>
        </Box>
</main>
  );
}
