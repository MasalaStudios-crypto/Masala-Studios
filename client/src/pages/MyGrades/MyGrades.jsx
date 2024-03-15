import React from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, FormControl, InputLabel, MenuItem, Select, IconButton } from '@mui/material'

export const MyGrades = () => {
  return (
    <div>
      <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell align="center">Nombre</TableCell>
          <TableCell align="center">Duracion</TableCell>
          <TableCell align="center">Fecha Creacion</TableCell>
          <TableCell align="center">Path</TableCell>
          <TableCell align="center">Documento</TableCell>
          <TableCell align="center">Tipo Documento</TableCell>
          <TableCell align="center">Eliminar Tema</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
              <TableCell align="center">{elem.name}</TableCell>
              <TableCell align="center">{elem.duration}h</TableCell>
              <TableCell align="center">{elem.creation_date}</TableCell>
              <TableCell align="center">{elem.path}</TableCell>
              {/* input */}
              <TableCell align="center">
                <label htmlFor={`file-upload-${elem.subject_id}`}>
                  <input 
                    id={`file-upload-${elem.subject_id}`}
                    type="file" 
                    onChange={(event) => handleFileChange(event, elem.course_id, elem.subject_id)}
                    style={{ display: 'none' }}
                    accept={
                      elem.selectedFileType === 'pdf' ? 'application/pdf' : 
                      elem.selectedFileType === 'imagen' ? 'image/*' : 
                      elem.selectedFileType === 'video' ? 'video/*' : 
                      elem.selectedFileType === 'audio' ? 'audio/*' : ''
                    }
                  />
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <img src="/icons/folder.svg" alt="subir imagen" className='upload-img' />
                  </IconButton>
                </label>
              </TableCell>
              {/* tipo archivo */}
              <TableCell align="center">
                <FormControl>
                    <InputLabel id={`file-type-label-${elem.subject_id}`}>Tipo de archivo</InputLabel>
                    <Select
                      labelId={`file-type-label-${elem.subject_id}`}
                      value={elem.selectedFileType || 'pdf'}
                      onChange={(event) => setSubjects(prevSubjects => prevSubjects.map(subject => {
                        if (subject.subject_id === elem.subject_id) {
                          return {
                            ...subject,
                            selectedFileType: event.target.value
                          };
                        }
                        return subject;
                      }))}
                      label="Tipo de archivo"
                    >
                      <MenuItem value="pdf">PDF</MenuItem>
                      <MenuItem value="imagen">Imagen</MenuItem>
                      <MenuItem value="video">Video</MenuItem>
                      <MenuItem value="audio">Audio</MenuItem>
                    </Select>
                </FormControl>
              </TableCell>
              <TableCell align="center">
                <Button 
                  variant="danger"
                  onClick={() => erase(elem.course_id, elem.subject_id)}
                >Eliminar Tema</Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  </TableContainer>
    </div>
  )
}
