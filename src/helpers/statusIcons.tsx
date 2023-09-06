import { Img } from '@chakra-ui/react'
import whiteDwarf from '../assets/1.png'
import brownDwarf from '../assets/2.png'
import redDwarf from '../assets/3.png'
import luminousBlue from '../assets/4.png'
import supernova from '../assets/5.png'


export const statusIcons = [
  null,
  <Img src={whiteDwarf} alt='whiteDwarf' boxSize='12px' borderRadius='50' display='inline' title='Anã Branca' />,
  <Img src={brownDwarf} alt='brownDwarf' boxSize='12px' borderRadius='50' display='inline' title='Anã Marrom' />,
  <Img src={redDwarf} alt='redDwarf' boxSize='12px' borderRadius='50' display='inline' title='Anã Vermelha' />,
  <Img src={luminousBlue} alt='luminousBlue' boxSize='12px' borderRadius='50' display='inline' title='Azul Luminoza' />,
  <Img src={supernova} alt='supernova' boxSize='12px' borderRadius='50' display='inline' title='Supernova' />,
]