import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material'
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import React, { useMemo, useRef } from 'react'
import { ImageGalery } from '../components/ImageGalery'
import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { setActiveNote } from '../../store/journal/journalSlice'
import { startDeletingNote, startSaveNote, startUploadingFiles } from '../../store/journal/thunks'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'

export const NoteView = () => {

    const {active:note, messageSaved, isSaving} = useSelector(state => state.journal)

    const fielInputRef = useRef()

    const dispatch = useDispatch()


    const{ body, title, onInputChange, formState, date} = useForm(note)

    const dateString = useMemo(()=>{
        const newDate = new Date(date)
        return newDate.toUTCString()
    }, [date])

    useEffect(() => {
      dispatch( setActiveNote(formState) )
    }, [formState])

    useEffect(() => {
      if(messageSaved.length > 0){
        Swal.fire('Nota actualizada', messageSaved, 'success')
      }
    }, [messageSaved])
    

    const onSaveNote=()=>{
        dispatch(startSaveNote());
    }

    const onFileInputChange = ({target})=>{
        if(target.files === 0 ) return;
        console.log('Subiendo archivos')
        dispatch(startUploadingFiles(target.files))
    }
    
    const onDelete = () => {
        dispatch( startDeletingNote() )
    }


    return (
        <Grid 
            container 
            direction='row' 
            justifyContent='space-between' 
            alignItems='center'
            sx={{mb:1}}
            className='animate__animated animate__fadeIn animate__faster'
        >
            <Grid item>
                <Typography fontSize={ 39 } fontWeight='light'>
                    {dateString}
                </Typography>
            </Grid>
            <Grid>

                <input 
                    type='file'
                    multiple
                    ref={fielInputRef}
                    onChange={ onFileInputChange}
                    style={{ display:'none' }}
                />

                <IconButton
                    color='primary'
                    disabled={isSaving}
                    onClick={()=> fielInputRef.current.click()}
                >
                    <UploadOutlined/>
                </IconButton>

                <Button 
                disabled={isSaving}
                    onClick={onSaveNote}                
                    color='primary' sx={{ padding: 2}}>
                    <SaveOutlined sx={{ fontSize:30, mr:1 }}/>
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField
                    type='text'
                    variant='filled'
                    fullWidth
                    placeholder='Título'
                    label='Titulo'
                    sx={{
                        border: 'none',
                        mb: 1
                    }}
                    name='title'
                    value={title}
                    onChange={onInputChange}
                />

                <TextField
                    type='text'
                    variant='filled'
                    fullWidth
                    multiline
                    placeholder='Qué sucedió el día de hoy?'
                    label='Evento'
                    minRows={ 5 }
                    name='body'
                    value={body}
                    onChange={onInputChange}
                />
            </Grid>

            <Grid container justifyContent='end'>
                <Button
                    onClick={onDelete}
                    color='error'
                    sx={{ mt: 2}}
                >
                    <DeleteOutline/>
                    Borrar
                </Button>
            </Grid>

            {/* Galeria de imagenes */}
            <ImageGalery
                images={note.imageURLs}
            />
            
        </Grid>
  )
}
