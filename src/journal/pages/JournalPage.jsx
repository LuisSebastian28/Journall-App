import { IconButton, Typography } from '@mui/material'
import React from 'react'
import { JournalLayout } from '../layout/JournalLayout'
import { NothingSelectedView } from '../views/NothingSelectedView'
import { NoteView } from '../views/NoteView'
import { AddOutlined } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { startNewNote } from '../../store/journal/thunks'

export const JournalPage = () => {

  const dispatch = useDispatch()

  const { isSaving, active } = useSelector(state => state.journal)

  const onClickNewNote = () => {
    dispatch(startNewNote());
  }

  return (
    <JournalLayout>
      {/* <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio tempora odit cupiditate, animi dicta quam nihil nesciunt dolorum reiciendis aliquid possimus doloremque sapiente alias delectus unde facere autem assumenda eaque?</Typography> */}

      {/* NothingSelected */}
      {/* <NothingSelectedView/> */}
      {/* <NoteView/> */}

      {(!!active)
        ? <NoteView />
        : <NothingSelectedView />}

      <IconButton
        onClick={onClickNewNote}
        disabled={isSaving}
        color="primary"
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>


    </JournalLayout>

  )
}
